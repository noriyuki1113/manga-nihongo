"use client"

import Link from "next/link"
import { ChevronRight, Flame, Lock, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import { tokyoDaysCover, STORY_TITLE } from "@/content/episodes/catalog"
import { tokyoDaysEp1 } from "@/content/episodes/tokyo-days-ep1"
import { reviewQuestions } from "@/content/review/questions"
import { SceneArt } from "@/features/manga/art/scene-art"
import { activeStreak } from "@/lib/date"
import { cn } from "@/lib/utils"
import { progressActions, useHydrated, useProgress } from "@/stores/progress-store"

export function HomeScreen() {
  const progress = useProgress()
  const ready = useHydrated()
  const episode = tokyoDaysEp1
  const completed = Boolean(progress.episodeCompleted[episode.id])
  const total = episode.scenes.length
  const sceneNumber =
    progress.currentEpisode === episode.id ? Math.min(progress.currentScene + 1, total) : 1
  const started = progress.currentEpisode === episode.id && progress.currentScene > 0
  const streak = activeStreak(progress.streak, progress.lastStudyDate)

  const answered = Object.keys(progress.reviewResults).length
  const reviewTotal = reviewQuestions.length

  const progressLabel = completed
    ? "Completed"
    : started
      ? `Scene ${sceneNumber} of ${total}`
      : `${episode.estimatedMinutes} min read`

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <Logo />
        <p className="text-[15px] text-muted">Stories that teach real Japanese.</p>
      </header>

      {/* Series card */}
      <section aria-labelledby="series-title" className="overflow-hidden rounded-[28px] bg-surface ring-1 ring-line">
        <div className="relative">
          <SceneArt scene={tokyoDaysCover} className="block aspect-[4/3.3] w-full" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface via-surface/70 to-transparent"
          />
          <div className="absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1.5 text-xs font-bold text-fg backdrop-blur">
            Episode 1
          </div>
        </div>

        <div className="-mt-10 flex flex-col gap-4 px-5 pb-5">
          <div className="relative flex flex-col gap-1">
            <h1
              id="series-title"
              className="font-display text-[34px] font-black leading-none tracking-tight text-fg"
            >
              {STORY_TITLE}
            </h1>
            <p className="text-base font-semibold text-fg">
              Hajimemashite <span className="ml-1 text-muted">{episode.titleJa}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div
              role="progressbar"
              aria-label="Episode progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={completed ? total : started ? sceneNumber : 0}
              className="h-1.5 overflow-hidden rounded-full bg-white/10"
            >
              <div
                className={cn("h-full rounded-full bg-mint transition-[width] duration-500", !ready && "invisible")}
                style={{ width: `${completed ? 100 : started ? (sceneNumber / total) * 100 : 0}%` }}
              />
            </div>
            <p className={cn("text-[13px] text-muted", !ready && "invisible")}>{progressLabel}</p>
          </div>

          <Link
            href={`/read/${episode.id}`}
            onClick={() => {
              if (completed) progressActions.startEpisode(episode.id, true)
            }}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            {completed ? "Read Again" : "Continue Reading"}
            <ChevronRight aria-hidden className="size-5" />
          </Link>
        </div>
      </section>

      {/* XP + streak */}
      <section aria-label="Your progress" className={cn("grid grid-cols-2 divide-x divide-line rounded-3xl bg-surface ring-1 ring-line", !ready && "[&_[data-value]]:invisible")}>
        <div className="flex items-center gap-3 px-5 py-4">
          <span aria-hidden className="grid size-10 place-items-center rounded-2xl bg-mint/15 text-mint">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p data-value className="text-2xl font-extrabold leading-none text-fg">
              {progress.xp}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">XP</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <span aria-hidden className="grid size-10 place-items-center rounded-2xl bg-coral/15 text-coral">
            <Flame className="size-5" />
          </span>
          <div>
            <p data-value className="text-2xl font-extrabold leading-none text-fg">
              {streak}
              <span className="ml-1 text-sm font-bold text-muted">{streak === 1 ? "day" : "days"}</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">Streak</p>
          </div>
        </div>
      </section>

      {/* Today's review */}
      <Link
        href="/review"
        className="flex min-h-[72px] items-center gap-4 rounded-3xl bg-surface-2 px-5 py-4 ring-1 ring-line transition-colors hover:bg-[#232837]"
      >
        <span
          aria-hidden
          className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", completed ? "bg-sky/15 text-sky" : "bg-white/8 text-muted")}
        >
          {completed ? <Sparkles className="size-5" /> : <Lock className="size-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-fg">Today&apos;s Review</p>
          <p className={cn("text-[13px] text-muted", !ready && "invisible")}>
            {!completed
              ? "Finish Episode 1 to unlock"
              : answered >= reviewTotal
                ? "All done for today"
                : `${reviewTotal - answered} quick questions`}
          </p>
        </div>
        <ChevronRight aria-hidden className="size-5 shrink-0 text-muted" />
      </Link>
    </div>
  )
}
