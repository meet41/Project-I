import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataset } from './hooks/useDataset'
import ResultsList from './components/ResultsList'
import DetailDrawer from './components/DetailDrawer'
import Footer from './components/Footer'
import { useAuth } from './contexts/AuthContext'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, fuse, loading, error } = useDataset()
  const { user, logout } = useAuth()

  const results = useMemo(() => {
    if (!fuse || !query.trim()) return []
    const res = fuse.search(query.trim(), { limit: 50 })
    return res.map(r => r.item)
  }, [fuse, query])

  const selected = useMemo(() => data.find(d => d.question_id === selectedId) || null, [data, selectedId])

  return (
  <div className="min-h-screen bg-transparent flex flex-col">
  <header className="bg-gradient-to-b from-white/70 dark:from-slate-800/50 to-transparent backdrop-blur-sm border-b border-slate-200 dark:border-cyan-500/10 sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-[1px] transition-transform hover:scale-105">
                <div className="relative bg-slate-950 rounded-full p-0.5">
                  <img 
                    src="/logo.png" 
                    alt="ThreadQuest Logo" 
                    className="w-14 h-14 rounded-full object-cover transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ThreadQuest AI
              </div>
              <div className="text-sm text-slate-600 dark:text-cyan-400/90 font-medium mt-0.5">
                Topic Discovery from Communication Threads
              </div>
            </div>
            </div>

            {/* Right: Intro link + User info */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/intro"
                className="px-3 py-1.5 rounded-lg text-sm border border-cyan-500/30 text-slate-700 dark:text-cyan-200/90 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition bg-white/70 dark:bg-transparent"
                title="Read the introduction"
              >
                Intro
              </Link>
              {user && (
                <>
                  <div className="hidden sm:block text-cyan-200/90 text-sm">
                    {/* Signed in as  */}
                    <span className="font-semibold text-cyan-200">{user.name}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-slate-950 grid place-items-center text-cyan-200 text-xs font-semibold">
                      {user.name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-1 px-3 py-1.5 rounded-lg text-sm border border-cyan-500/30 text-cyan-200/90 hover:bg-slate-800/70 transition"
                    title="Sign out"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              className="w-full pl-12 py-4 pr-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-white/15 
                         text-slate-900 dark:text-cyan-50 placeholder-slate-400 dark:placeholder-cyan-200/70 shadow-lg backdrop-blur-sm
                         focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827]
                         hover:border-cyan-400/30 hover:bg-slate-50 dark:hover:bg-slate-800/70
                         transition-all duration-200"
              placeholder="Ask a question or search topics…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-[1.125rem] text-slate-400 dark:text-cyan-400/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 
                       text-white font-medium shadow-lg shadow-cyan-500/10 
                       hover:shadow-cyan-400/20 hover:translate-y-[-1px] active:translate-y-[1px]
                       transition-all duration-200 md:w-auto w-full
                       border border-cyan-400/20 backdrop-blur-sm"
            onClick={() => setQuery(q => q.trim())}
          >
            Search
          </button>
        </div>

        <div className="mt-8">
          {loading && (
            <div className="flex items-center gap-3 text-base text-purple-600/80 bg-purple-50/50 rounded-2xl p-4 backdrop-blur-sm border border-purple-100">
              <svg className="w-5 h-5 animate-spin text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Loading dataset...
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 text-base text-red-600 bg-red-50/50 backdrop-blur-sm rounded-2xl p-4 border border-red-100">
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="leading-relaxed">{error}</span>
            </div>
          )}
          {!loading && !error && query.trim() && (
            <div className="animate-fade-in">
              <ResultsList items={results} onOpen={setSelectedId} />
            </div>
          )}
          {!loading && !error && !query.trim() && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                {/* Softer hero glow to match Gemini/GPT */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
                <svg className="w-20 h-20 mx-auto mb-8 relative text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Search Questions & Topics
              </h2>
              <p className="text-base text-slate-500 dark:text-cyan-300/80">Start typing to explore the knowledge base</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      <DetailDrawer open={!!selected} item={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
