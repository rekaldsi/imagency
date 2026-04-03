'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '2,400+', label: 'Creators registered' },
  { num: '70%', label: 'Revenue to creators' },
  { num: '$0', label: 'Raw data sold' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 })
      gsap.fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.25 })
      gsap.fromTo(taglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 })
      gsap.fromTo(ctasRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.7 })
      gsap.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.9 })

      // Scroll-driven: headline words drift apart
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        gsap.to(words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          opacity: 0,
          y: (i) => (i % 2 === 0 ? -50 : 50),
          x: (i) => (i % 3 === 0 ? -30 : i % 3 === 1 ? 30 : 0),
          stagger: 0.05,
          ease: 'none',
        })
      }
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => { ctx.revert() }
  }, [])

  const wrapWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>
        {word}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grain texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* Subtle gold radial tint */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            padding: '0.4rem 1rem',
            border: '1px solid rgba(201,168,76,0.5)',
            backgroundColor: 'rgba(201,168,76,0.07)',
            opacity: 0,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#C9A84C',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#C9A84C',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Consent-First Licensing
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            color: '#1A1A1A',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1.25rem',
            opacity: 0,
          }}
        >
          {wrapWords('Your image. Your agency.')}<br />
          <span style={{ color: '#C9A84C' }}>
            {wrapWords('Your revenue.')}
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: '#666',
            lineHeight: 1.65,
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0,
          }}
        >
          The consent-first marketplace where your likeness earns for you.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctasRef}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.5rem',
            opacity: 0,
          }}
        >
          <Link
            href="/buyer/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.9rem 2.25rem',
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Browse Personas
          </Link>
          <Link
            href="/creator/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.9rem 2.25rem',
              backgroundColor: 'transparent',
              color: '#1A1A1A',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '2px solid #1A1A1A',
              letterSpacing: '-0.01em',
            }}
          >
            List Your Likeness
          </Link>
        </div>

        {/* Stat bar */}
        <div
          ref={statsRef}
          style={{
            marginTop: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '0 1rem' }}>
                <div
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#1A1A1A',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#888',
                    marginTop: '4px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </div>
              {i < STATS.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    height: '44px',
                    backgroundColor: 'rgba(0,0,0,0.12)',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, #1A1A1A)',
          }}
        />
      </div>
    </section>
  )
}
