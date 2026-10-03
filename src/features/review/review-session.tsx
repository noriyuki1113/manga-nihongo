"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { reviewQuestions } from "@/content/review/questions"
import { RubyText } from "@/features/manga/japanese-text"
import { cn } from "@/lib/utils"
import { xpKey } from "@/lib/xp"
import { progressActions, useProgress } from "@/stores/progress-store"

export function ReviewSession() {
  const progress = useProgress()
  const [pinned, setPinned] = useState<number | null>(null)
  const [earned, setEarned] = useState<number | null>(null)

  const total = reviewQuestions.length
  const firstOpen = reviewQuestions.findIndex((q) => !progress.reviewResults[q.id])
  const index = pinned ?? (firstOpen === -1 ? total : firstOpen)
  const mode = progress.furiganaMode

  /* ---------- Summary ---------- */
  if (index >= total) {
    const correct = reviewQuestions.filter((q) => progress.reviewResults[q.id]?.correct).length
    return (
      <div className="animate-pop-in flex flex-col gap-6">
        <div className="rounded-[28px] bg-surface p-6 text-center ring-1 ring-line">
          <p className="text-sm font-bold text-muted">Review complete</p>
          <p className="mt-2 font-display text-6xl font-black tracking-tight text-fg">
            {correct}
            <span className="text-3xl text-muted"> / {total}</span>
          </p>
          <p className="mt-3 text-[15px] text-muted">
            {correct === total
              ? "Perfect. You can use these with friends."
              : "Good start. Try again to lock them in."}
          </p>
        </div>
        <ul className="flex flex-col gap-2" aria-label="Your answers">
          {reviewQuestions.map((q, i) => {
            const ok = progress.reviewResults[q.id]?.correct
            return (
              <li key={q.id} className="flex min-h-14 items-center gap-3 rounded-2xl bg-surface px-4 py-3 ring-1 ring-line">
                <span
                  aria-hidden
                  className={cn("grid size-7 shrink-0 place-items-center rounded-full", ok ? "bg-mint text-ink" : "bg-coral text-ink")}
                >
                  {ok ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
                </span>
                <span className="text-[15px] font-semibold text-fg">
                  Question {i + 1}
                  <span className="sr-only">{ok ? ", correct" : ", incorrect"}</span>
                </span>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={() => {
              progressActions.resetReview()
              setEarned(null)
              setPinned(0)
            }}
          >
            Try Again
          </Button>
          <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}>
            Back Home
          </Link>
        </div>
      </div>
    )
  }

  /* ---------- Question ---------- */
  const question = reviewQuestions[index]
  const result = progress.reviewResults[question.id]
  const answered = Boolean(result)
  const isLastQuestion = index === total - 1

  function answer(optionId: string) {
    if (answered) return
    const correct = optionId === question.correctOptionId
    const firstTime = correct && !progress.xpAwarded.includes(xpKey.review(question.id))
    setPinned(index)
    setEarned(firstTime ? question.xpReward : null)
    progressActions.answerReview(question.id, { selectedOptionId: optionId, correct }, question.xpReward)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-label="Review progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={index + (answered ? 1 : 0)}
          className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-mint transition-[width] duration-300"
            style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold tabular-nums text-muted">
          {index + 1}/{total}
        </span>
      </div>

      <div>
        <h2 lang="ja" className="jp whitespace-pre-line text-[22px] font-extrabold text-fg">
          <RubyText text={question.prompt} mode={mode} />
        </h2>
        <p className="mt-1 text-sm text-muted">{question.promptEn}</p>
      </div>

      <div role="group" aria-label="Answers" className="flex flex-col gap-3">
        {question.options.map((o) => {
          const picked = result?.selectedOptionId === o.id
          const isCorrect = o.id === question.correctOptionId
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => answer(o.id)}
              disabled={answered}
              aria-pressed={picked}
              className={cn(
                "flex min-h-16 items-center gap-4 rounded-2xl bg-surface px-4 py-3 text-left ring-1 ring-line transition-[transform] active:scale-[0.98] disabled:active:scale-100",
                answered && isCorrect && "bg-mint/12 ring-2 ring-mint",
                answered && picked && !isCorrect && "bg-coral/12 ring-2 ring-coral",
                answered && !picked && !isCorrect && "opacity-55",
              )}
            >
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-extrabold text-fg"
              >
                {o.id}
              </span>
              <span lang="ja" className="jp text-[18px] font-bold text-fg">
                <RubyText text={o.text} mode={mode} />
              </span>
              {answered && isCorrect && <Check aria-label="Correct answer" className="ml-auto size-5 shrink-0 text-mint" />}
              {answered && picked && !isCorrect && <X aria-label="Your answer" className="ml-auto size-5 shrink-0 text-coral" />}
            </button>
          )
        })}
      </div>

      {answered && result && (
        <div role="status" aria-live="polite" className="animate-pop-in flex flex-col gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line">
          <div className="flex items-center justify-between gap-3">
            <p className={cn("text-lg font-extrabold", result.correct ? "text-mint" : "text-coral")}>
              {result.correct ? "Correct!" : "Not quite"}
            </p>
            {earned !== null && (
              <span className="rounded-full bg-mint px-3 py-1 text-sm font-extrabold text-ink">+{earned} XP</span>
            )}
          </div>
          <p className="text-[15px] leading-relaxed text-fg">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <Button
          size="lg"
          onClick={() => {
            setEarned(null)
            setPinned(index + 1)
          }}
        >
          {isLastQuestion ? "See Results" : "Next Question"}
        </Button>
      )}
    </div>
  )
}
