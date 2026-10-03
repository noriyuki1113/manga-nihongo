import type { ReviewQuestion } from "@/types"

export const reviewQuestions: ReviewQuestion[] = [
  {
    id: "review-1",
    prompt: "「マジで？」に最も近い普通の日本語は？",
    promptEn: "Which is the closest standard Japanese to 「マジで？」?",
    options: [
      { id: "A", text: "本当に？" },
      { id: "B", text: "ありがとう" },
      { id: "C", text: "どうして？" },
    ],
    correctOptionId: "A",
    explanation:
      "「マジで？」 is the casual version of 「本当に？」. Both express surprise or disbelief.",
    xpReward: 10,
  },
  {
    id: "review-2",
    prompt: "友達が「日本語うまいじゃん」と言いました。\n「じゃん」のニュアンスは？",
    promptEn: "A friend said 「日本語うまいじゃん」. What is the nuance of 「じゃん」?",
    options: [
      { id: "A", text: "Strong negation" },
      { id: "B", text: "Surprise / emphasis" },
      { id: "C", text: "Polite command" },
    ],
    correctOptionId: "B",
    explanation:
      "「じゃん」 adds friendly surprise or emphasis. Here it means “Hey, your Japanese is good!”",
    xpReward: 10,
  },
  {
    id: "review-3",
    prompt: "友達から「一緒にご飯行く？」と言われた。\n自然な返答は？",
    promptEn: "A friend asks 「一緒にご飯行く？」. Which reply sounds natural?",
    options: [
      { id: "A", text: "うん、行く！" },
      { id: "B", text: "私は食事に参加する予定であります。" },
      { id: "C", text: "行かせていただく所存です。" },
    ],
    correctOptionId: "A",
    explanation:
      "Between friends, 「うん、行く！」 is natural. The other two are far too stiff for a casual invitation.",
    xpReward: 10,
  },
]
