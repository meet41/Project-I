export default function Footer() {
  return (
  <footer className="mt-auto border-t border-slate-200 dark:border-cyan-500/10 bg-white dark:bg-[#0b1224] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-400">About ThreadQuest AI</h3>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/20 p-6">
                <p className="text-cyan-400/90 text-base leading-relaxed">
                  An intelligent QA search engine powered by advanced NLP, designed to discover and analyze topics from communication threads.
                </p>
                <div className="text-cyan-400/70 text-sm mt-6 border-t border-cyan-500/10 pt-4">© 2025 ThreadQuest AI. All rights reserved.</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-400">Project Team</h3>

            {/* Mentor Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-slate-200 dark:border-cyan-500/20">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-cyan-300 font-bold">Prof. Dr. Mitali Desai</div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide border bg-gradient-to-r from-amber-500/40 to-pink-500/40 text-amber-100 border-amber-400/50" title="Project Mentor">Mentor</span>
                </div>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 gap-4">
              {([
                { name: 'Meet Patel', id: 'ET23BIT816', role: 'Leader' },
                { name: 'Hina Padsala', id: 'ET23BIT815', role: 'Developer' },
                { name: 'Hetvi Lad', id: 'ET23BIT814', role: 'Developer' },
                { name: 'Vaishnavi Patel', id: 'ET23BIT817', role: 'Developer' },
                { name: 'Vidhi Patel', id: 'ET22BIT105', role: 'Developer' },
              ] as const).map((m, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-xl p-3 border border-slate-200 dark:border-cyan-500/20">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-cyan-300 font-semibold truncate">{m.name} - {m.id}</div>
                      <span
                        className={
                          `shrink-0 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide border ` +
                          (m.role === 'Leader'
                            ? 'bg-gradient-to-r from-amber-500/40 to-pink-500/40 text-amber-100 border-amber-400/50'
                            : 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 text-cyan-200 border-cyan-500/40')
                        }
                        title={m.role}
                      >
                        {m.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}