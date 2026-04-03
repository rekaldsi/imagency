'use client'
import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="20" height="14" rx="2" stroke="#C9A84C" strokeWidth="1.75"/>
        <path d="M9 12V8C9 5.24 11.24 3 14 3C16.76 3 19 5.24 19 8V12" stroke="#C9A84C" strokeWidth="1.75" strokeLinecap="round"/>
        <circle cx="14" cy="19" r="2" fill="#C9A84C"/>
      </svg>
    ),
    title: 'Biometric Vault',
    body: 'Raw photos and voice recordings never leave our encrypted S3 vaults. Source material is never accessible to buyers.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C9A84C" strokeWidth="1.75"/>
        <path d="M10 14C10 11.79 11.79 10 14 10C16.21 10 18 11.79 18 14" stroke="#C9A84C" strokeWidth="1.75" strokeLinecap="round"/>
        <path d="M7 22L21 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Synthetic Output Only',
    body: 'Buyers receive AI-generated representations — never your originals. The synthetic kit is what gets delivered, not your source files.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 7V14C5 18.97 8.97 23.44 14 24.5C19.03 23.44 23 18.97 23 14V7L14 3Z" stroke="#C9A84C" strokeWidth="1.75" strokeLinejoin="round"/>
        <path d="M10 14L12.5 16.5L18 11" stroke="#C9A84C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Legal Protection',
    body: 'Every license is backed by a binding contract with clear scope, territory, and enforcement terms. Disputes are handled with real legal weight.',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] } },
}

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FAFAF8',
        padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4rem)' }}
        >
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
            Trust & Safety
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#1A1A1A',
              letterSpacing: '-0.04em',
              marginBottom: '0.75rem',
            }}
          >
            Built on consent.<br />Protected by design.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#666',
              maxWidth: '440px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Your identity is an asset, not a liability. Here is how we protect it.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              style={{
                backgroundColor: '#FAFAF8',
                padding: 'clamp(2rem, 4vw, 2.75rem)',
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.6rem',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  lineHeight: 1.65,
                }}
              >
                {feature.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
