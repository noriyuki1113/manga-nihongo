import type { StoryChallenge } from "@/types"

export const challenges: StoryChallenge[] = [
  {
    id: "ep1-reply",
    episodeId: "tokyo-days-ep1",
    question: "How would you respond naturally?",
    correctOptionId: "B",
    xpReward: 20,
    options: [
      {
        id: "A",
        japanese: "はい。私は行きます。",
        english: "Yes. I will go.",
        meaning: "Correct",
        grammar: "Correct",
        naturalness: 2,
        feedback:
          "Grammatically correct, but a little formal between friends.",
      },
      {
        id: "B",
        japanese: "うん、行く！",
        english: "Yeah, I'm coming!",
        meaning: "Correct",
        grammar: "Correct",
        naturalness: 5,
        feedback: "Natural and casual with friends.",
      },
      {
        id: "C",
        japanese: "我も同行しよう。",
        english: "I shall accompany you as well.",
        meaning: "Correct",
        grammar: "Correct",
        naturalness: 1,
        anime: 5,
        feedback:
          "Sounds dramatic or anime-like in everyday conversation.",
      },
    ],
  },
]

export function getChallenge(id: string): StoryChallenge | undefined {
  return challenges.find((c) => c.id === id)
}
