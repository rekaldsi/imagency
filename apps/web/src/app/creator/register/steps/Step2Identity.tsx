'use client'

import { useState, useRef, useEffect } from 'react'

interface Step2IdentityProps {
  onComplete: () => void
  onBack: () => void
}

export default function Step2Identity({ onComplete, onBack }: Step2IdentityProps) {
  const [idFile, setIdFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const handleIdDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setIdFile(file)
  }

  const openCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCameraActive(true)
    } catch {
      setCameraError('Could not access camera. Please allow camera access and try again.')
    }
  }

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)
    const dataUrl = canvasRef.current.toDataURL('image/jpeg')
    setCapturedPhoto(dataUrl)
    setCameraActive(false)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }

  const retakePhoto = () => {
    setCapturedPhoto(null)
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border">
      <h2 className="text-2xl font-bold text-charcoal mb-1">Verify your identity</h2>
      <p className="text-charcoal-muted mb-8">
        We need to verify your identity to protect your rights. Your ID is encrypted and never shared with buyers.
      </p>

      <div className="space-y-8">
        {/* Government ID Upload */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Government-issued ID</label>
          {idFile ? (
            <div className="border border-warm-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-warm-cream flex items-center justify-center">
                  <svg className="w-5 h-5 text-charcoal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{idFile.name}</p>
                  <p className="text-xs text-charcoal-muted">{(idFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Uploaded
              </span>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-gold bg-gold/5' : 'border-warm-border hover:border-gold hover:bg-gold/5'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleIdDrop}
            >
              <div className="w-12 h-12 rounded-full bg-warm-cream flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-charcoal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-sm font-medium text-charcoal mb-1">Drag your government-issued ID here, or click to upload</p>
              <p className="text-xs text-charcoal-muted">Passport, driver&apos;s license, or national ID</p>
              <p className="text-xs text-charcoal-light mt-1">JPG, PNG, or PDF — max 10MB</p>
              <input
                type="file"
                accept="image/*,.pdf"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setIdFile(file)
                }}
              />
            </label>
          )}
        </div>

        {/* Selfie / Liveness */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-3">Take a selfie</label>
          <div className="bg-warm-cream rounded-xl p-6 border border-warm-border">
            <p className="text-sm text-charcoal-muted text-center mb-4">
              Center your face in the frame with good lighting. Make sure your face is clearly visible.
            </p>

            <div className="flex justify-center mb-4">
              {capturedPhoto ? (
                <div className="relative">
                  <img
                    src={capturedPhoto}
                    alt="Captured selfie"
                    className="w-40 h-40 rounded-full object-cover border-4 border-gold"
                  />
                  <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
              ) : cameraActive ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-40 h-40 rounded-full object-cover border-4 border-gold"
                    muted
                    playsInline
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full bg-warm-border flex items-center justify-center">
                  <svg className="w-16 h-16 text-charcoal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex flex-col items-center gap-3">
              {capturedPhoto ? (
                <button
                  type="button"
                  onClick={retakePhoto}
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors underline"
                >
                  Retake photo
                </button>
              ) : cameraActive ? (
                <button
                  type="button"
                  onClick={takePhoto}
                  className="px-6 py-2.5 bg-charcoal text-warm-white text-sm font-semibold rounded-full hover:bg-charcoal/90 transition-colors"
                >
                  Take Photo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openCamera}
                  className="px-6 py-2.5 bg-charcoal text-warm-white text-sm font-semibold rounded-full hover:bg-charcoal/90 transition-colors"
                >
                  Open Camera
                </button>
              )}

              {!cameraActive && !capturedPhoto && (
                <label className="text-sm text-charcoal-muted cursor-pointer hover:text-charcoal transition-colors underline">
                  Upload a photo instead
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        setCapturedPhoto(url)
                      }
                    }}
                  />
                </label>
              )}

              {cameraError && (
                <p className="text-sm text-red-500 text-center">{cameraError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Review Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-800 mb-0.5">Under review within 24 hours</p>
              <p className="text-sm text-blue-700">
                After submission, we&apos;ll review your ID within 24 hours and send a confirmation email. You can continue the registration process in the meantime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-warm-border">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="button" onClick={onComplete} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  )
}
