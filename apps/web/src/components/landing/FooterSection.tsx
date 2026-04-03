'use client'
import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer
      style={{
        backgroundColor: '#F0EDE7',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontSize: '0.85rem',
            color: '#888',
            letterSpacing: '0.02em',
          }}
        >
          imagency.io &nbsp;|&nbsp; &copy; 2025
        </div>

        <nav
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Creator Portal', href: '/creator/register' },
            { label: 'Buyer Portal', href: '/buyer' },
            { label: 'Legal', href: '/legal' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.8rem',
                color: '#888',
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
