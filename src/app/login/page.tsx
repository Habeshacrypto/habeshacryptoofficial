'use client'

// ============================================================
// PAGE: Login
// PURPOSE: Validates email + password against the custom
//          users table in Supabase. If a row matches, the user
//          is allowed to access the dashboard.
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const PAYMENT_URL = 'https://tally.so/r/2Eo1vA'
const AUTH_STORAGE_KEY = 'habesha-crypto-session'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [mode, setMode] = useState<'login' | 'forgot'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setError('')
    setLoading(true)

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    const { data, error: lookupError } = await supabase
      .from('users')
      .select('email, password')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (lookupError) {
      const message = String(lookupError.message || '').toLowerCase()
      const isRlsError = message.includes('row level security') || message.includes('permission denied')

      setError(
        isRlsError
          ? 'Supabase is blocking reads on the users table. Please allow anonymous SELECT access for the users table in your RLS policy.'
          : 'Unable to validate your account right now.'
      )
      setLoading(false)
      return
    }

    if (!data || String(data.password ?? '').trim() !== normalizedPassword) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    await login(data.email)
    setLoading(false)
    router.push('/dashboard')
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address.')
      return
    }

    setError('')
    setSuccess('Please contact the admin to reset your account access.')
  }

  return (
    <main className="min-h-screen bg-[#050d1a] grid-bg flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00ff88]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0066ff]/4 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* ── Logo ── */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center font-heading font-black text-[#050d1a] text-sm">
              HC
            </div>
            <span className="font-heading font-bold text-lg text-white tracking-wider">
              Habesha <span className="text-[#00ff88]">Crypto</span>
            </span>
          </a>
          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Reset Password'}
          </h1>
          <p className="font-body text-slate-400 text-sm">
            {mode === 'login'
              ? 'Sign in to access the Trading Analyzer'
              : 'Contact the admin to regain account access'}
          </p>
        </div>

        {/* ── Card ── */}
        <div className="crypto-card p-8">

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/20">
              <CheckCircle size={15} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-[#00ff88]">{success}</p>
            </div>
          )}

          <form onSubmit={mode === 'login' ? handleLogin : handleForgot} className="space-y-5">

            {/* Email */}
            <div>
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess('') }}
                  placeholder="your@email.com"
                  className="crypto-input pl-4"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password — only on login mode */}
            {mode === 'login' && (
              <div>
                <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError('') }}
                    placeholder="Enter your password"
                    className="crypto-input pl-4 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00ff88] transition-colors"
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                    className="font-mono text-xs text-slate-500 hover:text-[#00ff88] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Sending...'}</>
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Send Reset Email'}</>
              )}
            </button>

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                className="w-full text-center font-mono text-xs text-slate-500 hover:text-slate-400 transition-colors pt-1"
              >
                ← Back to Sign In
              </button>
            )}
          </form>
        </div>

        {/* ── No account? ── */}
        <div className="mt-6 crypto-card p-5 text-center">
          <p className="font-body text-slate-400 text-sm mb-3">
            Don't have an account? Contact admin to get access.
          </p>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-xs"
          >
            <TrendingUp size={13} />
            Request Access
          </a>
        </div>

        {/* Back to home */}
        <p className="text-center mt-4">
          <a href="/" className="font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to Home
          </a>
        </p>
      </div>
    </main>
  )
}
