#!/usr/bin/env node
/**
 * imagency Seed Character Generator
 * Generates reference images + voice samples for seed characters
 * Stack: Replicate (FLUX 1.1 Pro) + ElevenLabs (Voice Design)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHARACTERS = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-characters.json'), 'utf8'))

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN
const ELEVENLABS_KEY = process.env.ELEVENLABS_API_KEY
const OUTPUT_DIR = path.join(__dirname, '../data/seed-characters')

if (!REPLICATE_TOKEN || !ELEVENLABS_KEY) {
  console.error('Missing REPLICATE_API_TOKEN or ELEVENLABS_API_KEY')
  process.exit(1)
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ── Replicate FLUX image generation ──────────────────────────────────────────

async function generateImage(prompt, outputPath) {
  console.log(`  📸 Generating image...`)

  const res = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_TOKEN}`,
      'Content-Type': 'application/json',
      'Prefer': 'wait',
    },
    body: JSON.stringify({
      input: {
        prompt,
        aspect_ratio: '3:4',
        output_format: 'png',
        output_quality: 95,
        safety_tolerance: 2,
      }
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Replicate error: ${res.status} ${err}`)
  }

  const prediction = await res.json()

  // Poll if not done
  let result = prediction
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(r => setTimeout(r, 2000))
    const poll = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
      headers: { 'Authorization': `Bearer ${REPLICATE_TOKEN}` }
    })
    result = await poll.json()
  }

  if (result.status === 'failed') throw new Error(`Image gen failed: ${result.error}`)

  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output
  const imgRes = await fetch(imageUrl)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)
  console.log(`  ✅ Image saved: ${path.basename(outputPath)}`)
  return outputPath
}

// ── ElevenLabs Voice Design ───────────────────────────────────────────────────

async function generateVoice(character, outputDir) {
  console.log(`  🎙️ Generating voice...`)

  // Step 1: Create a voice preview using voice design
  const previewRes = await fetch('https://api.elevenlabs.io/v1/text-to-voice/create-previews', {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      voice_description: character.voice_description,
      text: `Hello, my name is ${character.name}. I'm here to bring your story to life. Whether it's a corporate narrative, a short film, or a commercial production — I'm ready when you are.`,
    })
  })

  if (!previewRes.ok) {
    const err = await previewRes.text()
    throw new Error(`ElevenLabs preview error: ${previewRes.status} ${err}`)
  }

  const previewData = await previewRes.json()
  const previews = previewData.previews || []

  if (!previews.length) throw new Error('No voice previews returned')

  // Save the first preview audio
  const audioBase64 = previews[0].audio_base_64
  const audioBuffer = Buffer.from(audioBase64, 'base64')
  const samplePath = path.join(outputDir, 'voice-sample.mp3')
  fs.writeFileSync(samplePath, audioBuffer)

  // Save the generated_voice_id for later use
  const voiceId = previews[0].generated_voice_id
  const voiceIdPath = path.join(outputDir, 'elevenlabs-voice-id.txt')
  fs.writeFileSync(voiceIdPath, voiceId)

  console.log(`  ✅ Voice saved: voice-sample.mp3 (ID: ${voiceId})`)
  return { samplePath, voiceId }
}

// ── Generate expression variants ─────────────────────────────────────────────

function buildExpressionPrompt(basePrompt, expression) {
  const expressionMap = {
    neutral: basePrompt,
    smile: basePrompt.replace('Professional headshot', 'Professional headshot, warm genuine smile'),
    serious: basePrompt.replace('Professional headshot', 'Professional headshot, serious focused expression'),
    'three-quarter': basePrompt.replace('direct eye contact', 'three-quarter angle, slight turn'),
    profile: basePrompt.replace('direct eye contact', 'side profile view'),
  }
  return expressionMap[expression] || basePrompt
}

// ── Character profile writer ──────────────────────────────────────────────────

function writeProfile(character, outputDir, voiceId) {
  const profile = {
    id: character.id,
    name: character.name,
    age_range: character.age_range,
    gender: character.gender,
    ethnicity: character.ethnicity,
    archetype: character.archetype,
    personality: character.personality,
    voice: {
      description: character.voice_description,
      elevenlabs_voice_id: voiceId || 'pending',
    },
    suggested_roles: character.suggested_roles,
    genre_fit: character.genre_fit,
    license_available: true,
    generated_at: new Date().toISOString(),
    asset_paths: {
      image_neutral: 'images/neutral.png',
      image_smile: 'images/smile.png',
      image_serious: 'images/serious.png',
      image_three_quarter: 'images/three-quarter.png',
      image_profile: 'images/profile.png',
      voice_sample: 'voice/voice-sample.mp3',
      voice_id_file: 'voice/elevenlabs-voice-id.txt',
    }
  }

  fs.writeFileSync(path.join(outputDir, 'profile.json'), JSON.stringify(profile, null, 2))

  // Simple text version
  const txt = `
CHARACTER PROFILE — ${character.name}
${'='.repeat(50)}
ID:           ${character.id}
Age Range:    ${character.age_range}
Gender:       ${character.gender}
Ethnicity:    ${character.ethnicity}
Archetype:    ${character.archetype}

PERSONALITY
${character.personality}

VOICE
${character.voice_description}

SUGGESTED ROLES
${character.suggested_roles.map(r => `  • ${r}`).join('\n')}

GENRE FIT
${character.genre_fit.map(g => `  • ${g}`).join('\n')}

USAGE GUIDE
This character kit includes:
  - 5 reference images (neutral, smile, serious, 3/4 angle, profile)
  - Voice sample (MP3) + ElevenLabs Voice ID for unlimited generation
  - This profile document (JSON + TXT)

To use in HeyGen: Upload the neutral.png as your avatar reference image.
To use in ElevenLabs: Enter the voice ID from elevenlabs-voice-id.txt.
To use in Runway/Kling: Use images as character reference for video generation.
  `.trim()

  fs.writeFileSync(path.join(outputDir, 'profile.txt'), txt)
  console.log(`  ✅ Profile written`)
}

// ── Main generation loop ──────────────────────────────────────────────────────

async function generateCharacter(character) {
  console.log(`\n🎭 Generating: ${character.name} (${character.id})`)
  console.log(`   ${character.archetype} | ${character.gender} | ${character.ethnicity}`)

  const charDir = path.join(OUTPUT_DIR, character.id)
  const imgDir = path.join(charDir, 'images')
  const voiceDir = path.join(charDir, 'voice')
  fs.mkdirSync(imgDir, { recursive: true })
  fs.mkdirSync(voiceDir, { recursive: true })

  const errors = []

  // Generate 5 image variants
  const expressions = ['neutral', 'smile', 'serious', 'three-quarter', 'profile']
  for (const expr of expressions) {
    try {
      const prompt = buildExpressionPrompt(character.image_prompt, expr)
      await generateImage(prompt, path.join(imgDir, `${expr}.png`))
      await new Promise(r => setTimeout(r, 500)) // small delay between requests
    } catch (e) {
      console.error(`  ⚠️ Image (${expr}) failed: ${e.message}`)
      errors.push(`image-${expr}: ${e.message}`)
    }
  }

  // Generate voice
  let voiceId = null
  try {
    const voiceResult = await generateVoice(character, voiceDir)
    voiceId = voiceResult.voiceId
  } catch (e) {
    console.error(`  ⚠️ Voice failed: ${e.message}`)
    errors.push(`voice: ${e.message}`)
  }

  // Write profile
  writeProfile(character, charDir, voiceId)

  // Write error log if any
  if (errors.length) {
    fs.writeFileSync(path.join(charDir, 'errors.log'), errors.join('\n'))
  }

  console.log(`  ✅ ${character.name} complete${errors.length ? ` (${errors.length} errors)` : ''}`)
  return { id: character.id, name: character.name, errors }
}

// ── Run ───────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const targetId = args[0] // optional: generate single character by ID

const toGenerate = targetId
  ? CHARACTERS.filter(c => c.id === targetId)
  : CHARACTERS

if (!toGenerate.length) {
  console.error(`No character found with id: ${targetId}`)
  process.exit(1)
}

console.log(`\n🎬 imagency Seed Generator`)
console.log(`   Generating ${toGenerate.length} character(s)...`)
console.log(`   Output: ${OUTPUT_DIR}\n`)

const results = []
for (const char of toGenerate) {
  const result = await generateCharacter(char)
  results.push(result)
  // Pause between characters to avoid rate limits
  if (toGenerate.length > 1) {
    console.log(`\n   ⏳ Pausing 3s before next character...`)
    await new Promise(r => setTimeout(r, 3000))
  }
}

console.log('\n\n📊 GENERATION SUMMARY')
console.log('='.repeat(40))
for (const r of results) {
  const status = r.errors.length ? `⚠️  ${r.errors.length} errors` : '✅ Complete'
  console.log(`${status}  ${r.id} — ${r.name}`)
}
console.log(`\nAssets saved to: ${OUTPUT_DIR}`)
