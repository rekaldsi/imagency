'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E8E6E1',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#C9A84C',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '16px',
              color: '#1A1A1A',
            }}
          >
            I
          </div>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
            imagency
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
          <Link href="/creator" style={{ color: '#4A4A4A', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
            For Creators
          </Link>
          <Link href="/buyer" style={{ color: '#4A4A4A', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
            For Buyers
          </Link>
          <Link href="/buyer/search" style={{ color: '#4A4A4A', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
            Browse Talent
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex" style={{ gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Log In
          </Link>
          <Link href="/creator/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: '22px', height: '2px', backgroundColor: '#1A1A1A', marginBottom: '5px', transition: 'transform 0.2s' }} />
          <div style={{ width: '22px', height: '2px', backgroundColor: '#1A1A1A', marginBottom: '5px' }} />
          <div style={{ width: '22px', height: '2px', backgroundColor: '#1A1A1A' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E8E6E1',
            padding: '1rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/creator" style={{ color: '#4A4A4A', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              For Creators
            </Link>
            <Link href="/buyer" style={{ color: '#4A4A4A', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              For Buyers
            </Link>
            <Link href="/buyer/search" style={{ color: '#4A4A4A', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Browse Talent
            </Link>
            <hr style={{ borderColor: '#E8E6E1' }} />
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ color: '#1A1A1A', fontWeight: 600, textDecoration: 'none' }}>
              Log In
            </Link>
            <Link href="/creator/register" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', textDecoration: 'none' }}>
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
