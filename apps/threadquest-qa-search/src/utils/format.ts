export function toPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value as number)) return '—'
  let n = Number(value)
  // If it looks like 0..1, scale to 0..100
  if (n >= 0 && n <= 1) n = n * 100
  // Clamp and format
  n = Math.max(0, Math.min(100, n))
  return `${n.toFixed(2)}%`
}

export function percentWidth(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value as number)) return '0%'
  let n = Number(value)
  if (n >= 0 && n <= 1) n = n * 100
  n = Math.max(0, Math.min(100, n))
  return `${n}%`
}
