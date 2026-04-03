'use client'

import { useState } from 'react'

interface Permission {
  id: string
  label: string
  description: string
  defaultEnabled: boolean
  locked: boolean
  lockReason?: string
  highRoyalty?: boolean
}

const DEFAULT_PERMISSIONS: Permission[] = [
  { id: 'advertising', label: 'Advertising', description: 'Commercial ads, sponsored content, brand campaigns', defaultEnabled: true, locked: false },
  { id: 'film_tv', label: 'Film & TV', description: 'Feature films, TV series, streaming originals', defaultEnabled: true, locked: false },
  { id: 'streaming', label: 'Streaming Content', description: 'YouTube, TikTok, podcast and streaming platforms', defaultEnabled: true, locked: false },
  { id: 'gaming', label: 'Gaming / Virtual Worlds', description: 'Video games, VR environments, virtual avatars', defaultEnabled: false, locked: false },
  { id: 'ai_training', label: 'AI Model Training', description: 'Used to train generative AI models', defaultEnabled: false, locked: false, highRoyalty: true },
  { id: 'adult', label: 'Adult Content', description: 'Requires separate age verification and legal review', defaultEnabled: false, locked: true, lockReason: 'Locked — requires separate verification' },
  { id: 'political', label: 'Political Content', description: 'Political ads, campaign materials', defaultEnabled: false, locked: true, lockReason: 'Locked — requires legal review' },
  { id: 'news', label: 'News / Journalism', description: 'News broadcasts, documentary journalism', defaultEnabled: false, locked: true, lockReason: 'Locked — requires journalist credential verification' },
]

interface PermissionsMatrixProps {
  value?: Record<string, boolean>
  onChange?: (permissions: Record<string, boolean>) => void
}

export default function PermissionsMatrix({ value, onChange }: PermissionsMatrixProps) {
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => {
    if (value) return value
    return DEFAULT_PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.id]: p.defaultEnabled }), {})
  })

  const toggle = (id: string) => {
    const updated = { ...permissions, [id]: !permissions[id] }
    setPermissions(updated)
    onChange?.(updated)
  }

  return (
    <div className="border border-warm-border rounded-2xl overflow-hidden">
      <div className="px-6 py-4 bg-warm-cream border-b border-warm-border">
        <h3 className="font-semibold text-charcoal">Use Category Permissions</h3>
        <p className="text-sm text-charcoal-muted mt-1">Choose what you allow. You can change these anytime from your dashboard.</p>
      </div>
      <div className="divide-y divide-warm-border">
        {DEFAULT_PERMISSIONS.map((perm) => (
          <div key={perm.id} className={`flex items-center justify-between px-6 py-4 ${perm.locked ? 'opacity-60' : ''}`}>
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-charcoal">{perm.label}</span>
                {perm.highRoyalty && (
                  <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full">Higher royalty</span>
                )}
                {perm.locked && (
                  <span className="text-xs bg-warm-border text-charcoal-muted px-2 py-0.5 rounded-full">🔒 Locked</span>
                )}
              </div>
              <div className="text-xs text-charcoal-muted mt-0.5">
                {perm.lockReason || perm.description}
              </div>
            </div>
            <button
              type="button"
              disabled={perm.locked}
              onClick={() => !perm.locked && toggle(perm.id)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                perm.locked ? 'cursor-not-allowed bg-warm-border' :
                permissions[perm.id] ? 'bg-gold' : 'bg-warm-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                  permissions[perm.id] && !perm.locked ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Geographic / Exclusivity options */}
      <div className="px-6 py-5 bg-warm-cream border-t border-warm-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium text-charcoal">Geographic restrictions</div>
            <div className="text-xs text-charcoal-muted">Limit licenses to specific countries or regions</div>
          </div>
          <select className="text-sm border border-warm-border rounded-lg px-3 py-1.5 bg-white text-charcoal focus:outline-none focus:border-charcoal">
            <option>Global (no restriction)</option>
            <option>United States only</option>
            <option>North America</option>
            <option>Europe only</option>
            <option>Custom territories</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-charcoal">Exclusivity preference</div>
            <div className="text-xs text-charcoal-muted">Allow exclusive licenses (higher fee, limits other licenses)</div>
          </div>
          <select className="text-sm border border-warm-border rounded-lg px-3 py-1.5 bg-white text-charcoal focus:outline-none focus:border-charcoal">
            <option>Non-exclusive only</option>
            <option>Allow exclusivity (premium)</option>
            <option>Open to negotiation</option>
          </select>
        </div>
      </div>
    </div>
  )
}
