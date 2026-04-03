'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Step5SignatureProps {
  onComplete: () => void
  onBack: () => void
}

export default function Step5Signature({ onComplete, onBack }: Step5SignatureProps) {
  const [agreed, setAgreed] = useState(false)
  const [signatureMode, setSignatureMode] = useState<'type' | 'draw'>('type')
  const [typedSignature, setTypedSignature] = useState('')
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false)
  const [legalExpanded, setLegalExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [registrationId] = useState(() => 'IMA-' + Math.floor(1000 + Math.random() * 9000))

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  const hasSignature =
    signatureMode === 'type' ? typedSignature.trim().length > 0 : hasDrawnSignature

  const canSubmit = agreed && hasSignature

  // Canvas drawing setup
  useEffect(() => {
    if (signatureMode !== 'draw') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (e instanceof TouchEvent) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      isDrawingRef.current = true
      lastPosRef.current = getPos(e)
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      if (!isDrawingRef.current || !lastPosRef.current) return
      const pos = getPos(e)
      ctx.beginPath()
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = '#1A1A1A'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.stroke()
      lastPosRef.current = pos
      setHasDrawnSignature(true)
    }

    const onEnd = () => {
      isDrawingRef.current = false
      lastPosRef.current = null
    }

    canvas.addEventListener('mousedown', onStart)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseup', onEnd)
    canvas.addEventListener('mouseleave', onEnd)
    canvas.addEventListener('touchstart', onStart, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: false })
    canvas.addEventListener('touchend', onEnd)

    return () => {
      canvas.removeEventListener('mousedown', onStart)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseup', onEnd)
      canvas.removeEventListener('mouseleave', onEnd)
      canvas.removeEventListener('touchstart', onStart)
      canvas.removeEventListener('touchmove', onMove)
      canvas.removeEventListener('touchend', onEnd)
    }
  }, [signatureMode])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawnSignature(false)
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    onComplete()
  }

  // Success state
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-charcoal mb-3">Registration submitted!</h2>
        <p className="text-charcoal-muted mb-8">
          You&apos;ll receive a confirmation email shortly.
        </p>
        <div className="bg-warm-cream rounded-xl border border-warm-border p-6 mb-6 text-left">
          <p className="text-xs text-charcoal-muted uppercase tracking-widest mb-1 font-medium">Your Registration ID</p>
          <p className="text-2xl font-bold text-charcoal font-mono">{registrationId}</p>
          <p className="text-sm text-charcoal-muted mt-2">Save this for your records.</p>
        </div>
        <p className="text-sm text-charcoal-muted mb-6">
          Check your email to verify your account, then complete ID verification to go live.
        </p>
        <Link href="/dashboard/creator" className="btn-primary inline-flex">
          Go to Dashboard →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border">
      <h2 className="text-2xl font-bold text-charcoal mb-1">Review & sign your consent agreement</h2>
      <p className="text-charcoal-muted mb-8">
        This legally binding agreement establishes your rights as a creator on Imagency.
      </p>

      <div className="space-y-6">
        {/* Summary card */}
        <div className="bg-warm-cream rounded-xl border border-warm-border p-6">
          <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-4">You are registering:</p>
          <ul className="space-y-2 mb-4">
            {[
              'Face & Photos',
              'Voice Profile',
              'Usage Permissions',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-charcoal">
                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item === 'Usage Permissions' ? (
                  <span>
                    {item}{' '}
                    <button
                      type="button"
                      onClick={onBack}
                      className="text-gold hover:underline text-xs"
                    >
                      (edit)
                    </button>
                  </span>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-xs text-charcoal-muted bg-warm-border/50 rounded-lg px-3 py-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Registration ID will be assigned upon completion
          </div>
        </div>

        {/* Consent Agreement */}
        <div className="border border-warm-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 bg-warm-cream border-b border-warm-border">
            <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest">Consent Agreement</p>
          </div>
          <div className="max-h-64 overflow-y-auto p-5 text-sm text-charcoal-muted leading-relaxed">
            <div className="mb-4">
              <p className="font-semibold text-charcoal mb-2">Plain Language Summary</p>
              <p className="mb-2">
                By registering with Imagency, you grant us the right to store encrypted representations of your likeness and generate AI-based synthetic outputs for licensing to approved buyers.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                  You retain ownership of your biometric data.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                  You can revoke your consent and request data deletion at any time.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                  Buyers never receive raw biometric data — only AI-generated outputs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                  <span><strong className="text-charcoal">You earn 70%</strong> of all license fees. Imagency takes a 30% platform fee.</span>
                </li>
              </ul>
            </div>

            {/* Expandable legal section */}
            <div className="border-t border-warm-border pt-4">
              <button
                type="button"
                onClick={() => setLegalExpanded((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium text-charcoal hover:text-gold transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${legalExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View full legal agreement
              </button>
              {legalExpanded && (
                <div className="mt-3 text-xs text-charcoal-muted leading-relaxed space-y-2">
                  <p>
                    This Creator Registration Agreement (&quot;Agreement&quot;) is entered into between the undersigned creator (&quot;Creator&quot;) and Imagency, Inc. (&quot;Platform&quot;).
                  </p>
                  <p>
                    Creator grants Platform a non-exclusive (unless exclusivity is separately agreed), worldwide right to use Creator&apos;s likeness, voice, and persona solely for the purpose of generating synthetic AI representations for licensing to approved buyers, subject to the permissions matrix selected by Creator.
                  </p>
                  <p>
                    Platform agrees to remit 70% of net license revenue to Creator within 14 days of receipt. All biometric data is processed and stored in compliance with applicable biometric information privacy acts. Creator retains full ownership of their underlying likeness rights.
                  </p>
                  <p>
                    Any unauthorized use by a buyer beyond the scope of their license agreement triggers automatic liquidated damages of $50,000 per violation, plus attorney&apos;s fees. Imagency will pursue enforcement on Creator&apos;s behalf.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agree checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
          />
          <span className="text-sm text-charcoal">
            I have read and agree to the consent agreement, including the Creator Registration Agreement and liquidated damages clause.
          </span>
        </label>

        {/* Digital signature */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Digital signature</label>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSignatureMode('type')}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors font-medium ${
                signatureMode === 'type'
                  ? 'border-charcoal bg-charcoal text-warm-white'
                  : 'border-warm-border text-charcoal-muted hover:border-charcoal'
              }`}
            >
              Type your name
            </button>
            <button
              type="button"
              onClick={() => setSignatureMode('draw')}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors font-medium ${
                signatureMode === 'draw'
                  ? 'border-charcoal bg-charcoal text-warm-white'
                  : 'border-warm-border text-charcoal-muted hover:border-charcoal'
              }`}
            >
              Draw signature
            </button>
          </div>

          {signatureMode === 'type' ? (
            <input
              type="text"
              placeholder="Type your full legal name"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              className="w-full px-4 py-4 border border-warm-border rounded-xl text-charcoal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-gold text-xl"
              style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
            />
          ) : (
            <div className="relative border border-warm-border rounded-xl overflow-hidden bg-warm-cream">
              <canvas
                ref={canvasRef}
                width={700}
                height={120}
                className="w-full h-28 cursor-crosshair touch-none"
              />
              {!hasDrawnSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-sm text-charcoal-light">Draw your signature here</p>
                </div>
              )}
              {hasDrawnSignature && (
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="absolute top-2 right-2 text-xs text-charcoal-muted hover:text-charcoal transition-colors bg-white border border-warm-border rounded px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Complete Registration
        </button>
      </div>

      {/* Back */}
      <div className="mt-4 pt-4 border-t border-warm-border">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
      </div>
    </div>
  )
}
