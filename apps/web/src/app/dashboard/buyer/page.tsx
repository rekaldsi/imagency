'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Tab = 'overview' | 'licenses' | 'billing'

interface LicenseRow {
  creatorId: string
  licenseType: string
  useCategory: string
  territory: string
  expiry: string
  monthlyCost: string
  status: 'Active' | 'Expiring' | 'Expired'
  apiKey: string
  apiCallsMade: number
  apiCallsTotal: number
}

const LICENSES: LicenseRow[] = [
  { creatorId: 'IMA-4827', licenseType: 'One-Time', useCategory: 'Advertising', territory: 'United States', expiry: 'Aug 15, 2026', monthlyCost: '$340', status: 'Active', apiKey: 'ima_k_4827_xT9pQrLmNvWs3bKz', apiCallsMade: 32, apiCallsTotal: 500 },
  { creatorId: 'IMA-2341', licenseType: 'Subscription', useCategory: 'Streaming', territory: 'Global', expiry: 'Ongoing', monthlyCost: '$200/mo', status: 'Active', apiKey: 'ima_k_2341_aB7cDeFgHiJkLmNp', apiCallsMade: 18, apiCallsTotal: 300 },
  { creatorId: 'IMA-7829', licenseType: 'One-Time', useCategory: 'Gaming', territory: 'Global', expiry: 'Jul 1, 2026', monthlyCost: '$800', status: 'Expiring', apiKey: 'ima_k_7829_qRsTuVwXyZaB1cDe', apiCallsMade: 94, apiCallsTotal: 1000 },
  { creatorId: 'IMA-5512', licenseType: 'Subscription', useCategory: 'Film & TV', territory: 'North America', expiry: 'Ongoing', monthlyCost: '$400/mo', status: 'Active', apiKey: 'ima_k_5512_fGhIjKlMnOpQrStU', apiCallsMade: 41, apiCallsTotal: 200 },
  { creatorId: 'IMA-3301', licenseType: 'Royalty', useCategory: 'Advertising', territory: 'United States', expiry: 'Dec 31, 2026', monthlyCost: 'Variable', status: 'Active', apiKey: 'ima_k_3301_vWxYzAbCdEfGhIjK', apiCallsMade: 12, apiCallsTotal: 100 },
]

const ACTIVITY_LOG = [
  { date: 'Jun 15, 2026', creator: 'IMA-4827', type: 'Advertising render', calls: 1 },
  { date: 'Jun 15, 2026', creator: 'IMA-2341', type: 'Streaming render', calls: 3 },
  { date: 'Jun 14, 2026', creator: 'IMA-7829', type: 'Gaming render', calls: 2 },
  { date: 'Jun 14, 2026', creator: 'IMA-4827', type: 'Advertising render', calls: 1 },
  { date: 'Jun 13, 2026', creator: 'IMA-5512', type: 'Film render', calls: 5 },
]

const INVOICES = [
  { period: 'Jun 2026', amount: '$2,840', description: '12 licenses + API overage' },
  { period: 'May 2026', amount: '$2,340', description: '10 licenses' },
  { period: 'Apr 2026', amount: '$1,890', description: '8 licenses' },
]

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'licenses', label: 'Licenses' },
  { id: 'billing', label: 'Billing' },
]

