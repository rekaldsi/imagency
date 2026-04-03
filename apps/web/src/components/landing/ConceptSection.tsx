'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.concept-panel')
      if (!trackRef.current || panels.length === 0) return

      // Horizontal scroll driven by vertical scroll
      const horizontalTween = gsap.to(trackRef.current, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${window.innerWidth * (panels.length - 1)}`,
        },
      })

      // Panel 1: blur circle sharpens on scroll
      const circle1 = sectionRef.current?.querySelector('.concept-circle-1') as HTMLElement | null
      if (circle1) {
        gsap.fromTo(
          circle1,
          { filter: 'blur(40px)', scale: 0.7, opacity: 0.3 },
          {
            filter: 'blur(0px)',
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )
      }

      // Panel 2: waveform paths scale up
      const wavePaths = sectionRef.current?.querySelectorAll<SVGRectElement>('.waveform-path') ?? []
      if (wavePaths.length > 0) {
        gsap.fromTo(
          Array.from(wavePaths),
          { scaleY: 0.1, opacity: 0.2 },
          {
            scaleY: 1,
            opacity: 1,
            ease: 'none',
            stagger: 0.02,
            scrollTrigger: {
              trigger: sectionRef.current,
              containerAnimation: horizontalTween,
              start: '33% center',
              end: '66% center',
              scrub: true,
            },
          }
        )
      }

      // Panel 3: bio elements float in
      const bioEls = sectionRef.current?.querySelectorAll<HTMLElement>('.bio-card') ?? []
      if (bioEls.length > 0) {
        gsap.fromTo(
          Array.from(bioEls),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              containerAnimation: horizontalTween,
              start: '66% center',
              end: '90% center',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  const waveHeights = [20, 40, 60, 80, 55, 90, 45, 70, 35, 85, 50, 65, 30, 75, 48, 88, 42, 68, 38, 78]

  return (
    <section
      ref={sectionRef}
      style={{
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: `300vw`,
          height: '100vh',
        }}
      >
        {/* Panel 1: You need a face. */}
        <div
          className="concept-panel"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            backgroundColor: '#080808',
          }}
        >
          <div
            className="concept-circle-1"
            style={{
              width: 'clamp(160px, 25vw, 320px)',
              height: 'clamp(160px, 25vw, 320px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #7C3AED 0%, #4C1D95 60%, #1a0533 100%)',
              marginBottom: '3rem',
              filter: 'blur(40px)',
              opacity: 0.3,
            }}
          />
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.05em',
              textAlign: 'center',
            }}
          >
            You need a face.
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginTop: '1rem' }}>
            Find it here.
          </p>
        </div>

        {/* Panel 2: You need a voice. */}
        <div
          className="concept-panel"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            backgroundColor: '#0a060f',
          }}
        >
          <svg
            width="600"
            height="120"
            viewBox="0 0 600 120"
            style={{ marginBottom: '3rem', maxWidth: '80vw' }}
          >
            {waveHeights.map((h, i) => (
              <rect
                key={i}
                className="waveform-path"
                x={i * 30 + 5}
                y={(120 - h) / 2}
                width="20"
                height={h}
                rx="4"
                fill="#7C3AED"
                opacity="0.9"
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />
            ))}
          </svg>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.05em',
              textAlign: 'center',
            }}
          >
            You need a voice.
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginTop: '1rem' }}>
            Hear it before you license it.
          </p>
        </div>

        {/* Panel 3: You need a story. */}
        <div
          className="concept-panel"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            backgroundColor: '#08080f',
          }}
        >
          {/* Floating bio cards */}
          <div style={{ position: 'relative', width: '320px', height: '240px', marginBottom: '3rem' }}>
            {[
              { label: 'Archetype', value: 'Wise & Trustworthy', top: '0', left: '0' },
              { label: 'Voice', value: 'Deep Baritone', top: '60px', left: '80px' },
              { label: 'Age Range', value: '40–49', top: '130px', left: '20px' },
            ].map((card) => (
              <div
                key={card.label}
                className="bio-card"
                style={{
                  position: 'absolute',
                  top: card.top,
                  left: card.left,
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(124,58,237,0.3)',
                  padding: '0.75rem 1.25rem',
                  minWidth: '180px',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 600, marginTop: '2px' }}>
                  {card.value}
                </div>
              </div>
            ))}
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.05em',
              textAlign: 'center',
            }}
          >
            You need a story.
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginTop: '1rem' }}>
            Every persona comes fully documented.
          </p>
        </div>
      </div>
    </section>
  )
}
