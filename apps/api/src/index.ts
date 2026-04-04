import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config()

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const server = Fastify({ logger: true })

// Plugins
server.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3010',
  credentials: true,
})

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'imagency-dev-secret-change-in-prod',
})

server.register(multipart, {
  limits: { fileSize: 100 * 1024 * 1024 },
})

// Helper: verify JWT and require admin role
function requireAdmin(req: FastifyRequest): { id: string; email: string; role: string } {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized')
  }
  const token = authHeader.replace('Bearer ', '')
  const decoded = server.jwt.verify<{ id: string; email: string; role: string }>(token)
  if (decoded.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return decoded
}

// ─── Health ────────────────────────────────────────────────────────────────
server.get('/health', async () => {
  return { status: 'ok', service: 'imagency-api', version: '0.2.0', timestamp: new Date().toISOString() }
})

// ─── Creators ──────────────────────────────────────────────────────────────
server.get<{
  Querystring: {
    voiceType?: string
    ageRange?: string
    gender?: string
    useCategory?: string
    skinTone?: string
    limit?: string
    offset?: string
  }
}>('/api/creators', async (req, reply) => {
  const { voiceType, ageRange, gender, useCategory, skinTone, limit, offset } = req.query

  const off = parseInt(offset || '0')
  const lim = parseInt(limit || '20')

  let query = supabase
    .from('characters')
    .select('*', { count: 'exact' })
    .eq('license_available', true)
    .eq('status', 'active')

  if (gender) query = query.eq('gender', gender)
  if (ageRange) query = query.eq('age_range', ageRange)
  if (voiceType) query = query.ilike('voice_description', `%${voiceType}%`)
  if (useCategory) query = query.contains('available_uses', [useCategory])
  if (skinTone) query = query.ilike('ethnicity', `%${skinTone}%`)

  query = query.range(off, off + lim - 1)

  const { data, error, count } = await query

  if (error) {
    return reply.status(500).send({ error: error.message })
  }

  // Strip full name — only return first_name and last_initial
  const sanitized = (data || []).map(({ name: _name, ...rest }) => rest)

  return { creators: sanitized, total: count ?? 0, limit: lim, offset: off }
})

server.get<{ Params: { id: string } }>('/api/creators/:id', async (req, reply) => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error || !data) {
    return reply.status(404).send({ error: 'Creator not found' })
  }

  const { name: _name, ...sanitized } = data
  return { creator: sanitized }
})

// ─── Creator Registration (stub — real auth is phase 2) ───────────────────
server.post<{
  Body: {
    email: string
    password: string
    firstName: string
    lastName: string
    ageConfirmed: boolean
    termsAccepted: boolean
  }
}>('/api/creators/register', async (req, reply) => {
  const { email, password, firstName, lastName, ageConfirmed, termsAccepted } = req.body

  if (!email || !password || !firstName || !lastName) {
    return reply.status(400).send({ error: 'Missing required fields' })
  }
  if (!ageConfirmed || !termsAccepted) {
    return reply.status(400).send({ error: 'Must confirm age and accept terms' })
  }

  const id = 'IMA-' + Math.floor(1000 + Math.random() * 9000)

  return {
    success: true,
    registrationId: id,
    message: 'Registration submitted. Identity verification pending review.',
    nextStep: 'identity-verification',
  }
})

// ─── Auth (stubs — real auth is phase 2) ─────────────────────────────────
server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
  const { email } = req.body
  const id = 'IMA-' + Math.floor(1000 + Math.random() * 9000)
  const role = 'creator'

  const token = server.jwt.sign({ id, email, role }, { expiresIn: '7d' })

  return { token, user: { id, email, role } }
})

server.post<{ Body: { email: string; password: string; role: 'creator' | 'buyer'; companyName?: string } }>('/api/auth/register', async (req, reply) => {
  const { email, password, role, companyName } = req.body

  if (!email || !password || !role) {
    return reply.status(400).send({ error: 'Missing required fields' })
  }

  const id = (role === 'buyer' ? 'BUY-' : 'IMA-') + Math.floor(1000 + Math.random() * 9000)
  const token = server.jwt.sign({ id, email, role }, { expiresIn: '7d' })

  return { success: true, token, user: { id, email, role, companyName } }
})

