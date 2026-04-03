'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURED_CREATORS = [
  { id: 'IMA-1001', firstName: 'Marcus', lastInitial: 'T', ageRange: '30–39', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 18400, avatarSeed: 12, energyArchetype: 'Confident & Authoritative' },
  { id: 'IMA-1002', firstName: 'Sofia', lastInitial: 'R', ageRange: '25–29', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Streaming'], totalEarnings: 12600, avatarSeed: 5, energyArchetype: 'Warm & Approachable' },
  { id: 'IMA-1003', firstName: 'James', lastInitial: 'O', ageRange: '40–49', voiceType: 'Bass', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 31200, avatarSeed: 33, energyArchetype: 'Wise & Trustworthy' },
  { id: 'IMA-1006', firstName: 'Aisha', lastInitial: 'P', ageRange: '30–39', voiceType: 'Alto', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 22100, avatarSeed: 9, energyArchetype: 'Sophisticated & Elegant' },
  { id: 'IMA-1011', firstName: 'Andre', lastInitial: 'D', ageRange: '35–39', voiceType: 'Tenor', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 34600, avatarSeed: 60, energyArchetype: 'Charismatic & Romantic' },
  { id: 'IMA-1016', firstName: 'Priya', lastInitial: 'S', ageRange: '25–29', voiceType: 'Soprano', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 9800, avatarSeed: 19, energyArchetype: 'Joyful & Vibrant' },
]

const avatarColors = ['#1A1A1A', '#3D3427', '#2C2C2C', '#1C1C18', '#2A2018', '#1A1A1A']

function PersonaCard({ creator, index }: { creator: typeof FEATURED_CREATORS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const waveRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!waveRef.current) return
    const bars = waveRef.current.querySelectorAll('rect')
    if (hovered) {
      gsap.to(bars, {
        scaleY: () => 0.3 + Math.random() * 0.7,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    } else {
      gsap.killTweensOf(bars)
      gsap.to(bars, { scaleY: 0.15, duration: 0.2, ease: 'power1.out' })
    }
  }, [hovered])

  const initials = `${creator.firstName[0]}${creator.lastInitial}`

  return (
    /* GSAP animates this wrapper's opacity + y */
    <div
      className="persona-card"
      data-index={index}
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      {/* Link handles hover transform independently */}
      <Link
        href={`/buyer/persona/${creator.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.08)',
          borderTop: '3px solid #C9A84C',
          padding: '1.5rem',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: avatarColors[index % avatarColors.length],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          {initials}
        </div>

        {/* Archetype */}
        <div
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            fontStyle: 'italic',
            color: '#C9A84C',
            marginBottom: '0.35rem',
            lineHeight: 1.3,
          }}
        >
          {creator.energyArchetype}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            marginBottom: '0.2rem',
          }}
        >
          {creator.firstName} {creator.lastInitial}.
        </div>

        {/* Voice type */}
        <div
          style={{
            fontSize: '0.8rem',
            color: '#888',
            marginBottom: '1rem',
          }}
        >
          {creator.voiceType} · {creator.ageRange}
        </div>

        {/* Available badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#4CAF50',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Available for licensing
          </span>
        </div>

        {/* Animated waveform */}
        <svg
          ref={waveRef}
          width="100%"
          height="24"
          viewBox="0 0 200 24"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <rect
              key={i}
              x={i * 10 + 2}
              y="10"
              width="6"
              height="4"
              rx="2"
              fill="#C9A84C"
              opacity="0.5"
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            />
          ))}
        </svg>
      </Link>
    </div>
  )
}

export default function FeaturedPersonasSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.persona-card')
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: { amount: 0.6, from: 'start' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => { ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FAFAF8',
        padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#C9A84C',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Featured Talent
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: '-0.04em',
                marginBottom: '0.5rem',
              }}
            >
              Featured personas
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#888' }}>
              2,400+ creators already earning from their likeness
            </p>
          </div>
          <Link
            href="/buyer/search"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#1A1A1A',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              borderBottom: '1px solid #1A1A1A',
              paddingBottom: '2px',
            }}
          >
            Browse all talent →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {FEATURED_CREATORS.map((creator, i) => (
            <PersonaCard key={creator.id} creator={creator} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
