'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface Creator {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  voiceType: string
  availableUses: string[]
  totalEarnings?: number
  avatarSeed: number
  skinTone?: string
  accent?: string
  energyArchetype?: string
}

interface CreatorCardProps {
  creator: Creator
  showLicense?: boolean
}

export default function CreatorCard({ creator, showLicense = false }: CreatorCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        borderTop: '3px solid #C9A84C',
        border: '1px solid #E8E6E1',
        borderTopWidth: '3px',
        borderTopColor: '#C9A84C',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#F4F3EF' }}>
        <img
          src={`https://i.pravatar.cc/400?img=${creator.avatarSeed}`}
          alt={`${creator.firstName} ${creator.lastInitial}.`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontWeight: 600, color: '#1A1A1A', fontSize: '0.95rem' }}>
            {creator.firstName} {creator.lastInitial}.
          </div>
          <div style={{ fontSize: '0.8rem', color: '#8A8A8A', marginTop: '2px' }}>
            {creator.ageRange} · {creator.voiceType}
          </div>
        </div>

        {creator.energyArchetype && (
          <div style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#C9A84C', marginBottom: '0.75rem', lineHeight: 1.3 }}>
            {creator.energyArchetype}
          </div>
        )}

        {/* Available for licensing tag */}
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '0.7rem',
            color: '#2D6A4F',
            backgroundColor: '#D8F3DC',
            borderRadius: 0,
            padding: '2px 8px',
            fontWeight: 600,
            display: 'inline-block',
          }}>
            Available for licensing
          </span>
        </div>

        {/* Use Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
          {creator.availableUses.slice(0, 3).map((use) => (
            <span
              key={use}
              style={{
                fontSize: '0.65rem',
                border: '1px solid #D4D0C8',
                backgroundColor: 'transparent',
                color: '#6A6A6A',
                padding: '2px 8px',
              }}
            >
              {use}
            </span>
          ))}
          {creator.availableUses.length > 3 && (
            <span style={{ fontSize: '0.65rem', color: '#AAAAAA' }}>+{creator.availableUses.length - 3}</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href={`/buyer/profile/${creator.id}`}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.8rem',
              padding: '8px 0',
              border: '1px solid #E8E6E1',
              color: '#1A1A1A',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            Preview
          </Link>
          {showLicense && (
            <Link
              href={`/buyer/license?creatorId=${creator.id}`}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '0.8rem',
                padding: '8px 0',
                backgroundColor: '#1A1A1A',
                color: '#FAFAF8',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              License
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
