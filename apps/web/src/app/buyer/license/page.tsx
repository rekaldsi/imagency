'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StepWizard from '@/components/StepWizard'

// ─── Pricing constants ────────────────────────────────────────────────────────

const BASE_PRICES: Record<string, number> = {
  'one-time': 500,
  'subscription': 200,
  'royalty': 150,
}

const CATEGORY_MULTIPLIERS: Record<string, number> = {
  'advertising': 1.5,
  'film': 2.0,
  'streaming': 1.0,
  'gaming': 0.8,
  'ai-training': 3.0,
  'other': 1.0,
}

const TERRITORY_MULTIPLIERS: Record<string, number> = {
  'global': 3.0,
  'multi-region': 2.0,
  'single-country': 1.0,
}

const DURATION_MULTIPLIERS: Record<number, number> = {
  30: 1.0,
  90: 2.5,
  180: 4.0,
  365: 7.0,
}

type LicenseType = 'one-time' | 'subscription' | 'royalty'
type Territory = 'global' | 'multi-region' | 'single-country'
type PaymentStatus = 'idle' | 'processing' | 'complete'

interface LicenseConfig {
  licenseType: LicenseType
  useCategory: string
  mediaTypes: string[]
  territory: Territory
  country: string
  duration: 30 | 90 | 180 | 365
  volume: number
}

function calcPrice(cfg: LicenseConfig) {
  const catKey = cfg.useCategory.toLowerCase().replace(/[\s&]+/g, '-')
  const base = BASE_PRICES[cfg.licenseType] ?? 500
  const catMult = CATEGORY_MULTIPLIERS[catKey] ?? 1.0
  const terrMult = TERRITORY_MULTIPLIERS[cfg.territory] ?? 1.0
  const durMult = cfg.licenseType === 'one-time' ? (DURATION_MULTIPLIERS[cfg.duration] ?? 1.0) : 1.0
  const total = Math.round(base * catMult * terrMult * durMult * cfg.volume)
  return { base, catMult, terrMult, durMult, total, creatorEarns: Math.round(total * 0.7), platformFee: Math.round(total * 0.3) }
}

// ─── Step 0: Configure ────────────────────────────────────────────────────────

