#!/usr/bin/env node
/**
 * Generate voice samples for seed characters using pre-built ElevenLabs voices
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHARACTERS = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-characters.json'), 'utf8'))
const VOICE_MAP = JSON.parse(fs.readFileSync(path.join(__dirname, 'voice-map.json'), 'utf8'))
const OUTPUT_DIR = path.join(__dirname, '../data/seed-characters')
const ELEVENLABS_KEY = process.env.ELEVENLABS_API_KEY

const SAMPLE_SCRIPTS = {
  'IMA-S001': "My name is Marcus Webb. I bring clarity to complex decisions and confidence to every room I walk into. When you need someone who commands attention and earns trust — that's what I do.",
  'IMA-S002': "Hi, I'm Sofia. Whether I'm guiding your team through a training, representing your brand, or carrying a scene — I show up prepared, warm, and ready to connect.",
  'IMA-S003': "I am James Okafor. Over the course of a life, you learn that the most powerful thing you can offer is your full presence. I bring that to every role, every narration, every story.",
  'IMA-S004': "Aisha Park. I think faster than I talk, but when I do speak, it counts. Give me a complex problem, a difficult scene, a technical narrative — I'll make it land.",
  'IMA-S005': "Hey, I'm Dex. I don't really try to be the most interesting person in the room — it just kind of happens. Put me in your story and I promise, your audience will follow.",
  'IMA-S006': "I am Priya Nair. Elegance is not about appearance — it is about intention. Every word I speak carries weight, every presence I bring carries purpose.",
  'IMA-S007': "Tobias Gruner. Precision matters. In engineering, in communication, in performance. I deliver exactly what is needed — nothing more, nothing less.",
  'IMA-S008': "I'm Riley. I don't fit in one box and I don't try to. Creative work lives at the edges, and that's where I'm most comfortable. Let's make something that hasn't been made before.",
  'IMA-S009': "My name is Grace Oduya. I have lived enough to know what matters and what doesn't. When I speak, I speak from that place — and people feel the difference.",
  'IMA-S010': "Ciao, I am Luca. Every story deserves to be told with passion, with color, with life. I will bring your words to life in a way that your audience will not forget."
}

async function generateVoiceSample(charId, voiceId, script, outputPath) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: script,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true,
      }
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`ElevenLabs TTS error: ${res.status} ${err.slice(0, 200)}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)
  return outputPath
}

const args = process.argv.slice(2)
const targetId = args[0]
const toProcess = targetId ? CHARACTERS.filter(c => c.id === targetId) : CHARACTERS

console.log(`\n🎙️ imagency Voice Generator`)
console.log(`   Processing ${toProcess.length} character(s)...\n`)

for (const char of toProcess) {
  const voiceConfig = VOICE_MAP[char.id]
  if (!voiceConfig) { console.log(`⚠️  No voice mapping for ${char.id}`); continue }

  const voiceDir = path.join(OUTPUT_DIR, char.id, 'voice')
  fs.mkdirSync(voiceDir, { recursive: true })

  const script = SAMPLE_SCRIPTS[char.id] || `Hello, I am ${char.name}. I am ready for your production.`

  try {
    console.log(`🎭 ${char.name} → ${voiceConfig.voice_name}`)
    await generateVoiceSample(char.id, voiceConfig.voice_id, script, path.join(voiceDir, 'voice-sample.mp3'))

    // Save voice ID for buyer use
    fs.writeFileSync(path.join(voiceDir, 'elevenlabs-voice-id.txt'), voiceConfig.voice_id)
    fs.writeFileSync(path.join(voiceDir, 'voice-info.json'), JSON.stringify(voiceConfig, null, 2))

    console.log(`   ✅ voice-sample.mp3 saved`)
    await new Promise(r => setTimeout(r, 500))
  } catch (e) {
    console.error(`   ❌ Failed: ${e.message}`)
  }
}

console.log('\n✅ Voice generation complete')
