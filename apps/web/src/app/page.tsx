import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CreatorCard from '@/components/CreatorCard'

const FEATURED_CREATORS = [
  { id: 'IMA-1001', firstName: 'Marcus', lastInitial: 'T', ageRange: '30–39', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 18400, avatarSeed: 12, energyArchetype: 'Confident & Authoritative' },
  { id: 'IMA-1002', firstName: 'Sofia', lastInitial: 'R', ageRange: '25–29', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Streaming'], totalEarnings: 12600, avatarSeed: 5, energyArchetype: 'Warm & Approachable' },
  { id: 'IMA-1003', firstName: 'James', lastInitial: 'O', ageRange: '40–49', voiceType: 'Bass', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 31200, avatarSeed: 33, energyArchetype: 'Wise & Trustworthy' },
  { id: 'IMA-1006', firstName: 'Aisha', lastInitial: 'P', ageRange: '30–39', voiceType: 'Alto', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 22100, avatarSeed: 9, energyArchetype: 'Sophisticated & Elegant' },
  { id: 'IMA-1011', firstName: 'Andre', lastInitial: 'D', ageRange: '35–39', voiceType: 'Tenor', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 34600, avatarSeed: 60, energyArchetype: 'Charismatic & Romantic' },
  { id: 'IMA-1016', firstName: 'Priya', lastInitial: 'S', ageRange: '25–29', voiceType: 'Soprano', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 9800, avatarSeed: 19, energyArchetype: 'Joyful & Vibrant' },
]

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          padding: '5rem 1.5rem 4rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#E8D5A3',
              color: '#A87B2E',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '4px 14px',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Consent-first likeness rights
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            Your image.{' '}
            <span style={{ color: '#C9A84C' }}>Your agency.</span>
            <br />
            Your revenue.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#4A4A4A',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '560px',
              margin: '0 auto 2.5rem',
            }}
          >
            Register your likeness, set your terms, and earn royalties every time a brand
            or studio uses an AI-generated representation of you.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/creator/register"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.875rem 2rem',
                backgroundColor: '#C9A84C',
                color: '#1A1A1A',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Register Your Likeness →
            </Link>
            <Link
              href="/buyer/search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.875rem 2rem',
                backgroundColor: 'transparent',
                color: '#1A1A1A',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '2px solid #D1CEC7',
              }}
            >
              Browse Talent
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { num: '2,400+', label: 'Creators registered' },
              { num: '70%', label: 'Revenue to creators' },
              { num: '$0', label: 'Raw data shared' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1A1A1A' }}>{s.num}</div>
                <div style={{ fontSize: '0.8rem', color: '#8A8A8A', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.75rem' }}>
              How it works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* For Creators */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#E8D5A3',
                  color: '#A87B2E',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                For Creators
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { n: '01', title: 'Register your likeness', desc: 'Upload photos and record your voice. We capture your unique biometric signature — securely, privately.' },
                  { n: '02', title: 'Set your terms', desc: 'Choose what your likeness can be used for: ads, film, gaming, AI training. Set exclusivity and geographic limits.' },
                  { n: '03', title: 'Earn royalties', desc: 'Every license earns you 70%. Track usage, approve requests, and withdraw earnings anytime.' },
                ].map((step) => (
                  <div key={step.n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        minWidth: '36px',
                        borderRadius: '8px',
                        backgroundColor: '#F4F3EF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        color: '#C9A84C',
                      }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A1A', marginBottom: '4px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '1px', height: '200px', backgroundColor: '#E8E6E1' }} className="hidden md:block" />
            </div>

            {/* For Buyers */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F4F3EF',
                  color: '#4A4A4A',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                For Buyers
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { n: '01', title: 'Search & filter talent', desc: 'Find the perfect likeness by age, look, voice type, accent, energy, and permitted use categories.' },
                  { n: '02', title: 'Preview & configure', desc: 'Preview watermarked samples. Configure your license scope: use case, geography, duration, volume.' },
                  { n: '03', title: 'License & generate', desc: 'Pay securely. Receive API credentials to generate AI representations within your licensed scope.' },
                ].map((step) => (
                  <div key={step.n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        minWidth: '36px',
                        borderRadius: '8px',
                        backgroundColor: '#F4F3EF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        color: '#8A8A8A',
                      }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A1A', marginBottom: '4px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROFILES ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FAFAF8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.5rem' }}>
                Featured creators
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#8A8A8A' }}>
                Join 2,400+ creators already earning from their likeness
              </p>
            </div>
            <Link
              href="/buyer/search"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#C9A84C',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Browse all talent →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {FEATURED_CREATORS.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#1A1A1A', color: '#FAFAF8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Your biometric data{' '}
            <span style={{ color: '#C9A84C' }}>never leaves our vaults</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#8A8A8A', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Raw photos, voice recordings, and biometric signatures are stored in isolated, encrypted S3 vaults.
            Buyers receive only AI-generated synthetic output — never your originals.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🔐', title: 'End-to-end encryption', desc: 'AES-256 at rest, TLS in transit' },
              { icon: '⚖️', title: 'BIPA compliant', desc: 'Illinois Biometric Info Privacy Act standards' },
              { icon: '✍️', title: 'E-signed consent', desc: 'Legally binding consent agreements' },
              { icon: '👁️', title: 'Full audit trail', desc: 'Every access and use logged permanently' },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#2A2A2A',
                  borderRadius: '12px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem', color: '#FAFAF8' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#6A6A6A', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1rem' }}>
            Ready to monetize your likeness?
          </h2>
          <p style={{ fontSize: '1rem', color: '#8A8A8A', marginBottom: '2rem' }}>
            Free to register. No upfront costs. Start earning when your first license sells.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/creator/register"
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: '#C9A84C',
                color: '#1A1A1A',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Register Your Likeness
            </Link>
            <Link
              href="/buyer"
              style={{
                padding: '0.875rem 2rem',
                border: '2px solid #D1CEC7',
                color: '#1A1A1A',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Create Buyer Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
