'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import StepWizard from '@/components/StepWizard'
import PriceCalculator from '@/components/PriceCalculator'
import Footer from '@/components/Footer'

const STEPS = [
  { number: 1, label: 'Configure' },
  { number: 2, label: 'Review Terms' },
  { number: 3, label: 'Payment' },
]

export default function LicensePage() {
  const [step, setStep] = useState(1)
  const [price, setPrice] = useState(300)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [licenseId] = useState(() => 'LIC-' + Math.floor(1000 + Math.random() * 9000))
  const [apiKey] = useState(() => 'sk_ima_' + Math.random().toString(36).substring(2, 10) + '...' + Math.random().toString(36).substring(2, 6))

  if (purchased) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-charcoal mb-4">License purchased!</h1>
          <p className="text-charcoal-muted text-lg mb-8">
            Your funds are held in escrow. API access unlocks in 72 hours once the creator confirms.
          </p>

          {/* License Details */}
          <div className="bg-white rounded-2xl border border-warm-border p-6 mb-6 text-left">
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs text-charcoal-muted uppercase tracking-wide mb-1">License ID</div>
                <div className="text-xl font-bold text-charcoal font-mono">{licenseId}</div>
              </div>
              <div>
                <div className="text-xs text-charcoal-muted uppercase tracking-wide mb-1">API Endpoint</div>
                <div className="font-mono text-sm text-charcoal bg-warm-cream rounded-lg px-4 py-2.5">
                  https://api.imagency.io/v1/render
                </div>
              </div>
              <div>
                <div className="text-xs text-charcoal-muted uppercase tracking-wide mb-1">API Key (unlocks in 72h)</div>
                <div className="font-mono text-sm text-charcoal-muted bg-warm-cream rounded-lg px-4 py-2.5">
                  {apiKey}
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-3 border border-warm-border text-charcoal font-medium rounded-full mb-4 hover:bg-warm-cream transition-colors">
            Download Asset Pack (mock)
          </button>

          {/* FAQ */}
          <div className="text-left">
            <h3 className="font-semibold text-charcoal mb-4">How to use your license</h3>
            <div className="flex flex-col gap-3">
              {[
                { q: 'When does API access unlock?', a: 'After 72 hours when escrow is released to the creator.' },
                { q: 'What can I generate?', a: 'AI-generated synthetic representations of the licensed creator, within your agreed scope.' },
                { q: 'How do I track usage?', a: 'All API calls are logged in your Buyer Dashboard under License Management.' },
                { q: 'What if I exceed my volume?', a: 'You\'ll receive a warning at 80% usage. Contact us to extend or upgrade.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-xl border border-warm-border">
                  <summary className="px-5 py-4 cursor-pointer font-medium text-charcoal text-sm list-none flex items-center justify-between">
                    {q}
                    <span className="text-charcoal-muted group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-charcoal-muted">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 overflow-x-auto pb-2">
          <StepWizard steps={STEPS} currentStep={step} />
        </div>

        <div className="bg-white rounded-2xl border border-warm-border p-8">
          {/* Step 1: Configure License */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Configure your license</h2>
              <p className="text-charcoal-muted mb-8">Choose scope, duration, and geography. Price updates in real-time.</p>
              <PriceCalculator onChange={(_, p) => setPrice(p)} />
            </div>
          )}

          {/* Step 2: Review Terms */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Review license terms</h2>
              <p className="text-charcoal-muted mb-6">Review the full terms before proceeding to payment.</p>

              <div className="bg-warm-cream rounded-xl border border-warm-border p-5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div>
                    <div className="font-medium text-charcoal text-sm">Creator #IMA-2001</div>
                    <div className="text-xs text-charcoal-muted">Name hidden until license is active</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">License type</span>
                    <span className="text-charcoal font-medium">One-Time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Use category</span>
                    <span className="text-charcoal font-medium">Advertising</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Territory</span>
                    <span className="text-charcoal font-medium">United States</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Duration</span>
                    <span className="text-charcoal font-medium">30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">License fee</span>
                    <span className="font-bold text-charcoal">${price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border border-warm-border rounded-xl mb-6 overflow-hidden">
                <div className="px-5 py-3 bg-warm-cream border-b border-warm-border text-xs font-semibold text-charcoal-muted uppercase tracking-widest">
                  License Agreement
                </div>
                <div className="h-48 overflow-y-auto p-5 text-sm text-charcoal-muted leading-relaxed">
                  <p className="mb-3">This Synthetic Likeness License Agreement ("Agreement") grants Licensee the right to use AI-generated synthetic representations of Creator #IMA-2001's visual and vocal likeness solely for the purpose and scope described above.</p>
                  <p className="mb-3"><strong className="text-charcoal">Permitted Uses:</strong> Licensee may use the synthetic representations for advertising and promotional content in the specified territory and duration only.</p>
                  <p className="mb-3"><strong className="text-charcoal">Prohibited Uses:</strong> Licensee may not use representations beyond the licensed scope, sub-license to third parties, use for political content, adult content, or in ways that misrepresent the Creator's views or identity.</p>
                  <p className="mb-3"><strong className="text-charcoal">Liquidated Damages Clause:</strong> Any use beyond the licensed scope constitutes a breach triggering liquidated damages of $50,000 per violation, plus attorney's fees and court costs. Licensee expressly acknowledges this clause.</p>
                  <p>Imagency maintains an immutable audit log of all API usage and render generation. This log may be used as evidence in enforcement proceedings.</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-yellow-600 text-lg">⚠</span>
                  <div className="text-sm text-yellow-800">
                    <strong>Liquidated damages highlighted:</strong> Unauthorized use beyond the licensed scope triggers automatic damages of $50,000 per violation. This is a legally binding clause.
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold"
                />
                <span className="text-sm text-charcoal">
                  I agree to the license terms, including the liquidated damages clause of $50,000 per violation for unauthorized use.
                </span>
              </label>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Complete payment</h2>
              <p className="text-charcoal-muted mb-8">Funds are held in escrow for 72 hours while the creator confirms.</p>

              <div className="bg-warm-cream rounded-xl border border-warm-border p-5 mb-6">
                <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-3">Price breakdown</div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">License fee</span>
                    <span className="text-charcoal">${Math.round(price * 0.7).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Platform fee (30%)</span>
                    <span className="text-charcoal">${Math.round(price * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-warm-border pt-2 flex justify-between font-bold text-charcoal">
                    <span>Total</span>
                    <span>${price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stripe Elements mock */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Card number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-warm-border rounded-xl text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-charcoal font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full px-4 py-3 border border-warm-border rounded-xl text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-charcoal font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="•••"
                      className="w-full px-4 py-3 border border-warm-border rounded-xl text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-charcoal font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6 text-sm text-charcoal">
                <strong>🔒 Funds held 72 hours in escrow.</strong> Released to the creator only after your API access is confirmed. Refundable if creator declines.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-warm-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-6 py-2.5 border border-warm-border text-charcoal font-medium rounded-full hover:bg-warm-cream transition-colors"
              >
                ← Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 2 && !termsAgreed}
                className="px-8 py-2.5 bg-charcoal text-warm-white font-semibold rounded-full hover:bg-charcoal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPurchased(true)}
                className="px-8 py-2.5 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold/90 transition-colors"
              >
                Complete License Purchase
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
