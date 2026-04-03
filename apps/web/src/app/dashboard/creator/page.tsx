'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

type Tab = 'overview' | 'profile' | 'licenses' | 'earnings' | 'approvals'

const MOCK_LICENSES = [
  { id: 'LIC-4821', buyer: 'Brand Studio A', type: 'one-time', use: 'Advertising', territory: 'North America', duration: '90 days', amount: 560, status: 'active', date: '2026-02-01' },
  { id: 'LIC-3915', buyer: 'Creative Agency B', type: 'subscription', use: 'Streaming', territory: 'Global', duration: '6 months', amount: 840, status: 'active', date: '2026-01-15' },
  { id: 'LIC-2741', buyer: 'Media House C', type: 'one-time', use: 'Film & TV', territory: 'US Only', duration: '1 year', amount: 1400, status: 'completed', date: '2025-12-01' },
  { id: 'LIC-1892', buyer: 'Digital Studio D', type: 'royalty', use: 'Gaming', territory: 'Europe', duration: '6 months', amount: 300, status: 'pending', date: '2026-03-20' },
]

const MOCK_EARNINGS_CHART = [
  { month: 'Oct', amount: 1200 },
  { month: 'Nov', amount: 1800 },
  { month: 'Dec', amount: 1400 },
  { month: 'Jan', amount: 2200 },
  { month: 'Feb', amount: 2600 },
  { month: 'Mar', amount: 3100 },
  { month: 'Apr', amount: 2840 },
]

const MAX_EARNING = Math.max(...MOCK_EARNINGS_CHART.map((e) => e.amount))

const MOCK_PENDING = [
  {
    id: 'REQ-0091',
    buyer: 'Gaming Co. X',
    use: 'Gaming / Virtual Worlds',
    medium: 'In-game character skin',
    territory: 'Worldwide',
    fee: 420,
    hoursLeft: 48,
  },
  {
    id: 'REQ-0087',
    buyer: 'Brand Co. Y',
    use: 'AI Model Training',
    medium: 'Training dataset',
    territory: 'US Only',
    fee: 680,
    hoursLeft: 12,
  },
]

const MOCK_PAYOUTS = [
  { date: '2026-03-28', amount: 1400, method: 'Bank Transfer', status: 'Completed', ref: 'PAY-7821' },
  { date: '2026-02-28', amount: 980, method: 'Bank Transfer', status: 'Completed', ref: 'PAY-6234' },
  { date: '2026-01-30', amount: 1120, method: 'Bank Transfer', status: 'Completed', ref: 'PAY-5108' },
]

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    active: { bg: '#E8F5E9', text: '#2D7D4F' },
    completed: { bg: '#F4F3EF', text: '#8A8A8A' },
    pending: { bg: '#FFF8E1', text: '#E67E22' },
  }
  const style = colors[status] || colors.pending
  return (
    <span
      style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: '20px',
        backgroundColor: style.bg,
        color: style.text,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  )
}

