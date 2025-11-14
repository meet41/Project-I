import { useMemo, useState } from 'react'
import { useDataset } from './hooks/useDataset'
import ResultsList from './components/ResultsList'
import DetailDrawer from './components/DetailDrawer'
import Footer from './components/Footer'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, fuse, loading, error } = useDataset()

  const results = useMemo(() => {
    if (!fuse || !query.trim()) return []
    const res = fuse.search(query.trim(), { limit: 50 })
    return res.map(r => r.item)
  }, [fuse, query])

  const selected = useMemo(() => data.find(d => d.question_id === selectedId) || null, [data, selectedId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
      <header className="bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur-sm border-b border-cyan-500/10 sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 py-3">
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
              <div className="text-sm text-cyan-400/90 font-medium mt-0.5">
                Topic Discovery from Communication Threads
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              className="w-full pl-12 py-4 pr-4 rounded-2xl bg-slate-800/50 border border-cyan-500/20 
                         text-cyan-50 placeholder-cyan-300/50 shadow-lg backdrop-blur-sm
                         focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 focus:ring-offset-2 focus:ring-offset-slate-900
                         hover:border-cyan-400/30 hover:bg-slate-800/70
                         transition-all duration-200"
              placeholder="Ask a question or search topics…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-[1.125rem] text-cyan-400/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <svg className="w-20 h-20 mx-auto mb-8 relative text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Search Questions & Topics
              </h2>
              <p className="text-base text-cyan-300/80">Start typing to explore the knowledge base</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-cyan-500/10 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Info */}
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                About ThreadQuest AI
              </h3>
              <p className="text-cyan-300/70 text-sm leading-relaxed mb-4">
                An intelligent QA search engine powered by advanced NLP, designed to discover and analyze topics from communication threads.
              </p>
              <div className="text-cyan-400/60 text-sm">
                © {new Date().getFullYear()} ThreadQuest AI. All rights reserved.
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Project Team
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Prof. Dr. Mitali Desai</h4>
                      <p className="">Project Mentor</p>
                    </div>
                  </div>
                <div className="space-y-3">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Meet Patel - ET23BTIT816</h4>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Hina Padsala - ET23BTIT815</h4>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Hetvi Lad - ET23BTIT814</h4>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Vaishnavi Patel - ET23BTIT817</h4>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-50 blur-sm group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-900 rounded p-3">
                      <h4 className="text-cyan-300 font-medium">Vidhi Patel - ET22BTIT105</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

              </div>
              <DetailDrawer open={!!selected} item={selected} onClose={() => setSelectedId(null)} />
      </main>

      <Footer />
  )
}
