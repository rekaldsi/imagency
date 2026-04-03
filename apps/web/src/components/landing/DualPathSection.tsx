'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DualPathSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => { ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {/* Left: For Creators */}
        <div
          ref={leftRef}
          style={{
            backgroundColor: '#F5E9C8',
            padding: 'clamp(3.5rem, 7vw, 6rem) clamp(2rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '420px',
            opacity: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#8A6B1A',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem',
              }}
            >
              For Creators
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Turn your face into a revenue stream.
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Set your own terms and usage restrictions.',
                'Earn 70% of every license fee, automatically.',
                'Stay in full control — revoke access anytime.',
              ].map((point) => (
                <li
                  key={point}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.95rem',
                    color: '#3A2D10',
                    lineHeight: 1.55,
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#C9A84C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/creator/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: '2.5rem',
              padding: '0.9rem 2rem',
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              alignSelf: 'flex-start',
            }}
          >
            Register as a Creator
          </Link>
        </div>

        {/* Right: For Filmmakers */}
        <div
          ref={rightRef}
          style={{
            backgroundColor: '#1A1A1A',
            padding: 'clamp(3.5rem, 7vw, 6rem) clamp(2rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '420px',
            opacity: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'rgba(201,168,76,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem',
              }}
            >
              For Filmmakers &amp; Brands
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#FAFAF8',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              License real human presence for your project.
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Browse 2,400+ personas by look, voice, and archetype.',
                'Pay once per project scope. No callbacks, no agents.',
                'Download the synthetic kit and start immediately.',
              ].map((point) => (
                <li
                  key={point}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.95rem',
                    color: 'rgba(250,250,248,0.75)',
                    lineHeight: 1.55,
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#C9A84C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/buyer/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: '2.5rem',
              padding: '0.9rem 2rem',
              backgroundColor: 'transparent',
              color: '#FAFAF8',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '2px solid rgba(250,250,248,0.4)',
              letterSpacing: '-0.01em',
              alignSelf: 'flex-start',
            }}
          >
            Browse Talent
          </Link>
        </div>
      </div>
    </section>
  )
}