function OverviewTab() {
  return (
    <div>
      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Total earned', value: '$18,400', sub: '+$2,840 this month', highlight: true },
          { label: 'This month', value: '$2,840', sub: '↑ 8% vs last month' },
          { label: 'Pending', value: '$1,200', sub: 'Awaiting payout' },
          { label: 'Active licenses', value: '7', sub: '2 pending approval' },
          { label: 'Profile views', value: '312', sub: 'This week' },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${s.highlight ? '#C9A84C' : '#E8E6E1'}`,
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </p>
            <p style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginBottom: '4px' }}>{s.value}</p>
            <p style={{ fontSize: '0.775rem', color: s.highlight ? '#C9A84C' : '#8A8A8A' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem', color: '#1A1A1A' }}>Recent activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { icon: '💰', text: 'Brand Studio A purchased a 90-day advertising license', date: 'Apr 1', amount: '+$560' },
            { icon: '🏦', text: 'Payout of $1,400 processed to bank account', date: 'Mar 28', amount: '-$1,400' },
            { icon: '⏳', text: 'Gaming Co. X requested approval for virtual world use', date: 'Mar 25', amount: '$420' },
            { icon: '📝', text: 'Media House C renewed streaming subscription license', date: 'Mar 20', amount: '+$840' },
          ].map((a) => (
            <div
              key={a.text}
              style={{
                display: 'flex',
                gap: '0.875rem',
                alignItems: 'flex-start',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #F4F3EF',
              }}
            >
              <span style={{ fontSize: '1.125rem' }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', color: '#1A1A1A', lineHeight: 1.4 }}>{a.text}</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '2px' }}>{a.date}</p>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: a.amount.startsWith('+') ? '#2D7D4F' : '#1A1A1A', whiteSpace: 'nowrap' }}>
                {a.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  const completeness = 72

  return (
    <div>
      {/* Profile preview */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="Profile"
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1A1A1A', marginBottom: '4px' }}>Marcus T.</h3>
            <p style={{ fontSize: '0.85rem', color: '#8A8A8A' }}>30–39 · Baritone · Confident & Authoritative</p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
              {['Advertising', 'Film & TV', 'Streaming'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    backgroundColor: '#F4F3EF',
                    borderRadius: '20px',
                    color: '#4A4A4A',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile completeness */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #F4F3EF', backgroundColor: '#FAFAF8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#4A4A4A' }}>Profile completeness</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C9A84C' }}>{completeness}%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: '#E8E6E1', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${completeness}%`,
                height: '100%',
                backgroundColor: '#C9A84C',
                borderRadius: '3px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '6px' }}>
            Add bio and voice recording to reach 100%
          </p>
        </div>
      </div>

      {/* Edit sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { label: 'Photos', desc: '12 photos uploaded', status: 'complete', icon: '📷' },
          { label: 'Voice recording', desc: 'Not uploaded', status: 'missing', icon: '🎙' },
          { label: 'Bio', desc: 'Not added', status: 'missing', icon: '✍️' },
          { label: 'Permissions', desc: '3 categories enabled', status: 'complete', icon: '⚙️' },
        ].map((section) => (
          <div
            key={section.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '1rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '10px',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1A1A1A' }}>{section.label}</p>
              <p style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>{section.desc}</p>
            </div>
            <StatusBadge status={section.status} />
            <button
              style={{
                padding: '0.4rem 0.875rem',
                border: '1px solid #D1CEC7',
                borderRadius: '6px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                color: '#4A4A4A',
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function LicensesTab() {
  const [selectedLicense, setSelectedLicense] = useState<typeof MOCK_LICENSES[0] | null>(null)

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E8E6E1' }}>
              {['License ID', 'Buyer', 'Use', 'Territory', 'Amount', 'Status'].map((h) => (
                <th key={h} style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontWeight: 600, color: '#8A8A8A', fontSize: '0.775rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_LICENSES.map((lic) => (
              <tr
                key={lic.id}
                style={{ borderBottom: '1px solid #F4F3EF', cursor: 'pointer' }}
                onClick={() => setSelectedLicense(lic)}
              >
                <td style={{ padding: '0.875rem 0.5rem', fontWeight: 500, color: '#C9A84C', fontFamily: 'monospace' }}>{lic.id}</td>
                <td style={{ padding: '0.875rem 0.5rem', color: '#1A1A1A' }}>{lic.buyer}</td>
                <td style={{ padding: '0.875rem 0.5rem', color: '#4A4A4A' }}>{lic.use}</td>
                <td style={{ padding: '0.875rem 0.5rem', color: '#4A4A4A' }}>{lic.territory}</td>
                <td style={{ padding: '0.875rem 0.5rem', fontWeight: 600, color: '#1A1A1A' }}>${lic.amount.toLocaleString()}</td>
                <td style={{ padding: '0.875rem 0.5rem' }}><StatusBadge status={lic.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* License detail modal */}
      {selectedLicense && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setSelectedLicense(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.75rem',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A', marginBottom: '4px' }}>{selectedLicense.id}</h3>
                <StatusBadge status={selectedLicense.status} />
              </div>
              <button
                onClick={() => setSelectedLicense(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#8A8A8A' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Buyer', value: selectedLicense.buyer },
                { label: 'License type', value: selectedLicense.type },
                { label: 'Use category', value: selectedLicense.use },
                { label: 'Territory', value: selectedLicense.territory },
                { label: 'Duration', value: selectedLicense.duration },
                { label: 'Your earnings', value: `$${selectedLicense.amount.toLocaleString()}` },
                { label: 'License date', value: selectedLicense.date },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid #F4F3EF', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#8A8A8A' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, color: '#1A1A1A' }}>{item.value}</span>
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                padding: '0.7rem',
                backgroundColor: '#F4F3EF',
                border: '1px solid #E8E6E1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                color: '#4A4A4A',
                fontWeight: 500,
              }}
            >
              Download Agreement PDF
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EarningsTab() {
  return (
    <div>
      {/* Chart */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem', color: '#1A1A1A' }}>Monthly earnings</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.75rem',
            height: '160px',
          }}
        >
          {MOCK_EARNINGS_CHART.map((item) => (
            <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', color: '#8A8A8A' }}>${(item.amount / 1000).toFixed(1)}k</span>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#C9A84C',
                  borderRadius: '4px 4px 0 0',
                  height: `${(item.amount / MAX_EARNING) * 120}px`,
                  transition: 'height 0.4s ease',
                }}
              />
              <span style={{ fontSize: '0.7rem', color: '#8A8A8A' }}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout CTA */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '4px' }}>Available to withdraw</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1A1A1A' }}>$1,200</p>
          <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '2px' }}>Minimum $25 · Bank transfer or PayPal</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '0.7rem 1.25rem',
              backgroundColor: '#F4F3EF',
              border: '1px solid #D1CEC7',
              borderRadius: '8px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              color: '#4A4A4A',
            }}
          >
            Connect Bank / PayPal
          </button>
          <button
            style={{
              padding: '0.7rem 1.25rem',
              backgroundColor: '#C9A84C',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontWeight: 700,
              color: '#1A1A1A',
            }}
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Payout history */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem', color: '#1A1A1A' }}>Payout history</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {MOCK_PAYOUTS.map((p) => (
            <div
              key={p.ref}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.875rem 0',
                borderBottom: '1px solid #F4F3EF',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <p style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1A1A1A' }}>{p.ref}</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>{p.date} · {p.method}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2D7D4F' }}>${p.amount.toLocaleString()}</p>
                <StatusBadge status={p.status.toLowerCase()} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApprovalsTab() {
  const [dismissed, setDismissed] = useState<string[]>([])

  const active = MOCK_PENDING.filter((p) => !dismissed.includes(p.id))

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', marginBottom: '1.5rem' }}>
        These requests require your approval. You have 72 hours to respond before they auto-expire.
      </p>

      {active.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#8A8A8A', fontSize: '0.9rem' }}>
          No pending approvals
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {active.map((req) => (
          <div
            key={req.id}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A', marginBottom: '4px' }}>{req.id}</p>
                <p style={{ fontSize: '0.85rem', color: '#8A8A8A' }}>{req.buyer}</p>
              </div>
              <div
                style={{
                  backgroundColor: req.hoursLeft < 24 ? '#FFF3CD' : '#F4F3EF',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  color: req.hoursLeft < 24 ? '#E67E22' : '#8A8A8A',
                }}
              >
                ⏱ {req.hoursLeft}h remaining
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Use', value: req.use },
                { label: 'Medium', value: req.medium },
                { label: 'Territory', value: req.territory },
                { label: 'Offered fee', value: `$${req.fee}` },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A1A' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setDismissed((d) => [...d, req.id])}
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#2D7D4F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Approve
              </button>
              <button
                onClick={() => setDismissed((d) => [...d, req.id])}
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#FFF0F0',
                  border: '1px solid #FFCDD2',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  color: '#C0392B',
                  fontWeight: 500,
                }}
              >
                Decline
              </button>
              <button
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #D1CEC7',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  color: '#4A4A4A',
                }}
              >
                Request Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'Profile' },
    { id: 'licenses', label: 'Licenses' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'approvals', label: 'Approvals', badge: '2' },
  ]

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginBottom: '4px' }}>Creator Dashboard</h1>
            <p style={{ fontSize: '0.875rem', color: '#8A8A8A' }}>Welcome back, Marcus</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link
              href="/creator"
              style={{
                padding: '0.6rem 1.25rem',
                border: '1px solid #D1CEC7',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#4A4A4A',
                textDecoration: 'none',
              }}
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            borderBottom: '2px solid #E8E6E1',
            marginBottom: '1.75rem',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#1A1A1A' : '#8A8A8A',
                borderBottom: `2px solid ${activeTab === tab.id ? '#C9A84C' : 'transparent'}`,
                marginBottom: '-2px',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {tab.label}
              {tab.badge && (
                <span
                  style={{
                    backgroundColor: '#C9A84C',
                    color: '#1A1A1A',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'licenses' && <LicensesTab />}
        {activeTab === 'earnings' && <EarningsTab />}
        {activeTab === 'approvals' && <ApprovalsTab />}
      </main>
    </div>
  )
}
