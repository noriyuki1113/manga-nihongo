/** Local-date helpers. Dates are 'YYYY-MM-DD' in the user's local time zone. */

export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function todayKey(now: Date = new Date()): string {
  return toDateKey(now)
}

export function yesterdayKey(now: Date = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  return toDateKey(d)
}

/** Streak value after studying on `today`. */
export function nextStreak(
  prevStreak: number,
  lastStudyDate: string | null,
  now: Date = new Date(),
): number {
  const today = todayKey(now)
  if (lastStudyDate === today) return Math.max(1, prevStreak)
  if (lastStudyDate === yesterdayKey(now)) return prevStreak + 1
  return 1
}

/** Streak to display: a streak that was not continued yesterday or today has lapsed. */
export function activeStreak(
  streak: number,
  lastStudyDate: string | null,
  now: Date = new Date(),
): number {
  if (!lastStudyDate) return 0
  if (lastStudyDate === todayKey(now) || lastStudyDate === yesterdayKey(now)) {
    return streak
  }
  return 0
}
