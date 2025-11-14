import { useEffect } from 'react'
import type { QARecord, AnswerItem } from './utils/types'
import { percentWidth, toPercent } from './utils/format'

export default function DetailDrawer({ open, item, onClose }: { open: boolean; item: QARecord | null; onClose: ()=>void }) {
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [open])
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Right-side drawer */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-full max-w-[600px] transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col bg-white/95 dark:bg-slate-900/85 backdrop-blur-xl border-l border-slate-200 dark:border-white/10 shadow-2xl rounded-l-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
            <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-cyan-100">Answer Details</h2>
            <button
              className="ml-3 px-3 py-1.5 rounded-lg text-sm border border-slate-300 dark:border-white/20 text-slate-700 dark:text-cyan-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="flex-1 p-5 md:p-6 space-y-6 overflow-y-auto animate-fade-in">
          {!item && (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm">No answer selected</p>
              </div>
            </div>
          )}
          {item && (
            <div className="space-y-6">
              <section className="animate-slide-in">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-cyan-400/70 uppercase tracking-wider mb-2">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Question
                </div>
                <div className="text-base text-slate-900 dark:text-cyan-50 leading-7">{item.question_text}</div>
                <div className="mt-3">
                  <span className="badge">
                    <svg className="w-3.5 h-3.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {item.topic || 'untagged'}
                  </span>
                </div>
              </section>

              <section className="animate-slide-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-cyan-400/70 uppercase tracking-wider mb-3">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Answers ({item.answers.length})
                </div>
                <div className="space-y-4">
                  {item.answers.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <svg className="w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-sm">No answers available yet</p>
                    </div>
                  )}
                  {item.answers.map((ans: AnswerItem, idx: number) => (
                    <div key={ans.index} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/60 p-4 shadow-subtle" style={{ animationDelay: `${150 + idx * 50}ms` }}>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 text-sm text-slate-700 dark:text-cyan-100 leading-relaxed">{ans.text}</div>
                          <div className="shrink-0 text-right">
                            <div className="text-[11px] font-medium text-slate-500 dark:text-cyan-400/70">Relevance Score</div>
                            <div className="text-lg font-semibold text-indigo-600 dark:text-cyan-300">{toPercent(ans.score)}</div>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: percentWidth(ans.score) }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          </div>
        </div>
      </aside>
    </div>
  )
}
