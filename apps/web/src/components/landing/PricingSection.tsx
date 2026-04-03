'use client'
import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import Link from 'next/link'

const TIERS = [
  {
    name: 'Scene Extra',
    range: '$29 – $149',
    featured: false,
    bullets: [
      'Single scene, one project',
      '30-day license window',
      'Synthetic image output only',
      'Non-commercial or low-reach use',
    ],
    cta: 'Get started',
    href: '/buyer/search',
  },
  {
    name: 'Supporting Role',
    range: '$299 – $799',
    featured: true,
    bullets: [
      'Multiple scenes, one project',
      '90-day license window',
      'Image + voice synthetic output',
      'Streaming and broadcast included',
    ],
    cta: 'Most popular',
    href: '/buyer/search',
  },
  {
    name: 'Lead Character',
    range: '$999 – $4,999',
    featured: false,
    bullets: [
      'Unlimited scenes, full commercial use',
      '1-year license window',
      'All output formats included',
      'Priority creator availability',
    ],
    cta: 'Contact us',
    href: '/buyer/search',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] } },
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] } },
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#F4F2EE',
        padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headingVariants}
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
            Licensing Tiers
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
            Simple, transparent pricing
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#666',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Pay once per project scope. No subscriptions, no hidden fees.
          </p>
        </motion.div>

        {/* Tier grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              style={{
                backgroundColor: '#FFFFFF',
                border: tier.featured ? '2px solid #C9A84C' : '1px solid rgba(0,0,0,0.08)',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                position: 'relative',
                boxShadow: tier.featured
                  ? '0 8px 32px rgba(201,168,76,0.15)'
                  : '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              {tier.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#C9A84C',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.875rem',
                  }}
                >
                  Recommended
                </div>
              )}

              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: tier.featured ? '#C9A84C' : '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  marginTop: tier.featured ? '0.75rem' : '0',
                }}
              >
                {tier.name}
              </div>

              <div
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#1A1A1A',
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                }}
              >
                {tier.range}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {tier.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      color: '#555',
                      lineHeight: 1.5,
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: tier.featured ? '#C9A84C' : 'rgba(0,0,0,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                        <path d="M1 2.5L2.8 4.2L6 1" stroke={tier.featured ? '#fff' : '#666'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.8rem 1.5rem',
                  backgroundColor: tier.featured ? '#C9A84C' : 'transparent',
                  color: tier.featured ? '#FFFFFF' : '#1A1A1A',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  border: tier.featured ? 'none' : '2px solid #1A1A1A',
                  letterSpacing: '-0.01em',
                  boxSizing: 'border-box',
                }}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: '#999',
          }}
        >
          All prices are per-project. Creator earns 70% of every license fee.
        </motion.p>
      </div>
    </section>
  )
}
