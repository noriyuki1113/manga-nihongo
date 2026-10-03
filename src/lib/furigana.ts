import { furiganaDictionary } from "@/content/furigana"
import type { FuriganaEntry, FuriganaMode } from "@/types"

export type FuriganaToken = {
  text: string
  reading?: string
  level?: FuriganaEntry["level"]
}

const sorted = [...furiganaDictionary].sort(
  (a, b) => b.surface.length - a.surface.length,
)

/** Splits text into tokens, attaching readings for known kanji words. */
export function tokenizeFurigana(text: string): FuriganaToken[] {
  const tokens: FuriganaToken[] = []
  let plain = ""
  let i = 0
  while (i < text.length) {
    const hit = sorted.find((entry) => text.startsWith(entry.surface, i))
    if (hit) {
      if (plain) {
        tokens.push({ text: plain })
        plain = ""
      }
      tokens.push({ text: hit.surface, reading: hit.reading, level: hit.level })
      i += hit.surface.length
    } else {
      plain += text[i]
      i += 1
    }
  }
  if (plain) tokens.push({ text: plain })
  return tokens
}

export function shouldShowReading(
  mode: FuriganaMode,
  level: FuriganaEntry["level"] | undefined,
): boolean {
  if (!level) return false
  if (mode === "beginner") return true
  if (mode === "standard") return level === "intermediate"
  return false
}

export const furiganaModeLabels: Record<
  FuriganaMode,
  { label: string; description: string }
> = {
  beginner: { label: "Beginner", description: "Reading above every kanji" },
  standard: { label: "Standard", description: "Only on harder kanji" },
  immersion: { label: "Immersion", description: "No furigana" },
}

export const furiganaModes: FuriganaMode[] = ["beginner", "standard", "immersion"]
