"use client"

import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { getExpression } from "@/content/expressions"
import { cn } from "@/lib/utils"
import { useHydrated, useProgress } from "@/stores/progress-store"
import type { Episode } from "@/types"

export function EpisodeComplete({ episode }: { episode: Episode }) {
  const progress = useProgress()
  const ready = useHydrated()
  const completed = Boolean(progress.episodeCompleted[episode.id])

  if (!ready) return <div className="min-h-dvh" aria-busy="true" />

  const shell = "mx-auto flex min-h-dvh w-full flex-col px-6"
  const shellStyle = {
    paddingTop: "calc(var(--safe-top) + 32px)",
    paddingBottom: "calc(var(--safe-bottom) + 28px)",
  }

  if (!completed) {
    return (
      <main className={cn(shell, "justify-center gap-5 text-center")} style={shellStyle}>
        <h1 className="text-2xl font-extrabold">Finish the episode first</h1>
        <p className="text-muted">Read to the last scene to see your results.</p>
        <Link href={`/read/${episode.id}`} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
          Continue Reading
        </Link>
      </main>
    )
  }

  const learned = episode.expressionIds.map(getExpression).filter((e) => e !== undefined)

  return (
    <main className={shell} style={shellStyle}>
      <div className="animate-pop-in flex flex-col items-center gap-3 pt-2 text-center">
        <span
          aria-hidden
          className="grid size-16 place-items-center rounded-full bg-mint text-ink shadow-[0_0_0_10px_rgba(110,231,200,0.14)]"
        >
          <Check className="size-8" strokeWidth={3.2} />
        </span>
        <div>
          <h1 className="font-display text-[34px] font-black leading-tight tracking-tight">Episode Complete!</h1>
          <p className="mt-1 text-base text-muted">
            Episode {episode.episodeNumber} · {episode.titleEn} <span lang="ja">{episode.titleJa}</span>
          </p>
        </div>
      </div>

      <section aria-labelledby="learned-heading" className="mt-7">
        <h2 id="learned-heading" className="text-sm font-bold text-muted">
          Learned Expressions
        </h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {learned.map((e) => (
            <li
              key={e.id}
              className="flex min-h-12 items-center justify-between gap-4 rounded-2xl bg-surface px-4 py-2 ring-1 ring-line"
            >
              <span lang="ja" className="text-xl font-extrabold text-fg">
                {e.text}
              </span>
              <span className="truncate text-sm text-muted">{e.meaning[0]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="XP earned"
        className="mt-5 flex items-center justify-between rounded-2xl bg-coral/12 px-5 py-4 ring-1 ring-coral/40"
      >
        <div>
          <p className="text-sm font-semibold text-muted">XP Earned</p>
          <p className="text-3xl font-black text-coral">+{episode.xpReward} XP</p>
        </div>
        <p className="text-right text-sm text-muted">
          Total
          <span className="block text-lg font-bold text-fg">{progress.xp} XP</span>
        </p>
      </section>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        <Link href="/review" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
          Review Expressions
          <ChevronRight aria-hidden className="size-5" />
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}>
          Back Home
        </Link>
      </div>
    </main>
  )
}
