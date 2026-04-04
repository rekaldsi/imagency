import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config()

const server = Fastify({ logger: true })

// ─── Supabase ───────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
)

// ─── Plugins ────────────────────────────────────────────────────────────────
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

// ─── Helpers ────────────────────────────────────────────────────────────────
function extractVoiceType(desc: string): string {
  if (!desc) return 'Unknown'
  const lower = desc.toLowerCase()
  if (lower.includes('contralto')) return 'Alto'
  if (lower.includes('bass') && !lower.includes('baritone')) return 'Bass'
  if (lower.includes('baritone')) return 'Baritone'
  if (lower.includes('alto')) return 'Alto'
  if (lower.includes('tenor')) return 'Tenor'
  if (lower.includes('mezzo')) return 'Mezzo-Soprano'
  if (lower.includes('soprano')) return 'Soprano'
  return 'Unknown'
}

function extractAccent(desc: string): string {
  if (!desc) return 'American General'
  const lower = desc.toLowerCase()
  if (lower.includes('british-nigerian') || lower.includes('british nigerian')) return 'British Nigerian'
  if (lower.includes('south indian') || lower.includes('indian lilt')) return 'South Indian'
  if (lower.includes('german')) return 'German'
  if (lower.includes('italian')) return 'Italian'
  if (lower.includes('british')) return 'British RP'
  if (lower.includes('american')) return 'American General'
  return 'American General'
}

