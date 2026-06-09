'use client'

// ============================================================
// COMPONENT: TradingAnalyzer
// PURPOSE: Contract address + time-range input section that
//          will fetch live chart data from an API (Module 2).
//          Currently shows the UI shell / placeholder state.
// ============================================================

import { useState } from 'react'
import { Search, Clock, TrendingUp, AlertCircle, ChevronDown } from 'lucide-react'

const HOUR_OPTIONS = [1, 4, 12, 24, 48, 72, 168]

export default function TradingAnalyzer() {
  const [contractAddress, setContractAddress] = useState('')
  const [hours, setHours] = useState(24)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ── Placeholder fetch handler (Module 2 will replace this) ──
  const handleAnalyze = async () => {
    if (!contractAddress.trim()) {
      setError('Please enter a contract address.')
      return
    }
    setError('')
    setLoading(true)
    // TODO (Module 2): Replace with real API call
    //   const res = await fetch(`/api/chart?address=${contractAddress}&hours=${hours}`)
    //   const data = await res.json()
    //   setChartData(data)
    await new Promise((r) => setTimeout(r, 1500)) // simulate network
    setLoading(false)
    setError('API integration coming in Module 2. Contract address captured ✓')
  }

  return (
    <section id="analyzer" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute inset-0 bg-[#071224]/20" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-[#00ff88]/4 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Module 2 — Coming Soon
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Trading Chart Analyzer
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-xl mx-auto">
            Enter a contract address and select a time window to instantly pull live trading
            data and render an interactive chart.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="crypto-card p-8">
          {/* Top label */}
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-[#00ff88]" />
            <span className="font-heading text-xs text-[#00ff88] uppercase tracking-widest">
              Analyze a Token
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">

            {/* ── Contract Address Input ── */}
            <div className="sm:col-span-2">
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                Contract Address
              </label>
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => { setContractAddress(e.target.value); setError('') }}
                  placeholder="0x1234...abcd or token address"
                  className="crypto-input pl-10"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* ── Hours Select ── */}
            <div>
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                Time Range
              </label>
              <div className="relative">
                <Clock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="crypto-input pl-10 appearance-none cursor-pointer"
                >
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h} style={{ background: '#0a1a35' }}>
                      {h < 24 ? `${h}h` : `${h / 24}d`}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* ── Error / Status message ── */}
          {error && (
            <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/20">
              <AlertCircle size={15} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-[#00ff88]">{error}</p>
            </div>
          )}

          {/* ── Analyze Button ── */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin" />
                Fetching Data...
              </>
            ) : (
              <>
                <TrendingUp size={15} />
                Analyze Chart
              </>
            )}
          </button>
        </div>

        {/* ── Chart Placeholder ── */}
        <div className="mt-6 crypto-card p-8 min-h-[320px] flex flex-col items-center justify-center">
          <div className="w-full h-full opacity-20 pointer-events-none select-none">
            {/* Fake chart grid */}
            <svg viewBox="0 0 700 260" className="w-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0,1,2,3,4].map((i) => (
                <line key={i} x1="0" y1={i * 52} x2="700" y2={i * 52}
                  stroke="#00ff88" strokeWidth="0.5" strokeDasharray="4,8" />
              ))}
              {[0,1,2,3,4,5,6].map((i) => (
                <line key={i} x1={i * 116} y1="0" x2={i * 116} y2="260"
                  stroke="#00ff88" strokeWidth="0.5" strokeDasharray="4,8" />
              ))}
              {/* Candle sticks */}
              {[50,100,150,200,250,300,350,400,450,500,550,600,650].map((x, i) => {
                const h = 40 + Math.sin(i * 0.8) * 30
                const y = 100 + Math.cos(i * 1.2) * 60
                const up = i % 3 !== 0
                return (
                  <g key={x}>
                    <line x1={x} y1={y - h * 0.4} x2={x} y2={y + h * 0.4}
                      stroke={up ? '#00ff88' : '#ff4444'} strokeWidth="1" />
                    <rect x={x - 10} y={y - h * 0.25} width="20" height={h * 0.5}
                      fill={up ? '#00ff88' : '#ff4444'} opacity="0.7" />
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="absolute text-center">
            <TrendingUp size={40} className="text-[#00ff88]/30 mx-auto mb-3" />
            <p className="font-heading text-sm text-slate-600 uppercase tracking-widest">
              Chart will appear here
            </p>
            <p className="font-body text-xs text-slate-700 mt-2">
              Enter a contract address and click Analyze
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
