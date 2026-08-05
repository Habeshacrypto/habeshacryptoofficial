'use client'

// ============================================================
// PAGE: Change Password
// PURPOSE: Updates the password directly in the custom users
//          table used for app authentication.
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!user?.email) {
      setError('You must be logged in to change the password.')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    setLoading(true)

    const { data: currentUser, error: currentUserError } = await supabase
      .from('users')
      .select('password')
      .eq('email', user.email)
      .maybeSingle()

    if (currentUserError || !currentUser) {
      setError('Unable to validate your current password right now.')
      setLoading(false)
      return
    }

    if (String(currentUser.password ?? '').trim() !== currentPassword.trim()) {
      setError('Current password is incorrect.')
      setLoading(false)
      return
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ password: newPassword })
      .eq('email', user.email)

    if (updateError) {
      const message = String(updateError.message || '').toLowerCase()
      const isRlsError = message.includes('row level security') || message.includes('permission denied')

      setError(
        isRlsError
          ? 'Supabase is blocking password updates on the users table. Please allow UPDATE access for the users table in your RLS policy.'
          : updateError.message
      )
      setLoading(false)
      return
    }

    setSuccess('Password updated successfully!')
    setTimeout(() => router.push('/dashboard'), 2000)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#050d1a] grid-bg flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00ff88]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0066ff]/4 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center font-heading font-black text-[#050d1a] text-sm">
              HC
            </div>
            <span className="font-heading font-bold text-lg text-white tracking-wider">
              Habesha <span className="text-[#00ff88]">Crypto</span>
            </span>
          </a>
          <h1 className="font-heading font-bold text-2xl text-white mb-2">Change Password</h1>
          <p className="font-body text-slate-400 text-sm">
            Update your account password stored in the app users table.
          </p>
        </div>

        <div className="crypto-card p-8">

          {error && (
            <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/20">
              <CheckCircle size={15} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-[#00ff88]">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => { setCurrentPassword(e.target.value); setError('') }}
                  placeholder="Enter current password"
                  className="crypto-input pl-4 pr-10"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00ff88] transition-colors">
                  {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError('') }}
                  placeholder="Min 6 characters"
                  className="crypto-input pl-4 pr-10"
                />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00ff88] transition-colors">
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                  placeholder="Repeat new password"
                  className="crypto-input pl-4 pr-10"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00ff88] transition-colors">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><div className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin" />Updating...</>
                : 'Update Password'
              }
            </button>
          </form>
        </div>

        <p className="text-center mt-4">
          <a href="/dashboard" className="font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to Dashboard
          </a>
        </p>
      </div>
    </main>
  )
}
