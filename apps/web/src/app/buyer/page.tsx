import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BuyerLanding() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block text-xs font-semibold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full mb-6">
              For Brands, Studios &amp; AI Companies
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-charcoal leading-[1.08] tracking-tight mb-6">
              License human likeness.<br />Ethically and legally.
            </h1>
            <p className="text-lg text-charcoal-muted leading-relaxed mb-10">
              Search 2,400+ verified creators. Preview, configure, and license AI-generated likenesses with full consent documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/buyer/search" className="btn-primary text-base px-8 py-4 rounded-full text-center">
                Browse Talent
              </Link>
              <Link
                href="/buyer/register"
                className="btn-secondary text-base px-8 py-4 rounded-full text-center"
              >
                Create Buyer Account
              </Link>
            </div>
          </div>

          {/* Search Preview Mockup */}
          <div className="hidden md:block bg-warm-cream rounded-2xl border border-warm-border p-6">
            <div className="flex gap-3 mb-5">
              <input
                readOnly
                value="Search by appearance, voice, or persona..."
                className="flex-1 px-4 py-2.5 bg-white border border-warm-border rounded-xl text-sm text-charcoal-muted cursor-default"
              />
              <button className="px-5 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold/90 transition-colors">
                Search
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 16, 48, 33, 57, 8].map((seed) => (
                <div key={seed} className="aspect-square rounded-xl overflow-hidden">
                  <img src={`https://i.pravatar.cc/200?img=${seed}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-charcoal-muted">2,400+ consented creators available</div>
          </div>
        </div>
      </section>

      {/* Why legally clean */}
      <section className="px-6 py-20 bg-warm-cream border-y border-warm-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Built for legal compliance</h2>
            <p className="text-charcoal-muted max-w-xl mx-auto">
              Every element of the platform is designed to protect buyers and creators equally.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: '✍️',
                title: 'Signed consent',
                desc: 'Every creator has signed a legally binding consent agreement with granular use-category permissions.',
              },
              {
                icon: '⚖️',
                title: 'Liquidated damages',
                desc: 'Contracts include enforcement teeth. Misuse triggers automatic remedies.',
              },
              {
                icon: '🛡',
                title: 'Biometric law compliant',
                desc: 'Designed under BIPA, CCPA, and emerging AI content laws across all major jurisdictions.',
              },
              {
                icon: '📋',
                title: 'Audit trail',
                desc: 'Every API call logged. Every render tracked. Full usage audit available on demand.',
              },
            ].map((card) => (
              <div key={card.title} className="card flex flex-col gap-3">
                <div className="text-2xl">{card.icon}</div>
                <div className="font-bold text-charcoal">{card.title}</div>
                <p className="text-charcoal-muted text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License types */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">License types for every use case</h2>
          <p className="text-charcoal-muted max-w-xl mx-auto">Choose the model that fits your production workflow.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'One-Time License',
              badge: 'Single projects',
              price: 'From $500',
              desc: 'Single campaign or project. Full usage rights for defined period, territory, and media type.',
              link: '/buyer/search',
            },
            {
              title: 'Subscription',
              badge: 'Best for agencies',
              price: 'From $200/mo per creator',
              desc: 'Ongoing access for multiple projects. Lock in a creator for continuous campaign use.',
              link: '/buyer/search',
            },
            {
              title: 'Royalty-Based',
              badge: 'Performance campaigns',
              price: 'From 5% of ad spend',
              desc: 'Pay per use, report revenue. Best for performance-driven campaigns with variable scale.',
              link: '/buyer/search',
            },
          ].map((type) => (
            <div key={type.title} className="relative card flex flex-col gap-4">
              <div className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full self-start">
                {type.badge}
              </div>
              <div>
                <div className="font-bold text-charcoal text-xl mb-1">{type.title}</div>
                <div className="text-gold font-semibold text-sm">{type.price}</div>
              </div>
              <p className="text-charcoal-muted text-sm leading-relaxed flex-1">{type.desc}</p>
              <Link href={type.link} className="text-sm font-semibold text-gold hover:underline">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Search Preview */}
      <section className="px-6 py-20 bg-warm-cream border-y border-warm-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">Find the right talent</h2>
              <p className="text-charcoal-muted">Filter by look, voice, age, and use category.</p>
            </div>
            <Link href="/buyer/search" className="text-sm font-semibold text-gold hover:underline whitespace-nowrap">
              Search all creators →
            </Link>
          </div>

          {/* Filter pills mockup */}
          <div className="flex gap-2 flex-wrap mb-6">
            {['Age 25–35', 'Female', 'American accent', 'Advertising'].map((pill) => (
              <span key={pill} className="text-xs font-medium text-charcoal bg-white border border-warm-border px-3 py-1.5 rounded-full">
                {pill}
              </span>
            ))}
          </div>

          {/* Creator grid preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { seed: 1, name: 'Maya T.', age: '25–34', voice: 'Alto' },
              { seed: 25, name: 'Sofia M.', age: '18–24', voice: 'Soprano' },
              { seed: 48, name: 'Priya S.', age: '28–38', voice: 'Mezzo' },
              { seed: 8, name: 'Hannah K.', age: '25–35', voice: 'Soprano' },
              { seed: 13, name: 'Fatima O.', age: '25–35', voice: 'Alto' },
              { seed: 39, name: 'Mei L.', age: '25–34', voice: 'Soprano' },
            ].map((c) => (
              <div key={c.seed} className="bg-white rounded-2xl border border-warm-border overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={`https://i.pravatar.cc/400?img=${c.seed}`} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-charcoal text-sm">{c.name}</div>
                  <div className="text-xs text-charcoal-muted">{c.age} · {c.voice}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/buyer/search" className="btn-primary px-8 py-3 rounded-full">
              Search all creators →
            </Link>
          </div>
        </div>
      </section>

      {/* API Integration */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Integrate in minutes</h2>
          <p className="text-charcoal-muted max-w-xl mx-auto">
            One API call. Returns a watermarked preview or licensed render depending on your credentials.
          </p>
        </div>

        {/* Code block */}
        <div className="bg-charcoal rounded-2xl p-6 mb-8 overflow-x-auto">
          <pre className="text-sm text-warm-white/90 font-mono leading-relaxed whitespace-pre">{`curl -X POST https://api.imagency.io/v1/render \\
  -H "Authorization: Bearer {YOUR_API_KEY}" \\
  -d '{"creator_id": "IMA-1042", "script": "Welcome back..."}'`}</pre>
        </div>

        <p className="text-center text-sm text-charcoal-muted mb-10">
          Returns a watermarked preview or licensed render depending on your credentials.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { n: '1', title: 'Get API key after purchase', desc: 'Create a buyer account and complete your first license.' },
            { n: '2', title: 'Send render request', desc: 'POST to /v1/render with your creator ID and script content.' },
            { n: '3', title: 'Receive synthetic output in seconds', desc: 'Licensed renders delivered as MP4 or WAV within ~10 seconds.' },
          ].map((step) => (
            <div key={step.n} className="card flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 text-gold font-bold text-sm flex items-center justify-center flex-shrink-0">
                {step.n}
              </div>
              <div className="font-semibold text-charcoal text-sm">{step.title}</div>
              <p className="text-charcoal-muted text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="text-sm font-semibold text-gold hover:underline">
            Full API documentation →
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 bg-charcoal text-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start licensing today.
          </h2>
          <p className="text-warm-white/70 text-lg mb-10">
            Vetted creators. Instant digital contracts. Full legal protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buyer/search"
              className="px-8 py-4 bg-gold text-charcoal font-semibold rounded-full text-center hover:bg-gold/90 transition-colors"
            >
              Browse Talent
            </Link>
            <Link
              href="/buyer/register"
              className="px-8 py-4 border-2 border-warm-white/30 text-warm-white font-semibold rounded-full text-center hover:border-warm-white/60 transition-colors"
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