function avatarSeedFromId(id: string): number {
  const num = parseInt(id.replace(/\D/g, ''), 10)
  return (num % 70) || 1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeCharacter(char: Record<string, any>) {
  return {
    id: char.id,
    firstName: char.first_name,
    lastInitial: char.last_initial,
    ageRange: char.age_range,
    gender: char.gender,
    ethnicity: char.ethnicity,
    archetype: char.archetype,
    energyArchetype: char.archetype,
    personality: char.personality,
    voiceType: extractVoiceType(char.voice_description),
    voiceDescription: char.voice_description,
    accent: extractAccent(char.voice_description),
    suggestedRoles: char.suggested_roles || [],
    genreFit: char.genre_fit || [],
    availableUses: char.available_uses || [],
    baseLicenseFee: char.base_license_fee,
    totalEarnings: char.total_earnings,
    totalLicenses: char.total_licenses,
    profileViews: char.profile_views,
    imageNeutralUrl: char.image_neutral_url,
    imageSmileUrl: char.image_smile_url,
    imageSeriousUrl: char.image_serious_url,
    imageThreeQuarterUrl: char.image_three_quarter_url,
    imageProfileUrl: char.image_profile_url,
    voiceSampleUrl: char.voice_sample_url,
    licenseAvailable: char.license_available,
    status: char.status,
    avatarSeed: avatarSeedFromId(char.id),
  }
}

async function logAdminAction(
  adminId: string,
  action: string,
  targetType?: string,
  targetId?: string,
  metadata?: Record<string, unknown>
) {
  await supabase.from('admin_activity_log').insert({
    admin_id: adminId,
    action,
    target_type: targetType,
    target_id: targetId,
    metadata: metadata || {},
  })
}

// ─── Health ────────────────────────────────────────────────────────────────
server.get('/health', async () => {
  return { status: 'ok', service: 'imagency-api', version: '0.3.0', timestamp: new Date().toISOString() }
})

// ─── Creators ──────────────────────────────────────────────────────────────
server.get<{
  Querystring: {
    voiceType?: string
    ageRange?: string
    gender?: string
    useCategory?: string
    skinTone?: string
    accent?: string
    limit?: string
    offset?: string
  }
}>('/api/creators', async (req) => {
  const { voiceType, ageRange, gender, useCategory, accent, limit, offset } = req.query

  let query = supabase
    .from('characters')
    .select('*')
    .eq('status', 'active')
    .eq('license_available', true)

  if (ageRange) query = query.eq('age_range', ageRange)
  if (gender) query = query.eq('gender', gender.toLowerCase())
  if (voiceType) query = query.ilike('voice_description', `%${voiceType}%`)
  if (accent) query = query.ilike('voice_description', `%${accent}%`)
  if (useCategory) query = query.contains('available_uses', [useCategory])

  const off = parseInt(offset || '0')
  const lim = parseInt(limit || '50')
  query = query.range(off, off + lim - 1)

  const { data, error } = await query

  if (error) {
    return { creators: [], total: 0, limit: lim, offset: off }
  }

  const rows = (data || []) as Record<string, unknown>[]
  const sanitized = rows.map(sanitizeCharacter)

  return {
    creators: sanitized,
    total: sanitized.length,
    limit: lim,
    offset: off,
  }
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

  // Increment profile views
  await supabase
    .from('characters')
    .update({ profile_views: ((data as Record<string, unknown>).profile_views as number || 0) + 1 })
    .eq('id', req.params.id)

  return { creator: sanitizeCharacter(data as Record<string, unknown>) }
})

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
  const { email, firstName, lastName, ageConfirmed, termsAccepted } = req.body

  if (!email || !firstName || !lastName) {
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

// ─── Auth ──────────────────────────────────────────────────────────────────
server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req) => {
  const { email } = req.body
  const id = 'BUY-' + Math.floor(1000 + Math.random() * 9000)
  const role = 'buyer'

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
server.get('/api/licenses', async (req) => {
  let buyerId: string | undefined
  try {
    await req.jwtVerify()
    buyerId = (req.user as Record<string, string>).id
  } catch {
    // unauthenticated — return empty
    return { licenses: [] }
  }

  const { data } = await supabase
    .from('licenses')
    .select('*')
    .eq('buyer_id', buyerId)
    .order('created_at', { ascending: false })

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
    .select('*')
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
  const media = 1 + ((mediaTypes?.length || 1) - 1) * 0.3
  const vol = (volume || 1) <= 1 ? 1 : 1 + Math.log(volume) * 0.4
  const typeMult = licenseType === 'subscription' ? 0.7 : licenseType === 'royalty' ? 0.5 : 1
  const price = Math.round(base * geo * dur * media * vol * typeMult)

  const licenseId = 'LIC-' + Math.floor(1000 + Math.random() * 9000)
  const apiKey = 'sk_ima_' + Math.random().toString(36).substring(2, 14)

  let buyerId: string | undefined
  let buyerEmail: string | undefined
  try {
    await req.jwtVerify()
    const user = req.user as Record<string, string>
    buyerId = user.id
    buyerEmail = user.email
  } catch {
    // proceed without auth for demo
  }

  const licenseRow = {
    id: licenseId,
    character_id: creatorId,
    buyer_id: buyerId,
    buyer_email: buyerEmail,
    license_type: licenseType,
    use_category: useCategory,
    media_types: mediaTypes || [],
    geography,
    duration,
    volume: volume || 1,
    price,
    creator_payout: Math.round(price * 0.7),
    platform_fee: Math.round(price * 0.3),
    status: 'escrow',
    api_key: apiKey,
    escrow_releases_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
  }

  const { error: insertError } = await supabase.from('licenses').insert(licenseRow)

  if (!insertError) {
    const char = character as Record<string, unknown>
    await supabase
      .from('characters')
      .update({ total_licenses: ((char.total_licenses as number) || 0) + 1 })
      .eq('id', creatorId)
  }

  return {
    success: true,
    license: {
      ...licenseRow,
      endpoint: 'https://api.imagency.io/v1/render',
      escrowReleasesAt: licenseRow.escrow_releases_at,
      createdAt: new Date().toISOString(),
    },
  }
})

// ─── Dashboard Stats ────────────────────────────────────────────────────────
server.get('/api/dashboard/creator/stats', async (req) => {
  let characterId: string | undefined
  try {
    await req.jwtVerify()
    characterId = (req.user as Record<string, string>).id
  } catch {
    // use empty stats
  }

  if (characterId) {
    const { data: char } = await supabase
      .from('characters')
      .select('total_earnings, total_licenses, profile_views')
      .eq('id', characterId)
      .single()

    if (char) {
      const c = char as Record<string, unknown>
      return {
        stats: {
          totalEarnings: c.total_earnings || 0,
          thisMonth: 0,
          pending: 0,
          activeLicenses: c.total_licenses || 0,
          profileViewsThisWeek: c.profile_views || 0,
          recentActivity: [],
        },
      }
    }
  }

  return {
    stats: {
      totalEarnings: 0,
      thisMonth: 0,
      pending: 0,
      activeLicenses: 0,
      profileViewsThisWeek: 0,
      recentActivity: [],
    },
  }
})

server.get('/api/dashboard/buyer/stats', async (req) => {
  let buyerId: string | undefined
  try {
    await req.jwtVerify()
    buyerId = (req.user as Record<string, string>).id
  } catch {
    // empty stats
  }

  if (buyerId) {
    const { data: licenses } = await supabase
      .from('licenses')
      .select('price, status, api_calls_used, api_calls_limit')
      .eq('buyer_id', buyerId)
      .eq('status', 'active')

    const rows = (licenses || []) as Record<string, unknown>[]
    const totalSpend = rows.reduce((sum, l) => sum + ((l.price as number) || 0), 0)
    const apiCallsUsed = rows.reduce((sum, l) => sum + ((l.api_calls_used as number) || 0), 0)
    const apiCallsLimit = rows.reduce((sum, l) => sum + ((l.api_calls_limit as number) || 0), 0)

    return {
      stats: {
        totalSpendThisMonth: totalSpend,
        activeLicenses: rows.length,
        apiCallsUsed,
        apiCallsLimit,
        licencesExpiringIn30Days: 0,
        recentActivity: [],
      },
    }
  }

  return {
    stats: {
      totalSpendThisMonth: 0,
      activeLicenses: 0,
      apiCallsUsed: 0,
      apiCallsLimit: 0,
      licencesExpiringIn30Days: 0,
      recentActivity: [],
    },
  }
})

// ─── Admin Routes ───────────────────────────────────────────────────────────
server.get('/api/admin/characters', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  await logAdminAction(user.id, 'characters_listed', 'character')

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return reply.status(500).send({ error: error.message })
  return { characters: data || [] }
})

server.get<{ Params: { id: string } }>('/api/admin/characters/:id', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  const { data: char, error: charError } = await supabase
    .from('characters')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (charError || !char) return reply.status(404).send({ error: 'Character not found' })

  const { data: licenses } = await supabase
    .from('licenses')
    .select('*')
    .eq('character_id', req.params.id)
    .order('created_at', { ascending: false })

  await logAdminAction(user.id, 'character_viewed', 'character', req.params.id)

  return { character: char, licenses: licenses || [] }
})

