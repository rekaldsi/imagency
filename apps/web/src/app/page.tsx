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
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.05,
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
              maxWidth: '560px',
              margin: '0 auto 0.75rem',
            }}
          >
            Register your likeness, set your terms, and earn royalties every time a brand
            or studio uses an AI-generated representation of you.
          </p>

          <p
            style={{
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: '#888888',
              marginBottom: '2.5rem',
            }}
          >
            The casting agency for the AI era.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/creator/register"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 2rem',
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: 0,
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
                height: '52px',
                padding: '0 2rem',
                backgroundColor: 'transparent',
                color: '#1A1A1A',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 0,
                textDecoration: 'none',
                border: '1.5px solid #1A1A1A',
              }}
            >
              Browse Talent
            </Link>
          </div>

          {/* Stat bar */}
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              border: '1px solid #E8E6E1',
              width: '100%',
            }}
          >
            <div style={{ flex: 1, textAlign: 'center', padding: '1.25rem 1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>2,400+</div>
              <div style={{ fontSize: '0.75rem', color: '#888888', marginTop: '6px' }}>Creators registered</div>
            </div>
            <div style={{ width: '1px', backgroundColor: '#E8E6E1', alignSelf: 'stretch' }} />
            <div style={{ flex: 1, textAlign: 'center', padding: '1.25rem 1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>70%</div>
              <div style={{ fontSize: '0.75rem', color: '#888888', marginTop: '6px' }}>Revenue to creators</div>
            </div>
            <div style={{ width: '1px', backgroundColor: '#E8E6E1', alignSelf: 'stretch' }} />
            <div style={{ flex: 1, textAlign: 'center', padding: '1.25rem 1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>$0</div>
              <div style={{ fontSize: '0.75rem', color: '#888888', marginTop: '6px' }}>Raw data shared</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A' }}>
              How it works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* For Creators */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.75rem',
                  }}
                >
                  For Creators
                </div>
                <div style={{ width: '40px', height: '2px', backgroundColor: '#C9A84C', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1A1A1A' }}>For Creators</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { n: '01', title: 'Register your likeness', desc: 'Upload photos and record your voice. We capture your unique biometric signature — securely, privately.' },
                  { n: '02', title: 'Set your terms', desc: 'Choose what your likeness can be used for: ads, film, gaming, AI training. Set exclusivity and geographic limits.' },
                  { n: '03', title: 'Earn royalties', desc: 'Every license earns you 70%. Track usage, approve requests, and withdraw earnings anytime.' },
                ].map((step) => (
                  <div key={step.n} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#C9A84C',
                        lineHeight: 1,
                        minWidth: '52px',
                      }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A1A', marginBottom: '6px' }}>{step.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', lineHeight: 1.8 }}>{step.desc}</p>
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
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.75rem',
                  }}
                >
                  For Buyers
                </div>
                <div style={{ width: '40px', height: '2px', backgroundColor: '#C9A84C', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1A1A1A' }}>For Buyers</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { n: '01', title: 'Search & filter talent', desc: 'Find the perfect likeness by age, look, voice type, accent, energy, and permitted use categories.' },
                  { n: '02', title: 'Preview & configure', desc: 'Preview watermarked samples. Configure your license scope: use case, geography, duration, volume.' },
                  { n: '03', title: 'License & generate', desc: 'Pay securely. Receive API credentials to generate AI representations within your licensed scope.' },
                ].map((step) => (
                  <div key={step.n} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#C9A84C',
                        lineHeight: 1,
                        minWidth: '52px',
                      }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A1A', marginBottom: '6px' }}>{step.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', lineHeight: 1.8 }}>{step.desc}</p>
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

      {/* ── PRICING ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#F4F2EE' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.75rem' }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#888888' }}>
              License what you need. Pay once. Own the scope.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
            {/* Card 1 — Scene Extra */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: 0,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Scene Extra</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.25rem' }}>$29 – $149</div>
                <div style={{ fontSize: '0.85rem', color: '#8A8A8A' }}>Best for: Background roles, single scenes</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['1 project license', '30-day usage window', 'Image reference pack', 'Single scene use'].map((item) => (
                  <li key={item} style={{ fontSize: '0.875rem', color: '#4A4A4A', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/buyer/search"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 0',
                  border: '1.5px solid #1A1A1A',
                  color: '#1A1A1A',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: 0,
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Card 2 — Supporting Role (RECOMMENDED) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderTop: '4px solid #C9A84C',
                borderRadius: 0,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#C9A84C',
                  color: '#1A1A1A',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Most Popular
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Supporting Role</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.25rem' }}>$299 – $799</div>
                <div style={{ fontSize: '0.85rem', color: '#8A8A8A' }}>Best for: Multi-scene roles, short films</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['1 project license', '90-day usage window', 'Full character kit (images + voice)', 'Multiple scenes', 'Usage certificate'].map((item) => (
                  <li key={item} style={{ fontSize: '0.875rem', color: '#4A4A4A', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/buyer/search"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 0',
                  backgroundColor: '#1A1A1A',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: 0,
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Card 3 — Lead Character */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: 0,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Lead Character</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.25rem' }}>$999 – $4,999</div>
                <div style={{ fontSize: '0.85rem', color: '#8A8A8A' }}>Best for: Commercial, lead roles, 1 year</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['1 project license', '1-year usage window', 'Full character kit + profile', 'Unlimited scenes', 'Commercial rights', 'Usage certificate + legal docs'].map((item) => (
                  <li key={item} style={{ fontSize: '0.875rem', color: '#4A4A4A', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/buyer/search"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 0',
                  border: '1.5px solid #1A1A1A',
                  color: '#1A1A1A',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: 0,
                }}
              >
                Get Started
              </Link>
            </div>
          </div>

          <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#8A8A8A', maxWidth: '700px', margin: '2rem auto 0', lineHeight: 1.7 }}>
            Prices vary by use case, geography, and exclusivity. All licenses include a binding usage certificate. Custom and exclusive pricing available on request.
          </p>
        </div>
      </section>

      {/* ── POPULATION BUILDER TEASER ── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#1A1A1A' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Left: text */}
            <div style={{ flex: '1 1 360px' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                }}
              >
                Population Builder
              </div>
              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#FAFAF8',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                }}
              >
                10 new entities.{' '}
                <br />
                Every day.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#AAAAAA',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  maxWidth: '440px',
                }}
              >
                A growing library of AI-generated digital actors — diverse, consistent, ready to cast. New faces, voices, and character profiles added daily.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Diverse age, ethnicity, gender, and style',
                  'Full character kit: images + voice + profile',
                  'Instant licensing, no approval needed',
                ].map((item) => (
                  <li key={item} style={{ fontSize: '0.925rem', color: '#FAFAF8', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/buyer/search"
                style={{
                  fontSize: '0.95rem',
                  color: '#C9A84C',
                  textDecoration: 'underline',
                  fontWeight: 600,
                }}
              >
                Browse the Collection →
              </Link>
            </div>

            {/* Right: avatar grid */}
            <div style={{ flex: '0 0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 80px)',
                  gap: '1rem',
                }}
              >
                {[
                  { fill: '#2A2A2A', isNew: false },
                  { fill: '#333333', isNew: false },
                  { fill: '#3A3A3A', isNew: true },
                  { fill: '#333333', isNew: false },
                  { fill: '#2A2A2A', isNew: false },
                  { fill: '#3A3A3A', isNew: false },
                ].map((avatar, i) => (
                  <div key={i} style={{ position: 'relative', width: '80px', height: '80px' }}>
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: avatar.fill,
                        border: '1px solid #3A3A3A',
                      }}
                    />
                    {avatar.isNew && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          backgroundColor: '#C9A84C',
                          color: '#1A1A1A',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        NEW
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
          <p style={{ fontSize: '1rem', color: '#8A8A8A', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 3rem' }}>
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

      {/* ── DUAL PATH CTA ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Left Panel — For Creators */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#F5E9C8', padding: '5rem 4rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#A87B2E',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            For Creators
          </div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Turn your likeness into a revenue stream.
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Set your own terms and permitted uses',
              'Earn 70% of every license',
              'Full control. Cancel anytime.',
            ].map((item) => (
              <li key={item} style={{ fontSize: '0.925rem', color: '#3A3A3A', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#C9A84C', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/creator/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: 0,
              textDecoration: 'none',
            }}
          >
            Register Your Likeness →
          </Link>
        </div>

        {/* Right Panel — For Buyers */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#1A1A1A', padding: '5rem 4rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#C9A84C',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            For Filmmakers &amp; Creators
          </div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FAFAF8',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            License the cast you need. Start creating.
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              '2,400+ real and synthetic personas',
              'Full character kit included with every license',
              'Pay once. No recurring fees.',
            ].map((item) => (
              <li key={item} style={{ fontSize: '0.925rem', color: '#AAAAAA', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#C9A84C', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/buyer/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              backgroundColor: 'transparent',
              color: '#C9A84C',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: 0,
              textDecoration: 'none',
              border: '1.5px solid #C9A84C',
            }}
          >
            Browse Talent →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
