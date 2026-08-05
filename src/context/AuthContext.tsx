'use client'

// ============================================================
// CONTEXT: AuthContext
// PURPOSE: Holds a lightweight client-side auth state based on
//          the custom users table in Supabase.
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthUser {
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  session: null
  loading: boolean
  login: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AUTH_STORAGE_KEY = 'habesha-crypto-session'

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession) as AuthUser
        if (parsedSession?.email) {
          setUser({ email: parsedSession.email })
        }
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    setLoading(false)
  }, [])

  const login = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ email: normalizedEmail }))
    setUser({ email: normalizedEmail })
  }

  const signOut = async () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, session: null, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
