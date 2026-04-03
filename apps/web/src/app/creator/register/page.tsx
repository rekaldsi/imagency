'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StepWizard from '@/components/StepWizard'
import PermissionsMatrix from '@/components/PermissionsMatrix'
import AudioRecorder from '@/components/AudioRecorder'

const STEPS = [
  { number: 1, label: 'Account' },
  { number: 2, label: 'Identity' },
  { number: 3, label: 'Likeness' },
  { number: 4, label: 'Permissions' },
  { number: 5, label: 'Sign & Submit' },
]

const VOICE_SCRIPT =
  'The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood? Peter Piper picked a peck of pickled peppers.'

// ── Step 1: Account Setup ──────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age18: false,
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.password.length < 8) e.password = 'Password must be 8+ characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.age18) e.age18 = 'You must be 18 or older'
    if (!form.terms) e.terms = 'You must accept the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create your account</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '2rem', fontSize: '0.9rem' }}>Free to register. No upfront costs.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={labelStyle}>Email address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            style={inputStyle(!!errors.email)}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Minimum 8 characters"
            style={inputStyle(!!errors.password)}
          />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}
        </div>

        <div>
          <label style={labelStyle}>Confirm password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            placeholder="Repeat your password"
            style={inputStyle(!!errors.confirmPassword)}
          />
          {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.age18}
              onChange={(e) => setForm({ ...form, age18: e.target.checked })}
              style={{ marginTop: '3px', accentColor: '#C9A84C' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>
              I confirm I am 18 years of age or older
            </span>
          </label>
          {errors.age18 && <p style={{ ...errorStyle, marginTop: 0 }}>{errors.age18}</p>}

          <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
              style={{ marginTop: '3px', accentColor: '#C9A84C' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>
              I agree to the{' '}
              <Link href="/legal/terms" style={{ color: '#C9A84C', textDecoration: 'underline' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" style={{ color: '#C9A84C', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <p style={{ ...errorStyle, marginTop: 0 }}>{errors.terms}</p>}
        </div>

        <button
          onClick={() => validate() && onNext()}
          style={primaryBtnStyle}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

// ── Step 2: Identity Verification ─────────────────────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [idUploaded, setIdUploaded] = useState(false)
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Verify your identity</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
        We need to verify your identity to protect your rights. Your ID is never stored or shared — only
        your verification status is retained.
      </p>

      <div
        style={{
          backgroundColor: '#E8D5A3',
          borderRadius: '10px',
          padding: '0.875rem 1rem',
          marginBottom: '1.75rem',
          fontSize: '0.85rem',
          color: '#A87B2E',
        }}
      >
        <strong>BIPA-compliant verification.</strong> ID verification is handled by an accredited partner.
        We receive only a pass/fail result.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Government ID Upload */}
        <div>
          <label style={labelStyle}>Government-issued photo ID</label>
          <p style={{ fontSize: '0.8rem', color: '#8A8A8A', marginBottom: '0.75rem' }}>
            Accepted: Passport, Driver's License, State ID, National ID
          </p>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
              border: `2px dashed ${idUploaded ? '#C9A84C' : '#D1CEC7'}`,
              borderRadius: '10px',
              backgroundColor: idUploaded ? '#FEFDF7' : '#FAFAF8',
              cursor: 'pointer',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{idUploaded ? '✅' : '📄'}</span>
            <span style={{ fontSize: '0.875rem', color: idUploaded ? '#2D7D4F' : '#8A8A8A', fontWeight: idUploaded ? 600 : 400 }}>
              {idUploaded ? 'ID uploaded successfully' : 'Click to upload or drag and drop'}
            </span>
            {!idUploaded && (
              <span style={{ fontSize: '0.75rem', color: '#8A8A8A' }}>JPG, PNG, PDF — max 10MB</span>
            )}
            <input
              type="file"
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              onChange={() => setIdUploaded(true)}
            />
          </label>
        </div>

        {/* Liveness Check */}
        <div>
          <label style={labelStyle}>Selfie / liveness check</label>
          <p style={{ fontSize: '0.8rem', color: '#8A8A8A', marginBottom: '0.75rem' }}>
            Take a quick selfie or upload a recent photo. In production, this uses a live liveness detection API.
          </p>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
              border: `2px dashed ${selfieUploaded ? '#C9A84C' : '#D1CEC7'}`,
              borderRadius: '10px',
              backgroundColor: selfieUploaded ? '#FEFDF7' : '#FAFAF8',
              cursor: 'pointer',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{selfieUploaded ? '✅' : '🤳'}</span>
            <span style={{ fontSize: '0.875rem', color: selfieUploaded ? '#2D7D4F' : '#8A8A8A', fontWeight: selfieUploaded ? 600 : 400 }}>
              {selfieUploaded ? 'Selfie uploaded successfully' : 'Click to take or upload selfie'}
            </span>
            {!selfieUploaded && (
              <span style={{ fontSize: '0.75rem', color: '#8A8A8A' }}>JPG, PNG — must show your face clearly</span>
            )}
            <input
              type="file"
              accept="image/*"
              capture="user"
              style={{ display: 'none' }}
              onChange={() => setSelfieUploaded(true)}
            />
          </label>
        </div>

        {idUploaded && selfieUploaded && (
          <div
            style={{
              backgroundColor: '#F0FFF4',
              border: '1px solid #2D7D4F',
              borderRadius: '10px',
              padding: '1rem',
              fontSize: '0.875rem',
              color: '#2D7D4F',
              textAlign: 'center',
            }}
          >
            <strong>Under Review</strong> — We'll email you within 24 hours with your verification status.
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
          <button onClick={onNext} style={{ ...primaryBtnStyle, flex: 1 }}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Step 3: Likeness Capture ───────────────────────────────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'face' | 'voice'>('face')
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  const ANGLES = [
    'Front — neutral',
    '3/4 Left',
    '3/4 Right',
    'Profile Left',
    'Profile Right',
    'Looking Up',
    'Looking Down',
    'Smiling',
    'Serious',
    'Outdoor light',
    'Indoor light',
    'Close-up',
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map((f) => URL.createObjectURL(f))
    setUploadedPhotos((prev) => [...prev, ...urls].slice(0, 20))
  }

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Capture your likeness</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Photos and voice are encrypted and stored in isolated vaults. They never leave our secure infrastructure.
      </p>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '1.5rem',
          border: '1px solid #E8E6E1',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {(['face', 'voice'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: activeTab === tab ? '#1A1A1A' : '#FFFFFF',
              color: activeTab === tab ? '#FFFFFF' : '#8A8A8A',
              transition: 'all 0.15s ease',
            }}
          >
            {tab === 'face' ? '📷 Face Capture' : '🎙 Voice Capture'}
          </button>
        ))}
      </div>

      {activeTab === 'face' && (
        <div>
          {/* Upload zone */}
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
              border: '2px dashed #D1CEC7',
              borderRadius: '10px',
              backgroundColor: '#FAFAF8',
              cursor: 'pointer',
              gap: '8px',
              marginBottom: '1rem',
              padding: '1rem',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>📷</span>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A' }}>
              {uploadedPhotos.length}/12 minimum photos uploaded
            </span>
            <span style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>
              Click to select multiple photos, or drag and drop
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          </label>

          {/* Photo grid */}
          {uploadedPhotos.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                gap: '8px',
                marginBottom: '1rem',
              }}
            >
              {uploadedPhotos.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid #E8E6E1',
                  }}
                >
                  <img src={url} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}

          {/* Angle guide */}
          <div
            style={{
              backgroundColor: '#F4F3EF',
              borderRadius: '10px',
              padding: '1rem',
            }}
          >
            <p style={{ fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.75rem', color: '#4A4A4A' }}>
              Angle guide — try to capture each:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '6px' }}>
              {ANGLES.map((angle, i) => (
                <div key={angle} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#4A4A4A' }}>
                  <span style={{ color: uploadedPhotos.length > i ? '#C9A84C' : '#D1CEC7', fontWeight: 700 }}>
                    {uploadedPhotos.length > i ? '✓' : '○'}
                  </span>
                  {angle}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'voice' && (
        <AudioRecorder onRecordingComplete={() => {}} />
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
        <button onClick={onNext} style={{ ...primaryBtnStyle, flex: 1 }}>
          Continue →
        </button>
      </div>
    </div>
  )
}

// ── Step 4: Permissions Matrix ─────────────────────────────────────────────────
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Set your permissions</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
        Choose what your likeness can be used for. You can update these anytime from your dashboard.
      </p>

      <PermissionsMatrix />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
        <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
        <button onClick={onNext} style={{ ...primaryBtnStyle, flex: 1 }}>
          Continue →
        </button>
      </div>
    </div>
  )
}

// ── Step 5: E-Signature & Submit ───────────────────────────────────────────────
function Step5({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(false)
  const [signatureType, setSignatureType] = useState<'type' | 'draw'>('type')
  const [typedName, setTypedName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [regId] = useState(`IMA-${Math.floor(1000 + Math.random() * 9000)}`)

  const handleSubmit = () => {
    if (!agreed || !typedName.trim()) return
    setSubmitted(true)
    onSubmit()
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Registration submitted!</h2>
        <p style={{ color: '#8A8A8A', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Your creator profile is under review. We'll email you within 24 hours.
        </p>
        <div
          style={{
            backgroundColor: '#F4F3EF',
            border: '1px solid #E8E6E1',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'left',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: '#8A8A8A', marginBottom: '4px' }}>Your registration ID</p>
          <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1A1A1A', fontFamily: 'monospace' }}>{regId}</p>
          <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginTop: '4px' }}>Save this for reference</p>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#8A8A8A', marginBottom: '1.5rem' }}>
          A confirmation email has been sent to your registered email address.
        </p>
        <Link
          href="/dashboard/creator"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.75rem',
            backgroundColor: '#C9A84C',
            color: '#1A1A1A',
            fontWeight: 700,
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          Go to Dashboard →
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Review & sign</h2>
      <p style={{ color: '#8A8A8A', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
        Review what you're registering and sign your consent agreement.
      </p>

      {/* Summary */}
      <div
        style={{
          backgroundColor: '#F4F3EF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.875rem', color: '#1A1A1A' }}>
          Registration summary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'What you\'re registering', value: 'Face likeness, voice signature, persona data' },
            { label: 'Permissions enabled', value: 'Advertising, Film & TV, Streaming' },
            { label: 'Geography', value: 'Worldwide (no restrictions)' },
            { label: 'Exclusivity', value: 'Non-exclusive (multiple buyers allowed)' },
            { label: 'Your revenue share', value: '70% of every license fee' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#8A8A8A' }}>{item.label}</span>
              <span style={{ fontWeight: 500, color: '#1A1A1A', textAlign: 'right' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Consent agreement */}
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'scroll',
          border: '1px solid #E8E6E1',
          borderRadius: '10px',
          padding: '1rem',
          fontSize: '0.8rem',
          color: '#4A4A4A',
          lineHeight: 1.7,
          backgroundColor: '#FFFFFF',
          marginBottom: '1.25rem',
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>IMAGENCY CREATOR CONSENT AGREEMENT</p>
        <p>By registering, you ("Creator") grant Imagency, Inc. ("Platform") a limited, revocable license to store your biometric data in encrypted vaults and to generate AI-synthetic representations of your likeness solely for delivery to licensed buyers within the scope of your configured permissions.</p>
        <br />
        <p>You retain full ownership of your biometric data. The Platform may not sell, rent, or disclose your raw biometric data to any third party. Buyers receive only AI-generated synthetic output, never original captures.</p>
        <br />
        <p>You will receive 70% of every license fee collected on your behalf. The Platform retains 30% as a service fee. Payouts are processed within 5 business days of each license completion.</p>
        <br />
        <p>You may revoke consent at any time by deleting your profile. Active licenses at the time of revocation remain valid for their contracted duration. New licenses will not be issued after revocation.</p>
        <br />
        <p>Any unauthorized use of your likeness may give rise to liquidated damages claims enforceable under applicable state and federal law, including but not limited to the Illinois Biometric Information Privacy Act (BIPA) and analogous statutes.</p>
        <br />
        <p>This agreement is governed by the laws of the State of Delaware. Disputes shall be resolved via binding arbitration under JAMS rules.</p>
      </div>

      {/* I agree checkbox */}
      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ marginTop: '3px', accentColor: '#C9A84C' }}
        />
        <span style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>
          I have read and agree to the Creator Consent Agreement and understand my rights and obligations.
        </span>
      </label>

      {/* Signature */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Digital signature</label>
        <div style={{ display: 'flex', gap: '0', marginBottom: '0.75rem', border: '1px solid #E8E6E1', borderRadius: '8px', overflow: 'hidden' }}>
          {(['type', 'draw'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSignatureType(t)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
                backgroundColor: signatureType === t ? '#1A1A1A' : '#FFFFFF',
                color: signatureType === t ? '#FFFFFF' : '#8A8A8A',
              }}
            >
              {t === 'type' ? 'Type name' : 'Draw signature'}
            </button>
          ))}
        </div>

        {signatureType === 'type' ? (
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="Type your full legal name"
            style={{
              ...inputStyle(false),
              fontFamily: 'Georgia, serif',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#1A1A1A',
            }}
          />
        ) : (
          <div
            style={{
              height: '100px',
              border: '1px solid #D1CEC7',
              borderRadius: '8px',
              backgroundColor: '#FAFAF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8A8A8A',
              fontSize: '0.85rem',
            }}
          >
            Canvas signature pad — click to draw
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} style={secondaryBtnStyle}>← Back</button>
        <button
          onClick={handleSubmit}
          disabled={!agreed || !typedName.trim()}
          style={{
            ...primaryBtnStyle,
            flex: 1,
            opacity: !agreed || !typedName.trim() ? 0.5 : 1,
            cursor: !agreed || !typedName.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          Complete Registration ✓
        </button>
      </div>
    </div>
  )
}

// ── Shared styles ──────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 500,
  fontSize: '0.875rem',
  color: '#1A1A1A',
  marginBottom: '0.4rem',
}

const inputStyle = (error: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0.7rem 0.875rem',
  border: `1px solid ${error ? '#C0392B' : '#D1CEC7'}`,
  borderRadius: '8px',
  fontSize: '0.9rem',
  color: '#1A1A1A',
  backgroundColor: '#FFFFFF',
  outline: 'none',
})

const errorStyle: React.CSSProperties = {
  color: '#C0392B',
  fontSize: '0.8rem',
  marginTop: '4px',
}

const primaryBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#C9A84C',
  color: '#1A1A1A',
  fontWeight: 700,
  fontSize: '0.9rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '0.8rem 1.25rem',
  backgroundColor: 'transparent',
  color: '#4A4A4A',
  fontWeight: 500,
  fontSize: '0.9rem',
  border: '1px solid #D1CEC7',
  borderRadius: '8px',
  cursor: 'pointer',
}

// ── Main wizard ────────────────────────────────────────────────────────────────
export default function CreatorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const next = () => setCurrentStep((s) => Math.min(s + 1, 5))
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1))

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <StepWizard steps={STEPS} currentStep={currentStep} />

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '16px',
              padding: '2rem',
            }}
          >
            {currentStep === 1 && <Step1 onNext={next} />}
            {currentStep === 2 && <Step2 onNext={next} onBack={back} />}
            {currentStep === 3 && <Step3 onNext={next} onBack={back} />}
            {currentStep === 4 && <Step4 onNext={next} onBack={back} />}
            {currentStep === 5 && <Step5 onBack={back} onSubmit={() => {}} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
