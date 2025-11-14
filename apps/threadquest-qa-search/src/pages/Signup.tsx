import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Signup: React.FC = () => {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Create your account
        </h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50/60 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-cyan-300/80 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/70 border border-cyan-500/20 text-cyan-50 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300/80 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/70 border border-cyan-500/20 text-cyan-50 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300/80 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/70 border border-cyan-500/20 text-cyan-50 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium border border-cyan-400/30 hover:opacity-95 active:opacity-90 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-cyan-300/70 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-300 hover:text-cyan-200 underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
