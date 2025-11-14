import type { QARecord } from '../utils/types'

export default function ResultsList({ items, onOpen }: { items: QARecord[]; onOpen: (id: string)=>void }) {
  if (!items.length) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-4">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-sm text-slate-500">No matching results found.<br />Try adjusting your search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-500 px-1">
        Found {items.length} {items.length === 1 ? 'result' : 'results'}
      </div>
      {items.map(item => (
        <article key={item.question_id} className="card group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium leading-6 mb-2 group-hover:text-indigo-700 transition-colors">
                {item.question_text}
              </h3>
              <div className="flex items-center gap-3">
                <span className="badge">
                  {item.topic || 'untagged'}
                </span>
                {item.answers.length > 0 && (
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {item.answers.length} {item.answers.length === 1 ? 'answer' : 'answers'}
                  </span>
                )}
              </div>
            </div>
            <button 
              className="btn-secondary shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200"
              onClick={() => onOpen(item.question_id)}
            >
              View details
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
