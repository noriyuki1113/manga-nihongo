import type { Expression } from "@/types"

/** A short, learner-facing take on anime vs real-life usage. */
export function animeVsRealInsight(e: Pick<Expression, "animeScore" | "realScore">): string {
  const diff = e.animeScore - e.realScore
  if (diff >= 2) return "Much more common in anime than in real life."
  if (diff === 1) return "A bit more common in anime than in real life."
  if (diff <= -2) return "Heard far more in real life than in anime."
  if (diff === -1) return "Slightly more common in real life than in anime."
  if (e.realScore >= 4) return "Used just as much in real life as in anime — safe to learn."
  return "Used about equally in anime and real life."
}
