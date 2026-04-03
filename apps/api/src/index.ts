import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { config } from 'dotenv'

config()

const server = Fastify({ logger: true })

// Plugins
server.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3010',
  credentials: true,
})

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'persona-dev-secret-change-in-prod',
})

server.register(multipart, {
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for capture uploads
})

// Health check
server.get('/health', async () => {
  return { status: 'ok', service: 'persona-api', version: '0.1.0' }
})

// Routes (MVP)
server.get('/api/creators', async (req, reply) => {
  return { creators: [], message: 'Creator search — coming soon' }
})

server.post('/api/creators/register', async (req, reply) => {
  return { message: 'Registration flow — coming soon' }
})

server.get('/api/licenses', async (req, reply) => {
  return { licenses: [], message: 'License management — coming soon' }
})

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3011')
    await server.listen({ port, host: '0.0.0.0' })
    console.log(`Persona API running on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
