import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const MOCK_PROFILES: Record<string, {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  gender: string
  skinTone: string
  hairColor: string
  eyeColor: string
  height: string
  build: string
  voiceType: string
  accent: string
  languages: string[]
  energyArchetype: string
  brandAlignment: string[]
  availableUses: string[]
  baseLicenseFee: number
  totalEarnings: number
  avatarSeed: number
  rating: number
  reviewCount: number
  bio: string
  photoSeeds: number[]
}> = {
  'IMA-1001': {
    id: 'IMA-1001',
    firstName: 'Marcus',
    lastInitial: 'T',
    ageRange: '30–39',
    gender: 'Male',
    skinTone: 'Deep Brown',
    hairColor: 'Black',
    eyeColor: 'Dark Brown',
    height: "6'1\"",
    build: 'Athletic',
    voiceType: 'Baritone',
    accent: 'American General',
    languages: ['English'],
    energyArchetype: 'Confident & Authoritative',
    brandAlignment: ['Luxury', 'Sports', 'Finance'],
    availableUses: ['Advertising', 'Film & TV', 'Streaming'],
    baseLicenseFee: 950,
    totalEarnings: 18400,
    avatarSeed: 12,
    rating: 4.9,
    reviewCount: 47,
    bio: 'Seasoned actor and model with 10 years of commercial experience. Known for conveying authority and warmth simultaneously. Ideal for premium brand narratives.',
    photoSeeds: [12, 13, 14, 15, 16, 17],
  },
}

const MOCK_REVIEWS = [
  { buyer: 'Brand Studio A', rating: 5, date: '2026-03-15', comment: 'Marcus delivered exactly what we needed for our finance campaign. Professional, versatile, and the AI outputs were remarkably accurate.' },
  { buyer: 'Creative Co. B', rating: 5, date: '2026-02-20', comment: 'Outstanding. Used for a luxury automotive campaign. The synthetic output was indistinguishable in quality.' },
  { buyer: 'Media House C', rating: 4, date: '2026-01-10', comment: 'Very impressed with the turnaround and quality. Would definitely license again for our streaming projects.' },
]

const LICENSE_OPTIONS = [
  { type: 'One-Time', from: 950, desc: 'Single project, defined scope', popular: false },
  { type: 'Subscription', from: 665, desc: 'Per month, ongoing access', popular: true },
  { type: 'Royalty', from: 475, desc: 'Lower upfront + revenue share', popular: false },
]

