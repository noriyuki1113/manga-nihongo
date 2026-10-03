export type FuriganaMode = "beginner" | "standard" | "immersion"

export type StoryChoiceResult = {
  challengeId: string
  selectedOptionId: string
  correct: boolean
}

export type ReviewResult = {
  selectedOptionId: string
  correct: boolean
}

export type ProgressState = {
  version: 1
  currentEpisode: string
  /** 0-based index of the furthest scene revealed in the current episode. */
  currentScene: number
  episodeCompleted: Record<string, boolean>
  openedExpressionIds: string[]
  learnedExpressionIds: string[]
  xp: number
  streak: number
  lastStudyDate: string | null
  furiganaMode: FuriganaMode
  reviewResults: Record<string, ReviewResult>
  storyChoiceResult: StoryChoiceResult | null
  /** Keys of XP rewards already granted — prevents double counting. */
  xpAwarded: string[]
  hasSeenTapGuide: boolean
}
