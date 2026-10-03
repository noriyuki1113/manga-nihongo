import type { Expression } from "@/types"

export const expressions: Expression[] = [
  {
    id: "tte",
    text: "って",
    reading: "って",
    meaning: ["called", "speaking of", "quotation marker"],
    standardForm: "という / と",
    animeScore: 5,
    realScore: 5,
    workScore: 3,
    casualScore: 4,
    friendsUsage: 5,
    teacherUsage: 3,
    bossUsage: 2,
    explanation:
      "In casual Japanese, 「って」 is often used in place of more formal structures such as 「という」.",
    sceneExplanation:
      "In 「Alexって呼べばいい？」, Yuki is asking what she should call Alex.",
    tags: ["casual", "particle"],
  },
  {
    id: "jan",
    text: "じゃん",
    reading: "じゃん",
    meaning: ["isn't it", "see", "actually"],
    standardForm: "じゃない",
    animeScore: 5,
    realScore: 5,
    workScore: 1,
    casualScore: 5,
    friendsUsage: 5,
    teacherUsage: 2,
    bossUsage: 1,
    explanation:
      "「じゃん」 can express surprise, emphasis or agreement. It does not always function as a simple negative.",
    sceneExplanation:
      "In 「日本語、けっこう話せるじゃん。」, Yuki is pointing out, with friendly surprise, that Alex's Japanese is good.",
    tags: ["casual", "sentence-ending"],
  },
  {
    id: "maji-de",
    text: "マジで？",
    reading: "まじで？",
    meaning: ["Really?", "Seriously?"],
    standardForm: "本当に？",
    politeForm: "本当ですか？",
    animeScore: 5,
    realScore: 5,
    workScore: 1,
    casualScore: 5,
    friendsUsage: 5,
    teacherUsage: 2,
    bossUsage: 1,
    explanation:
      "Very common casual Japanese used to show surprise, disbelief or excitement.",
    sceneExplanation:
      "Yuki is surprised that Alex doesn't know much about anime.",
    tags: ["casual", "slang", "reaction"],
  },
  {
    id: "ii-yo",
    text: "いいよ",
    reading: "いいよ",
    meaning: ["Sure", "That's fine", "Go ahead"],
    standardForm: "大丈夫です",
    animeScore: 4,
    realScore: 5,
    workScore: 3,
    casualScore: 4,
    friendsUsage: 5,
    teacherUsage: 3,
    bossUsage: 2,
    explanation:
      "「いい」 can mean yes, okay, or sometimes no thanks depending on context.",
    sceneExplanation:
      "Alex asks if it's really okay to sit there, and Yuki answers with an easy 「いいよ」.",
    tags: ["casual", "response"],
  },
  {
    id: "yoroshiku",
    text: "よろしく",
    reading: "よろしく",
    meaning: ["Nice to meet you", "Thanks in advance", "Count on me"],
    politeForm: "よろしくお願いします",
    animeScore: 5,
    realScore: 5,
    workScore: 4,
    casualScore: 4,
    friendsUsage: 5,
    teacherUsage: 4,
    bossUsage: 3,
    explanation:
      "There is no perfect one-to-one English translation. Meaning changes depending on the situation.",
    sceneExplanation:
      "Yuki says it when they first meet, and again when they agree to hang out. Same word, slightly different feeling.",
    tags: ["greeting", "essential"],
  },
]

const byId = new Map(expressions.map((e) => [e.id, e]))

export function getExpression(id: string): Expression | undefined {
  return byId.get(id)
}
