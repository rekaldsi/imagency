'use client'

import { useState } from 'react'
import PermissionsMatrix from '@/components/PermissionsMatrix'

const REGIONS = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East & Africa',
]

interface Step4PermissionsProps {
  onComplete: () => void
  onBack: () => void
}

export default function Step4Permissions({ onComplete, onBack }: Step4PermissionsProps) {
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [restrictTerritories, setRestrictTerritories] = useState(false)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [exclusivity, setExclusivity] = useState<'non-exclusive' | 'open-exclusive'>('non-exclusive')

  const handlePermissionsChange = (updated: Record<string, boolean>) => {
    setPermissions(updated)
  }

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border">
      <h2 className="text-2xl font-bold text-charcoal mb-1">Set your usage permissions</h2>
      <p className="text-charcoal-muted mb-8">
        Choose how brands and studios can use your likeness. You can update these anytime from your dashboard.
      </p>

      <div className="space-y-8">
        {/* Permissions Matrix */}
        <PermissionsMatrix
          value={permissions}
          onChange={handlePermissionsChange}
        />

        {/* Geographic restrictions */}
        <div className="border border-warm-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-warm-cream border-b border-warm-border">
            <h3 className="font-semibold text-charcoal">Geographic restrictions</h3>
            <p className="text-sm text-charcoal-muted mt-1">Limit where your likeness can be licensed.</p>
          </div>
          <div className="px-6 py-5">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <button
                type="button"
                role="switch"
                aria-checked={restrictTerritories}
                onClick={() => setRestrictTerritories((v) => !v)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                  restrictTerritories ? 'bg-gold' : 'bg-warm-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    restrictTerritories ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-charcoal">Restrict to specific territories only</span>
            </label>

            {restrictTerritories && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {REGIONS.map((region) => (
                  <label key={region} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-warm-border hover:bg-warm-cream transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => toggleRegion(region)}
                      className="w-4 h-4 accent-gold flex-shrink-0"
                    />
                    <span className="text-sm text-charcoal">{region}</span>
                  </label>
                ))}
              </div>
            )}

            {!restrictTerritories && (
              <p className="text-sm text-charcoal-muted">Your likeness can be licensed globally (no territorial restrictions).</p>
            )}
          </div>
        </div>

        {/* Exclusivity */}
        <div className="border border-warm-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-warm-cream border-b border-warm-border">
            <h3 className="font-semibold text-charcoal">Exclusivity preference</h3>
            <p className="text-sm text-charcoal-muted mt-1">Exclusive deals pay more but limit other licenses during the exclusivity period.</p>
          </div>
          <div className="px-6 py-5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 transition-colors hover:bg-warm-cream"
              style={{ borderColor: exclusivity === 'non-exclusive' ? '#C9A84C' : '#E5E3DC' }}
            >
              <input
                type="radio"
                name="exclusivity"
                value="non-exclusive"
                checked={exclusivity === 'non-exclusive'}
                onChange={() => setExclusivity('non-exclusive')}
                className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-charcoal">Non-exclusive (default — maximum earnings)</p>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Your likeness can be licensed to multiple buyers simultaneously. More total income potential.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 transition-colors hover:bg-warm-cream"
              style={{ borderColor: exclusivity === 'open-exclusive' ? '#C9A84C' : '#E5E3DC' }}
            >
              <input
                type="radio"
                name="exclusivity"
                value="open-exclusive"
                checked={exclusivity === 'open-exclusive'}
                onChange={() => setExclusivity('open-exclusive')}
                className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-charcoal">Open to exclusive deals</p>
                  <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full">Higher fees</span>
                </div>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Negotiated case by case. Each exclusive deal is reviewed and approved by you.
                </p>
              </div>
            </label>
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
