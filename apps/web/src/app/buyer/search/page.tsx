'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CreatorCard from '@/components/CreatorCard'

// ─── Mock Data ────────────────────────────────────────────────────────────────

export interface MockCreator {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  age: number
  gender: string
  voiceType: string
  accent: string
  availableUses: string[]
  totalEarnings: number
  avatarSeed: number
  skinTone: number
  hairColor: string
  energyArchetype: string
}

const MOCK_CREATORS: MockCreator[] = [
  { id: '1', firstName: 'Maya', lastInitial: 'T', ageRange: '25–34', age: 29, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 3240, avatarSeed: 10, skinTone: 3, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '2', firstName: 'James', lastInitial: 'R', ageRange: '35–44', age: 38, gender: 'Male', voiceType: 'Baritone', accent: 'American Southern', availableUses: ['Gaming', 'Streaming'], totalEarnings: 1890, avatarSeed: 17, skinTone: 5, hairColor: 'Brown', energyArchetype: 'Authoritative' },
  { id: '3', firstName: 'Sofia', lastInitial: 'M', ageRange: '18–24', age: 22, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 5120, avatarSeed: 25, skinTone: 2, hairColor: 'Blonde', energyArchetype: 'Energetic' },
  { id: '4', firstName: 'DeShawn', lastInitial: 'K', ageRange: '25–34', age: 31, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 2750, avatarSeed: 33, skinTone: 6, hairColor: 'Black', energyArchetype: 'Playful' },
  { id: '5', firstName: 'Priya', lastInitial: 'S', ageRange: '28–38', age: 32, gender: 'Female', voiceType: 'Mezzo', accent: 'British RP', availableUses: ['Advertising', 'Gaming'], totalEarnings: 4100, avatarSeed: 48, skinTone: 4, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '6', firstName: 'Carlos', lastInitial: 'V', ageRange: '40–50', age: 44, gender: 'Male', voiceType: 'Bass', accent: 'American General', availableUses: ['Film & TV', 'Streaming'], totalEarnings: 6800, avatarSeed: 57, skinTone: 3, hairColor: 'Dark Brown', energyArchetype: 'Authoritative' },
  { id: '7', firstName: 'Aisha', lastInitial: 'N', ageRange: '25–34', age: 27, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 2300, avatarSeed: 15, skinTone: 6, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '8', firstName: 'Tyler', lastInitial: 'B', ageRange: '18–24', age: 21, gender: 'Male', voiceType: 'Tenor', accent: 'American Southern', availableUses: ['Gaming', 'Streaming'], totalEarnings: 980, avatarSeed: 21, skinTone: 2, hairColor: 'Brown', energyArchetype: 'Playful' },
  { id: '9', firstName: 'Mei', lastInitial: 'L', ageRange: '25–34', age: 28, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 3800, avatarSeed: 39, skinTone: 2, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '10', firstName: 'Marcus', lastInitial: 'D', ageRange: '35–44', age: 41, gender: 'Male', voiceType: 'Baritone', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 5500, avatarSeed: 44, skinTone: 5, hairColor: 'Black', energyArchetype: 'Authoritative' },
  { id: '11', firstName: 'Leila', lastInitial: 'H', ageRange: '30–40', age: 35, gender: 'Female', voiceType: 'Mezzo', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 4700, avatarSeed: 5, skinTone: 4, hairColor: 'Dark Brown', energyArchetype: 'Calm' },
  { id: '12', firstName: 'David', lastInitial: 'P', ageRange: '45–55', age: 49, gender: 'Male', voiceType: 'Bass', accent: 'American General', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 9200, avatarSeed: 60, skinTone: 2, hairColor: 'Gray', energyArchetype: 'Authoritative' },
  { id: '13', firstName: 'Jasmine', lastInitial: 'W', ageRange: '20–30', age: 24, gender: 'Female', voiceType: 'Alto', accent: 'American General', availableUses: ['Streaming', 'Gaming'], totalEarnings: 1450, avatarSeed: 28, skinTone: 5, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '14', firstName: 'Roberto', lastInitial: 'G', ageRange: '30–40', age: 36, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Advertising', 'Streaming'], totalEarnings: 3100, avatarSeed: 35, skinTone: 3, hairColor: 'Dark Brown', energyArchetype: 'Playful' },
  { id: '15', firstName: 'Hannah', lastInitial: 'K', ageRange: '25–35', age: 30, gender: 'Female', voiceType: 'Soprano', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 5900, avatarSeed: 8, skinTone: 1, hairColor: 'Blonde', energyArchetype: 'Energetic' },
  { id: '16', firstName: 'Andre', lastInitial: 'T', ageRange: '20–30', age: 25, gender: 'Male', voiceType: 'Baritone', accent: 'American General', availableUses: ['Gaming', 'Film & TV'], totalEarnings: 1200, avatarSeed: 19, skinTone: 6, hairColor: 'Black', energyArchetype: 'Energetic' },
  { id: '17', firstName: 'Yuki', lastInitial: 'A', ageRange: '25–35', age: 29, gender: 'Female', voiceType: 'Soprano', accent: 'American General', availableUses: ['Advertising', 'Streaming', 'Gaming'], totalEarnings: 2800, avatarSeed: 42, skinTone: 2, hairColor: 'Black', energyArchetype: 'Playful' },
  { id: '18', firstName: 'Kevin', lastInitial: 'M', ageRange: '35–45', age: 39, gender: 'Male', voiceType: 'Bass', accent: 'American Southern', availableUses: ['Film & TV', 'Advertising'], totalEarnings: 7100, avatarSeed: 52, skinTone: 4, hairColor: 'Dark Brown', energyArchetype: 'Authoritative' },
  { id: '19', firstName: 'Fatima', lastInitial: 'O', ageRange: '25–35', age: 31, gender: 'Female', voiceType: 'Alto', accent: 'British RP', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 4200, avatarSeed: 13, skinTone: 5, hairColor: 'Black', energyArchetype: 'Calm' },
  { id: '20', firstName: 'Ethan', lastInitial: 'C', ageRange: '18–28', age: 23, gender: 'Male', voiceType: 'Tenor', accent: 'American General', availableUses: ['Gaming', 'Streaming'], totalEarnings: 850, avatarSeed: 64, skinTone: 1, hairColor: 'Brown', energyArchetype: 'Playful' },
]

const ACCENTS = ['Any', 'American General', 'American Southern', 'British RP']
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
const VOICE_TYPES = ['Bass', 'Baritone', 'Tenor', 'Alto', 'Mezzo', 'Soprano']
const USE_CATEGORIES = ['Advertising', 'Film & TV', 'Streaming', 'Gaming', 'AI Training']
const LICENSE_TYPES = ['Any', 'One-Time', 'Subscription', 'Royalty']
const SORT_OPTIONS = ['Most Earned', 'Most Licenses', 'Newest']

interface Filters {
  searchQuery: string
  ageMin: number
  ageMax: number
  gender: string[]
  voiceType: string[]
  accent: string
  useCategory: string[]
  licenseType: string
}

const DEFAULT_FILTERS: Filters = {
  searchQuery: '',
  ageMin: 18,
  ageMax: 65,
  gender: [],
  voiceType: [],
  accent: 'Any',
  useCategory: [],
  licenseType: 'Any',
}

// ─── Checkbox row ──────────────────────────────────────────────────────────

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
          checked ? 'bg-gold border-gold' : 'border-warm-border bg-white group-hover:border-gold/50'
        }`}
        onClick={() => onChange(!checked)}
      >
        {checked && <span className="text-charcoal text-xs font-bold leading-none">✓</span>}
      </div>
      <span className="text-sm text-charcoal cursor-pointer" onClick={() => onChange(!checked)}>
        {label}
      </span>
    </label>
  )
}

// ─── Filter Sidebar ────────────────────────────────────────────────────────

function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (f: Filters) => void
  onReset: () => void
}) {
  function toggleArray(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
  }

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-charcoal text-base">Filter Talent</h2>
        <button onClick={onReset} className="text-xs text-charcoal-muted hover:text-gold transition-colors">
          Reset
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Search</label>
        <input
          type="text"
          placeholder="Search name or traits..."
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="input-field text-sm"
        />
      </div>

      {/* Age range */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Age Range</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={18}
            max={65}
            value={filters.ageMin}
            onChange={(e) => onChange({ ...filters, ageMin: Number(e.target.value) })}
            className="input-field text-sm w-20"
            placeholder="Min"
          />
          <span className="text-charcoal-muted text-sm">–</span>
          <input
            type="number"
            min={18}
            max={65}
            value={filters.ageMax}
            onChange={(e) => onChange({ ...filters, ageMax: Number(e.target.value) })}
            className="input-field text-sm w-20"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Gender</label>
        <div className="flex flex-col gap-2">
          {GENDERS.map((g) => (
            <CheckboxRow
              key={g}
              label={g}
              checked={filters.gender.includes(g)}
              onChange={() => onChange({ ...filters, gender: toggleArray(filters.gender, g) })}
            />
          ))}
        </div>
      </div>

      {/* Voice type */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Voice Type</label>
        <div className="flex flex-col gap-2">
          {VOICE_TYPES.map((v) => (
            <CheckboxRow
              key={v}
              label={v}
              checked={filters.voiceType.includes(v)}
              onChange={() => onChange({ ...filters, voiceType: toggleArray(filters.voiceType, v) })}
            />
          ))}
        </div>
      </div>

      {/* Accent */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Accent</label>
        <select
          value={filters.accent}
          onChange={(e) => onChange({ ...filters, accent: e.target.value })}
          className="input-field text-sm"
        >
          {ACCENTS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Use Category */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Use Category</label>
        <div className="flex flex-col gap-2">
          {USE_CATEGORIES.map((cat) => (
            <CheckboxRow
              key={cat}
              label={cat}
              checked={filters.useCategory.includes(cat)}
              onChange={() => onChange({ ...filters, useCategory: toggleArray(filters.useCategory, cat) })}
            />
          ))}
        </div>
      </div>

      {/* License type */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">License Type</label>
        <div className="flex flex-col gap-2">
          {LICENSE_TYPES.map((lt) => (
            <label key={lt} className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                  filters.licenseType === lt ? 'border-gold' : 'border-warm-border'
                }`}
                onClick={() => onChange({ ...filters, licenseType: lt })}
              >
                {filters.licenseType === lt && (
                  <div className="w-2 h-2 rounded-full bg-gold" />
                )}
              </div>
              <span className="text-sm text-charcoal cursor-pointer" onClick={() => onChange({ ...filters, licenseType: lt })}>
                {lt}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => {/* filters applied live */}}
        className="btn-primary w-full rounded-xl"
      >
        Apply Filters
      </button>
    </aside>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BuyerSearch() {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState('Most Earned')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const results = useMemo(() => {
    let list = MOCK_CREATORS.filter((c) => {
      // search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase()
        const match =
          c.firstName.toLowerCase().includes(q) ||
          c.voiceType.toLowerCase().includes(q) ||
          c.accent.toLowerCase().includes(q) ||
          c.energyArchetype.toLowerCase().includes(q) ||
          c.hairColor.toLowerCase().includes(q)
        if (!match) return false
      }
      // age
      if (c.age < filters.ageMin || c.age > filters.ageMax) return false
      // gender
      if (filters.gender.length > 0 && !filters.gender.includes(c.gender)) return false
      // voice
      if (filters.voiceType.length > 0 && !filters.voiceType.includes(c.voiceType)) return false
      // accent
      if (filters.accent !== 'Any' && c.accent !== filters.accent) return false
      // use category
      if (filters.useCategory.length > 0) {
        const hasAll = filters.useCategory.every((cat) => c.availableUses.includes(cat))
        if (!hasAll) return false
      }
      return true
    })

    // sort
    if (sort === 'Most Earned') list = [...list].sort((a, b) => b.totalEarnings - a.totalEarnings)
    else if (sort === 'Newest') list = [...list].sort((a, b) => Number(b.id) - Number(a.id))

    return list
  }, [filters, sort])

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="px-6 pt-8 pb-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-1">Browse Talent</h1>
          <p className="text-charcoal-muted text-sm">Find the right creator for your project.</p>
        </div>

        {/* Mobile: filters toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-secondary w-full rounded-xl flex items-center justify-center gap-2"
          >
            <span>Show Filters</span>
            {(filters.gender.length + filters.voiceType.length + filters.useCategory.length > 0 ||
              filters.accent !== 'Any' ||
              filters.searchQuery) && (
              <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-xs font-bold flex items-center justify-center">
                {filters.gender.length + filters.voiceType.length + filters.useCategory.length +
                  (filters.accent !== 'Any' ? 1 : 0) +
                  (filters.searchQuery ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-6 bg-white border border-warm-border rounded-2xl p-6">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              <div className="text-sm text-charcoal-muted">
                Showing <strong className="text-charcoal">{results.length}</strong> creators
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-warm-border rounded-xl px-3 py-2 bg-white text-charcoal"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 text-charcoal-muted">
                <div className="text-4xl mb-4">🔍</div>
                <div className="font-semibold text-charcoal mb-2">No creators match your filters</div>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm text-gold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={{
                      id: creator.id,
                      firstName: creator.firstName,
                      lastInitial: creator.lastInitial,
                      ageRange: creator.ageRange,
                      voiceType: creator.voiceType,
                      availableUses: creator.availableUses,
                      totalEarnings: creator.totalEarnings,
                      avatarSeed: creator.avatarSeed,
                      accent: creator.accent,
                    }}
                    showLicense={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Panel */}
          <div className="relative ml-auto w-80 max-w-full h-full bg-white overflow-y-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-charcoal text-lg">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-charcoal-muted hover:text-charcoal text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary w-full rounded-xl mt-4"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
