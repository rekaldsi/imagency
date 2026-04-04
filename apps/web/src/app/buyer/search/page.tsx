'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CreatorCard from '@/components/CreatorCard'
import type { Creator } from '@/components/CreatorCard'

const VOICE_TYPES = ['All', 'Bass', 'Baritone', 'Tenor', 'Alto', 'Mezzo-Soprano', 'Soprano']
const ACCENTS = ['All', 'American General', 'American Southern', 'British RP', 'British Asian', 'French', 'Italian', 'Indian English', 'South Indian', 'British Nigerian', 'German']
const USE_CATEGORIES = ['All', 'Advertising', 'Film & TV', 'Streaming', 'Gaming', 'AI Model Training']
const GENDERS = ['All', 'Male', 'Female', 'Non-binary']
const AGE_RANGES = ['All', '18-24', '22-30', '24-32', '25-34', '28-38', '30-40', '35-44', '40-52', '45-55', '55-65']

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'

export default function BuyerSearchPage() {
  const [allCreators, setAllCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/creators?limit=50`)
      .then((r) => r.json())
      .then((data) => {
        const mapped: Creator[] = (data.creators || []).map((c: Record<string, unknown>) => ({
          id: c.id as string,
          firstName: c.firstName as string,
          lastInitial: c.lastInitial as string,
          ageRange: c.ageRange as string,
          gender: c.gender as string,
          voiceType: c.voiceType as string,
          accent: c.accent as string,
          availableUses: (c.availableUses as string[]) || [],
          totalEarnings: c.totalEarnings as number,
          avatarSeed: c.avatarSeed as number,
          imageUrl: c.imageProfileUrl as string,
          energyArchetype: c.energyArchetype as string,
          skinTone: c.skinTone as string,
        }))
        setAllCreators(mapped)
      })
      .catch(() => setAllCreators([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return allCreators.filter((c) => {
      if (filters.gender !== 'All' && c.gender?.toLowerCase() !== filters.gender.toLowerCase()) return false
      if (filters.ageRange !== 'All' && c.ageRange !== filters.ageRange) return false
      if (filters.voiceType !== 'All' && c.voiceType !== filters.voiceType) return false
      if (filters.accent !== 'All' && c.accent !== filters.accent) return false
      if (filters.skinTone !== 'All' && c.skinTone !== filters.skinTone) return false
      if (filters.useCategory !== 'All' && !c.availableUses.includes(filters.useCategory)) return false
      if (filters.search && !`${c.firstName} ${c.energyArchetype}`.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    })
  }, [filters, allCreators])

  const setFilter = (key: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => k !== 'search' && v !== 'All' && v !== ''
  ).length + (filters.search ? 1 : 0)

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
              {loading ? 'Loading...' : `${filtered.length} of ${allCreators.length} creators match your filters`}
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
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#8A8A8A' }}>
                <p style={{ fontSize: '1.1rem' }}>Loading talent...</p>
              </div>
            ) : filtered.length === 0 ? (
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