// ─── Licenses ──────────────────────────────────────────────────────────────
server.get('/api/licenses', async (_req, reply) => {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .limit(50)

  if (error) {
    return reply.status(500).send({ error: error.message })
  }

  return { licenses: data || [] }
})

server.post<{
  Body: {
    creatorId: string
    licenseType: 'one-time' | 'subscription' | 'royalty'
    useCategory: string
    mediaTypes: string[]
    geography: string
    duration: string
    volume: number
  }
}>('/api/licenses/create', async (req, reply) => {
  const { creatorId, licenseType, useCategory, mediaTypes, geography, duration, volume } = req.body

  if (!creatorId || !licenseType || !useCategory) {
    return reply.status(400).send({ error: 'Missing required fields' })
  }

  const { data: character, error: charError } = await supabase
    .from('characters')
    .select('id')
    .eq('id', creatorId)
    .single()

  if (charError || !character) {
    return reply.status(404).send({ error: 'Creator not found' })
  }

  const basePrices: Record<string, number> = {
    advertising: 300, film_tv: 800, streaming: 250, gaming: 400, ai_training: 1200,
  }
  const geoMult: Record<string, number> = { global: 3.0, 'north-america': 2.0, europe: 1.8, 'single-country': 1.0 }
  const durMult: Record<string, number> = { '30-days': 1.0, '90-days': 2.5, '6-months': 4.0, '1-year': 6.5 }

  const base = basePrices[useCategory] || 300
  const geo = geoMult[geography] || 1.0
  const dur = durMult[duration] || 1.0
  const media = 1 + (mediaTypes.length - 1) * 0.3
  const vol = volume <= 1 ? 1 : 1 + Math.log(volume) * 0.4
  const typeMult = licenseType === 'subscription' ? 0.7 : licenseType === 'royalty' ? 0.5 : 1
  const price = Math.round(base * geo * dur * media * vol * typeMult)

  const licenseId = 'LIC-' + Math.floor(1000 + Math.random() * 9000)
  const apiKey = 'sk_ima_' + Math.random().toString(36).substring(2, 14)

  const { data: license, error: licError } = await supabase
    .from('licenses')
    .insert({
      id: licenseId,
      character_id: creatorId,
      license_type: licenseType,
      use_category: useCategory,
      media_types: mediaTypes,
      geography,
      duration,
      volume,
      price,
      creator_payout: Math.round(price * 0.7),
      platform_fee: Math.round(price * 0.3),
      status: 'escrow',
      api_key: apiKey,
      escrow_releases_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    })
    .select()
    .single()

  if (licError) {
    return reply.status(500).send({ error: licError.message })
  }

  // Atomically increment total_licenses
  await supabase.rpc('increment_character_total_licenses', { char_id: creatorId })

  return {
    success: true,
    license: { ...license, endpoint: 'https://api.imagency.io/v1/render' },
  }
})

// ─── Dashboard Stats ─────────────────────────────────────────────────────
server.get('/api/dashboard/creator/stats', async (_req, reply) => {
  const { data, error } = await supabase
    .from('characters')
    .select('total_earnings, total_licenses')

  if (error) return reply.status(500).send({ error: error.message })

  const rows = data || []
  const totalEarnings = rows.reduce((s, r) => s + (r.total_earnings || 0), 0)
  const totalLicenses = rows.reduce((s, r) => s + (r.total_licenses || 0), 0)

  return {
    stats: {
      totalEarnings,
      totalLicenses,
      thisMonth: 0,
      pending: 0,
      activeLicenses: totalLicenses,
      profileViewsThisWeek: 0,
      recentActivity: [],
    },
  }
})

