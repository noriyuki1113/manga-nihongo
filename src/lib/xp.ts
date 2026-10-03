export const XP = {
  expressionOpened: 5,
  storyChoiceCorrect: 20,
  episodeComplete: 100,
  reviewCorrect: 10,
} as const

export const xpKey = {
  expression: (id: string) => `expr:${id}`,
  choice: (challengeId: string) => `choice:${challengeId}`,
  episode: (episodeId: string) => `episode:${episodeId}`,
  review: (questionId: string) => `review:${questionId}`,
}
