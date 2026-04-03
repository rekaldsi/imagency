export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="text-2xl font-bold tracking-tight">PERSONA</div>
        <div className="flex gap-6 text-sm text-white/60">
          <a href="/creator" className="hover:text-white transition-colors">For Creators</a>
          <a href="/buyer" className="hover:text-white transition-colors">For Buyers</a>
        </div>
        <div className="flex gap-3">
          <a href="/login" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">Sign in</a>
          <a href="/creator/register" className="px-4 py-2 text-sm bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">Register Your Likeness</a>
        </div>
      </nav>

      <section className="px-8 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="text-sm text-white/40 uppercase tracking-widest mb-6">Likeness Rights Management</div>
        <h1 className="text-6xl font-bold tracking-tight leading-tight mb-8">
          Your likeness.<br />
          Your rules.<br />
          Your revenue.
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mb-12">
          Register your face, voice, and persona. Brands and studios license 
          AI-generated representations of you. You earn royalties — without 
          ever showing up on set.
        </p>
        <div className="flex gap-4">
          <a href="/creator/register" className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-colors">
            Register Your Likeness
          </a>
          <a href="/buyer" className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-lg hover:border-white/50 transition-colors">
            Browse Talent
          </a>
        </div>
      </section>

      <section className="px-8 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-12">
          <div>
            <div className="text-3xl font-bold mb-3">70%</div>
            <div className="text-white/60">of every license goes directly to you. No agent. No middleman.</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-3">100%</div>
            <div className="text-white/60">control over what you allow. Set your terms. Revoke anytime.</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-3">0</div>
            <div className="text-white/60">raw biometric data ever leaves the platform. Buyers get AI-generated output only.</div>
          </div>
        </div>
      </section>
    </main>
  )
}
