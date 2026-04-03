'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Tab = 'overview' | 'profile' | 'licenses' | 'earnings' | 'approvals'

interface LicenseRow {
  id: string
  buyer: string
  useType: string
  territory: string
  duration: string
  amount: string
  status: 'Active' | 'Expired' | 'Pending'
}

const LICENSES: LicenseRow[] = [
  { id: 'LIC-001', buyer: 'Brand Studio A', useType: 'Advertising', territory: 'United States', duration: '90 days', amount: '$340', status: 'Active' },
  { id: 'LIC-002', buyer: 'Media Agency B', useType: 'Film & TV', territory: 'North America', duration: '6 months', amount: '$1,200', status: 'Active' },
  { id: 'LIC-003', buyer: 'Game Studio X', useType: 'Gaming', territory: 'Global', duration: '1 year', amount: '$800', status: 'Active' },
  { id: 'LIC-004', buyer: 'Brand Studio C', useType: 'Streaming', territory: 'Europe', duration: '30 days', amount: '$180', status: 'Expired' },
  { id: 'LIC-005', buyer: 'AI Lab D', useType: 'AI Training', territory: 'Global', duration: '1 year', amount: '$1,500', status: 'Active' },
  { id: 'LIC-006', buyer: 'Brand Agency E', useType: 'Advertising', territory: 'United States', duration: '90 days', amount: '$340', status: 'Pending' },
]

const PAYOUTS = [
  { date: 'Jan 31', amount: '$420', method: 'Stripe', status: 'Completed' },
  { date: 'Feb 28', amount: '$680', method: 'Stripe', status: 'Completed' },
  { date: 'Mar 31', amount: '$340', method: 'Stripe', status: 'Completed' },
  { date: 'Apr 30', amount: '$890', method: 'Stripe', status: 'Completed' },
  { date: 'May 31', amount: '$612', method: 'Stripe', status: 'Completed' },
  { date: 'Jun 15', amount: '$1,200', method: 'Stripe', status: 'Pending' },
]

const CHART_DATA = [
  { month: 'Jan', value: 420 },
  { month: 'Feb', value: 680 },
  { month: 'Mar', value: 340 },
  { month: 'Apr', value: 890 },
  { month: 'May', value: 612 },
  { month: 'Jun', value: 1200 },
]

const APPROVALS = [
  {
    id: 'REQ-001',
    buyer: 'Game Studio',
    licenseType: 'Gaming license',
    use: 'Character voice in open-world RPG',
    territory: 'Global',
    duration: '1 year',
    offered: '$800',
    hoursRemaining: 68,
  },
  {
    id: 'REQ-002',
    buyer: 'AI Lab',
    licenseType: 'AI Training license',
    use: 'Training generative voice model',
    territory: 'Global',
    duration: '2 years',
    offered: '$2,500',
    hoursRemaining: 12,
  },
  {
    id: 'REQ-003',
    buyer: 'Media Agency',
    licenseType: 'Film & TV',
    use: 'Background character in streaming series',
    territory: 'North America',
    duration: '6 months',
    offered: '$600',
    hoursRemaining: 47,
  },
]

const TABS: { id: Tab; label: string; badge?: number }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'profile', label: 'Profile' },
  { id: 'licenses', label: 'Licenses' },
  { id: 'earnings', label: 'Earnings' },
  { id: 'approvals', label: 'Pending Approvals', badge: 3 },
]

// ─── Timer badge with live countdown ────────────────────────────────────────
function TimerBadge({ hours }: { hours: number }) {
  const [remaining, setRemaining] = useState(hours * 3600)

  useEffect(() => {
    const interval = setInterval(() => setRemaining(prev => Math.max(0, prev - 1)), 1000)
    return () => clearInterval(interval)
  }, [])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  const colorClass = h < 6 ? 'text-red-500' : h < 24 ? 'text-gold' : 'text-charcoal-muted'

  return (
    <span className={`text-sm font-mono ${colorClass}`}>
      ⏱ {h}h {pad(m)}m {pad(s)}s remaining
    </span>
  )
}

