import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1A1A1A',
        color: '#8A8A8A',
        padding: '3rem 0 2rem',
        marginTop: 'auto',
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#C9A84C',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#1A1A1A',
                }}
              >
                I
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#FAFAF8', letterSpacing: '-0.02em' }}>
                imagency
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#6A6A6A' }}>
              The consent-first likeness rights platform. Register, set terms, earn royalties.
            </p>
          </div>

          {/* Creators */}
          <div>
            <h4 style={{ color: '#FAFAF8', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Creators
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['How It Works', 'Earnings Calculator', 'Register Your Likeness', 'Creator Dashboard'].map((item) => (
                <li key={item}>
                  <Link href="/creator" style={{ fontSize: '0.875rem', color: '#6A6A6A', textDecoration: 'none' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers */}
          <div>
            <h4 style={{ color: '#FAFAF8', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Buyers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Browse Talent', 'License Types', 'Create Account', 'Buyer Dashboard'].map((item) => (
                <li key={item}>
                  <Link href="/buyer" style={{ fontSize: '0.875rem', color: '#6A6A6A', textDecoration: 'none' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: '#FAFAF8', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Privacy Policy', 'Terms of Service', 'BIPA Compliance', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link href="/legal" style={{ fontSize: '0.875rem', color: '#6A6A6A', textDecoration: 'none' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #2A2A2A',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: '#6A6A6A' }}>
            © 2026 Imagency, Inc. All rights reserved. Raw biometric data never leaves our encrypted vaults.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
            Consent-first · BIPA-compliant · Creator-owned
          </p>
        </div>
      </div>
    </footer>
  )
}
