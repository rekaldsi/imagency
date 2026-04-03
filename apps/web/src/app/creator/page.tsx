'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PriceCalculator from '@/components/PriceCalculator'
import Link from 'next/link'
import { useState } from 'react'

// ─── FAQ Accordion ─────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Who can license my likeness?',
    a: 'Approved brands, studios, advertising agencies, and AI companies. Each buyer is vetted before gaining access to the platform.',
  },
  {
    q: 'Can I remove myself?',
    a: 'Yes, anytime. Submit a deletion request from your dashboard and we purge all biometric data within 30 days.',
  },
  {
    q: 'What if someone uses my likeness without permission?',
    a: 'Every license includes a liquidated damages clause. Unauthorized use triggers automatic legal escalation through our enforcement partners.',
  },
  {
    q: 'How do I get paid?',
    a: 'Via Stripe. Payouts are processed weekly with a minimum threshold of $25. View all pending and past earnings in your dashboard.',
  },
  {
    q: 'Is this legal?',
    a: 'Yes. Imagency operates under the Illinois BIPA framework and complies with applicable state biometric privacy laws and emerging AI content regulations.',
  },
  {
    q: "What's the difference from stock photography?",
    a: "You earn ongoing royalties, not a one-time fee. And only AI-generated synthetic output is delivered to buyers — your actual photos are encrypted and never shared.",
  },
]

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col divide-y divide-warm-border border border-warm-border rounded-2xl overflow-hidden">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left flex items-center justify-between px-6 py-5 bg-white hover:bg-warm-cream transition-colors"
          >
            <span className="font-semibold text-charcoal text-sm md:text-base pr-4">{item.q}</span>
            <span className="flex-shrink-0 text-gold text-xl font-light">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 pt-1 bg-white text-charcoal-muted text-sm leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Earnings Calculator ────────────────────────────────────────────────────

const USE_CATEGORIES = [
  { label: 'Advertising', value: 'advertising' },
  { label: 'Film & TV', value: 'film_tv' },
  { label: 'Streaming', value: 'streaming' },
  { label: 'Gaming', value: 'gaming' },
]

const DURATIONS = [
  { label: '30 days', value: '30-days' },
  { label: '90 days', value: '90-days' },
  { label: '6 months', value: '6-months' },
  { label: '1 year', value: '1-year' },
]

const GEOGRAPHIES = [
  { label: 'Single Country', value: 'single-country' },
  { label: 'North America', value: 'north-america' },
  { label: 'Global', value: 'global' },
]

