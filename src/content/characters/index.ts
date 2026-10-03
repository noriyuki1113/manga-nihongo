import type { Character } from "@/types"

export const characters: Record<string, Character> = {
  alex: { id: "alex", name: "Alex", nameJa: "アレックス", side: "left", color: "#7DD3FC" },
  yuki: { id: "yuki", name: "Yuki", nameJa: "ユキ", side: "right", color: "#FF8FA0" },
  narrator: { id: "narrator", name: "Narration", nameJa: "ナレーション", side: "center", color: "#C7CBD6" },
}

export function getCharacter(id: string): Character {
  return characters[id] ?? characters.narrator
}