server.get('/api/dashboard/buyer/stats', async (_req, reply) => {
  const { data, error } = await supabase
    .from('licenses')
    .select('api_calls_used, api_calls_limit, status')

  if (error) return reply.status(500).send({ error: error.message })

  const rows = data || []
  const totalApiCalls = rows.reduce((s, r) => s + (r.api_calls_used || 0), 0)
  const totalApiLimit = rows.reduce((s, r) => s + (r.api_calls_limit || 0), 0)
  const activeLicenses = rows.filter((r) => r.status === 'active').length

  return {
    stats: {
      totalSpendThisMonth: 0,
      activeLicenses,
      apiCallsUsed: totalApiCalls,
      apiCallsLimit: totalApiLimit,
      licencesExpiringIn30Days: 0,
      recentActivity: [],
    },
  }
})

// ─── Admin Routes (JWT protected, role=admin) ─────────────────────────────
server.get('/api/admin/characters', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return reply.status(500).send({ error: error.message })

  await supabase.from('admin_activity_log').insert({
    admin_id: admin.id, action: 'characters_listed', target_type: 'character', target_id: null, metadata: {},
  })

  return { characters: data || [] }
})

server.get<{ Params: { id: string } }>('/api/admin/characters/:id', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const { data, error } = await supabase
    .from('characters')
    .select('*, licenses(*)')
    .eq('id', req.params.id)
    .single()

  if (error || !data) return reply.status(404).send({ error: 'Character not found' })

  await supabase.from('admin_activity_log').insert({
    admin_id: admin.id, action: 'character_viewed', target_type: 'character', target_id: req.params.id, metadata: {},
  })

  return { character: data }
})

server.get('/api/admin/stats', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const [{ count: totalChars }, { data: licenseRows }] = await Promise.all([
    supabase.from('characters').select('*', { count: 'exact', head: true }),
    supabase.from('licenses').select('creator_payout, api_calls_used'),
  ])

  const totalRevenue = (licenseRows || []).reduce((s, r) => s + (r.creator_payout || 0), 0)
  const totalApiCalls = (licenseRows || []).reduce((s, r) => s + (r.api_calls_used || 0), 0)

  await supabase.from('admin_activity_log').insert({
    admin_id: admin.id, action: 'stats_pulled', target_type: null, target_id: null, metadata: {},
  })

  return {
    stats: {
      total_characters: totalChars ?? 0,
      total_licenses: (licenseRows || []).length,
      total_revenue: totalRevenue,
      total_api_calls: totalApiCalls,
    },
  }
})

server.patch<{
  Params: { id: string }
  Body: { status?: string; base_license_fee?: number }
}>('/api/admin/characters/:id', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const updates: Record<string, unknown> = {}
  if (req.body.status !== undefined) updates.status = req.body.status
  if (req.body.base_license_fee !== undefined) updates.base_license_fee = req.body.base_license_fee
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('characters')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error || !data) return reply.status(500).send({ error: error?.message || 'Update failed' })

  await supabase.from('admin_activity_log').insert({
    admin_id: admin.id, action: 'character_updated', target_type: 'character', target_id: req.params.id, metadata: updates,
  })

  return { character: data }
})

server.get('/api/admin/licenses', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const { data, error } = await supabase
    .from('licenses')
    .select('*, characters(name)')
    .order('created_at', { ascending: false })

  if (error) return reply.status(500).send({ error: error.message })

  await supabase.from('admin_activity_log').insert({
    admin_id: admin.id, action: 'licenses_listed', target_type: 'license', target_id: null, metadata: {},
  })

  return { licenses: data || [] }
})

server.get('/api/admin/activity', async (req, reply) => {
  let admin: { id: string; email: string; role: string }
  try { admin = requireAdmin(req) } catch { return reply.status(401).send({ error: 'Unauthorized' }) }

  const { data, error } = await supabase
    .from('admin_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return reply.status(500).send({ error: error.message })

  return { activity: data || [] }
})

// ─── Start ─────────────────────────────────────────────────────────────────
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3011')
    await server.listen({ port, host: '0.0.0.0' })
    console.log(`Imagency API running on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