function EarningsCalculator() {
  const [useCategory, setUseCategory] = useState('advertising')
  const [duration, setDuration] = useState('90-days')
  const [geography, setGeography] = useState('north-america')
  const [price, setPrice] = useState(0)

  const config = {
    type: 'one-time',
    useCategory,
    mediaTypes: ['video'],
    geography,
    duration,
    volume: 1,
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Use Category</label>
          <div className="grid grid-cols-2 gap-2">
            {USE_CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setUseCategory(c.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  useCategory === c.value
                    ? 'bg-gold border-gold text-charcoal'
                    : 'bg-white border-warm-border text-charcoal-muted hover:border-gold/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Duration</label>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => setDuration(d.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  duration === d.value
                    ? 'bg-gold border-gold text-charcoal'
                    : 'bg-white border-warm-border text-charcoal-muted hover:border-gold/50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Territory</label>
          <div className="flex flex-col gap-2">
            {GEOGRAPHIES.map((g) => (
              <button
                key={g.value}
                onClick={() => setGeography(g.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors text-left ${
                  geography === g.value
                    ? 'bg-gold border-gold text-charcoal'
                    : 'bg-white border-warm-border text-charcoal-muted hover:border-gold/50'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <PriceCalculator config={config} onPriceChange={setPrice} />
        <div className="bg-warm-cream border border-warm-border rounded-xl p-4">
          <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">Your take-home (70%)</div>
          <div className="text-3xl font-bold text-charcoal">${Math.round(price * 0.7).toLocaleString()}</div>
          <div className="text-xs text-charcoal-muted mt-1">Per license · Paid weekly via Stripe</div>
        </div>
        <p className="text-xs text-charcoal-muted leading-relaxed">
          Prices vary by industry, territory, and usage duration. Most advertising licenses run $500–$2,000.
        </p>
      </div>
    </div>
  )
}

// ─── Permission Badge ────────────────────────────────────────────────────────

const PERMISSIONS = [
  { label: 'Advertising', state: 'on' },
  { label: 'Film & TV', state: 'on' },
  { label: 'Streaming', state: 'on' },
  { label: 'Gaming', state: 'toggle' },
  { label: 'AI Training', state: 'toggle-premium' },
  { label: 'Adult', state: 'off' },
  { label: 'Political', state: 'off' },
]

function PermissionBadge({ label, state }: { label: string; state: string }) {
  if (state === 'on') {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 bg-white border border-warm-border rounded-xl">
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
        <span className="text-sm font-medium text-charcoal">{label}</span>
      </div>
    )
  }
  if (state === 'toggle') {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 bg-white border border-warm-border rounded-xl">
        <span className="text-sm font-medium text-charcoal-muted">{label}</span>
        <div className="ml-auto w-9 h-5 bg-warm-border rounded-full relative flex-shrink-0">
          <div className="w-3.5 h-3.5 rounded-full bg-charcoal-muted absolute top-0.5 left-0.5" />
        </div>
      </div>
    )
  }
  if (state === 'toggle-premium') {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gold/5 border border-gold/30 rounded-xl">
        <span className="text-sm font-medium text-charcoal">{label}</span>
        <span className="ml-auto text-xs bg-gold/20 text-gold font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">Premium</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-warm-cream border border-warm-border rounded-xl opacity-60">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-400 flex items-center justify-center text-white text-xs font-bold">✕</span>
      <span className="text-sm font-medium text-charcoal-muted">{label}</span>
      <span className="ml-auto text-xs text-charcoal-muted flex-shrink-0">Locked</span>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CreatorLanding() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 max-w-5xl mx-auto text-center">
        <div className="inline-block text-xs font-semibold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full mb-8">
          For Creators
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.08] tracking-tight mb-6">
          Your identity is worth<br />more than you think.
        </h1>
        <p className="text-lg md:text-xl text-charcoal-muted leading-relaxed max-w-2xl mx-auto mb-10">
          Register your likeness with full legal consent. Earn 70% every time a brand, studio, or AI company uses an AI-generated version of you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/creator/register" className="btn-primary text-base px-8 py-4 rounded-full">
            Register Your Likeness
          </Link>
          <a href="#how-it-works" className="text-charcoal-muted font-medium py-4 hover:text-charcoal transition-colors">
            See how it works ↓
          </a>
        </div>
        <div className="inline-flex items-center gap-3 bg-white border border-warm-border rounded-full px-5 py-3 shadow-sm">
          <span className="text-gold font-bold">$</span>
          <span className="text-sm text-charcoal">
            Average creator earns <strong>$340/mo</strong> in their first 3 months
          </span>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section id="how-it-works" className="px-6 py-20 bg-warm-cream border-y border-warm-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">See what you could earn</h2>
            <p className="text-charcoal-muted">Configure a license scenario to see the payout breakdown.</p>
          </div>
          <EarningsCalculator />
        </div>
      </section>

      {/* What gets captured */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">What we capture — and what we don&apos;t</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: '📷',
              title: 'Your Face',
              desc: 'Photos from multiple angles for 3D modeling. Used to generate AI likenesses only.',
              note: 'Raw photos: encrypted, never shared.',
            },
            {
              icon: '🎙',
              title: 'Your Voice',
              desc: 'A voice sample read from a phonetically balanced script. Used to synthesize speech.',
              note: 'Raw audio: encrypted, never shared.',
            },
            {
              icon: '✨',
              title: 'Your Persona',
              desc: 'Your energy, brand alignment, and personality archetype. Helps buyers find the right fit.',
              note: 'Purely descriptive — no biometrics.',
            },
          ].map((item) => (
            <div key={item.title} className="card flex flex-col gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <div className="font-bold text-charcoal text-lg mb-2">{item.title}</div>
                <p className="text-charcoal-muted text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-full inline-block">{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-charcoal rounded-2xl p-8 text-warm-white">
          <h3 className="text-lg font-bold mb-5">What we DON&apos;T capture</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Retinal scans', 'Fingerprints', 'DNA samples', 'Medical data'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-warm-white/70">
                <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permissions Preview */}
      <section className="px-6 py-20 bg-warm-cream border-y border-warm-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">You decide. Always.</h2>
            <p className="text-charcoal-muted max-w-xl mx-auto">
              Set your permissions once. Update them anytime. Buyers only see what you&apos;ve explicitly allowed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {PERMISSIONS.map((p) => (
              <PermissionBadge key={p.label} label={p.label} state={p.state} />
            ))}
          </div>
          <p className="text-center text-sm text-charcoal-muted mt-4">
            Full permissions matrix available in your dashboard after registration.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Frequently asked questions</h2>
        </div>
        <FAQAccordion />
      </section>

      {/* Social Proof */}
      <section className="px-6 py-20 bg-warm-cream border-y border-warm-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Creators are already earning</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I've earned $4,200 in 6 months without ever being on a set.", name: 'Maya T.', location: 'Chicago', avatar: 1 },
              { quote: 'It took 20 minutes to register. Now I get deposit notifications every week.', name: 'James R.', location: 'Atlanta', avatar: 17 },
              { quote: 'Finally a platform that treats creators like the talent we are.', name: 'Sofia M.', location: 'Los Angeles', avatar: 25 },
            ].map((t) => (
              <div key={t.name} className="card flex flex-col gap-4">
                <div className="flex items-center gap-0.5 text-gold">
                  {[1, 2, 3, 4, 5].map((n) => <span key={n} className="text-sm">★</span>)}
                </div>
                <p className="text-charcoal text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={`https://i.pravatar.cc/48?img=${t.avatar}`}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-warm-border"
                  />
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                    <div className="text-xs text-charcoal-muted">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Join 2,400+ creators. Register in 20 minutes.
          </h2>
          <p className="text-charcoal-muted mb-10 text-lg">Your likeness is an asset. Start earning royalties.</p>
          <Link href="/creator/register" className="btn-primary text-base px-10 py-4 rounded-full">
            Register Your Likeness
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
