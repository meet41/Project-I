import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Mock Auth — no backend required (Vercel static deployment)
// Users are stored in localStorage. Passwords are NOT hashed (demo only).
// ─────────────────────────────────────────────────────────────────────────────

type User = {
  id: number
  email: string
  name: string
  created_at?: string
}

type StoredUser = User & { password: string }

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'
const USERS_DB_KEY = 'mock_users_db'

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
}

function makeToken(user: User): string {
  // Simple base64 "token" — not cryptographically secure, fine for demo
  const payload = btoa(JSON.stringify({ sub: user.id, email: user.email, exp: Date.now() + 7 * 86400000 }))
  return `mock.${payload}.sig`
}

function getUserFromToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (Date.now() > payload.exp) return null
    const users = getUsers()
    const found = users.find(u => u.id === payload.sub)
    if (!found) return null
    return { id: found.id, email: found.email, name: found.name, created_at: found.created_at }
  } catch {
    return null
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY))
  const [loading, setLoading] = useState<boolean>(true)

  // Restore session on mount
  useEffect(() => {
    if (token) {
      const restored = getUserFromToken(token)
      if (restored) {
        setUser(restored)
      } else {
        // Token expired or invalid
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
        setToken(null)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate async network delay
    await new Promise(r => setTimeout(r, 400))

    const users = getUsers()
    const found = users.find(u => u.email === email.toLowerCase())
    if (!found) throw new Error('Invalid email or password')
    if (found.password !== password) throw new Error('Invalid email or password')

    const loggedIn: User = { id: found.id, email: found.email, name: found.name, created_at: found.created_at }
    const tok = makeToken(loggedIn)
    localStorage.setItem(AUTH_TOKEN_KEY, tok)
    setToken(tok)
    setUser(loggedIn)
  }

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 400))

    if (password.length < 6) throw new Error('Password must be at least 6 characters')
    const users = getUsers()
    if (users.find(u => u.email === email.toLowerCase())) {
      throw new Error('Email already registered')
    }

    const newUser: StoredUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      created_at: new Date().toISOString(),
    }
    saveUsers([...users, newUser])

    const loggedIn: User = { id: newUser.id, email: newUser.email, name: newUser.name, created_at: newUser.created_at }
    const tok = makeToken(loggedIn)
    localStorage.setItem(AUTH_TOKEN_KEY, tok)
    setToken(tok)
    setUser(loggedIn)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
