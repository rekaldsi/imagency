'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

type Tab = 'overview' | 'licenses' | 'billing'

const MOCK_LICENSES = [
  { id: 'LIC-4821', creatorId: 'IMA-1001', type: 'one-time', use: 'Advertising', scope: 'Digital + Social', territory: 'North America', expiry: '2026-05-01', daysLeft: 28, cost: 3200, status: 'active', apiKey: 'ik_live_lic4821_abc123', callsUsed: 842, rendersGenerated: 47 },
  { id: 'LIC-3915', creatorId: 'IMA-1006', type: 'subscription', use: 'Streaming', scope: 'Digital + OTT', territory: 'Global', expiry: '2026-07-15', daysLeft: 103, cost: 8400, status: 'active', apiKey: 'ik_live_lic3915_def456', callsUsed: 1000, rendersGenerated: 200 },
  { id: 'LIC-2741', creatorId: 'IMA-1003', type: 'one-time', use: 'Film & TV', scope: 'Broadcast', territory: 'US Only', expiry: '2026-12-01', daysLeft: 242, cost: 5600, status: 'active', apiKey: 'ik_live_lic2741_ghi789', callsUsed: 0, rendersGenerated: 0 },
  { id: 'LIC-1892', creatorId: 'IMA-1011', type: 'royalty', use: 'Gaming', scope: 'In-game', territory: 'Europe', expiry: '2026-09-20', daysLeft: 170, cost: 1800, status: 'pending', apiKey: 'ik_live_lic1892_jkl012', callsUsed: 0, rendersGenerated: 0 },
  { id: 'LIC-0734', creatorId: 'IMA-1002', type: 'one-time', use: 'Advertising', scope: 'Social', territory: 'US Only', expiry: '2026-02-01', daysLeft: -60, cost: 980, status: 'expired', apiKey: 'ik_live_lic0734_mno345', callsUsed: 320, rendersGenerated: 18 },
]