export default function BuyerProfilePage({ params }: { params: { id: string } }) {
  const profile = MOCK_PROFILES[params.id] || MOCK_PROFILES['IMA-1001']

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.8rem', color: '#8A8A8A', marginBottom: '1.5rem', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Link href="/buyer/search" style={{ color: '#C9A84C', textDecoration: 'none' }}>Browse Talent</Link>
          <span>›</span>
          <span>{profile.firstName} {profile.lastInitial}. — {profile.id}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Left column */}
          <div>
            {/* Photo gallery */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              {profile.photoSeeds.map((seed, i) => (
                <div
                  key={seed}
                  style={{
                    aspectRatio: i === 0 ? '1/1' : '3/4',
                    gridColumn: i === 0 ? 'span 1' : 'span 1',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#F4F3EF',
                  }}
                >
                  <img
                    src={`https://i.pravatar.cc/300?img=${seed}`}
                    alt={`${profile.firstName} ${profile.lastInitial}. — photo ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Voice preview */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A' }}>Voice preview</h3>
                <span
                  style={{
                    backgroundColor: '#E8D5A3',
                    color: '#A87B2E',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '20px',
                  }}
                >
                  PREVIEW ONLY — 15 seconds
                </span>
              </div>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#F4F3EF',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <button
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#C9A84C',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                  aria-label="Play voice preview"
                >
                  ▶
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '4px', backgroundColor: '#D1CEC7', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '0%', height: '100%', backgroundColor: '#C9A84C' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8A8A8A', marginTop: '4px' }}>
                    <span>0:00</span><span>0:15</span>
                  </div>
                </div>
                {/* Watermark overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'rgba(0,0,0,0.2)',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      transform: 'rotate(-20deg)',
                    }}
                  >
                    PREVIEW ONLY · IMAGENCY
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '0.5rem' }}>
                Full voice access provided upon license purchase.
              </p>
            </div>

            {/* Physical traits */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '1rem' }}>Physical traits</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {[
                  `${profile.ageRange}`,
                  profile.gender,
                  profile.skinTone,
                  `${profile.hairColor} hair`,
                  `${profile.eyeColor} eyes`,
                  profile.height,
                  profile.build,
                  profile.voiceType,
                  profile.accent,
                  ...profile.languages.map((l) => l),
                ].map((trait) => (
                  <span
                    key={trait}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#F4F3EF',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#4A4A4A',
                      border: '1px solid #E8E6E1',
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '0.75rem' }}>About</h3>
              <p style={{ fontSize: '0.9rem', color: '#4A4A4A', lineHeight: 1.7 }}>{profile.bio}</p>
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '0.775rem', color: '#8A8A8A', marginRight: '4px' }}>Brand alignment:</span>
                {profile.brandAlignment.map((b) => (
                  <span key={b} style={{ fontSize: '0.775rem', padding: '2px 8px', backgroundColor: '#E8D5A3', borderRadius: '20px', color: '#A87B2E' }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '1rem' }}>
                Reviews
                <span style={{ fontWeight: 400, color: '#8A8A8A', marginLeft: '8px', fontSize: '0.85rem' }}>
                  ★ {profile.rating} ({profile.reviewCount} reviews)
                </span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {MOCK_REVIEWS.map((r) => (
                  <div
                    key={r.date}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E6E1',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1A1A1A' }}>{r.buyer}</span>
                      <span style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>{r.date}</span>
                    </div>
                    <div style={{ color: '#C9A84C', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#4A4A4A', lineHeight: 1.6 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — sticky license CTA */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              {/* Creator identity */}
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F4F3EF' }}>
                <img
                  src={`https://i.pravatar.cc/60?img=${profile.avatarSeed}`}
                  alt={profile.firstName}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A' }}>
                    Creator #{profile.id}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>★ {profile.rating} · {profile.energyArchetype}</p>
                </div>
              </div>

              {/* License options */}
              <h4 style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A1A', marginBottom: '0.875rem' }}>License type</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
                {LICENSE_OPTIONS.map((opt) => (
                  <div
                    key={opt.type}
                    style={{
                      padding: '0.875rem 1rem',
                      border: `1px solid ${opt.popular ? '#C9A84C' : '#E8E6E1'}`,
                      borderRadius: '8px',
                      backgroundColor: opt.popular ? '#FEFDF7' : '#FAFAF8',
                      position: 'relative',
                    }}
                  >
                    {opt.popular && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '12px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          backgroundColor: '#C9A84C',
                          color: '#1A1A1A',
                          padding: '2px 8px',
                          borderRadius: '10px',
                        }}
                      >
                        POPULAR
                      </span>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1A1A1A' }}>{opt.type}</p>
                        <p style={{ fontSize: '0.75rem', color: '#8A8A8A' }}>{opt.desc}</p>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A' }}>from ${opt.from}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Permitted uses */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>Permitted uses</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {profile.availableUses.map((use) => (
                    <span
                      key={use}
                      style={{
                        fontSize: '0.75rem',
                        padding: '3px 10px',
                        backgroundColor: '#F4F3EF',
                        borderRadius: '20px',
                        color: '#4A4A4A',
                        border: '1px solid #E8E6E1',
                      }}
                    >
                      ✓ {use}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/buyer/license?creator=${profile.id}`}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: '#C9A84C',
                  color: '#1A1A1A',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                Request License →
              </Link>
              <p style={{ fontSize: '0.75rem', color: '#8A8A8A', textAlign: 'center' }}>
                Funds held 72h in escrow · Legally binding contract
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
