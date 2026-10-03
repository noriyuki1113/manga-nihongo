/** Content types — pure data, no UI concerns. */

export type Expression = {
  id: string
  text: string
  reading: string
  meaning: string[]
  standardForm?: string
  politeForm?: string
  animeScore: number
  realScore: number
  workScore: number
  casualScore: number
  friendsUsage: number
  teacherUsage: number
  bossUsage: number
  explanation: string
  sceneExplanation: string
  tags: string[]
}

export type DialogueType = "speech" | "thought" | "narration"

export type Dialogue = {
  id: string
  characterId: string
  japanese: string
  english: string
  expressionIds?: string[]
  type: DialogueType
}

export type CharacterPose =
  | "neutral"
  | "smile"
  | "happy"
  | "surprised"
  | "nervous"
  | "thinking"

export type CharacterSide = "left" | "right" | "center"

export type SceneCharacter = {
  characterId: string
  pose: CharacterPose
  side: CharacterSide
}

export type SceneEnding = {
  toBeContinued: string
  nextTitleJa: string
  nextTitleEn: string
}

export type Scene = {
  id: string
  order: number
  /**
   * Background. Either a key of the built-in illustration registry
   * (e.g. "classroom") or an absolute image path ("/manga/ep1/s1.webp").
   * Swapping in real artwork later only requires changing this value.
   */
  image?: string
  /** Characters drawn on top of the built-in illustration. */
  characters?: SceneCharacter[]
  dialogues: Dialogue[]
  /** Story choice shown after this scene's dialogue. */
  challengeId?: string
  /** Shown at the very end of the episode. */
  ending?: SceneEnding
}

export type Episode = {
  id: string
  episodeNumber: number
  titleJa: string
  titleEn: string
  estimatedMinutes: number
  scenes: Scene[]
  expressionIds: string[]
  challengeIds: string[]
  xpReward: number
}

export type Character = {
  id: string
  name: string
  nameJa: string
  side: CharacterSide
  /** Accent color used for name tags. */
  color: string
}

export type CatalogEntry = {
  id: string
  episodeNumber: number
  titleJa: string
  titleEn: string
  subtitle?: string
  status: "available" | "coming-soon"
}

export type Verdict = "Correct" | "Incorrect"

export type ChallengeOption = {
  id: string
  japanese: string
  english: string
  meaning: Verdict
  grammar: Verdict
  /** 1–5 */
  naturalness: number
  /** 1–5, optional */
  anime?: number
  feedback: string
}

export type StoryChallenge = {
  id: string
  episodeId: string
  question: string
  options: ChallengeOption[]
  correctOptionId: string
  xpReward: number
}

export type ReviewOption = { id: string; text: string }

export type ReviewQuestion = {
  id: string
  prompt: string
  promptEn: string
  options: ReviewOption[]
  correctOptionId: string
  explanation: string
  xpReward: number
}

export type FuriganaLevel = "basic" | "intermediate"

export type FuriganaEntry = {
  surface: string
  reading: string
  /** basic = shown only in Beginner mode. intermediate = shown in Beginner + Standard. */
  level: FuriganaLevel
}