// ─── API Key modal ────────────────────────────────────────────────────────────
function ApiKeyModal({ license, onClose }: { license: LicenseRow; onClose: () => void }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const displayKey = revealed ? license.apiKey : license.apiKey.slice(0, 8) + '...'
  const endpoint = 'https://api.imagency.io/v1/render'
  const curlSample = `curl -X POST ${endpoint} \\
  -H "Authorization: Bearer ${revealed ? license.apiKey : 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{"creator_id":"${license.creatorId}","use_type":"${license.useCategory.toLowerCase()}"}'`

  const handleCopy = () => {
    navigator.clipboard.writeText(license.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl border border-warm-border shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-charcoal">API Access — {license.creatorId}</h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal text-2xl leading-none">&times;</button>
        </div>

        {/* API Key */}
        <div className="mb-4">
          <p className="text-xs text-charcoal-muted mb-1.5 font-medium uppercase tracking-wide">API Key</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-warm-cream rounded-xl px-4 py-2.5 text-sm font-mono text-charcoal border border-warm-border break-all">
              {displayKey}
            </code>
            <button onClick={() => setRevealed(r => !r)} className="btn-secondary text-xs px-3 py-2 shrink-0">
              {revealed ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Endpoint */}
        <div className="mb-4">
          <p className="text-xs text-charcoal-muted mb-1.5 font-medium uppercase tracking-wide">Endpoint</p>
          <code className="block bg-warm-cream rounded-xl px-4 py-2.5 text-sm font-mono text-charcoal border border-warm-border">
            {endpoint}
          </code>
        </div>

        {/* Sample curl */}
        <div className="mb-4">
          <p className="text-xs text-charcoal-muted mb-1.5 font-medium uppercase tracking-wide">Sample Request</p>
          <pre className="bg-charcoal text-warm-white rounded-xl px-4 py-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {curlSample}
          </pre>
        </div>

        {/* Usage */}
        <div className="bg-warm-cream rounded-xl p-4 mb-5 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-charcoal-muted">API calls used</span>
            <span className="text-charcoal font-semibold">{license.apiCallsMade} / {license.apiCallsTotal}</span>
          </div>
          <div className="w-full bg-warm-border rounded-full h-1.5">
            <div
              className="bg-gold h-1.5 rounded-full"
              style={{ width: `${(license.apiCallsMade / license.apiCallsTotal) * 100}%` }}
            />
          </div>
        </div>

        <button onClick={handleCopy} className="btn-primary w-full">
          {copied ? '✓ Copied!' : 'Copy API Key to Clipboard'}
        </button>
      </div>
    </div>
  )
}

// ─── Expanded usage log row ───────────────────────────────────────────────────
function UsageLogRow({ creatorId }: { creatorId: string }) {
  const rows = [
    { date: 'Jun 15, 2026', calls: 3, renders: 2, ip: '104.21.x.x' },
    { date: 'Jun 12, 2026', calls: 7, renders: 5, ip: '104.21.x.x' },
    { date: 'Jun 8, 2026', calls: 2, renders: 2, ip: '104.21.x.x' },
  ]
  return (
    <tr>
      <td colSpan={8} className="bg-warm-cream px-5 py-4">
        <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wide mb-2">Usage Log — {creatorId}</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-charcoal-muted">
              <th className="text-left pb-1">Date</th>
              <th className="text-left pb-1">API Calls</th>
              <th className="text-left pb-1">Renders</th>
              <th className="text-left pb-1">IP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.date} className="border-t border-warm-border">
                <td className="py-1 text-charcoal-muted">{r.date}</td>
                <td className="py-1 text-charcoal">{r.calls}</td>
                <td className="py-1 text-charcoal">{r.renders}</td>
                <td className="py-1 font-mono text-charcoal-muted">{r.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  )
}

// ─── Status pill ─────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const cls =
    status === 'Active' ? 'bg-green-100 text-green-700' :
    status === 'Expiring' ? 'bg-orange-100 text-orange-600' :
    'bg-red-100 text-red-600'
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [apiModalLicense, setApiModalLicense] = useState<LicenseRow | null>(null)
  const [expandedCreator, setExpandedCreator] = useState<string | null>(null)

  const totalApiCalls = 4872
  const apiLimit = 10000
  const expiringCount = LICENSES.filter(l => l.status === 'Expiring').length

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            {/* Desktop company card */}
            <div className="bg-white rounded-2xl border border-warm-border p-6 mb-4 hidden lg:block">
              <div className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center text-warm-white font-bold text-xl mb-3">B</div>
              <h2 className="text-charcoal font-semibold text-lg">Brand Studio A</h2>
              <p className="text-charcoal-muted text-sm">Buyer Account</p>
            </div>

            {/* Mobile inline */}
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <div className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-warm-white font-bold">B</div>
              <div>
                <h2 className="text-charcoal font-semibold">Brand Studio A</h2>
                <p className="text-charcoal-muted text-sm">Buyer Account</p>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gold text-charcoal'
                      : 'text-charcoal-muted hover:bg-warm-cream hover:text-charcoal'
                  }`}
                >
                  {tab.label}
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

                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Total Spend This Month</p>
                    <p className="text-charcoal text-2xl font-bold">$2,840</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Active Licenses</p>
                    <p className="text-charcoal text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">API Calls Used</p>
                    <p className="text-charcoal text-2xl font-bold">{totalApiCalls.toLocaleString()}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-charcoal-muted mb-1">
                        <span>{totalApiCalls.toLocaleString()}</span>
                        <span>{apiLimit.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-warm-cream rounded-full h-1.5">
                        <div className="bg-gold h-1.5 rounded-full" style={{ width: `${(totalApiCalls / apiLimit) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Expiring Soon</p>
                    <div className="mt-1">
                      <span className="bg-orange-100 text-orange-600 text-2xl font-bold rounded-full px-3 py-1">{expiringCount}</span>
                    </div>
                  </div>
                </div>

                {/* Expiring alert */}
                {expiringCount > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-charcoal font-semibold">{expiringCount} license{expiringCount > 1 ? 's' : ''} expire within 30 days</p>
                      <p className="text-charcoal-muted text-sm mt-0.5">Renew now to avoid interruption to your campaigns</p>
                    </div>
                    <button onClick={() => setActiveTab('licenses')} className="btn-primary shrink-0 text-sm px-5 py-2.5">
                      View Expiring Licenses
                    </button>
                  </div>
                )}

                {/* Recent API Activity */}
                <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
                  <div className="px-6 py-4 border-b border-warm-border">
                    <h2 className="text-charcoal font-semibold">Recent API Activity</h2>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-border bg-warm-cream">
                        {['Date', 'Creator', 'Render Type', 'API Calls', 'Status'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-charcoal-muted uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-border">
                      {ACTIVITY_LOG.map((row, i) => (
                        <tr key={i} className="hover:bg-warm-cream/50 transition-colors">
                          <td className="px-5 py-3 text-charcoal-muted">{row.date}</td>
                          <td className="px-5 py-3 font-mono text-charcoal text-xs">{row.creator}</td>
                          <td className="px-5 py-3 text-charcoal">{row.type}</td>
                          <td className="px-5 py-3 text-charcoal">{row.calls}</td>
                          <td className="px-5 py-3 text-green-600 font-medium">✓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick stats */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Most used creator</p>
                    <p className="text-charcoal font-semibold">IMA-4827</p>
                    <p className="text-charcoal-muted text-sm">32 renders this month</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-warm-border p-5">
                    <p className="text-charcoal-muted text-xs mb-1">Top category</p>
                    <p className="text-charcoal font-semibold">Advertising</p>
                    <p className="text-charcoal-muted text-sm">48% of all renders</p>
                  </div>
                </div>
              </div>
            )}

            {/* ══ LICENSES ══ */}
            {activeTab === 'licenses' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">License Management</h1>

                {/* Desktop table */}
                <div className="hidden lg:block bg-white rounded-2xl border border-warm-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-border bg-warm-cream">
                        {['Creator ID', 'License Type', 'Use Category', 'Territory', 'Expiry', 'Monthly Cost', 'Status', 'API Key', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-charcoal-muted uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {LICENSES.map(lic => (
                        <>
                          <tr key={lic.creatorId} className="border-b border-warm-border hover:bg-warm-cream/50 transition-colors">
                            <td className="px-4 py-4 font-mono text-charcoal text-xs font-semibold">{lic.creatorId}</td>
                            <td className="px-4 py-4 text-charcoal">{lic.licenseType}</td>
                            <td className="px-4 py-4 text-charcoal">{lic.useCategory}</td>
                            <td className="px-4 py-4 text-charcoal-muted">{lic.territory}</td>
                            <td className="px-4 py-4 text-charcoal-muted whitespace-nowrap">{lic.expiry}</td>
                            <td className="px-4 py-4 text-charcoal font-semibold whitespace-nowrap">{lic.monthlyCost}</td>
                            <td className="px-4 py-4"><StatusPill status={lic.status} /></td>
                            <td className="px-4 py-4 font-mono text-charcoal-muted text-xs">{lic.apiKey.slice(0, 12)}...</td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button className="text-gold hover:underline text-xs font-medium">
                                  {lic.status === 'Expiring' ? 'Renew' : 'Manage'}
                                </button>
                                <span className="text-warm-border">|</span>
                                <button
                                  onClick={() => setApiModalLicense(lic)}
                                  className="text-gold hover:underline text-xs font-medium"
                                >
                                  API
                                </button>
                                <span className="text-warm-border">|</span>
                                <button
                                  onClick={() => setExpandedCreator(prev => prev === lic.creatorId ? null : lic.creatorId)}
                                  className="text-charcoal-muted hover:text-charcoal text-xs"
                                >
                                  {expandedCreator === lic.creatorId ? '▲' : '▼'}
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedCreator === lic.creatorId && (
                            <UsageLogRow key={`log-${lic.creatorId}`} creatorId={lic.creatorId} />
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden space-y-3">
                  {LICENSES.map(lic => (
                    <div key={lic.creatorId} className="bg-white rounded-2xl border border-warm-border p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-mono text-charcoal font-semibold text-sm">{lic.creatorId}</p>
                          <p className="text-charcoal-muted text-sm">{lic.useCategory} · {lic.territory}</p>
                        </div>
                        <StatusPill status={lic.status} />
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-charcoal-muted">{lic.licenseType} · <span className="text-charcoal font-semibold">{lic.monthlyCost}</span></span>
                        <div className="flex gap-3">
                          <button className="text-gold hover:underline text-sm font-medium">
                            {lic.status === 'Expiring' ? 'Renew' : 'Manage'}
                          </button>
                          <button onClick={() => setApiModalLicense(lic)} className="text-gold hover:underline text-sm font-medium">API</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ BILLING ══ */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-charcoal">Billing</h1>

                {/* Invoices */}
                <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
                  <div className="px-6 py-4 border-b border-warm-border">
                    <h2 className="text-charcoal font-semibold">Invoices</h2>
                  </div>
                  <div className="divide-y divide-warm-border">
                    {INVOICES.map(inv => (
                      <div key={inv.period} className="flex items-center justify-between px-6 py-4 hover:bg-warm-cream/50 transition-colors">
                        <div>
                          <p className="text-charcoal font-medium text-sm">{inv.period}</p>
                          <p className="text-charcoal-muted text-xs mt-0.5">{inv.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-charcoal font-bold">{inv.amount}</span>
                          <button className="btn-secondary text-xs px-4 py-1.5">Download PDF</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment + Usage breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-warm-border p-6">
                    <h2 className="text-charcoal font-semibold mb-4">Payment Method</h2>
                    <div className="flex items-center gap-3 bg-warm-cream rounded-xl p-4 border border-warm-border mb-4">
                      <div className="w-10 h-7 bg-charcoal rounded flex items-center justify-center">
                        <span className="text-warm-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-charcoal text-sm font-medium">Visa ****4242 (default)</p>
                        <p className="text-charcoal-muted text-xs">Expires 12/28</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-charcoal">Billing cycle: Monthly on the 1st</span>
                      <a href="#" className="text-gold hover:underline">Change</a>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-5">
                      <span className="text-charcoal">Payment method</span>
                      <a href="#" className="text-gold hover:underline">Update</a>
                    </div>
                    <button className="btn-secondary w-full text-sm">+ Add New Payment Method</button>
                  </div>

                  <div className="bg-white rounded-2xl border border-warm-border p-6">
                    <h2 className="text-charcoal font-semibold mb-4">Usage Breakdown</h2>
                    <div className="space-y-3 text-sm">
                      {[
                        { label: 'Subscription licenses', value: '$600/mo' },
                        { label: 'One-time licenses this cycle', value: '$1,140' },
                        { label: `API calls (${totalApiCalls.toLocaleString()} / ${apiLimit.toLocaleString()} included)`, value: '$0 overage' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-warm-border last:border-0">
                          <span className="text-charcoal-muted">{item.label}</span>
                          <span className="text-charcoal font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-warm-cream rounded-xl p-4 text-sm">
                      <p className="text-charcoal-muted">Next invoice estimate</p>
                      <p className="text-charcoal font-bold text-lg mt-0.5">$1,200</p>
                      <p className="text-charcoal-muted text-xs mt-0.5">2 active subscriptions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* API key modal */}
      {apiModalLicense && (
        <ApiKeyModal license={apiModalLicense} onClose={() => setApiModalLicense(null)} />
      )}

      <Footer />
    </div>
  )
}
