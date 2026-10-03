import type { CatalogEntry, Scene } from "@/types"

export const STORY_TITLE = "Tokyo Days"

export const catalog: CatalogEntry[] = [
  {
    id: "tokyo-days-ep1",
    episodeNumber: 1,
    titleJa: "はじめまして",
    titleEn: "Hajimemashite",
    subtitle: "First Day",
    status: "available",
  },
  {
    id: "tokyo-days-ep2",
    episodeNumber: 2,
    titleJa: "それ、マジ？",
    titleEn: "Is That for Real?",
    status: "coming-soon",
  },
  {
    id: "tokyo-days-ep3",
    episodeNumber: 3,
    titleJa: "放課後",
    titleEn: "After School",
    status: "coming-soon",
  },
  {
    id: "tokyo-days-ep4",
    episodeNumber: 4,
    titleJa: "コンビニパニック",
    titleEn: "Convenience Store Panic",
    status: "coming-soon",
  },
  {
    id: "tokyo-days-ep5",
    episodeNumber: 5,
    titleJa: "また明日",
    titleEn: "See You Tomorrow",
    status: "coming-soon",
  },
]

/** Cover artwork for the Tokyo Days series card (uses the built-in illustration set). */

export const tokyoDaysCover: Scene = {
  id: "tokyo-days-cover",
  order: 0,
  image: "school-gate",
  characters: [
    { characterId: "alex", pose: "smile", side: "left" },
    { characterId: "yuki", pose: "happy", side: "right" },
  ],
  dialogues: [],
}
