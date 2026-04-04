'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'

function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

interface Character {
  id: string
  name: string
  first_name: string
  last_initial: string
  archetype: string
  status: string
  total_earnings: number
  total_licenses: number
  profile_views: number
  image_neutral_url?: string
  voice_sample_url?: string
}

interface PlatformStats {
  totalCharacters: number
  totalLicenses: number
  totalRevenue: number
  totalApiCalls: number
}

function assetStatus(char: Character): { color: string; label: string } {
  const hasImage = !!char.image_neutral_url
  const hasVoice = !!char.voice_sample_url
  if (hasImage && hasVoice) return { color: '#2D6A4F', label: '✓ Complete' }
  if (hasImage || hasVoice) return { color: '#A87B2E', label: '~ Partial' }
  return { color: '#9B1C1C', label: '✗ Missing' }
}

export default function AdminPage() {
  const router = useRouter()
  const [characters, setCharacters] = useState<Character[]>([])
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('imagency_token')
    if (!token) {
      router.replace('/')
      return
    }

    const payload = decodeJWT(token)
    if (!payload || payload.role !== 'admin') {
      router.replace('/')
      return
    }

    const headers = { Authorization: `Bearer ${token}` }

    setLoading(true)
    Promise.all([
      fetch(`${API_URL}/api/admin/characters`, { headers }).then((r) => r.json()),
      fetch(`${API_URL}/api/admin/stats`, { headers }).then((r) => r.json()),
    ])
      .then(([charsData, statsData]) => {
        if (charsData.error) {
          setError(charsData.error)
          return
        }
        setCharacters(charsData.characters || [])
        setStats(statsData.stats || null)
      })
      .catch(() => setError('Failed to load admin data'))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8A8A8A' }}>Loading admin panel...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#EF4444' }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', color: '#F5F5F5' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F5F5F5', marginBottom: '4px' }}>Admin Panel</h1>
          <p style={{ fontSize: '0.875rem', color: '#8A8A8A' }}>Platform overview · Imagency</p>
        </div>

        {/* Stats cards */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { label: 'Total Characters', value: stats.totalCharacters, prefix: '' },
              { label: 'Total Licenses', value: stats.totalLicenses, prefix: '' },
              { label: 'Total Revenue', value: `$${(stats.totalRevenue || 0).toLocaleString()}`, prefix: '' },
              { label: 'API Calls This Month', value: stats.totalApiCalls, prefix: '' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <p style={{ fontSize: '0.75rem', color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{s.label}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#C9A84C' }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Characters table */}
        <div
          style={{
            backgroundColor: '#1A1A1A',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#F5F5F5' }}>Characters ({characters.length})</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                  {['ID', 'Name', 'Archetype', 'Status', 'Total Earnings', 'Active Licenses', 'Profile Views', 'Assets'].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        color: '#8A8A8A',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {characters.map((char, i) => {
                  const asset = assetStatus(char)
                  return (
                    <tr
                      key={char.id}
                      style={{
                        borderBottom: i < characters.length - 1 ? '1px solid #2A2A2A' : 'none',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222222')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: '#C9A84C', fontFamily: 'monospace' }}>
                        <Link href={`/admin/character/${char.id}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>
                          {char.id}
                        </Link>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#F5F5F5', fontWeight: 500 }}>
                        {char.first_name} {char.last_initial}.
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: '#A0A0A0' }}>{char.archetype}</td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            backgroundColor: char.status === 'active' ? '#1C3829' : char.status === 'suspended' ? '#3B1C1C' : '#2A2A2A',
                            color: char.status === 'active' ? '#4ADE80' : char.status === 'suspended' ? '#F87171' : '#8A8A8A',
                          }}
                        >
                          {char.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#F5F5F5' }}>
                        ${(char.total_earnings || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#F5F5F5', textAlign: 'center' }}>
                        {char.total_licenses || 0}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#A0A0A0', textAlign: 'center' }}>
                        {char.profile_views || 0}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: asset.color }}>
                        {asset.label}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
