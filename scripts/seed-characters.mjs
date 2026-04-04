#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.SUPABASE_URL) {
  console.error('Set SUPABASE_URL')
  process.exit(1)
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

function deriveAvailableUses(genreFit) {
  const uses = new Set(['Advertising'])
  for (const genre of genreFit) {
    if (['Corporate', 'Thriller', 'Drama', 'Documentary'].includes(genre)) {
      uses.add('Film & TV')
      uses.add('Advertising')
    }
    if (genre === 'Gaming') uses.add('Gaming')
    if (genre === 'AI Training') uses.add('AI Training')
  }
  // If nothing extra was added, include Streaming as default
  if (uses.size === 1) uses.add('Streaming')
  return Array.from(uses)
}

function deriveBaseLicenseFee(archetype) {
  const a = archetype.toLowerCase()
  if (a.includes('executive') || a.includes('professional')) return 500
  if (a.includes('creative') || a.includes('storyteller') || a.includes('passionate')) return 350
  return 300
}

const IDS = Array.from({ length: 10 }, (_, i) => `IMA-S${String(i + 1).padStart(3, '0')}`)

const rows = []
for (const id of IDS) {
  const profilePath = path.join(__dirname, '..', 'data', 'seed-characters', id, 'profile.json')
  const profile = JSON.parse(readFileSync(profilePath, 'utf-8'))

  const nameParts = profile.name.split(' ')
  const first_name = nameParts[0]
  const last_initial = nameParts.at(-1)[0]

  const available_uses = deriveAvailableUses(profile.genre_fit)
  const base_license_fee = deriveBaseLicenseFee(profile.archetype)

  rows.push({
    id: profile.id,
    name: profile.name,
    first_name,
    last_initial,
    age_range: profile.age_range,
    gender: profile.gender,
    ethnicity: profile.ethnicity,
    archetype: profile.archetype,
    personality: profile.personality,
    voice_description: profile.voice?.description ?? null,
    elevenlabs_voice_id: profile.voice?.elevenlabs_voice_id ?? null,
    suggested_roles: profile.suggested_roles,
    genre_fit: profile.genre_fit,
    available_uses,
    base_license_fee,
    image_neutral_url: `/assets/characters/${profile.id}/images/neutral.png`,
    image_smile_url: `/assets/characters/${profile.id}/images/smile.png`,
    image_serious_url: `/assets/characters/${profile.id}/images/serious.png`,
    image_three_quarter_url: `/assets/characters/${profile.id}/images/three-quarter.png`,
    image_profile_url: `/assets/characters/${profile.id}/images/profile.png`,
    voice_sample_url: `/assets/characters/${profile.id}/voice/voice-sample.mp3`,
    license_available: profile.license_available ?? true,
    generated_at: profile.generated_at ?? null,
  })
}

const { error } = await supabase.from('characters').upsert(rows, { onConflict: 'id' })
if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log('\nSeed complete! 10 characters upserted.\n')
const col = (s, w) => String(s).padEnd(w)
console.log(`${col('ID', 10)} | ${col('Name', 20)} | ${col('Archetype', 24)} | Available Uses`)
console.log('-'.repeat(90))
for (const row of rows) {
  console.log(`${col(row.id, 10)} | ${col(row.name, 20)} | ${col(row.archetype, 24)} | ${row.available_uses.join(', ')}`)
}
