'use client'

// ============================================================
// PAGE: Dashboard (Protected)
// PURPOSE: Only accessible when logged in. Contains the
//          TradingAnalyzer chart tool + user menu with
//          change password and logout options.
// ============================================================

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import TradingAnalyzer from '@/components/TradingAnalyzer'
import StarField from '@/components/StarField'
import { LogOut, KeyRound, User, ChevronDown } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#050d1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin" />
          <p className="font-mono text-xs text-[#00ff88] uppercase tracking-widest">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#050d1a] grid-bg">
      <StarField />

      <div className="relative z-10">

        {/* ── Dashboard Navbar ── */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#050d1a]/95 backdrop-blur-md border-b border-[#00ff88]/10 shadow-lg shadow-black/20">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center font-heading font-black text-[#050d1a] text-xs">
                HC
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-wider">
                Habesha <span className="text-[#00ff88]">Crypto</span>
              </span>
            </a>

            {/* Title */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest">
                Trading Analyzer
              </span>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#00ff88]/20 hover:border-[#00ff88]/40 bg-[#0a1a35]/60 hover:bg-[#0a1a35] transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/30 flex items-center justify-center">
                  <User size={12} className="text-[#00ff88]" />
                </div>
                <span className="font-mono text-xs text-slate-300 hidden sm:block max-w-32 truncate">
                  {user.email}
                </span>
                <ChevronDown size={12} className={`text-slate-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 top-12 w-52 crypto-card py-2 shadow-xl shadow-black/40 z-50">
                  <a
                    href="/change-password"
                    className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-slate-300 hover:text-[#00ff88] hover:bg-[#00ff88]/5 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <KeyRound size={14} className="text-slate-500" />
                    Change Password
                  </a>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={() => { setMenuOpen(false); signOut() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-body text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* ── Chart Section ── */}
        <div className="pt-16">
          <TradingAnalyzer />
        </div>
      </div>
    </main>
  )
}
