import type { FuriganaEntry } from "@/types"

/**
 * Fixed furigana data for the MVP. Entries are matched longest-first.
 * "basic" readings appear only in Beginner mode; "intermediate" ones also
 * appear in Standard mode. Immersion shows none.
 */
export const furiganaDictionary: FuriganaEntry[] = [
  // Episode 1 script
  { surface: "今日", reading: "きょう", level: "basic" },
  { surface: "日本語", reading: "にほんご", level: "basic" },
  { surface: "日本", reading: "にほん", level: "basic" },
  { surface: "学校", reading: "がっこう", level: "basic" },
  { surface: "生活", reading: "せいかつ", level: "intermediate" },
  { surface: "始", reading: "はじ", level: "basic" },
  { surface: "緊張", reading: "きんちょう", level: "intermediate" },
  { surface: "新", reading: "あたら", level: "basic" },
  { surface: "人", reading: "ひと", level: "basic" },
  { surface: "呼", reading: "よ", level: "intermediate" },
  { surface: "話", reading: "はな", level: "basic" },
  { surface: "分", reading: "わ", level: "basic" },
  { surface: "座", reading: "すわ", level: "intermediate" },
  { surface: "暇", reading: "ひま", level: "intermediate" },
  { surface: "丁寧", reading: "ていねい", level: "intermediate" },
  { surface: "変", reading: "へん", level: "intermediate" },
  { surface: "放課後", reading: "ほうかご", level: "intermediate" },
  { surface: "飯", reading: "はん", level: "basic" },
  { surface: "行", reading: "い", level: "basic" },
  { surface: "来", reading: "く", level: "basic" },
  { surface: "決", reading: "き", level: "intermediate" },
  { surface: "明日", reading: "あした", level: "basic" },
  { surface: "面白", reading: "おもしろ", level: "intermediate" },
  { surface: "紹介", reading: "しょうかい", level: "intermediate" },
  { surface: "私", reading: "わたし", level: "basic" },
  { surface: "我", reading: "われ", level: "intermediate" },
  { surface: "同行", reading: "どうこう", level: "intermediate" },
  // Review questions
  { surface: "普通", reading: "ふつう", level: "intermediate" },
  { surface: "本当", reading: "ほんとう", level: "basic" },
  { surface: "友達", reading: "ともだち", level: "basic" },
  { surface: "言", reading: "い", level: "basic" },
  { surface: "一緒", reading: "いっしょ", level: "basic" },
  { surface: "自然", reading: "しぜん", level: "intermediate" },
  { surface: "返答", reading: "へんとう", level: "intermediate" },
  { surface: "最", reading: "もっと", level: "intermediate" },
  { surface: "近", reading: "ちか", level: "basic" },
  { surface: "食事", reading: "しょくじ", level: "intermediate" },
  { surface: "参加", reading: "さんか", level: "intermediate" },
  { surface: "予定", reading: "よてい", level: "intermediate" },
  { surface: "所存", reading: "しょぞん", level: "intermediate" },
]
