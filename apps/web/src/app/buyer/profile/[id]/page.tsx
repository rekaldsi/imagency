'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Mock Data (subset) ───────────────────────────────────────────────────────

interface MockCreator {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  age: number
  gender: string
  voiceType: string
  accent: string
  availableUses: string[]
  totalEarnings: number
  avatarSeed: number
  skinTone: number
  hairColor: string
  energyArchetype: string
}

const MOCK_CREATORS: MockCreator[] = [
  { id: '1', firstName: 'Maya', lastInitial: 'T', ageRange: '25–34', age: 29, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 3240, avatarSeed: 10, skinTone: 3, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '2', firstName: 'James', lastInitial: 'R', ageRange: '35–44', age: 38, gender: 'Male', voiceType: 'Baritone', accent: 'American Southern', availableUses: ['Gaming', 'Streaming'], totalEarnings: 1890, avatarSeed: 17, skinTone: 5, hairColor: 'Brown', energyArchetype: 'Authoritative' },
  { id: '3', firstName: 'Sofia', lastInitial: 'M', ageRange: '18–24', age: 22, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 5120, avatarSeed: 25, skinTone: 2, hairColor: 'Blonde', energyArchetype: 'Energetic' },
  { id: '4', firstName: 'DeShawn', lastInitial: 'K', ageRange: '25–34', age: 31, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 2750, avatarSeed: 33, skinTone: 6, hairColor: 'Black', energyArchetype: 'Playful' },
  { id: '5', firstName: 'Priya', lastInitial: 'S', ageRange: '28–38', age: 32, gender: 'Female', voiceType: 'Mezzo', accent: 'British RP', availableUses: ['Advertising', 'Gaming'], totalEarnings: 4100, avatarSeed: 48, skinTone: 4, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '6', firstName: 'Carlos', lastInitial: 'V', ageRange: '40–50', age: 44, gender: 'Male', voiceType: 'Bass', accent: 'American General', availableUses: ['Film & TV', 'Streaming'], totalEarnings: 6800, avatarSeed: 57, skinTone: 3, hairColor: 'Dark Brown', energyArchetype: 'Authoritative' },
  { id: '7', firstName: 'Aisha', lastInitial: 'N', ageRange: '25–34', age: 27, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 2300, avatarSeed: 15, skinTone: 6, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '8', firstName: 'Tyler', lastInitial: 'B', ageRange: '18–24', age: 21, gender: 'Male', voiceType: 'Tenor', accent: 'American Southern', availableUses: ['Gaming', 'Streaming'], totalEarnings: 980, avatarSeed: 21, skinTone: 2, hairColor: 'Brown', energyArchetype: 'Playful' },
  { id: '9', firstName: 'Mei', lastInitial: 'L', ageRange: '25–34', age: 28, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 3800, avatarSeed: 39, skinTone: 2, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '10', firstName: 'Marcus', lastInitial: 'D', ageRange: '35–44', age: 41, gender: 'Male', voiceType: 'Baritone', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 5500, avatarSeed: 44, skinTone: 5, hairColor: 'Black', energyArchetype: 'Authoritative' },
  { id: '11', firstName: 'Leila', lastInitial: 'H', ageRange: '30–40', age: 35, gender: 'Female', voiceType: 'Mezzo', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 4700, avatarSeed: 5, skinTone: 4, hairColor: 'Dark Brown', energyArchetype: 'Calm' },
  { id: '12', firstName: 'David', lastInitial: 'P', ageRange: '45–55', age: 49, gender: 'Male', voiceType: 'Bass', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 9200, avatarSeed: 60, skinTone: 2, hairColor: 'Gray', energyArchetype: 'Authoritative' },
  { id: '13', firstName: 'Jasmine', lastInitial: 'W', ageRange: '20–30', age: 24, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Streaming', 'Gaming'], totalEarnings: 1450, avatarSeed: 28, skinTone: 5, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '14', firstName: 'Roberto', lastInitial: 'G', ageRange: '30–40', age: 36, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 3100, avatarSeed: 35, skinTone: 3, hairColor: 'Dark Brown', energyArchetype: 'Playful' },
  { id: '15', firstName: 'Hannah', lastInitial: 'K', ageRange: '25–35', age: 30, gender: 'Female', voiceType: 'Soprano', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 5900, avatarSeed: 8, skinTone: 1, hairColor: 'Blonde', energyArchetype: 'Energetic' },
  { id: '16', firstName: 'Andre', lastInitial: 'T', ageRange: '20–30', age: 25, gender: 'Male', voiceType: 'Baritone', accent: 'American General', availableUses: ['Gaming', 'Film & TV'], totalEarnings: 1200, avatarSeed: 19, skinTone: 6, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '17', firstName: 'Yuki', lastInitial: 'A', ageRange: '25–35', age: 29, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming', 'Gaming'], totalEarnings: 2800, avatarSeed: 42, skinTone: 2, hairColor: 'Black', energyArchetype: 'Playful' },
  { id: '18', firstName: 'Kevin', lastInitial: 'M', ageRange: '35–45', age: 39, gender: 'Male', voiceType: 'Bass', accent: 'American Southern', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 7100, avatarSeed: 52, skinTone: 4, hairColor: 'Dark Brown', energyArchetype: 'Authoritative' },
  { id: '19', firstName: 'Fatima', lastInitial: 'O', ageRange: '25–35', age: 31, gender: 'Female', voiceType: 'Alto', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 4200, avatarSeed: 13, skinTone: 5, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '20', firstName: 'Ethan', lastInitial: 'C', ageRange: '18–28', age: 23, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Gaming', 'Streaming'], totalEarnings: 850, avatarSeed: 64, skinTone: 1, hairColor: 'Brown', energyArchetype: 'Playful' },
]

// ─── Fake Audio Player ────────────────────────────────────────────────────────

function FakeAudioPlayer() {
  return (
    <div className="bg-warm-cream border border-warm-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <button className="w-10 h-10 rounded-full bg-charcoal text-warm-white flex items-center justify-center flex-shrink-0 hover:bg-charcoal/80 transition-colors">
          <span className="text-sm ml-0.5">▶</span>
        </button>
        <div className="flex-1">
          <div className="h-2 bg-warm-border rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gold rounded-full" />
          </div>
        </div>
        <span className="text-xs text-charcoal-muted font-mono flex-shrink-0">0:00 / 0:15</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-charcoal-muted bg-warm-border px-2.5 py-1 rounded-full uppercase tracking-wider">
          Watermarked Preview — 15 seconds
        </span>
      </div>
      <p className="text-xs text-charcoal-muted mt-2">Full voice profile available after licensing</p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CreatorProfile() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const creator = MOCK_CREATORS.find((c) => c.id === id)

  if (!creator) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="text-5xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">Creator not found.</h1>
          <p className="text-charcoal-muted mb-8">This creator may have been removed or the ID is incorrect.</p>
          <Link href="/buyer/search" className="btn-primary px-8 py-3 rounded-full">
            ← Back to Search
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const imaId = `IMA-${1000 + Number(creator.id)}`

  // Generate a set of photo indices from the avatarSeed
  const photoSeeds = [
    creator.avatarSeed,
    (creator.avatarSeed + 3) % 70 || 1,
    (creator.avatarSeed + 7) % 70 || 2,
    (creator.avatarSeed + 11) % 70 || 3,
    (creator.avatarSeed + 17) % 70 || 4,
    (creator.avatarSeed + 23) % 70 || 5,
  ]

  const traits = [
    { label: 'Age', value: creator.ageRange },
    { label: 'Voice', value: creator.voiceType },
    { label: 'Accent', value: creator.accent },
    { label: 'Energy', value: creator.energyArchetype },
    { label: 'Hair', value: creator.hairColor },
    { label: 'Gender', value: creator.gender },
  ]

  const reviews = [
    { stars: 5, text: 'Seamless process. The synthetic output was remarkably on-brand. Will license again.', buyer: 'Brand Agency', name: 'Creative Director, Midwest brand' },
    { stars: 5, text: 'Used for a gaming character voice. Turnaround was fast and quality was excellent.', buyer: 'Game Studio', name: 'Lead Audio, Indie studio' },
    { stars: 4, text: 'Great energy for our campaign. Legal documentation was thorough — exactly what we needed.', buyer: 'Ad Agency', name: 'Producer, Digital Agency' },
  ]

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="px-6 pt-8 pb-20 max-w-7xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/buyer/search"
            className="inline-flex items-center gap-2 text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            <span>←</span>
            <span>Search results</span>
          </Link>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Photos + bio */}
          <div className="flex-1 min-w-0">
            {/* Main photo */}
            <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[3/2] md:aspect-[4/3]">
              <img
                src={`https://i.pravatar.cc/800?img=${photoSeeds[0]}`}
                alt="Creator preview"
                className="w-full h-full object-cover"
              />
              {/* Watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div
                  className="text-warm-white/25 font-bold text-4xl md:text-6xl tracking-widest rotate-[-20deg] whitespace-nowrap"
                  style={{ textShadow: '0 0 20px rgba(0,0,0,0.3)' }}
                >
                  PREVIEW ONLY
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-charcoal/80 text-warm-white text-xs font-semibold px-3 py-1.5 rounded-full">
                PREVIEW ONLY — Watermarked
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {photoSeeds.slice(1).map((seed, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/200?img=${seed}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-warm-white/30 text-xs font-bold rotate-[-15deg]">PREVIEW</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Physical traits */}
            <div className="mb-8">
              <h3 className="font-bold text-charcoal text-base mb-4">Physical &amp; Voice Traits</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {traits.map((trait) => (
                  <div key={trait.label} className="bg-warm-cream border border-warm-border rounded-xl px-4 py-2.5">
                    <div className="text-xs text-charcoal-muted uppercase tracking-wider font-semibold mb-0.5">{trait.label}</div>
                    <div className="text-sm font-semibold text-charcoal">{trait.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice preview */}
            <div className="mb-8">
              <h3 className="font-bold text-charcoal text-base mb-4">Voice Preview</h3>
              <FakeAudioPlayer />
            </div>
          </div>

          {/* Right: License panel (sticky) */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6 bg-white border border-warm-border rounded-2xl p-6 flex flex-col gap-5">
              {/* Creator ID + verified */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">Creator</div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                    <span>✓</span>
                    <span>Profile Verified</span>
                  </div>
                </div>
                <div className="font-bold text-charcoal text-xl">{imaId}</div>
                <div className="text-sm text-charcoal-muted mt-0.5">{creator.ageRange} · {creator.voiceType} · {creator.accent}</div>
              </div>

              {/* Available uses */}
              <div>
                <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Available For</div>
                <div className="flex flex-wrap gap-1.5">
                  {creator.availableUses.map((use) => (
                    <span key={use} className="text-xs font-medium text-charcoal bg-warm-cream border border-warm-border px-2.5 py-1 rounded-full">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-warm-border pt-4">
                <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-3">Pricing</div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">One-Time License</span>
                    <span className="font-semibold text-charcoal">from $500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">Subscription</span>
                    <span className="font-semibold text-charcoal">from $200/mo</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">Royalty-Based</span>
                    <span className="font-semibold text-charcoal">from 5%</span>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push(`/buyer/license?creator=${creator.id}`)}
                  className="btn-primary w-full rounded-xl"
                >
                  Request License
                </button>
                <button className="btn-secondary w-full rounded-xl">
                  Add to Shortlist
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col gap-2 pt-1 border-t border-warm-border">
                {['Consent Verified', 'ID Verified', 'Legally Protected'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs text-charcoal-muted">
                    <span className="text-green-500 font-bold">✓</span>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-charcoal mb-6">Buyer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="card flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={`text-sm ${s < review.stars ? 'text-gold' : 'text-warm-border'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-charcoal-muted bg-warm-cream px-2.5 py-1 rounded-full">
                    {review.buyer}
                  </span>
                </div>
                <p className="text-charcoal text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="text-xs text-charcoal-muted">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
