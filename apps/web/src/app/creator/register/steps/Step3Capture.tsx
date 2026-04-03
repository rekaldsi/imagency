'use client'

import { useState } from 'react'
import AudioRecorder from '@/components/AudioRecorder'

const ANGLE_GUIDE = [
  { label: 'Front', icon: '↑' },
  { label: '3/4 Left', icon: '↖' },
  { label: '3/4 Right', icon: '↗' },
  { label: 'Profile Left', icon: '←' },
  { label: 'Profile Right', icon: '→' },
  { label: 'Looking Up', icon: '⬆' },
  { label: 'Looking Down', icon: '⬇' },
  { label: 'Natural Smile', icon: '☺' },
]

const QUALITY_TIPS = [
  'Good lighting (natural or studio)',
  'Plain background preferred',
  'No sunglasses or hats',
  'High resolution (2MP+)',
]

interface Step3CaptureProps {
  onComplete: () => void
  onBack: () => void
}

export default function Step3Capture({ onComplete, onBack }: Step3CaptureProps) {
  const [activeTab, setActiveTab] = useState<'face' | 'voice'>('face')
  const [photos, setPhotos] = useState<File[]>([])
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    setPhotos((prev) => [...prev, ...files].slice(0, 30))
  }

  const handlePhotoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotos((prev) => [...prev, ...files].slice(0, 30))
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const canContinue = photos.length >= 12 && voiceBlob !== null

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border">
      <h2 className="text-2xl font-bold text-charcoal mb-1">Capture your likeness</h2>
      <p className="text-charcoal-muted mb-6">We need photos and voice to create your AI representation.</p>

      {/* Tabs */}
      <div className="flex bg-warm-cream rounded-xl p-1 mb-8 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('face')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'face' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Face Capture
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('voice')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'voice' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Voice Capture
          {voiceBlob && (
            <span className="ml-2 inline-flex w-2 h-2 rounded-full bg-green-500" />
          )}
        </button>
      </div>

      {/* Face Capture Tab */}
      {activeTab === 'face' && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main upload area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-charcoal">Upload your photos</h3>
              <span
                className={`text-sm font-semibold ${
                  photos.length >= 12 ? 'text-green-600' : 'text-charcoal-muted'
                }`}
              >
                {photos.length}/12 photos uploaded
              </span>
            </div>

            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-4 ${
                isDragOver ? 'border-gold bg-gold/5' : 'border-warm-border hover:border-gold hover:bg-gold/5'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handlePhotoDrop}
            >
              <div className="w-12 h-12 rounded-full bg-warm-cream flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-charcoal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-charcoal mb-1">Upload photos from different angles</p>
              <p className="text-xs text-charcoal-muted">We need a minimum of 12 photos for best results</p>
              <p className="text-xs text-charcoal-light mt-1">JPG or PNG · Multiple files supported</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handlePhotoInput}
              />
            </label>

            {/* Photo thumbnails */}
            {photos.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {photos.slice(0, 15).map((file, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-warm-cream group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Photo ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length > 15 && (
                  <div className="aspect-square rounded-lg bg-warm-cream flex items-center justify-center text-sm font-medium text-charcoal-muted">
                    +{photos.length - 15}
                  </div>
                )}
              </div>
            )}

            {photos.length >= 12 && (
              <p className="text-sm text-green-600 font-medium mt-3 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Great — you have enough photos. You can add more for better results.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:w-52 flex-shrink-0">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-charcoal mb-3">Angle guide</h4>
              <div className="bg-warm-cream rounded-xl p-4 border border-warm-border">
                <div className="grid grid-cols-2 gap-2">
                  {ANGLE_GUIDE.map((angle) => (
                    <div key={angle.label} className="flex items-center gap-1.5">
                      <span className="text-gold text-sm">{angle.icon}</span>
                      <span className="text-xs text-charcoal-muted">{angle.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-charcoal mb-3">Quality tips</h4>
              <ul className="space-y-2">
                {QUALITY_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-xs text-charcoal-muted">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Voice Capture Tab */}
      {activeTab === 'voice' && (
        <div>
          <h3 className="text-sm font-medium text-charcoal mb-2">Record your voice</h3>
          <p className="text-charcoal-muted text-sm mb-6">
            Read the passage below clearly. This creates your unique voice profile.
          </p>

          <div className="bg-warm-cream rounded-xl p-6 border border-warm-border mb-6">
            <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-3">Script</p>
            <p className="text-charcoal leading-relaxed text-sm italic">
              &ldquo;Please read aloud: &lsquo;The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood? Peter Piper picked a peck of pickled peppers.&rsquo;&rdquo;
            </p>
          </div>

          <AudioRecorder
            onRecordingComplete={(blob) => setVoiceBlob(blob)}
          />

          {voiceBlob && (
            <p className="text-sm text-green-600 font-medium mt-4 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Voice recording saved.
            </p>
          )}
        </div>
      )}

      {/* Completion status */}
      {!canContinue && (
        <div className="mt-6 p-4 bg-warm-cream rounded-xl border border-warm-border">
          <p className="text-sm text-charcoal-muted">
            To continue, complete both tabs:{' '}
            <span className={photos.length >= 12 ? 'text-green-600 font-medium' : 'text-charcoal font-medium'}>
              {photos.length >= 12 ? '✓' : '○'} {photos.length}/12 photos
            </span>{' '}
            and{' '}
            <span className={voiceBlob ? 'text-green-600 font-medium' : 'text-charcoal font-medium'}>
              {voiceBlob ? '✓' : '○'} Voice recording
            </span>
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-warm-border">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button
          type="button"
          onClick={onComplete}
          disabled={!canContinue}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
