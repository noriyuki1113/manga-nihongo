"use client"

import { Fragment } from "react"
import { shouldShowReading, tokenizeFurigana } from "@/lib/furigana"
import { segmentDialogue } from "@/lib/segments"
import { cn } from "@/lib/utils"
import type { FuriganaMode } from "@/types"

/** Plain Japanese with furigana, no tappable parts. */
export function RubyText({ text, mode }: { text: string; mode: FuriganaMode }) {
  const tokens = tokenizeFurigana(text)
  return (
    <>
      {tokens.map((t, i) =>
        t.reading && shouldShowReading(mode, t.level) ? (
          <ruby key={i}>
            {t.text}
            <rp>(</rp>
            <rt>{t.reading}</rt>
            <rp>)</rp>
          </ruby>
        ) : (
          <Fragment key={i}>{t.text}</Fragment>
        ),
      )}
    </>
  )
}

type Props = {
  japanese: string
  expressionIds?: string[]
  mode: FuriganaMode
  onExpressionTap?: (expressionId: string) => void
  className?: string
}

/** A dialogue line: furigana + tappable expression highlights. */
export function JapaneseText({ japanese, expressionIds, mode, onExpressionTap, className }: Props) {
  const segments = segmentDialogue(japanese, expressionIds)

  return (
    <span className={cn("jp", className)} lang="ja">
      {segments.map((seg, i) => {
        if (!seg.expressionId) return <RubyText key={i} text={seg.text} mode={mode} />
        const id = seg.expressionId
        return (
          <button
            key={i}
            type="button"
            onClick={() => onExpressionTap?.(id)}
            aria-label={`Learn the expression ${seg.text}`}
            data-expression={id}
            className="tap-pulse mx-0.5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-mint/25 px-1.5 align-middle font-bold text-inherit underline decoration-ink/55 decoration-2 underline-offset-[5px] transition-transform active:scale-95"
          >
            <RubyText text={seg.text} mode={mode} />
          </button>
        )
      })}
    </span>
  )
}
