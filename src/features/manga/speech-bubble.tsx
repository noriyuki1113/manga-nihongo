"use client"

import { getCharacter } from "@/content/characters"
import { JapaneseText } from "@/features/manga/japanese-text"
import { cn } from "@/lib/utils"
import type { Dialogue, FuriganaMode } from "@/types"

type Props = {
  dialogue: Dialogue
  mode: FuriganaMode
  onExpressionTap: (expressionId: string) => void
}

export function SpeechBubble({ dialogue, mode, onExpressionTap }: Props) {
  const character = getCharacter(dialogue.characterId)

  if (dialogue.type === "narration") {
    return (
      <div className="rounded-lg border-2 border-ink bg-[#FFF3B8] px-4 py-2.5 text-ink shadow-[3px_3px_0_0_rgba(27,22,32,0.9)]">
        <JapaneseText
          japanese={dialogue.japanese}
          expressionIds={dialogue.expressionIds}
          mode={mode}
          onExpressionTap={onExpressionTap}
          className="text-[17px] font-semibold"
        />
        {dialogue.english && <p className="mt-0.5 text-[13px] font-medium text-ink/70">{dialogue.english}</p>}
      </div>
    )
  }

  const isAlex = character.side === "left"
  const isThought = dialogue.type === "thought"

  return (
    <div className={cn("flex flex-col gap-1", isAlex ? "items-start" : "items-end")}>
      <span
        className="px-2 text-xs font-bold tracking-wide"
        style={{ color: character.color }}
      >
        {character.name}
      </span>
      <div
        className={cn(
          "relative max-w-[88%] border-2 border-ink bg-paper px-4 py-2.5 text-ink shadow-[3px_3px_0_0_rgba(27,22,32,0.9)]",
          isThought ? "rounded-[28px] border-dashed" : "rounded-[22px]",
          isAlex ? "rounded-tl-md" : "rounded-tr-md",
        )}
      >
        <JapaneseText
          japanese={dialogue.japanese}
          expressionIds={dialogue.expressionIds}
          mode={mode}
          onExpressionTap={onExpressionTap}
          className={cn("text-[19px] font-semibold", isThought && "italic")}
        />
        {dialogue.english && (
          <p className="mt-0.5 text-[13px] font-medium leading-snug text-ink/70">{dialogue.english}</p>
        )}
        {isThought && (
          <>
            <span aria-hidden className={cn("absolute -top-3 size-3 rounded-full border-2 border-dashed border-ink bg-paper", isAlex ? "left-6" : "right-6")} />
            <span aria-hidden className={cn("absolute -top-5 size-1.5 rounded-full border-2 border-ink bg-paper", isAlex ? "left-4" : "right-4")} />
          </>
        )}
      </div>
    </div>
  )
}