server.get('/api/admin/stats', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  await logAdminAction(user.id, 'stats_pulled')

  const [charsResult, licensesResult, usageResult] = await Promise.all([
    supabase.from('characters').select('id, total_earnings, total_licenses', { count: 'exact' }),
    supabase.from('licenses').select('price, status', { count: 'exact' }),
    supabase.from('license_usage_events').select('id', { count: 'exact' }),
  ])

  const chars = (charsResult.data || []) as Record<string, unknown>[]
  const licenses = (licensesResult.data || []) as Record<string, unknown>[]

  const totalRevenue = licenses.reduce((sum, l) => sum + ((l.price as number) || 0), 0)
  const totalApiCalls = usageResult.count || 0

  return {
    stats: {
      totalCharacters: charsResult.count || 0,
      totalLicenses: licensesResult.count || 0,
      totalRevenue,
      totalApiCalls,
    },
  }
})

server.patch<{ Params: { id: string }; Body: { status?: string; base_license_fee?: number } }>('/api/admin/characters/:id', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  const updates: Record<string, unknown> = {}
  if (req.body.status) updates.status = req.body.status
  if (req.body.base_license_fee !== undefined) updates.base_license_fee = req.body.base_license_fee
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('characters')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return reply.status(500).send({ error: error.message })

  await logAdminAction(user.id, 'character_updated', 'character', req.params.id, updates)

  return { character: data }
})

server.get('/api/admin/licenses', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  await logAdminAction(user.id, 'licenses_listed', 'license')

  const { data, error } = await supabase
    .from('licenses')
    .select(`
      *,
      characters(name, first_name, last_initial)
    `)
    .order('created_at', { ascending: false })

  if (error) return reply.status(500).send({ error: error.message })
  return { licenses: data || [] }
})

server.get('/api/admin/activity', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const user = req.user as Record<string, string>
  if (user.role !== 'admin') return reply.status(403).send({ error: 'Forbidden' })

  const { data, error } = await supabase
    .from('admin_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

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
