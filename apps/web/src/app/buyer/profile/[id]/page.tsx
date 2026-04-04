'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'

const MOCK_REVIEWS = [
  { buyer: 'Brand Studio A', rating: 5, date: '2026-03-15', comment: 'Delivered exactly what we needed. Professional, versatile, and the AI outputs were remarkably accurate.' },
  { buyer: 'Creative Co. B', rating: 5, date: '2026-02-20', comment: 'Outstanding. Used for a luxury campaign. The synthetic output was indistinguishable in quality.' },
  { buyer: 'Media House C', rating: 4, date: '2026-01-10', comment: 'Very impressed with the turnaround and quality. Would definitely license again.' },
]

const LICENSE_OPTIONS = [
  { type: 'One-Time', from: 950, desc: 'Single project, defined scope', popular: false },
  { type: 'Subscription', from: 665, desc: 'Per month, ongoing access', popular: true },
  { type: 'Royalty', from: 475, desc: 'Lower upfront + revenue share', popular: false },
]

interface ProfileData {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  gender: string
  voiceType: string
  accent: string
  energyArchetype: string
  availableUses: string[]
  baseLicenseFee: number
  totalEarnings: number
  avatarSeed: number
  imageProfileUrl?: string
  imageNeutralUrl?: string
  imageSmileUrl?: string
  imageSeriousUrl?: string
  imageThreeQuarterUrl?: string
  voiceSampleUrl?: string
  personality?: string
  suggestedRoles?: string[]
  genreFit?: string[]
  ethnicity?: string
}

export default function BuyerProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`${API_URL}/api/creators/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true)
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (data?.creator) {
          setProfile(data.creator as ProfileData)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#8A8A8A', fontSize: '1rem' }}>Loading profile...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !profile) {
    return (
      <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <p style={{ color: '#1A1A1A', fontSize: '1.5rem', fontWeight: 700 }}>Creator not found</p>
          <Link href="/buyer/search" style={{ color: '#C9A84C', fontSize: '0.95rem' }}>Back to Browse Talent</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const photos = [
    profile.imageNeutralUrl,
    profile.imageSmileUrl,
    profile.imageSeriousUrl,
    profile.imageThreeQuarterUrl,
    profile.imageProfileUrl,
  ].filter(Boolean) as string[]

  // Fall back to pravatar placeholders if no real images
  const photoUrls = photos.length > 0
    ? photos.slice(0, 6)
    : Array.from({ length: 6 }, (_, i) => `https://i.pravatar.cc/300?img=${(profile.avatarSeed || 1) + i}`)

  const avatarUrl = profile.imageProfileUrl || `https://i.pravatar.cc/60?img=${profile.avatarSeed || 1}`

  const baseFee = profile.baseLicenseFee || 300
  const licenseOptions = [
    { type: 'One-Time', from: baseFee, desc: 'Single project, defined scope', popular: false },
    { type: 'Subscription', from: Math.round(baseFee * 0.7), desc: 'Per month, ongoing access', popular: true },
    { type: 'Royalty', from: Math.round(baseFee * 0.5), desc: 'Lower upfront + revenue share', popular: false },
  ]

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
              {photoUrls.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: i === 0 ? '1/1' : '3/4',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#F4F3EF',
                  }}
                >
                  <img
                    src={url}
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
                {profile.voiceSampleUrl ? (
                  <audio controls style={{ width: '100%' }} preload="none">
                    <source src={profile.voiceSampleUrl} type="audio/mpeg" />
                  </audio>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '0.5rem' }}>
                Full voice access provided upon license purchase.
              </p>
            </div>

            {/* Traits */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '1rem' }}>Profile traits</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {[
                  profile.ageRange,
                  profile.gender,
                  profile.ethnicity,
                  profile.voiceType,
                  profile.accent,
                ].filter(Boolean).map((trait) => (
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

            {/* Bio / Personality */}
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
              <p style={{ fontSize: '0.9rem', color: '#4A4A4A', lineHeight: 1.7 }}>
                {profile.personality || `${profile.energyArchetype} — synthetic AI talent available for licensing.`}
              </p>
              {profile.suggestedRoles && profile.suggestedRoles.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '0.775rem', color: '#8A8A8A', marginRight: '4px' }}>Ideal for:</span>
                  {profile.suggestedRoles.map((r) => (
                    <span key={r} style={{ fontSize: '0.775rem', padding: '2px 8px', backgroundColor: '#E8D5A3', borderRadius: '20px', color: '#A87B2E' }}>
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '1rem' }}>
                Reviews
                <span style={{ fontWeight: 400, color: '#8A8A8A', marginLeft: '8px', fontSize: '0.85rem' }}>
                  ★ 4.9 (47 reviews)
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
                  src={avatarUrl}
                  alt={profile.firstName}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A' }}>
                    {profile.firstName} {profile.lastInitial}.
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>★ 4.9 · {profile.energyArchetype}</p>
                </div>
              </div>

              {/* License options */}
              <h4 style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A1A', marginBottom: '0.875rem' }}>License type</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
                {licenseOptions.map((opt) => (
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
