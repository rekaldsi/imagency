'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CreatorCard from '@/components/CreatorCard'

const ALL_CREATORS = [
  { id: 'IMA-1001', firstName: 'Marcus', lastInitial: 'T', ageRange: '30–39', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 18400, avatarSeed: 12, energyArchetype: 'Confident & Authoritative', gender: 'Male', skinTone: 'Deep Brown', accent: 'American General' },
  { id: 'IMA-1002', firstName: 'Sofia', lastInitial: 'R', ageRange: '25–29', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Streaming'], totalEarnings: 12600, avatarSeed: 5, energyArchetype: 'Warm & Approachable', gender: 'Female', skinTone: 'Medium Olive', accent: 'American General' },
  { id: 'IMA-1003', firstName: 'James', lastInitial: 'O', ageRange: '40–49', voiceType: 'Bass', availableUses: ['Advertising', 'Film & TV', 'AI Model Training'], totalEarnings: 31200, avatarSeed: 33, energyArchetype: 'Wise & Trustworthy', gender: 'Male', skinTone: 'Rich Ebony', accent: 'British RP' },
  { id: 'IMA-1004', firstName: 'Emi', lastInitial: 'N', ageRange: '25–29', voiceType: 'Soprano', availableUses: ['Advertising', 'Gaming', 'Streaming'], totalEarnings: 8900, avatarSeed: 15, energyArchetype: 'Playful & Creative', gender: 'Female', skinTone: 'Light', accent: 'American General' },
  { id: 'IMA-1005', firstName: 'Carlos', lastInitial: 'M', ageRange: '35–39', voiceType: 'Tenor', availableUses: ['Advertising', 'Film & TV', 'Gaming'], totalEarnings: 15300, avatarSeed: 21, energyArchetype: 'Energetic & Inspiring', gender: 'Male', skinTone: 'Medium Brown', accent: 'American Southern' },
  { id: 'IMA-1006', firstName: 'Aisha', lastInitial: 'P', ageRange: '30–39', voiceType: 'Alto', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 22100, avatarSeed: 9, energyArchetype: 'Sophisticated & Elegant', gender: 'Female', skinTone: 'Medium Tan', accent: 'British RP' },
  { id: 'IMA-1007', firstName: 'Derek', lastInitial: 'H', ageRange: '50–59', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 27800, avatarSeed: 52, energyArchetype: 'Distinguished & Dependable', gender: 'Male', skinTone: 'Fair', accent: 'American General' },
  { id: 'IMA-1008', firstName: 'Zara', lastInitial: 'W', ageRange: '18–24', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Streaming', 'Gaming'], totalEarnings: 6700, avatarSeed: 26, energyArchetype: 'Fresh & Authentic', gender: 'Female', skinTone: 'Medium Brown', accent: 'American General' },
  { id: 'IMA-1009', firstName: 'Raj', lastInitial: 'K', ageRange: '40–49', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 19500, avatarSeed: 41, energyArchetype: 'Analytical & Credible', gender: 'Male', skinTone: 'Medium Tan', accent: 'Indian English' },
  { id: 'IMA-1010', firstName: 'Maya', lastInitial: 'C', ageRange: '25–29', voiceType: 'Alto', availableUses: ['Advertising', 'Film & TV', 'Gaming'], totalEarnings: 13900, avatarSeed: 17, energyArchetype: 'Bold & Confident', gender: 'Female', skinTone: 'Light', accent: 'American General' },
  { id: 'IMA-1011', firstName: 'Andre', lastInitial: 'D', ageRange: '35–39', voiceType: 'Tenor', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 34600, avatarSeed: 60, energyArchetype: 'Charismatic & Romantic', gender: 'Male', skinTone: 'Medium Brown', accent: 'French' },
  { id: 'IMA-1012', firstName: 'Fatima', lastInitial: 'A', ageRange: '30–39', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 16200, avatarSeed: 3, energyArchetype: 'Resilient & Inspiring', gender: 'Female', skinTone: 'Medium Olive', accent: 'American General' },
  { id: 'IMA-1013', firstName: 'Tyler', lastInitial: 'B', ageRange: '18–24', voiceType: 'Tenor', availableUses: ['Advertising', 'Gaming', 'Streaming'], totalEarnings: 7400, avatarSeed: 44, energyArchetype: 'Youthful & Aspirational', gender: 'Male', skinTone: 'Fair', accent: 'American General' },
  { id: 'IMA-1014', firstName: 'Grace', lastInitial: 'O', ageRange: '45–54', voiceType: 'Alto', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 24100, avatarSeed: 7, energyArchetype: 'Powerful & Maternal', gender: 'Female', skinTone: 'Deep Brown', accent: 'American General' },
  { id: 'IMA-1015', firstName: 'Luca', lastInitial: 'R', ageRange: '25–29', voiceType: 'Tenor', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 11000, avatarSeed: 57, energyArchetype: 'Artistic & Dreamy', gender: 'Male', skinTone: 'Light Olive', accent: 'Italian' },
  { id: 'IMA-1016', firstName: 'Priya', lastInitial: 'S', ageRange: '25–29', voiceType: 'Soprano', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 9800, avatarSeed: 19, energyArchetype: 'Joyful & Vibrant', gender: 'Female', skinTone: 'Medium Tan', accent: 'British Asian' },
  { id: 'IMA-1017', firstName: 'Nathan', lastInitial: 'P', ageRange: '40–49', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV'], totalEarnings: 14700, avatarSeed: 48, energyArchetype: 'Rugged & Genuine', gender: 'Male', skinTone: 'Fair', accent: 'American Southern' },
  { id: 'IMA-1018', firstName: 'Kezia', lastInitial: 'A', ageRange: '18–24', voiceType: 'Alto', availableUses: ['Advertising', 'Streaming'], totalEarnings: 4200, avatarSeed: 11, energyArchetype: 'Fierce & Expressive', gender: 'Female', skinTone: 'Rich Ebony', accent: 'American General' },
  { id: 'IMA-1019', firstName: 'David', lastInitial: 'K', ageRange: '50–59', voiceType: 'Baritone', availableUses: ['Advertising', 'Film & TV', 'Streaming'], totalEarnings: 21300, avatarSeed: 67, energyArchetype: 'Calm & Authoritative', gender: 'Male', skinTone: 'Light', accent: 'American General' },
  { id: 'IMA-1020', firstName: 'Lucia', lastInitial: 'F', ageRange: '35–39', voiceType: 'Mezzo-Soprano', availableUses: ['Advertising', 'Film & TV', 'Streaming', 'Gaming'], totalEarnings: 17600, avatarSeed: 23, energyArchetype: 'Passionate & Magnetic', gender: 'Female', skinTone: 'Medium Olive', accent: 'American General' },
]

const VOICE_TYPES = ['All', 'Bass', 'Baritone', 'Tenor', 'Alto', 'Mezzo-Soprano', 'Soprano']
const ACCENTS = ['All', 'American General', 'American Southern', 'British RP', 'British Asian', 'French', 'Italian', 'Indian English']
const USE_CATEGORIES = ['All', 'Advertising', 'Film & TV', 'Streaming', 'Gaming', 'AI Model Training']
const GENDERS = ['All', 'Male', 'Female']
const AGE_RANGES = ['All', '18–24', '25–29', '30–39', '35–39', '40–49', '45–54', '50–59']

export default function BuyerSearchPage() {
  const [filters, setFilters] = useState({
    gender: 'All',
    ageRange: 'All',
    voiceType: 'All',
    accent: 'All',
    useCategory: 'All',
    skinTone: 'All',
    search: '',
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    return ALL_CREATORS.filter((c) => {
      if (filters.gender !== 'All' && c.gender !== filters.gender) return false
      if (filters.ageRange !== 'All' && c.ageRange !== filters.ageRange) return false
      if (filters.voiceType !== 'All' && c.voiceType !== filters.voiceType) return false
      if (filters.accent !== 'All' && c.accent !== filters.accent) return false
      if (filters.skinTone !== 'All' && c.skinTone !== filters.skinTone) return false
      if (filters.useCategory !== 'All' && !c.availableUses.includes(filters.useCategory)) return false
      if (filters.search && !`${c.firstName} ${c.energyArchetype}`.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    })
  }, [filters])

  const setFilter = (key: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v !== 'All' && v !== ''
  ).length

  const FilterSelect = ({ label, field, options }: { label: string; field: keyof typeof filters; options: string[] }) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <select
        value={filters[field]}
        onChange={(e) => setFilter(field, e.target.value)}
        style={{
          width: '100%',
          padding: '0.6rem 0.75rem',
          border: '1px solid #D1CEC7',
          borderRadius: '8px',
          fontSize: '0.875rem',
          backgroundColor: '#FFFFFF',
          color: '#1A1A1A',
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )

  const FiltersPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <FilterSelect label="Gender" field="gender" options={GENDERS} />
      <FilterSelect label="Age Range" field="ageRange" options={AGE_RANGES} />
      <FilterSelect label="Voice Type" field="voiceType" options={VOICE_TYPES} />
      <FilterSelect label="Accent" field="accent" options={ACCENTS} />
      <FilterSelect label="Use Category" field="useCategory" options={USE_CATEGORIES} />

      {/* Skin tone swatches */}
      <div>
        <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
          Skin Tone
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { label: 'All', color: 'transparent', border: '#D1CEC7' },
            { label: 'Fair', color: '#FDDBB4' },
            { label: 'Light', color: '#F5C28C' },
            { label: 'Light Olive', color: '#D4A574' },
            { label: 'Medium Olive', color: '#C49A6C' },
            { label: 'Medium Tan', color: '#A67A52' },
            { label: 'Medium Brown', color: '#8B5E3C' },
            { label: 'Deep Brown', color: '#6B3F22' },
            { label: 'Rich Ebony', color: '#3D1F0F' },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => setFilter('skinTone', t.label)}
              title={t.label}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: t.color,
                border: `2px solid ${filters.skinTone === t.label ? '#C9A84C' : (t.border || 'transparent')}`,
                cursor: 'pointer',
                boxShadow: filters.skinTone === t.label ? '0 0 0 2px #C9A84C' : 'none',
                display: t.label === 'All' ? 'flex' : 'block',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                color: '#8A8A8A',
              }}
            >
              {t.label === 'All' ? 'All' : ''}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setFilters({ gender: 'All', ageRange: 'All', voiceType: 'All', accent: 'All', useCategory: 'All', skinTone: 'All', search: '' })}
        style={{
          padding: '0.6rem',
          border: '1px solid #D1CEC7',
          borderRadius: '8px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: '#8A8A8A',
        }}
      >
        Clear all filters
      </button>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginBottom: '4px' }}>Browse Talent</h1>
            <p style={{ fontSize: '0.875rem', color: '#8A8A8A' }}>
              {filtered.length} of {ALL_CREATORS.length} creators match your filters
            </p>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="search"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search by name or energy..."
              style={{
                padding: '0.6rem 0.875rem',
                border: '1px solid #D1CEC7',
                borderRadius: '8px',
                fontSize: '0.875rem',
                width: '220px',
                backgroundColor: '#FFFFFF',
              }}
            />
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1rem',
                border: '1px solid #D1CEC7',
                borderRadius: '8px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                backgroundColor: activeFilterCount > 0 ? '#C9A84C' : '#FFFFFF',
                color: activeFilterCount > 0 ? '#1A1A1A' : '#4A4A4A',
              }}
            >
              Filters
              {activeFilterCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px',
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Sidebar — Desktop always visible */}
          <div
            style={{
              width: '220px',
              minWidth: '220px',
              display: sidebarOpen ? 'block' : 'none',
              position: sidebarOpen ? 'fixed' : 'sticky',
              inset: sidebarOpen ? 0 : 'auto',
              top: sidebarOpen ? 0 : '80px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: sidebarOpen ? 0 : '12px',
              padding: '1.25rem',
              zIndex: sidebarOpen ? 200 : 1,
              overflowY: 'auto',
              maxHeight: sidebarOpen ? '100vh' : 'calc(100vh - 100px)',
            }}
            className="md:block md:!display-block"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A' }}>Filters</h3>
              {sidebarOpen && (
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#8A8A8A' }}>×</button>
              )}
            </div>
            <FiltersPanel />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 199,
              }}
            />
          )}

          {/* Results grid */}
          <div style={{ flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#8A8A8A' }}>
                <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No creators match your filters</p>
                <p style={{ fontSize: '0.875rem' }}>Try broadening your search</p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {filtered.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
