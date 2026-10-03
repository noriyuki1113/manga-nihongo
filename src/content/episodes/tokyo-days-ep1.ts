import type { Dialogue, Episode } from "@/types"

type D = Omit<Dialogue, "id">

/** Builds dialogues with stable, readable ids: ep1-s{scene}-d{n}. */
function dialogues(scene: number, items: D[]): Dialogue[] {
  return items.map((item, i) => ({ ...item, id: `ep1-s${scene}-d${i + 1}` }))
}

export const tokyoDaysEp1: Episode = {
  id: "tokyo-days-ep1",
  episodeNumber: 1,
  titleJa: "はじめまして",
  titleEn: "Hajimemashite",
  estimatedMinutes: 6,
  xpReward: 100,
  expressionIds: ["tte", "jan", "maji-de", "ii-yo", "yoroshiku"],
  challengeIds: ["ep1-reply"],
  scenes: [
    {
      id: "ep1-s1",
      order: 1,
      image: "school-gate",
      characters: [{ characterId: "alex", pose: "nervous", side: "center" }],
      dialogues: dialogues(1, [
        {
          characterId: "narrator",
          type: "narration",
          japanese: "今日から、日本での学校生活が始まる。",
          english: "Today, my school life in Japan begins.",
        },
        {
          characterId: "alex",
          type: "thought",
          japanese: "緊張するな…。",
          english: "I'm nervous…",
        },
      ]),
    },
    {
      id: "ep1-s2",
      order: 2,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "nervous", side: "left" },
        { characterId: "yuki", pose: "surprised", side: "right" },
      ],
      dialogues: dialogues(2, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "あ、新しい人？",
          english: "Oh, are you new?",
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "はい。はじめまして。Alexです。",
          english: "Yes. Nice to meet you. I'm Alex.",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "ユキ。よろしく！",
          english: "I'm Yuki. Nice to meet you!",
          expressionIds: ["yoroshiku"],
        },
      ]),
    },
    {
      id: "ep1-s3",
      order: 3,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "thinking", side: "left" },
        { characterId: "yuki", pose: "smile", side: "right" },
      ],
      dialogues: dialogues(3, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "Alexって呼べばいい？",
          english: "Can I call you Alex?",
          expressionIds: ["tte"],
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "……「って」？",
          english: "“…tte?”",
          expressionIds: ["tte"],
        },
      ]),
    },
    {
      id: "ep1-s4",
      order: 4,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "smile", side: "left" },
        { characterId: "yuki", pose: "happy", side: "right" },
      ],
      dialogues: dialogues(4, [
        {
          characterId: "alex",
          type: "speech",
          japanese: "あ、はい。Alexでいいです。",
          english: "Oh, yes. Alex is fine.",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "じゃ、Alexね！",
          english: "Then Alex it is!",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "日本語、けっこう話せるじゃん。",
          english: "Your Japanese is pretty good!",
          expressionIds: ["jan"],
        },
      ]),
    },
    {
      id: "ep1-s5",
      order: 5,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "neutral", side: "left" },
        { characterId: "yuki", pose: "surprised", side: "right" },
      ],
      dialogues: dialogues(5, [
        {
          characterId: "alex",
          type: "speech",
          japanese: "でも、アニメはあまり分かりません。",
          english: "But I don't understand anime very well.",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "マジで？",
          english: "Really?",
          expressionIds: ["maji-de"],
        },
      ]),
    },
    {
      id: "ep1-s6",
      order: 6,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "thinking", side: "left" },
        { characterId: "yuki", pose: "smile", side: "right" },
      ],
      dialogues: dialogues(6, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "ここ座る？",
          english: "Wanna sit here?",
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "いいんですか？",
          english: "Is that okay?",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "いいよ。",
          english: "Sure.",
          expressionIds: ["ii-yo"],
        },
      ]),
    },
    {
      id: "ep1-s7",
      order: 7,
      image: "classroom",
      characters: [
        { characterId: "alex", pose: "nervous", side: "left" },
        { characterId: "yuki", pose: "thinking", side: "right" },
      ],
      dialogues: dialogues(7, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "Alex、このあと暇？",
          english: "Alex, are you free after this?",
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "はい。私は暇です。",
          english: "Yes. I am free.",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "なんか丁寧だね。",
          english: "You're kind of formal.",
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "変ですか？",
          english: "Is it weird?",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "変じゃないけど。",
          english: "It's not weird, but…",
        },
      ]),
    },
    {
      id: "ep1-s8",
      order: 8,
      image: "classroom-afternoon",
      characters: [
        { characterId: "alex", pose: "thinking", side: "left" },
        { characterId: "yuki", pose: "smile", side: "right" },
      ],
      challengeId: "ep1-reply",
      dialogues: dialogues(8, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "放課後、みんなでご飯行くけど、Alexも来る？",
          english: "We're going to get dinner after school. Wanna come?",
        },
      ]),
    },
    {
      id: "ep1-s9",
      order: 9,
      image: "classroom-afternoon",
      characters: [
        { characterId: "alex", pose: "happy", side: "left" },
        { characterId: "yuki", pose: "happy", side: "right" },
      ],
      dialogues: dialogues(9, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "じゃあ決まり！",
          english: "Then it's settled!",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "Alex、これからよろしくね。",
          english: "Looking forward to hanging out, Alex.",
          expressionIds: ["yoroshiku"],
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "うん。よろしく！",
          english: "Yeah. Me too!",
          expressionIds: ["yoroshiku"],
        },
      ]),
    },
    {
      id: "ep1-s10",
      order: 10,
      image: "classroom-sunset",
      characters: [
        { characterId: "alex", pose: "surprised", side: "left" },
        { characterId: "yuki", pose: "smile", side: "right" },
      ],
      dialogues: dialogues(10, [
        {
          characterId: "yuki",
          type: "speech",
          japanese: "あ、そうだ。",
          english: "Oh, right.",
        },
        {
          characterId: "alex",
          type: "speech",
          japanese: "？",
          english: "",
        },
        {
          characterId: "yuki",
          type: "speech",
          japanese: "明日、面白いやつ紹介するね。",
          english: "I'll introduce you to someone interesting tomorrow.",
        },
      ]),
      ending: {
        toBeContinued: "To be continued…",
        nextTitleJa: "それ、マジ？",
        nextTitleEn: "Is That for Real?",
      },
    },
  ],
}
