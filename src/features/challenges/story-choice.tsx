"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { ScoreStars } from "@/components/score-stars"
import { RubyText } from "@/features/manga/japanese-text"
import { xpKey } from "@/lib/xp"
import { cn } from "@/lib/utils"
import { progressActions, useProgress } from "@/stores/progress-store"
import type { ChallengeOption, FuriganaMode, StoryChallenge } from "@/types"

function Verdict({ label, value }: { label: string; value: ChallengeOption["meaning"] }) {
  const ok = value === "Correct"
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <span className={cn("flex items-center gap-1.5 text-sm font-bold", ok ? "text-mint" : "text-coral")}>
        {ok ? <Check aria-hidden className="size-4" /> : <X aria-hidden className="size-4" />}
        {value}
      </span>
    </div>
  )
}

type Props = {
  challenge: StoryChallenge
  mode: FuriganaMode
}

export function StoryChoice({ challenge, mode }: Props) {
  const progress = useProgress()
  const [earnedXp, setEarnedXp] = useState<number | null>(null)

  const result =
    progress.storyChoiceResult?.challengeId === challenge.id ? progress.storyChoiceResult : null
  const selected = challenge.options.find((o) => o.id === result?.selectedOptionId)

  function choose(option: ChallengeOption) {
    const correct = option.id === challenge.correctOptionId
    const firstTime = correct && !progress.xpAwarded.includes(xpKey.choice(challenge.id))
    setEarnedXp(firstTime ? challenge.xpReward : null)
    progressActions.answerStoryChoice(
      { challengeId: challenge.id, selectedOptionId: option.id, correct },
      challenge.xpReward,
    )
  }

  return (
    <section
      aria-labelledby={`${challenge.id}-q`}
      className="animate-pop-in mt-6 rounded-[28px] bg-surface p-5 ring-1 ring-coral/40"
    >
      <p className="text-sm font-bold text-coral">Story Choice</p>
      <h3 id={`${challenge.id}-q`} className="mt-1 text-xl font-extrabold text-fg">
        {challenge.question}
      </h3>

      <div role="group" aria-labelledby={`${challenge.id}-q`} className="mt-4 flex flex-col gap-3">
        {challenge.options.map((option) => {
          const isSelected = option.id === result?.selectedOptionId
          const isCorrectOption = option.id === challenge.correctOptionId
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option)}
              aria-pressed={isSelected}
              className={cn(
                "flex min-h-16 items-center gap-4 rounded-2xl bg-surface-2 px-4 py-3 text-left ring-1 ring-line transition-[transform,box-shadow] active:scale-[0.98]",
                isSelected && isCorrectOption && "bg-mint/12 ring-2 ring-mint",
                isSelected && !isCorrectOption && "bg-coral/12 ring-2 ring-coral",
              )}
            >
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-extrabold text-fg"
              >
                {option.id}
              </span>
              <span className="min-w-0">
                <span lang="ja" className="jp block text-[18px] font-bold text-fg">
                  <RubyText text={option.japanese} mode={mode} />
                </span>
                <span className="block text-[13px] text-muted">{option.english}</span>
              </span>
            </button>
          )
        })}
      </div>

      {selected && result && (
        <div
          role="status"
          aria-live="polite"
          className="animate-pop-in mt-5 flex flex-col gap-3 rounded-2xl bg-bg/70 p-4 ring-1 ring-line"
        >
          <div className="flex items-center justify-between gap-3">
            <p className={cn("text-lg font-extrabold", result.correct ? "text-mint" : "text-coral")}>
              {result.correct ? "Best answer!" : "Understandable, but…"}
            </p>
            {earnedXp !== null && (
              <span className="rounded-full bg-mint px-3 py-1 text-sm font-extrabold text-ink">
                +{earnedXp} XP
              </span>
            )}
          </div>

          <Verdict label="Meaning" value={selected.meaning} />
          <Verdict label="Grammar" value={selected.grammar} />
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-muted">Naturalness</span>
            <ScoreStars value={selected.naturalness} label="Naturalness" tone="mint" />
          </div>
          {selected.anime !== undefined && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-muted">Anime</span>
              <ScoreStars value={selected.anime} label="Anime" tone="coral" />
            </div>
          )}

          <p className="border-t border-line pt-3 text-[15px] leading-relaxed text-fg">
            {selected.feedback}
          </p>
          {!result.correct && (
            <p className="text-sm text-muted">Try another answer to compare how natural it sounds.</p>
          )}
        </div>
      )}
    </section>
  )
}