// ─── License detail modal ────────────────────────────────────────────────────
function LicenseModal({ license, onClose }: { license: LicenseRow; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl border border-warm-border shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-charcoal">License Details</h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal text-2xl leading-none">&times;</button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6">
          {[
            ['License ID', license.id],
            ['Buyer', license.buyer],
            ['Use Type', license.useType],
            ['Territory', license.territory],
            ['Duration', license.duration],
            ['Amount', license.amount],
            ['Status', license.status],
          ].map(([label, val]) => (
            <div key={label} className="contents">
              <span className="text-charcoal-muted">{label}</span>
              <span className="text-charcoal font-medium">{val}</span>
            </div>
          ))}
        </div>

        <h3 className="text-charcoal font-semibold text-sm mb-3">Usage Log</h3>
        <table className="w-full text-xs mb-6">
          <thead>
            <tr className="text-charcoal-muted border-b border-warm-border">
              <th className="text-left py-1.5">Date</th>
              <th className="text-left py-1.5">API Calls</th>
              <th className="text-left py-1.5">Renders</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Jun 15, 2026', calls: 3, renders: 2 },
              { date: 'Jun 12, 2026', calls: 7, renders: 5 },
              { date: 'Jun 8, 2026', calls: 2, renders: 2 },
            ].map(row => (
              <tr key={row.date} className="border-b border-warm-border last:border-0">
                <td className="py-1.5 text-charcoal-muted">{row.date}</td>
                <td className="py-1.5 text-charcoal">{row.calls}</td>
                <td className="py-1.5 text-charcoal">{row.renders}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-primary w-full">Download Agreement PDF</button>
      </div>
    </div>
  )
}

// ─── SVG earnings chart ──────────────────────────────────────────────────────
function EarningsChart() {
  const maxValue = Math.max(...CHART_DATA.map(d => d.value))
  const chartH = 160
  const barW = 36
  const gap = 18
  const leftPad = 44
  const totalW = leftPad + CHART_DATA.length * (barW + gap)

  return (
    <div className="overflow-x-auto">
      <svg width={totalW} height={chartH + 44} className="overflow-visible">
        {/* Grid lines + Y labels */}
        {[0, 400, 800, 1200].map(v => {
          const y = chartH - (v / maxValue) * chartH
          return (
            <g key={v}>
              <line x1={leftPad - 4} y1={y} x2={totalW} y2={y} stroke="#E5E3DC" strokeWidth={1} />
              <text x={leftPad - 8} y={y + 4} fontSize={10} fill="#6B6B6B" textAnchor="end">${v}</text>
            </g>
          )
        })}
        {/* Bars */}
        {CHART_DATA.map((d, i) => {
          const barH = (d.value / maxValue) * chartH
          const x = leftPad + i * (barW + gap)
          const y = chartH - barH
          return (
            <g key={d.month}>
              <rect x={x} y={y} width={barW} height={barH} fill="#C9A84C" rx={4} className="hover:opacity-75 transition-opacity cursor-pointer">
                <title>${d.value}</title>
              </rect>
              <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" fontSize={11} fill="#6B6B6B">{d.month}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── Status pill ─────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const cls =
    status === 'Active' ? 'bg-green-100 text-green-700' :
    status === 'Expired' ? 'bg-red-100 text-red-600' :
    'bg-gold-light text-charcoal'
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [selectedLicense, setSelectedLicense] = useState<LicenseRow | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (id: string) => setExpandedSection(prev => prev === id ? null : id)

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            {/* Desktop avatar card */}
            <div className="bg-white rounded-2xl border border-warm-border p-6 mb-4 text-center hidden lg:block">
              <img
                src="https://i.pravatar.cc/80?img=20"
                alt="Maya T."
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              />
              <h2 className="text-charcoal font-semibold text-lg">Maya T.</h2>
              <p className="text-charcoal-muted text-sm mb-4">Creator Account</p>
              <a href="#" className="text-gold text-sm hover:underline">View Public Profile →</a>
            </div>

            {/* Mobile inline user info */}
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <img src="https://i.pravatar.cc/48?img=20" alt="Maya T." className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h2 className="text-charcoal font-semibold">Maya T.</h2>
                <p className="text-charcoal-muted text-sm">Creator Account</p>
              </div>
            </div>

            {/* Tab navigation */}
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gold text-charcoal'
                      : 'text-charcoal-muted hover:bg-warm-cream hover:text-charcoal'
                  }`}
                >
                  {tab.label}
                  {tab.badge && (
                    <span className="bg-charcoal text-warm-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">

            {/* ══ OVERVIEW ══ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Overview</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Total Earned</p>
                    <p className="text-charcoal text-2xl font-bold">$8,430</p>
                    <p className="text-green-600 text-xs mt-1">↑ +$340 this month</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Active Licenses</p>
                    <p className="text-charcoal text-2xl font-bold">7</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Profile Views</p>
                    <p className="text-charcoal text-2xl font-bold">1,247</p>
                    <p className="text-charcoal-muted text-xs mt-1">this week</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Pending Requests</p>
                    <div className="mt-1">
                      <span className="bg-gold text-charcoal text-2xl font-bold rounded-full px-3 py-1">3</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <h2 className="text-charcoal font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[
                      { icon: '💼', text: 'Brand Studio A licensed your likeness for Advertising', sub: '$340', time: '2 days ago' },
                      { icon: '📋', text: 'New license request from Game Studio X — $180 offered', sub: 'Pending', time: '3 days ago' },
                      { icon: '💸', text: 'Payout of $612 processed to your account', sub: '', time: '5 days ago' },
                      { icon: '🔄', text: 'Brand Agency B renewed your streaming license', sub: '$200', time: '1 week ago' },
                      { icon: '👁️', text: 'Your profile was viewed 47 times this week', sub: '', time: '1 week ago' },
                      { icon: '🤖', text: 'AI Training license request pending your approval', sub: '$500 offered', time: '2 weeks ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 pb-4 border-b border-warm-border last:border-0 last:pb-0">
                        <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-charcoal text-sm">{item.text}</p>
                          {item.sub && <p className="text-gold text-xs font-medium mt-0.5">{item.sub}</p>}
                        </div>
                        <span className="text-charcoal-muted text-xs shrink-0">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <h2 className="text-charcoal font-semibold mb-4">Quick Actions</h2>
                  <div className="flex flex-wrap gap-3 items-start">
                    <div>
                      <button className="btn-primary">Request Payout</button>
                      <p className="text-charcoal-muted text-xs mt-1.5">Minimum $25</p>
                    </div>
                    <button className="btn-secondary" onClick={() => setActiveTab('profile')}>Update Permissions</button>
                    <button className="btn-secondary" onClick={() => setActiveTab('profile')}>Edit Profile</button>
                  </div>
                </div>
              </div>
            )}

            {/* ══ PROFILE ══ */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Profile</h1>

                {/* Completeness */}
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-charcoal font-semibold">Profile Completeness</h2>
                    <span className="text-gold font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-warm-cream rounded-full h-2 mb-3">
                    <div className="bg-gold h-2 rounded-full transition-all" style={{ width: '75%' }} />
                  </div>
                  <p className="text-charcoal-muted text-sm mb-3">
                    Your profile is 75% complete — complete it to earn more
                  </p>
                  <p className="text-sm text-charcoal font-medium mb-1">Missing:</p>
                  <ul className="list-disc list-inside text-charcoal-muted text-sm space-y-1">
                    <li>Add at least 12 photos (you have 8)</li>
                    <li>Add voice sample</li>
                  </ul>
                </div>

                {/* Buyer preview */}
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <h2 className="text-charcoal font-semibold mb-1">How Buyers See You</h2>
                  <p className="text-charcoal-muted text-xs mb-4">Full name is hidden from buyers</p>
                  <div className="bg-warm-cream rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-warm-border flex items-center justify-center text-charcoal-muted font-bold text-lg">?</div>
                      <div>
                        <p className="text-charcoal font-semibold">Creator #IMA-4827</p>
                        <p className="text-charcoal-muted text-sm">Age range: 25–34</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-charcoal-muted">Voice type: </span><span className="text-charcoal">Warm / Mid-range</span></div>
                      <div><span className="text-charcoal-muted">Energy: </span><span className="text-charcoal">Calm & Professional</span></div>
                    </div>
                    <div className="text-sm">
                      <span className="text-charcoal-muted">Available for: </span>
                      <span className="text-charcoal">Advertising, Film & TV, Gaming, Streaming</span>
                    </div>
                  </div>
                </div>

                {/* Edit sections (accordion) */}
                {[
                  { id: 'photos', label: 'Photos' },
                  { id: 'voice', label: 'Voice Sample' },
                  { id: 'bio', label: 'Bio / Persona Tags' },
                  { id: 'permissions', label: 'Permissions' },
                ].map(section => (
                  <div key={section.id} className="bg-white rounded-2xl border border-warm-border p-6">
                    <button
                      className="w-full flex items-center justify-between text-charcoal font-semibold"
                      onClick={() => toggleSection(section.id)}
                    >
                      {section.label}
                      <span className="text-charcoal-muted text-sm">{expandedSection === section.id ? '▲' : '▼'}</span>
                    </button>

                    {expandedSection === 'photos' && section.id === 'photos' && (
                      <div className="mt-4">
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <img key={i} src={`https://i.pravatar.cc/80?img=${i + 10}`} alt="" className="w-full aspect-square object-cover rounded-lg" />
                          ))}
                        </div>
                        <button className="btn-secondary text-sm">Add more photos</button>
                      </div>
                    )}

                    {expandedSection === 'voice' && section.id === 'voice' && (
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 bg-warm-cream rounded-xl h-10 flex items-end px-3 pb-1.5 gap-0.5 overflow-hidden">
                          {Array.from({ length: 28 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-gold rounded-full shrink-0"
                              style={{ height: `${Math.sin(i * 0.7) * 10 + 14}px` }}
                            />
                          ))}
                        </div>
                        <button className="btn-secondary text-sm shrink-0">Re-record</button>
                      </div>
                    )}

                    {expandedSection === 'bio' && section.id === 'bio' && (
                      <div className="mt-4 space-y-3">
                        <textarea
                          className="input-field resize-none"
                          rows={3}
                          defaultValue="calm, professional, approachable, warm, articulate"
                          placeholder="Add persona tags..."
                        />
                        <button className="btn-primary text-sm">Save</button>
                      </div>
                    )}

                    {expandedSection === 'permissions' && section.id === 'permissions' && (
                      <div className="mt-4">
                        <a href="/permissions" className="text-gold hover:underline text-sm">Go to Permissions Settings →</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ══ LICENSES ══ */}
            {activeTab === 'licenses' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Licenses</h1>

                {/* Desktop table */}
                <div className="hidden md:block bg-white rounded-2xl border border-warm-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-border bg-warm-cream">
                        {['Buyer', 'Use Type', 'Territory', 'Duration', 'Amount', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-charcoal-muted uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-border">
                      {LICENSES.map(lic => (
                        <tr key={lic.id} className="hover:bg-warm-cream/50 transition-colors">
                          <td className="px-5 py-4 text-charcoal font-medium">{lic.buyer}</td>
                          <td className="px-5 py-4 text-charcoal">{lic.useType}</td>
                          <td className="px-5 py-4 text-charcoal-muted">{lic.territory}</td>
                          <td className="px-5 py-4 text-charcoal-muted">{lic.duration}</td>
                          <td className="px-5 py-4 text-charcoal font-semibold">{lic.amount}</td>
                          <td className="px-5 py-4"><StatusPill status={lic.status} /></td>
                          <td className="px-5 py-4">
                            {lic.status !== 'Pending' ? (
                              <button onClick={() => setSelectedLicense(lic)} className="text-gold hover:underline text-sm font-medium">
                                {lic.status === 'Expired' ? 'Renew' : 'View'}
                              </button>
                            ) : (
                              <span className="text-charcoal-muted text-sm">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {LICENSES.map(lic => (
                    <div key={lic.id} className="bg-white rounded-2xl border border-warm-border p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-charcoal font-semibold">{lic.buyer}</p>
                          <p className="text-charcoal-muted text-sm">{lic.useType} · {lic.territory}</p>
                        </div>
                        <StatusPill status={lic.status} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-muted">{lic.duration} · <span className="text-charcoal font-semibold">{lic.amount}</span></span>
                        {lic.status !== 'Pending' && (
                          <button onClick={() => setSelectedLicense(lic)} className="text-gold hover:underline font-medium">
                            {lic.status === 'Expired' ? 'Renew' : 'View'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ EARNINGS ══ */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Earnings</h1>

                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <h2 className="text-charcoal font-semibold mb-4">Monthly Earnings</h2>
                  <EarningsChart />
                </div>

                {/* Payout history */}
                <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
                  <div className="px-6 py-4 border-b border-warm-border">
                    <h2 className="text-charcoal font-semibold">Payout History</h2>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-border bg-warm-cream">
                        {['Date', 'Amount', 'Method', 'Status'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-charcoal-muted uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-border">
                      {PAYOUTS.map((p, i) => (
                        <tr key={i} className="hover:bg-warm-cream/50 transition-colors">
                          <td className="px-5 py-4 text-charcoal">{p.date}</td>
                          <td className="px-5 py-4 text-charcoal font-semibold">{p.amount}</td>
                          <td className="px-5 py-4 text-charcoal-muted">{p.method}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gold-light text-charcoal'}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Payout settings */}
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <h2 className="text-charcoal font-semibold mb-4">Payout Settings</h2>
                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal">Payment method: Visa ****4242 via Stripe</span>
                      <a href="#" className="text-gold hover:underline text-sm">Update</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal">Payout schedule: Weekly</span>
                      <a href="#" className="text-gold hover:underline text-sm">Change</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button className="btn-primary">Request Payout</button>
                    <span className="text-charcoal-muted text-sm">$482.00 available</span>
                  </div>
                </div>
              </div>
            )}

            {/* ══ PENDING APPROVALS ══ */}
            {activeTab === 'approvals' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Pending Approvals</h1>
                <p className="text-charcoal-muted text-sm -mt-2">Review requests within 72 hours. Unanswered requests auto-decline.</p>

                {APPROVALS.map(req => (
                  <div key={req.id} className="bg-white rounded-2xl border border-warm-border p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-charcoal font-semibold text-lg">{req.buyer}</h3>
                        <p className="text-charcoal-muted text-sm">{req.licenseType}</p>
                      </div>
                      <TimerBadge hours={req.hoursRemaining} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-5">
                      <div>
                        <p className="text-charcoal-muted text-xs mb-0.5">Intended Use</p>
                        <p className="text-charcoal">{req.use}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-muted text-xs mb-0.5">Territory</p>
                        <p className="text-charcoal">{req.territory}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-muted text-xs mb-0.5">Duration</p>
                        <p className="text-charcoal">{req.duration}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-muted text-xs mb-0.5">Offered</p>
                        <p className="text-charcoal font-bold text-base">{req.offered}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="btn-primary text-sm px-5 py-2.5">Approve</button>
                      <button className="text-sm px-5 py-2.5 border border-red-200 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors">Decline</button>
                      <button className="btn-secondary text-sm px-5 py-2.5">Request More Info</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* License detail modal */}
      {selectedLicense && (
        <LicenseModal license={selectedLicense} onClose={() => setSelectedLicense(null)} />
      )}

      <Footer />
    </div>
  )
}