const MOCK_INVOICES = [
  { id: 'INV-0041', date: '2026-04-01', description: 'LIC-4821 — Advertising · 90 days', amount: 3200, status: 'paid' },
  { id: 'INV-0038', date: '2026-03-15', description: 'LIC-3915 — Streaming subscription (Month 3)', amount: 1400, status: 'paid' },
  { id: 'INV-0031', date: '2026-02-20', description: 'LIC-2741 — Film & TV · 1 year', amount: 5600, status: 'paid' },
  { id: 'INV-0028', date: '2026-02-01', description: 'LIC-1892 — Gaming royalty license', amount: 1800, status: 'pending' },
]

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    active: { bg: '#E8F5E9', text: '#2D7D4F' },
    expired: { bg: '#FFEBEE', text: '#C0392B' },
    pending: { bg: '#FFF8E1', text: '#E67E22' },
    paid: { bg: '#E8F5E9', text: '#2D7D4F' },
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
  const expiringLicenses = MOCK_LICENSES.filter((l) => l.daysLeft > 0 && l.daysLeft <= 30)

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
          { label: 'Spend this month', value: '$4,200', sub: '+$400 vs last month' },
          { label: 'Total spend', value: '$18,600', sub: 'All time' },
          { label: 'Active licenses', value: '4', sub: '1 pending activation' },
          { label: 'API calls used', value: '1,842', sub: 'of 10,000 limit' },
          { label: 'Renders generated', value: '265', sub: 'This billing cycle' },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </p>
            <p style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginBottom: '4px' }}>{s.value}</p>
            <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* API usage bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A' }}>API usage</h3>
          <span style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>1,842 / 10,000 calls</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#E8E6E1', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: '18.42%',
              height: '100%',
              backgroundColor: '#C9A84C',
              borderRadius: '4px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <p style={{ fontSize: '0.775rem', color: '#8A8A8A', marginTop: '6px' }}>18% of monthly limit used</p>
      </div>

      {/* Expiring licenses alert */}
      {expiringLicenses.length > 0 && (
        <div
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE082',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#E67E22', marginBottom: '0.75rem' }}>
            Licenses expiring soon
          </h3>
          {expiringLicenses.map((lic) => (
            <div key={lic.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1A1A1A' }}>{lic.id} — {lic.use} ({lic.territory})</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>Expires {lic.expiry} · {lic.daysLeft} days left</p>
              </div>
              <Link
                href={`/buyer/license?creator=${lic.creatorId}`}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#E67E22',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Renew
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LicensesTab() {
  const [expandedLic, setExpandedLic] = useState<string | null>(null)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Link
          href="/buyer/search"
          style={{
            padding: '0.6rem 1.25rem',
            backgroundColor: '#C9A84C',
            color: '#1A1A1A',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          + New License
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MOCK_LICENSES.map((lic) => (
          <div
            key={lic.id}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* Row */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem 1.25rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedLic(expandedLic === lic.id ? null : lic.id)}
            >
              <div style={{ flex: 1, minWidth: '140px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1A1A1A', marginBottom: '2px' }}>{lic.id}</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>Creator #{lic.creatorId} · {lic.type}</p>
              </div>
              <div style={{ minWidth: '100px' }}>
                <p style={{ fontSize: '0.8rem', color: '#4A4A4A', fontWeight: 500 }}>{lic.use}</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>{lic.territory}</p>
              </div>
              <div style={{ minWidth: '100px' }}>
                <p style={{ fontSize: '0.8rem', color: '#4A4A4A', fontWeight: 500 }}>
                  {lic.daysLeft > 0 ? `${lic.daysLeft}d left` : 'Expired'}
                </p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>{lic.expiry}</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A' }}>${lic.cost.toLocaleString()}</p>
              </div>
              <StatusBadge status={lic.status} />
              <span style={{ color: '#8A8A8A', fontSize: '0.875rem' }}>{expandedLic === lic.id ? '▲' : '▼'}</span>
            </div>

            {/* Expanded details */}
            {expandedLic === lic.id && (
              <div
                style={{
                  borderTop: '1px solid #F4F3EF',
                  backgroundColor: '#FAFAF8',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '4px' }}>API Key</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#1A1A1A', wordBreak: 'break-all' }}>{lic.apiKey}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '4px' }}>Scope</p>
                    <p style={{ fontSize: '0.875rem', color: '#1A1A1A' }}>{lic.scope}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '4px' }}>API calls used</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A1A' }}>{lic.callsUsed.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#8A8A8A', marginBottom: '4px' }}>Renders generated</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1A1A' }}>{lic.rendersGenerated}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #D1CEC7',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      backgroundColor: '#FFFFFF',
                      color: '#4A4A4A',
                    }}
                  >
                    Download Agreement
                  </button>
                  {lic.status !== 'expired' && (
                    <Link
                      href={`/buyer/license?creator=${lic.creatorId}`}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#C9A84C',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#1A1A1A',
                        textDecoration: 'none',
                      }}
                    >
                      Renew / Expand
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BillingTab() {
  return (
    <div>
      {/* Payment method */}
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
          <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A', marginBottom: '4px' }}>Payment method on file</h3>
          <p style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>Visa ending in 4242 · Expires 12/28</p>
        </div>
        <button
          style={{
            padding: '0.6rem 1.25rem',
            border: '1px solid #D1CEC7',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#4A4A4A',
          }}
        >
          Update Payment Method
        </button>
      </div>

      {/* Usage breakdown */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A', marginBottom: '1rem' }}>Usage-based billing — April 2026</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { label: 'Base license fees', amount: 3600 },
            { label: 'API overage (0 calls)', amount: 0 },
            { label: 'Platform fee (30%)', amount: 1080 },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', paddingBottom: '0.5rem', borderBottom: '1px solid #F4F3EF' }}>
              <span style={{ color: '#4A4A4A' }}>{item.label}</span>
              <span style={{ fontWeight: 500, color: '#1A1A1A' }}>${item.amount.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A', paddingTop: '0.25rem' }}>
            <span>Total this month</span>
            <span>$4,680</span>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E6E1',
          borderRadius: '12px',
          padding: '1.25rem',
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A1A', marginBottom: '1rem' }}>Invoices</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {MOCK_INVOICES.map((inv) => (
            <div
              key={inv.id}
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
                <p style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1A1A1A' }}>{inv.id}</p>
                <p style={{ fontSize: '0.775rem', color: '#8A8A8A' }}>{inv.date} · {inv.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A' }}>${inv.amount.toLocaleString()}</p>
                <StatusBadge status={inv.status} />
                <button
                  style={{
                    padding: '0.4rem 0.875rem',
                    border: '1px solid #D1CEC7',
                    borderRadius: '6px',
                    fontSize: '0.775rem',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    color: '#4A4A4A',
                  }}
                >
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'licenses', label: 'License Management' },
    { id: 'billing', label: 'Billing' },
  ]

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1A1A1A', marginBottom: '4px' }}>Buyer Dashboard</h1>
            <p style={{ fontSize: '0.875rem', color: '#8A8A8A' }}>Manage your licenses and usage</p>
          </div>
          <Link
            href="/buyer/search"
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#C9A84C',
              color: '#1A1A1A',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Browse Talent
          </Link>
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
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'licenses' && <LicensesTab />}
        {activeTab === 'billing' && <BillingTab />}
      </main>
    </div>
  )
}
