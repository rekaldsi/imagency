'use client'

import { useState, useEffect } from 'react'

interface PriceConfig {
  licenseType: 'one-time' | 'subscription' | 'royalty'
  useCategory: string
  mediaTypes: string[]
  geography: string
  duration: string
  volume: number
}

const BASE_PRICES: Record<string, number> = {
  advertising: 300,
  film_tv: 800,
  streaming: 250,
  gaming: 400,
  ai_training: 1200,
}

const GEO_MULTIPLIERS: Record<string, number> = {
  global: 3.0,
  'north-america': 2.0,
  europe: 1.8,
  'single-country': 1.0,
}

const DURATION_MULTIPLIERS: Record<string, number> = {
  '30-days': 1.0,
  '90-days': 2.5,
  '6-months': 4.0,
  '1-year': 6.5,
}

interface PriceCalculatorProps {
  onChange?: (config: PriceConfig, price: number) => void
}

export default function PriceCalculator({ onChange }: PriceCalculatorProps) {
  const [config, setConfig] = useState<PriceConfig>({
    licenseType: 'one-time',
    useCategory: 'advertising',
    mediaTypes: ['digital'],
    geography: 'single-country',
    duration: '30-days',
    volume: 1,
  })

  const calculatePrice = (cfg: PriceConfig): number => {
    const base = BASE_PRICES[cfg.useCategory] || 300
    const geoMult = GEO_MULTIPLIERS[cfg.geography] || 1
    const durMult = DURATION_MULTIPLIERS[cfg.duration] || 1
    const mediaMult = 1 + (cfg.mediaTypes.length - 1) * 0.3
    const volMult = cfg.volume <= 1 ? 1 : 1 + Math.log(cfg.volume) * 0.4
    const typeMult = cfg.licenseType === 'subscription' ? 0.7 : cfg.licenseType === 'royalty' ? 0.5 : 1
    return Math.round(base * geoMult * durMult * mediaMult * volMult * typeMult)
  }

  const price = calculatePrice(config)

  useEffect(() => {
    onChange?.(config, price)
  }, [config, price])

  const update = (key: keyof PriceConfig, value: unknown) => {
    setConfig((c) => ({ ...c, [key]: value }))
  }

  const toggleMedia = (media: string) => {
    setConfig((c) => ({
      ...c,
      mediaTypes: c.mediaTypes.includes(media)
        ? c.mediaTypes.filter((m) => m !== media)
        : [...c.mediaTypes, media],
    }))
  }

  return (
    <div className="space-y-6">
      {/* License Type */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">License type</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'one-time', label: 'One-Time' },
            { id: 'subscription', label: 'Subscription' },
            { id: 'royalty', label: 'Royalty-Based' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => update('licenseType', id)}
              className={`py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                config.licenseType === id
                  ? 'bg-charcoal text-warm-white border-charcoal'
                  : 'bg-white text-charcoal-muted border-warm-border hover:border-charcoal'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Use Category */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">Use category</label>
        <select
          value={config.useCategory}
          onChange={(e) => update('useCategory', e.target.value)}
          className="w-full px-4 py-3 border border-warm-border rounded-xl text-charcoal focus:outline-none focus:border-charcoal"
        >
          <option value="advertising">Advertising</option>
          <option value="film_tv">Film & TV</option>
          <option value="streaming">Streaming</option>
          <option value="gaming">Gaming / Virtual Worlds</option>
          <option value="ai_training">AI Model Training</option>
        </select>
      </div>

      {/* Media Types */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">Media types</label>
        <div className="flex flex-wrap gap-2">
          {['Digital', 'Broadcast TV', 'Social Media', 'OOH / Print', 'Gaming Engine', 'Streaming'].map((media) => (
            <button
              key={media}
              type="button"
              onClick={() => toggleMedia(media.toLowerCase())}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                config.mediaTypes.includes(media.toLowerCase())
                  ? 'bg-gold/15 border-gold text-charcoal'
                  : 'bg-white border-warm-border text-charcoal-muted hover:border-charcoal'
              }`}
            >
              {media}
            </button>
          ))}
        </div>
      </div>

      {/* Geography */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">Geography</label>
        <select
          value={config.geography}
          onChange={(e) => update('geography', e.target.value)}
          className="w-full px-4 py-3 border border-warm-border rounded-xl text-charcoal focus:outline-none focus:border-charcoal"
        >
          <option value="single-country">Single country</option>
          <option value="north-america">North America</option>
          <option value="europe">Europe</option>
          <option value="global">Global (worldwide)</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">Duration</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: '30-days', label: '30 days' },
            { id: '90-days', label: '90 days' },
            { id: '6-months', label: '6 months' },
            { id: '1-year', label: '1 year' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => update('duration', id)}
              className={`py-2.5 text-sm rounded-xl border transition-colors ${
                config.duration === id
                  ? 'bg-charcoal text-warm-white border-charcoal'
                  : 'bg-white text-charcoal-muted border-warm-border hover:border-charcoal'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Volume */}
      <div>
        <div className="flex justify-between mb-3">
          <label className="text-sm font-medium text-charcoal">Number of content pieces</label>
          <span className="text-sm font-bold text-charcoal">{config.volume}</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={config.volume}
          onChange={(e) => update('volume', Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-charcoal-light mt-1">
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-charcoal rounded-2xl p-6">
        <div className="text-warm-white/60 text-sm mb-1">Estimated license price</div>
        <div className="text-4xl font-bold text-warm-white mb-2">${price.toLocaleString()}</div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-white/50">Creator receives (70%)</span>
          <span className="text-gold font-medium">${Math.round(price * 0.7).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-warm-white/50">Platform fee (30%)</span>
          <span className="text-warm-white/70">${Math.round(price * 0.3).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
