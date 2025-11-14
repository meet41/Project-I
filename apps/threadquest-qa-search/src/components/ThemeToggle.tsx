import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme()

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-cyan-500/30 bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-transparent dark:text-cyan-200 dark:hover:bg-slate-800/70 transition"
    >
      {/* Show sun when currently dark (suggests switching to light), moon when light */}
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 4a1 1 0 011 1v1h-2v-1a1 1 0 011-1zm0-22a1 1 0 00-1 1v1h2V1a1 1 0 00-1-1zM1 13a1 1 0 011-1H3v-2H2a1 1 0 00-1 1v2zm20-1a1 1 0 011 1v2a1 1 0 01-1 1h-1v-4h1zM4.222 18.364l1.414-1.414 1.414 1.414-1.414 1.414a1 1 0 11-1.414-1.414zM17.95 5.636l1.414-1.414a1 1 0 111.415 1.414L19.364 7.05 17.95 5.636zM4.222 5.636A1 1 0 015.636 4.222L7.05 5.636 5.636 7.05 4.222 5.636zM18.364 19.778a1 1 0 11-1.414 1.415L15.536 19.78l1.414-1.415 1.414 1.414z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21.752 15.002A9 9 0 1112.998 2.25c.304 0 .604.018.9.053a1 1 0 01.359 1.864 7 7 0 009.083 9.083 1 1 0 011.864.359c.035.295.053.596.053.9a8.96 8.96 0 01-3.505 7.013z"/>
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
