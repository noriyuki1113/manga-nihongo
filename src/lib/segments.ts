import { getExpression } from "@/content/expressions"

export type TextSegment = {
  text: string
  expressionId?: string
}

/**
 * Splits a dialogue line into plain and tappable segments.
 * Every occurrence of each linked expression becomes tappable.
 */
export function segmentDialogue(
  japanese: string,
  expressionIds: string[] | undefined,
): TextSegment[] {
  if (!expressionIds || expressionIds.length === 0) return [{ text: japanese }]

  const targets = expressionIds
    .map((id) => getExpression(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort((a, b) => b.text.length - a.text.length)

  const segments: TextSegment[] = []
  let plain = ""
  let i = 0
  while (i < japanese.length) {
    const hit = targets.find((t) => japanese.startsWith(t.text, i))
    if (hit) {
      if (plain) {
        segments.push({ text: plain })
        plain = ""
      }
      segments.push({ text: hit.text, expressionId: hit.id })
      i += hit.text.length
    } else {
      plain += japanese[i]
      i += 1
    }
  }
  if (plain) segments.push({ text: plain })
  return segments
}
