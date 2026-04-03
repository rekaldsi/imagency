'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    label: 'Browse',
    desc: 'Search by look, voice, age range, and archetype. Filter by use case and budget.',
    side: 'left',
  },
  {
    number: '02',
    label: 'License',
    desc: 'Choose your project scope. Pay once. Get a binding contract instantly.',
    side: 'right',
  },
  {
    number: '03',
    label: 'Create',
    desc: 'Download the synthetic kit. Start your project. Creator earns automatically.',
    side: 'left',
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.hiw-step')
      items.forEach((item) => {
        const fromLeft = item.dataset.side === 'left'
        gsap.fromTo(
          item,
          { x: fromLeft ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      const line = document.querySelector('.hiw-line') as HTMLElement
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        )
      }
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
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#C9A84C',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            The Process
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#1A1A1A',
              letterSpacing: '-0.04em',
            }}
          >
            How it works
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(0,0,0,0.08)',
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className="hiw-line"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#C9A84C',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)' }}>
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="hiw-step"
                data-side={step.side}
                style={{
                  display: 'flex',
                  flexDirection: step.side === 'left' ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '2rem',
                  opacity: 0,
                }}
              >
                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    textAlign: step.side === 'left' ? 'right' : 'left',
                    paddingRight: step.side === 'left' ? '2rem' : '0',
                    paddingLeft: step.side === 'right' ? '2rem' : '0',
                  }}
                >
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
                    Step {step.number}
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      fontWeight: 800,
                      color: '#1A1A1A',
                      letterSpacing: '-0.03em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.label}
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                      color: '#666',
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#C9A84C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    zIndex: 1,
                    boxShadow: '0 0 0 4px #FAFAF8, 0 0 0 5px rgba(201,168,76,0.3)',
                  }}
                >
                  {step.number}
                </div>

                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
