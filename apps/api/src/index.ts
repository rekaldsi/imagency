import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { config } from 'dotenv'
import { MOCK_CREATORS } from './data/mock-creators'

config()

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

// In-memory mock stores
const mockUsers: Record<string, { email: string; password: string; id: string; role: 'creator' | 'buyer' }> = {}
const mockLicenses: Record<string, object[]> = {}

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
    accent?: string
    limit?: string
    offset?: string
  }
}>('/api/creators', async (req) => {
  let results = [...MOCK_CREATORS]

  const { voiceType, ageRange, gender, useCategory, skinTone, accent, limit, offset } = req.query

  if (voiceType) results = results.filter((c) => c.voiceType.toLowerCase().includes(voiceType.toLowerCase()))
  if (ageRange) results = results.filter((c) => c.ageRange === ageRange)
  if (gender) results = results.filter((c) => c.gender.toLowerCase() === gender.toLowerCase())
  if (skinTone) results = results.filter((c) => c.skinTone.toLowerCase() === skinTone.toLowerCase())
  if (accent) results = results.filter((c) => c.accent.toLowerCase().includes(accent.toLowerCase()))
  if (useCategory) results = results.filter((c) => c.availableUses.includes(useCategory))

  const off = parseInt(offset || '0')
  const lim = parseInt(limit || '20')
  const paginated = results.slice(off, off + lim)

  // Strip last names from results (only return last initial)
  const sanitized = paginated.map(({ lastName, ...rest }) => rest)

  return {
    creators: sanitized,
    total: results.length,
    limit: lim,
    offset: off,
  }
})

server.get<{ Params: { id: string } }>('/api/creators/:id', async (req, reply) => {
  const creator = MOCK_CREATORS.find((c) => c.id === req.params.id)
  if (!creator) {
    return reply.status(404).send({ error: 'Creator not found' })
  }
  const { lastName, ...sanitized } = creator
  return { creator: sanitized }
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
  const { email, password, firstName, lastName, ageConfirmed, termsAccepted } = req.body

  if (!email || !password || !firstName || !lastName) {
    return reply.status(400).send({ error: 'Missing required fields' })
  }
  if (!ageConfirmed || !termsAccepted) {
    return reply.status(400).send({ error: 'Must confirm age and accept terms' })
  }

  const id = 'IMA-' + Math.floor(1000 + Math.random() * 9000)
  mockUsers[email] = { email, password, id, role: 'creator' }

  return {
    success: true,
    registrationId: id,
    message: 'Registration submitted. Identity verification pending review.',
    nextStep: 'identity-verification',
  }
})

// ─── Auth ──────────────────────────────────────────────────────────────────
server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
  const { email, password } = req.body

  // Mock: accept any credentials for MVP demo
  const user = mockUsers[email] || { email, id: 'IMA-' + Math.floor(1000 + Math.random() * 9000), role: 'creator' as const }

  const token = server.jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: '7d' }
  )

  return {
    token,
    user: { id: user.id, email: user.email, role: user.role },
  }
})

server.post<{ Body: { email: string; password: string; role: 'creator' | 'buyer'; companyName?: string } }>('/api/auth/register', async (req, reply) => {
  const { email, password, role, companyName } = req.body

  if (!email || !password || !role) {
    return reply.status(400).send({ error: 'Missing required fields' })
  }

  const id = (role === 'buyer' ? 'BUY-' : 'IMA-') + Math.floor(1000 + Math.random() * 9000)
  mockUsers[email] = { email, password, id, role }

  const token = server.jwt.sign({ id, email, role }, { expiresIn: '7d' })

  return {
    success: true,
    token,
    user: { id, email, role, companyName },
  }
})

// ─── Licenses ──────────────────────────────────────────────────────────────
server.get('/api/licenses', async (req, reply) => {
  // In MVP, return mock licenses for demo
  return {
    licenses: [
      {
        id: 'LIC-0012',
        creatorId: '1',
        buyerId: 'BUY-1001',
        type: 'one-time',
        useCategory: 'advertising',
        mediaTypes: ['digital', 'social'],
        geography: 'united-states',
        duration: '90-days',
        volume: 5,
        price: 420,
        creatorPayout: 294,
        platformFee: 126,
        status: 'active',
        apiKey: 'sk_ima_4x8pq2r....',
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  }
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

  const creator = MOCK_CREATORS.find((c) => c.id === creatorId)
  if (!creator) {
    return reply.status(404).send({ error: 'Creator not found' })
  }

  // Price calculation (mirrors frontend PriceCalculator)
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

  const license = {
    id: licenseId,
    creatorId,
    licenseType,
    useCategory,
    mediaTypes,
    geography,
    duration,
    volume,
    price,
    creatorPayout: Math.round(price * 0.7),
    platformFee: Math.round(price * 0.3),
    status: 'escrow',
    apiKey,
    endpoint: 'https://api.imagency.io/v1/render',
    escrowReleasesAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  }

  return { success: true, license }
})

// ─── Dashboard Stats ────────────────────────────────────────────────────────
server.get('/api/dashboard/creator/stats', async () => {
  return {
    stats: {
      totalEarnings: 12400,
      thisMonth: 1200,
      pending: 2750,
      activeLicenses: 2,
      profileViewsThisWeek: 247,
      recentActivity: [
        { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), event: 'New license request from Brand Studio A' },
        { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), event: 'Payment received for LIC-0009 — $1,800' },
        { timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), event: 'Profile viewed by Studio Y' },
        { timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), event: 'Payout of $720 processed' },
      ],
    },
  }
})

server.get('/api/dashboard/buyer/stats', async () => {
  return {
    stats: {
      totalSpendThisMonth: 3528,
      activeLicenses: 2,
      apiCallsUsed: 166,
      apiCallsLimit: 700,
      licencesExpiringIn30Days: 0,
      recentActivity: [
        { timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), event: 'API render — LIC-0044 (18 calls)' },
        { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), event: 'License LIC-0039 payment processed' },
      ],
    },
  }
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
