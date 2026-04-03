'use client'

import { useState, useMemo, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StepWizard from '@/components/StepWizard'
import PriceCalculator from '@/components/PriceCalculator'

const STEPS = [
  { number: 1, label: 'Configure' },
  { number: 2, label: 'Review Terms' },
  { number: 3, label: 'Payment' },
]

interface LicenseConfig {
  type: string
  useCategory: string
  mediaTypes: string[]
  geography: string
  duration: string
  volume: number
}

const USE_CATEGORIES = ['Advertising', 'Film & TV', 'Streaming', 'Gaming']
const MEDIA_TYPES = ['Digital', 'Broadcast TV', 'Social Media', 'Out-of-Home (OOH)', 'Gaming', 'Podcast']
const GEOGRAPHIES = [
  { value: 'global', label: 'Global (all territories)' },
  { value: 'north-america', label: 'North America' },
  { value: 'single-country', label: 'Single Country' },
]
const DURATIONS = [
  { value: '30-days', label: '30 days' },
  { value: '90-days', label: '90 days' },
  { value: '6-months', label: '6 months' },
  { value: '1-year', label: '1 year' },
]

// ── Step 1: Configure ─────────────────────────────────────────────────────────
function ConfigureStep({
  config,
  setConfig,
  onNext,
}: {
  config: LicenseConfig
  setConfig: React.Dispatch<React.SetStateAction<LicenseConfig>>
  onNext: () => void
}) {
  const toggleMediaType = (type: string) => {
    setConfig((prev) => ({
      ...prev,
      mediaTypes: prev.mediaTypes.includes(type)
        ? prev.mediaTypes.filter((t) => t !== type)
        : [...prev.mediaTypes, type],
    }))
  }

  const canContinue =
    config.type && config.useCategory && config.mediaTypes.length > 0 && config.geography && config.duration

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', alignItems: 'flex-start' }}>
      <div>
        <h2 style={{ fontWeight: 700, fontSize: '1.375rem', marginBottom: '0.5rem' }}>Configure your license</h2>
        <p style={{ color: '#8A8A8A', marginBottom: '2rem', fontSize: '0.875rem' }}>
          Pricing updates in real-time as you change options.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* License type */}
          <div>
            <label style={labelStyle}>License type</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['one-time', 'subscription', 'royalty'].map((type) => (
                <button
                  key={type}
                  onClick={() => setConfig((p) => ({ ...p, type }))}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: `2px solid ${config.type === type ? '#C9A84C' : '#E8E6E1'}`,
                    borderRadius: '8px',
                    backgroundColor: config.type === type ? '#FEFDF7' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: config.type === type ? 600 : 400,
                    color: '#1A1A1A',
                    textTransform: 'capitalize',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Use category */}
          <div>
            <label style={labelStyle}>Use category</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {USE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setConfig((p) => ({ ...p, useCategory: cat }))}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: `2px solid ${config.useCategory === cat ? '#C9A84C' : '#E8E6E1'}`,
                    borderRadius: '8px',
                    backgroundColor: config.useCategory === cat ? '#FEFDF7' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: config.useCategory === cat ? 600 : 400,
                    color: '#1A1A1A',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Media types */}
          <div>
            <label style={labelStyle}>Media types (select all that apply)</label>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {MEDIA_TYPES.map((type) => {
                const selected = config.mediaTypes.includes(type)
                return (
                  <button
                    key={type}
                    onClick={() => toggleMediaType(type)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: `2px solid ${selected ? '#C9A84C' : '#E8E6E1'}`,
                      borderRadius: '8px',
                      backgroundColor: selected ? '#FEFDF7' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: selected ? 600 : 400,
                      color: '#1A1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {selected && <span style={{ color: '#C9A84C' }}>✓</span>}
                    {type}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Geography */}
          <div>
            <label style={labelStyle}>Geography</label>
            <select
              value={config.geography}
              onChange={(e) => setConfig((p) => ({ ...p, geography: e.target.value }))}
              style={selectStyle}
            >
              <option value="">Select geography...</option>
              {GEOGRAPHIES.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label style={labelStyle}>Duration</label>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setConfig((p) => ({ ...p, duration: d.value }))}
                  style={{
                    padding: '0.6rem 1rem',
                    border: `2px solid ${config.duration === d.value ? '#C9A84C' : '#E8E6E1'}`,
                    borderRadius: '8px',
                    backgroundColor: config.duration === d.value ? '#FEFDF7' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: config.duration === d.value ? 600 : 400,
                    color: '#1A1A1A',
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={labelStyle}>Volume (number of content pieces)</label>
              <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.9rem' }}>{config.volume}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={config.volume}
              onChange={(e) => setConfig((p) => ({ ...p, volume: parseInt(e.target.value) }))}
              style={{ width: '100%', accentColor: '#C9A84C' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8A8A8A', marginTop: '4px' }}>
              <span>1 piece</span><span>50 pieces</span>
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={!canContinue}
            style={{
              padding: '0.875rem',
              backgroundColor: canContinue ? '#C9A84C' : '#E8E6E1',
              color: canContinue ? '#1A1A1A' : '#8A8A8A',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              borderRadius: '8px',
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            Review Terms →
          </button>
        </div>
      </div>

      {/* Price calculator */}
      <div style={{ position: 'sticky', top: '80px' }}>
        <PriceCalculator config={config} />
      </div>
    </div>
  )
}

// ── Step 2: Review Terms ───────────────────────────────────────────────────────
function ReviewTermsStep({
  config,
  creatorId,
  price,
  onNext,
  onBack,
}: {
  config: LicenseConfig
  creatorId: string
  price: number
  onNext: () => void
  onBack: () => void
}) {
  const [agreed, setAgreed] = useState(false)
  const creatorLabel = `Creator #${creatorId}`

  return (
    <div style={{ maxWidth: '680px' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.375rem', marginBottom: '0.5rem' }}>Review license terms</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Read the full terms before proceeding to payment.
      </p>

      {/* License summary */}
      <div
        style={{
          backgroundColor: '#F4F3EF',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E8E6E1' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#D1CEC7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            👤
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A' }}>{creatorLabel}</p>
            <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>Creator identity hidden until license is purchased</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'License type', value: config.type },
            { label: 'Use category', value: config.useCategory },
            { label: 'Media', value: config.mediaTypes.join(', ') || 'Not set' },
            { label: 'Geography', value: config.geography },
            { label: 'Duration', value: config.duration },
            { label: 'Volume', value: `${config.volume} pieces` },
            { label: 'Total price', value: `$${price.toLocaleString()}` },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: '0.75rem', color: '#8A8A8A', textTransform: 'capitalize' }}>{item.label}</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A1A', textTransform: 'capitalize' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* License terms */}
      <div
        style={{
          maxHeight: '280px',
          overflowY: 'scroll',
          border: '1px solid #E8E6E1',
          borderRadius: '10px',
          padding: '1.25rem',
          fontSize: '0.8rem',
          color: '#4A4A4A',
          lineHeight: 1.7,
          backgroundColor: '#FFFFFF',
          marginBottom: '1.25rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>IMAGENCY LICENSE AGREEMENT</p>
        <p>This License Agreement ("Agreement") is entered into between the buyer ("Licensee") and Imagency, Inc. ("Platform") acting as agent for the creator ("Licensor") identified as {creatorLabel}.</p>
        <br />
        <p><strong>1. LICENSE GRANT.</strong> Subject to full payment, Licensor grants Licensee a non-exclusive, non-transferable license to use AI-generated synthetic representations of Licensor's likeness solely within the scope defined: {config.useCategory}, {config.geography} territory, {config.duration} duration, {config.volume} content pieces, {config.mediaTypes.join(', ')} media.</p>
        <br />
        <p><strong>2. RESTRICTIONS.</strong> Licensee may not: (a) use the likeness outside the defined scope; (b) sub-license or transfer rights; (c) use the likeness in ways that defame, mislead, or harm the Licensor; (d) create political or adult content without express written consent.</p>
        <br />
        <p
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #E67E22',
            borderRadius: '6px',
            padding: '0.75rem',
            fontWeight: 600,
            color: '#E67E22',
          }}
        >
          3. LIQUIDATED DAMAGES. Any unauthorized use beyond the licensed scope shall result in liquidated damages of $50,000 per violation, which the parties agree represents a reasonable estimate of harm and not a penalty. These damages are in addition to any injunctive or other relief available under applicable law.
        </p>
        <br />
        <p><strong>4. PAYMENT AND ESCROW.</strong> Total license fee of ${price.toLocaleString()} will be held in escrow for 72 hours. Upon expiry, 70% is released to the Licensor and 30% retained as Platform fees.</p>
        <br />
        <p><strong>5. AUDIT.</strong> Platform reserves the right to log and audit all API calls and content generations under this license. Logs are retained for 7 years.</p>
        <br />
        <p><strong>6. GOVERNING LAW.</strong> This Agreement is governed by the laws of the State of Delaware.</p>
      </div>

      {/* Agree checkbox */}
      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ marginTop: '3px', accentColor: '#C9A84C' }}
        />
        <span style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>
          I agree to the license terms{' '}
          <strong style={{ color: '#E67E22' }}>including the liquidated damages clause</strong>{' '}
          and understand my obligations as a Licensee.
        </span>
      </label>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
        <button
          onClick={onNext}
          disabled={!agreed}
          style={{
            flex: 1,
            padding: '0.875rem',
            backgroundColor: agreed ? '#C9A84C' : '#E8E6E1',
            color: agreed ? '#1A1A1A' : '#8A8A8A',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: agreed ? 'pointer' : 'not-allowed',
          }}
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  )
}

// ── Step 3: Payment ───────────────────────────────────────────────────────────
function PaymentStep({
  price,
  config,
  creatorId,
  onBack,
}: {
  price: number
  config: LicenseConfig
  creatorId: string
  onBack: () => void
}) {
  const [completed, setCompleted] = useState(false)
  const [licenseId] = useState(`LIC-${Math.floor(1000 + Math.random() * 9000)}`)
  const [apiKey] = useState(`ik_live_${licenseId.toLowerCase()}_${Math.random().toString(36).substring(2, 10)}`)
  const platformFee = Math.round(price * 0.3)

  if (completed) {
    return (
      <div style={{ maxWidth: '560px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontWeight: 700, fontSize: '1.375rem', marginBottom: '0.5rem' }}>License purchased!</h2>
          <p style={{ color: '#8A8A8A', fontSize: '0.875rem' }}>
            Your API credentials are ready. Funds held in escrow for 72 hours.
          </p>
        </div>

        {/* License ID */}
        <div
          style={{
            backgroundColor: '#F4F3EF',
            border: '1px solid #E8E6E1',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '4px' }}>License ID</p>
          <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1A1A1A', fontFamily: 'monospace' }}>{licenseId}</p>
        </div>

        {/* API credentials */}
        <div
          style={{
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            API Credentials
          </p>
          <div style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#6A6A6A', marginBottom: '4px' }}>API Key</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#C9A84C', wordBreak: 'break-all' }}>{apiKey}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: '#6A6A6A', marginBottom: '4px' }}>Endpoint</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#FAFAF8', wordBreak: 'break-all' }}>
              https://api.imagency.io/v1/generate/{creatorId}
            </p>
          </div>
        </div>

        {/* Download + Dashboard links */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            style={{
              flex: 1,
              padding: '0.7rem',
              backgroundColor: '#F4F3EF',
              border: '1px solid #E8E6E1',
              borderRadius: '8px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              color: '#4A4A4A',
              fontWeight: 500,
            }}
          >
            Download Asset Pack
          </button>
          <Link
            href="/dashboard/buyer"
            style={{
              flex: 1,
              padding: '0.7rem',
              backgroundColor: '#C9A84C',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#1A1A1A',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Go to Dashboard
          </Link>
        </div>

        {/* FAQ */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E6E1',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <h3 style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>How to use your license</h3>
          {[
            { q: 'How do I generate content?', a: `Make a POST request to https://api.imagency.io/v1/generate/${creatorId} with your API key in the Authorization header and a JSON body describing the scene.` },
            { q: 'When do funds release to the creator?', a: 'Funds are held in escrow for 72 hours after purchase. After that, 70% is released to the creator automatically.' },
            { q: 'What happens if I exceed my volume?', a: 'The API will return a 403 error when you hit your licensed volume. You can purchase an extension from your dashboard.' },
            { q: 'Can I download the source files?', a: 'No. You receive AI-generated synthetic outputs only. Raw biometric data never leaves our vaults.' },
          ].map((item) => (
            <details key={item.q} style={{ borderBottom: '1px solid #F4F3EF', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
              <summary style={{ fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', color: '#1A1A1A' }}>
                {item.q}
              </summary>
              <p style={{ fontSize: '0.825rem', color: '#8A8A8A', marginTop: '0.5rem', lineHeight: 1.6 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '560px' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.375rem', marginBottom: '0.5rem' }}>Complete payment</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Secure payment powered by Stripe. Funds held 72h in escrow.
      </p>

      {/* Price breakdown */}
      <div
        style={{
          backgroundColor: '#F4F3EF',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.875rem', color: '#1A1A1A' }}>Price breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A4A4A' }}>
            <span>License fee (to creator)</span>
            <span>${(price - platformFee).toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A8A8A' }}>
            <span>Platform fee (30%)</span>
            <span>${platformFee.toLocaleString()}</span>
          </div>
          <hr style={{ borderColor: '#D1CEC7', margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1A1A1A', fontSize: '1rem' }}>
            <span>Total charged today</span>
            <span>${price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Escrow notice */}
      <div
        style={{
          backgroundColor: '#E8F5E9',
          border: '1px solid #A5D6A7',
          borderRadius: '8px',
          padding: '0.875rem 1rem',
          marginBottom: '1.5rem',
          fontSize: '0.825rem',
          color: '#2D7D4F',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
        }}
      >
        <span>🔒</span>
        <span>Funds held in escrow for 72 hours. Creator receives payment only after holding period. Dispute within 72h for full refund.</span>
      </div>

      {/* Stripe payment form mock */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', color: '#1A1A1A' }}>Payment details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Card number</label>
            <div
              style={{
                padding: '0.7rem 0.875rem',
                border: '1px solid #D1CEC7',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#8A8A8A',
                backgroundColor: '#F4F3EF',
              }}
            >
              Stripe Elements — mock for MVP
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Expiry</label>
              <input
                type="text"
                placeholder="MM / YY"
                style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1px solid #D1CEC7', borderRadius: '8px', fontSize: '0.875rem' }}
              />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '0.8rem' }}>CVC</label>
              <input
                type="text"
                placeholder="•••"
                style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1px solid #D1CEC7', borderRadius: '8px', fontSize: '0.875rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
        <button
          onClick={() => setCompleted(true)}
          style={{
            flex: 1,
            padding: '0.875rem',
            backgroundColor: '#C9A84C',
            color: '#1A1A1A',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Complete License Purchase — ${price.toLocaleString()}
        </button>
      </div>
    </div>
  )
}

// ── Shared styles ──────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 600,
  fontSize: '0.875rem',
  color: '#1A1A1A',
  marginBottom: '0.5rem',
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.875rem',
  border: '1px solid #D1CEC7',
  borderRadius: '8px',
  fontSize: '0.875rem',
  backgroundColor: '#FFFFFF',
  color: '#1A1A1A',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '0.875rem 1.25rem',
  backgroundColor: 'transparent',
  color: '#4A4A4A',
  fontWeight: 500,
  fontSize: '0.9rem',
  border: '1px solid #D1CEC7',
  borderRadius: '8px',
  cursor: 'pointer',
}

// ── Inner page (uses useSearchParams) ─────────────────────────────────────────
function BuyerLicensePageInner() {
  const searchParams = useSearchParams()
  const creatorId = searchParams.get('creator') || 'IMA-1001'

  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<LicenseConfig>({
    type: '',
    useCategory: '',
    mediaTypes: [],
    geography: '',
    duration: '',
    volume: 1,
  })
  const [price, setPrice] = useState(0)

  const handlePriceChange = useCallback((p: number) => setPrice(p), [])

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '2.5rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link href={`/buyer/profile/${creatorId}`} style={{ fontSize: '0.8rem', color: '#C9A84C', textDecoration: 'none' }}>
            ← Back to creator profile
          </Link>
          <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
            Build your license
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#8A8A8A' }}>
            Creator: {creatorId}
          </p>
        </div>

        <StepWizard steps={STEPS} currentStep={currentStep} />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E6E1',
            borderRadius: '16px',
            padding: '2rem',
          }}
        >
          {currentStep === 1 && (
            <ConfigureStep
              config={config}
              setConfig={setConfig}
              onNext={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 2 && (
            <ReviewTermsStep
              config={config}
              creatorId={creatorId}
              price={price}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              price={price}
              config={config}
              creatorId={creatorId}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ── Main page export ──────────────────────────────────────────────────────────
export default function BuyerLicensePage() {
  return (
    <Suspense
      fallback={
        <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#8A8A8A' }}>Loading...</p>
        </div>
      }
    >
      <BuyerLicensePageInner />
    </Suspense>
  )
}
