import Papa from 'papaparse'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import type { QARecord, QARecordRaw, AnswerItem } from '../utils/types'

/**
 * Loads CSV from /data/Complete_QueryResults_with_scores.csv (or sample.csv if not found)
 * and exposes both the parsed dataset and a Fuse.js index for searching question_text+topic.
 */
export function useDataset() {
  const [data, setData] = useState<QARecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const candidates = [
      '/data/Complete_QueryResults_with_scores.csv',
      '/data/sample.csv',
    ]

    let settled = false

    const load = async () => {
      for (const url of candidates) {
        const ok = await tryLoad(url)
        if (ok) { settled = true; break }
      }
      if (!settled) {
        setError('Failed to load dataset. Place the CSV under public/data/Complete_QueryResults_with_scores.csv')
      }
      setLoading(false)
    }

    load()
  }, [])

  const fuse = useMemo(() => {
    if (!data.length) return null
    return new Fuse(data, {
      threshold: 0.35,
      keys: [
        { name: 'question_text', weight: 0.7 },
        { name: 'topic', weight: 0.3 },
      ],
      ignoreLocation: true,
    })
  }, [data])

  return { data, fuse, loading, error }

  async function tryLoad(url: string) {
    try {
      const res = await fetch(url)
      if (!res.ok) return false
      const text = await res.text()
      const parsed = Papa.parse<QARecordRaw>(text, { header: true, skipEmptyLines: true })
      const norm = parsed.data.map(toRecord).filter(Boolean) as QARecord[]
      setData(norm)
      return true
    } catch (e) {
      return false
    }
  }
}

function toRecord(row: QARecordRaw): QARecord | null {
  const id = (row.question_id ?? '').toString().trim()
  if (!id) return null
  const answers: AnswerItem[] = []
  for (let i = 1; i <= 9; i++) {
    const t = (row as any)[`answer_item_${i}`] as string | undefined
    const s = (row as any)[`answer_item_${i}_score`] as string | undefined
    if (t && t.trim()) {
      answers.push({ index: i, text: t, score: s ? Number(s) : null })
    }
  }
  return {
    question_id: id,
    question_text: row.question_text ?? '',
    topic: row.topic ?? '',
    answers,
  }
}