function ConfigureStep({
  config,
  onChange,
  creatorId,
  onNext,
}: {
  config: LicenseConfig
  onChange: (updates: Partial<LicenseConfig>) => void
  creatorId: string
  onNext: () => void
}) {
  const { base, catMult, terrMult, durMult, total, creatorEarns, platformFee } = calcPrice(config)

  const mediaOptions = ['Digital/Social', 'Broadcast TV', 'Out-of-Home', 'Gaming/VR']
  const categories = [
    { key: 'advertising', label: 'Advertising' },
    { key: 'film', label: 'Film & TV' },
    { key: 'streaming', label: 'Streaming' },
    { key: 'gaming', label: 'Gaming' },
    { key: 'ai-training', label: 'AI Training' },
    { key: 'other', label: 'Other' },
  ]
  const durations: Array<{ value: 30 | 90 | 180 | 365; label: string }> = [
    { value: 30, label: '30d' },
    { value: 90, label: '90d' },
    { value: 180, label: '180d' },
    { value: 365, label: '1 year' },
  ]

  function toggleMedia(media: string) {
    const current = config.mediaTypes
    onChange({ mediaTypes: current.includes(media) ? current.filter((m) => m !== media) : [...current, media] })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Controls — 60% */}
      <div className="lg:col-span-3 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-charcoal mb-1">Configure your license</h2>
          <p className="text-sm text-charcoal-muted">Customize scope, territory, and usage. Price updates in real-time.</p>
        </div>

        {/* License type */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">License Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(
              [
                { key: 'one-time' as const, icon: '🎯', title: 'One-Time', desc: 'Fixed fee, defined duration' },
                { key: 'subscription' as const, icon: '🔄', title: 'Subscription', desc: 'Monthly recurring access' },
                { key: 'royalty' as const, icon: '📊', title: 'Royalty', desc: 'Pay per performance/view' },
              ]
            ).map(({ key, icon, title, desc }) => (
              <button
                key={key}
                onClick={() => onChange({ licenseType: key })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  config.licenseType === key ? 'border-gold bg-gold/5' : 'border-warm-border bg-white hover:border-warm-border/60'
                }`}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-semibold text-charcoal text-sm">{title}</div>
                <div className="text-charcoal-muted text-xs mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Use category */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Use Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onChange({ useCategory: key })}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  config.useCategory === key
                    ? 'bg-charcoal text-warm-white border-charcoal'
                    : 'bg-white text-charcoal border-warm-border hover:border-charcoal/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Media types */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Media Types</label>
          <div className="grid grid-cols-2 gap-2">
            {mediaOptions.map((media) => (
              <label key={media} className="flex items-center gap-3 p-3 rounded-xl border border-warm-border bg-white cursor-pointer hover:bg-warm-cream/40 transition-colors">
                <input type="checkbox" checked={config.mediaTypes.includes(media)} onChange={() => toggleMedia(media)} className="w-4 h-4 accent-gold" />
                <span className="text-sm text-charcoal">{media}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Territory */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Territory</label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: 'global' as const, label: 'Global' },
                { key: 'multi-region' as const, label: 'Multi-Region' },
                { key: 'single-country' as const, label: 'Single Country' },
              ]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onChange({ territory: key })}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  config.territory === key ? 'bg-gold text-charcoal border-gold' : 'bg-white text-charcoal border-warm-border hover:border-gold/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {config.territory === 'single-country' && (
            <input
              type="text"
              placeholder="Enter country..."
              value={config.country}
              onChange={(e) => onChange({ country: e.target.value })}
              className="input-field mt-3"
            />
          )}
        </div>

        {/* Duration (one-time only) */}
        {config.licenseType === 'one-time' && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">Duration</label>
            <div className="flex gap-2">
              {durations.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onChange({ duration: value })}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    config.duration === value ? 'bg-charcoal text-warm-white border-charcoal' : 'bg-white text-charcoal border-warm-border hover:border-charcoal/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Volume */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">
            Volume <span className="text-charcoal-muted font-normal">(content pieces)</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChange({ volume: Math.max(1, config.volume - 1) })}
              className="w-10 h-10 rounded-full border border-warm-border bg-white text-charcoal text-xl flex items-center justify-center hover:bg-warm-cream transition-colors"
            >
              −
            </button>
            <span className="w-16 text-center text-2xl font-semibold text-charcoal">{config.volume}</span>
            <button
              onClick={() => onChange({ volume: Math.min(100, config.volume + 1) })}
              className="w-10 h-10 rounded-full border border-warm-border bg-white text-charcoal text-xl flex items-center justify-center hover:bg-warm-cream transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Creator preview */}
        <div className="p-4 rounded-xl bg-warm-cream border border-warm-border">
          <div className="text-xs text-charcoal-muted uppercase tracking-wide mb-2">Creator Preview</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
              {creatorId.replace('IMA-', '')}
            </div>
            <div>
              <div className="font-medium text-charcoal text-sm">Creator: {creatorId}</div>
              <div className="text-xs text-charcoal-muted mt-0.5">Identity verified · Anonymized for privacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing summary — 40%, sticky */}
      <div className="lg:col-span-2 sticky top-20">
        <div className="card space-y-4">
          <h3 className="font-semibold text-charcoal text-lg">License Total</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-charcoal-muted">
              <span>Base price</span>
              <span>${base.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-charcoal-muted">
              <span>Category multiplier</span>
              <span>{catMult}×</span>
            </div>
            <div className="flex justify-between text-charcoal-muted">
              <span>Territory</span>
              <span>{terrMult}×</span>
            </div>
            {config.licenseType === 'one-time' && (
              <div className="flex justify-between text-charcoal-muted">
                <span>Duration</span>
                <span>{durMult}×</span>
              </div>
            )}
            <div className="flex justify-between text-charcoal-muted">
              <span>Volume</span>
              <span>× {config.volume} pieces</span>
            </div>

            <div className="border-t border-warm-border pt-2 flex justify-between font-medium text-charcoal">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <div className="border-t border-warm-border pt-2 space-y-1">
              <div className="flex justify-between text-charcoal-muted">
                <span>Creator earns (70%)</span>
                <span>${creatorEarns.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Platform fee (30%)</span>
                <span>${platformFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-warm-border pt-3 flex justify-between items-center">
              <span className="font-semibold text-charcoal text-base">Total</span>
              <span className="text-gold font-bold text-2xl">${total.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-charcoal-muted bg-warm-cream rounded-lg p-3">
            Escrow: Funds held 72 hours for creator approval before release.
          </p>

          <button
            onClick={onNext}
            disabled={!config.useCategory}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Review →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Step 1: Review Terms ─────────────────────────────────────────────────────

const DURATION_LABELS: Record<number, string> = { 30: '30 days', 90: '90 days', 180: '180 days', 365: '1 year' }
const CAT_LABELS: Record<string, string> = {
  'advertising': 'Advertising', 'film': 'Film & TV', 'streaming': 'Streaming',
  'gaming': 'Gaming', 'ai-training': 'AI Training', 'other': 'Other',
}
const TERR_LABELS: Record<string, string> = {
  'global': 'Global', 'multi-region': 'Multi-Region', 'single-country': 'Single Country',
}

function ReviewStep({
  config, creatorId, agreed, onAgree, onBack, onNext, total,
}: {
  config: LicenseConfig; creatorId: string; agreed: boolean
  onAgree: (v: boolean) => void; onBack: () => void; onNext: () => void; total: number
}) {
  const terrLabel = config.territory === 'single-country' && config.country ? config.country : TERR_LABELS[config.territory]

  const licenseText = `LICENSE AGREEMENT
Imagency Inc. — Digital Likeness License

Licensor: Creator #${creatorId}
Licensee: [Buyer Account Name]
License Type: ${config.licenseType}
Use Category: ${CAT_LABELS[config.useCategory] ?? config.useCategory}
Territory: ${terrLabel}
Duration: ${config.licenseType === 'one-time' ? DURATION_LABELS[config.duration] : 'Ongoing'}
Volume: ${config.volume} content pieces

TERMS:

1. Scope of License: Licensee may use AI-generated synthetic output of the licensed creator's likeness solely for the purposes described above.

2. Prohibited Uses: Licensee may not reproduce, modify, or sublicense the synthetic output for purposes outside the defined scope.

3. Liquidated Damages: Unauthorized use beyond the scope of this license triggers liquidated damages of $50,000 per violation.

4. Creator Anonymity: Licensee acknowledges that the creator's real identity is protected and may not be investigated, exposed, or disclosed.

5. Termination: Either party may terminate for cause. Upon termination, Licensee must immediately cease all use.

6. Governing Law: This agreement is governed by the laws of the State of Illinois.`

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-charcoal mb-1">Review your license terms</h2>
        <p className="text-sm text-charcoal-muted">Read the full agreement before proceeding to payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Terms + actions */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border border-warm-border rounded-xl p-6 max-h-96 overflow-y-auto bg-white">
            <pre className="text-sm text-charcoal font-mono whitespace-pre-wrap leading-relaxed">{licenseText}</pre>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">⚠ Liquidated Damages Clause:</span> Unauthorized use outside the scope of this license may result in damages of $50,000 per violation.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => onAgree(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-gold"
            />
            <span className="text-sm text-charcoal">
              I have read and agree to the license terms, including the liquidated damages clause.
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button onClick={onBack} className="btn-secondary px-6 py-3">← Back</button>
            <button
              onClick={onNext}
              disabled={!agreed}
              className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Proceed to Payment →
            </button>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-2">
          <div className="card space-y-3">
            <h3 className="font-semibold text-charcoal">License Summary</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Creator', `${creatorId} (anonymized)`],
                ['Type', config.licenseType],
                ['Category', CAT_LABELS[config.useCategory] ?? '—'],
                ['Territory', terrLabel],
                ...(config.licenseType === 'one-time' ? [['Duration', DURATION_LABELS[config.duration]]] : []),
                ['Volume', `${config.volume} pieces`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-charcoal-muted">{label}</span>
                  <span className="text-charcoal font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-warm-border pt-3 flex justify-between items-center">
              <span className="font-semibold text-charcoal">Total</span>
              <span className="text-gold font-bold text-xl">${total.toLocaleString()}</span>
            </div>
            <div className="bg-warm-cream rounded-lg p-3 text-xs text-charcoal-muted">
              Funds held in escrow for 72 hours after payment before release to creator.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: Payment ──────────────────────────────────────────────────────────

function PaymentStep({
  config, creatorId, total, paymentStatus, onPay, onBack,
}: {
  config: LicenseConfig; creatorId: string; total: number
  paymentStatus: PaymentStatus; onPay: () => void; onBack: () => void
}) {
  const [name, setName] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const formatCardNum = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    return clean.length >= 2 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-charcoal mb-1">Complete your purchase</h2>
        <p className="text-sm text-charcoal-muted">Secure checkout powered by Stripe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order summary */}
        <div className="card space-y-4">
          <h3 className="font-semibold text-charcoal">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Creator</span>
              <span className="text-charcoal font-medium">{creatorId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">License</span>
              <span className="text-charcoal capitalize text-right max-w-[60%]">
                {config.licenseType} · {CAT_LABELS[config.useCategory] ?? '—'} · {TERR_LABELS[config.territory]}
                {config.licenseType === 'one-time' ? ` · ${config.duration}d` : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Volume</span>
              <span className="text-charcoal">{config.volume} pieces</span>
            </div>
          </div>
          <div className="border-t border-warm-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-charcoal-muted">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-charcoal-muted">
              <span>Platform fee</span>
              <span>included</span>
            </div>
          </div>
          <div className="border-t border-warm-border pt-3 flex justify-between items-center">
            <span className="font-semibold text-charcoal">Total</span>
            <span className="text-gold font-bold text-2xl">${total.toLocaleString()}</span>
          </div>
          <div className="bg-warm-cream rounded-lg p-3 text-xs text-charcoal-muted">
            Funds held in escrow for 72 hours after payment before release to creator.
          </div>
        </div>

        {/* Payment form */}
        <div className="card space-y-5">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-charcoal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm text-charcoal-muted">Secure payment powered by Stripe</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-muted mb-1.5 uppercase tracking-wide">Cardholder Name</label>
              <input type="text" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-muted mb-1.5 uppercase tracking-wide">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={cardNum}
                onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                className="input-field font-mono"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-muted mb-1.5 uppercase tracking-wide">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className="input-field font-mono"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-muted mb-1.5 uppercase tracking-wide">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="input-field font-mono"
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-charcoal-muted">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            256-bit SSL encryption
          </div>

          <div className="flex gap-3">
            <button onClick={onBack} className="btn-secondary px-5 py-3">← Back</button>
            <button
              onClick={onPay}
              disabled={paymentStatus === 'processing'}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {paymentStatus === 'processing' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : 'Complete License Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({ creatorId, total }: { creatorId: string; total: number }) {
  const licenseId = useMemo(() => `LIC-${Math.floor(100000 + Math.random() * 900000)}`, [])
  const apiKey = useMemo(() => `ima_k_${Math.random().toString(36).substring(2, 11).toUpperCase()}`, [])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const faqs = [
    { q: 'How do I generate a render?', a: 'Send a POST request to the API endpoint with your creator ID and script. Include your API key in the Authorization header.' },
    { q: 'What format is the output?', a: 'MP4 for video, WAV for audio, PNG for images. Resolution and quality can be specified in the request body.' },
    { q: 'How many renders can I make?', a: 'Unlimited renders up to your licensed volume. Additional volume can be purchased separately.' },
    { q: 'When can I start using it?', a: 'Immediately after the 72-hour escrow period. You will receive an email notification when your license is active.' },
  ]

  function copyKey() {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-charcoal">License purchased successfully!</h2>
          <p className="text-charcoal-muted mt-2">
            License ID: <span className="font-mono font-semibold text-charcoal">{licenseId}</span>
          </p>
        </div>
      </div>

      {/* API credentials terminal card */}
      <div className="bg-charcoal rounded-2xl p-6 text-left space-y-3">
        <div className="text-xs text-warm-white/50 uppercase tracking-widest mb-4">API Credentials</div>
        <div className="space-y-3 font-mono text-sm">
          <div>
            <span className="text-gold">API Endpoint:</span>
            <span className="text-warm-white ml-2">https://api.imagency.io/v1/render</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gold">API Key:</span>
            <span className="text-warm-white ml-2 flex-1 min-w-0 truncate">{apiKey}</span>
            <button
              onClick={copyKey}
              className="text-xs px-2 py-1 rounded border border-warm-white/20 text-warm-white/70 hover:text-warm-white hover:border-warm-white/40 transition-colors flex-shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div>
            <span className="text-gold">Creator ID:</span>
            <span className="text-warm-white ml-2">{creatorId}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => alert('Asset pack download initiated — available after 72-hour escrow period.')}
          className="btn-secondary"
        >
          Download Asset Pack
        </button>
        <a href="/buyer/dashboard" className="btn-primary">
          Go to License Dashboard →
        </a>
      </div>

      {/* FAQ accordion */}
      <div className="text-left space-y-2">
        <h3 className="font-semibold text-charcoal mb-4">How to use your license</h3>
        {faqs.map((faq, i) => (
          <div key={i} className="border border-warm-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-warm-cream/50 transition-colors"
            >
              <span className="font-medium text-charcoal text-sm">{faq.q}</span>
              <svg
                className={`w-4 h-4 text-charcoal-muted flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === i && (
              <div className="px-5 py-4 bg-warm-cream/30 text-sm text-charcoal-muted border-t border-warm-border">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { number: 1, label: 'Configure' },
  { number: 2, label: 'Review Terms' },
  { number: 3, label: 'Payment' },
]

function LicensePageInner() {
  const searchParams = useSearchParams()
  const creatorId = searchParams.get('creator') || 'IMA-4827'

  const [currentStep, setCurrentStep] = useState(0)
  const [licenseConfig, setLicenseConfig] = useState<LicenseConfig>({
    licenseType: 'one-time',
    useCategory: 'advertising',
    mediaTypes: ['Digital/Social'],
    territory: 'global',
    country: '',
    duration: 90,
    volume: 1,
  })
  const [agreed, setAgreed] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')

  const { total } = calcPrice(licenseConfig)

  function handlePay() {
    setPaymentStatus('processing')
    setTimeout(() => setPaymentStatus('complete'), 2000)
  }

  if (paymentStatus === 'complete') {
    return (
      <div className="min-h-screen bg-warm-white">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
          <SuccessState creatorId={creatorId} total={total} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="py-8 border-b border-warm-border mb-8">
          <h1 className="text-3xl font-bold text-charcoal">License Builder</h1>
          <p className="text-charcoal-muted mt-1">Configure and purchase a digital likeness license.</p>
        </div>

        {/* Wizard */}
        <div className="mb-10 flex justify-center overflow-x-auto pb-2">
          <StepWizard steps={WIZARD_STEPS} currentStep={currentStep + 1} />
        </div>

        {/* Step content */}
        {currentStep === 0 && (
          <ConfigureStep
            config={licenseConfig}
            onChange={(updates) => setLicenseConfig((prev) => ({ ...prev, ...updates }))}
            creatorId={creatorId}
            onNext={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 1 && (
          <ReviewStep
            config={licenseConfig}
            creatorId={creatorId}
            agreed={agreed}
            onAgree={setAgreed}
            onBack={() => setCurrentStep(0)}
            onNext={() => setCurrentStep(2)}
            total={total}
          />
        )}
        {currentStep === 2 && (
          <PaymentStep
            config={licenseConfig}
            creatorId={creatorId}
            total={total}
            paymentStatus={paymentStatus}
            onPay={handlePay}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default function LicensePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-warm-white flex items-center justify-center">
          <div className="text-charcoal-muted">Loading...</div>
        </div>
      }
    >
      <LicensePageInner />
    </Suspense>
  )
}
