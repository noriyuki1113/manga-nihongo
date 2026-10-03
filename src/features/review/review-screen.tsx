"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { tokyoDaysEp1 } from "@/content/episodes/tokyo-days-ep1"
import { ReviewSession } from "@/features/review/review-session"
import { cn } from "@/lib/utils"
import { useHydrated, useProgress } from "@/stores/progress-store"

export function ReviewScreen() {
  const progress = useProgress()
  const ready = useHydrated()
  const unlocked = Boolean(progress.episodeCompleted[tokyoDaysEp1.id])

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-black tracking-tight">Review</h1>
        <p className="mt-1 text-sm text-muted">Three quick questions on what you just read.</p>
      </header>

      {!ready ? (
        <div className="h-48 animate-pulse rounded-3xl bg-surface" aria-busy="true" />
      ) : unlocked ? (
        <ReviewSession />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-line px-6 py-10 text-center">
          <span aria-hidden className="grid size-14 place-items-center rounded-2xl bg-white/6 text-muted">
            <Lock className="size-6" />
          </span>
          <div>
            <p className="text-lg font-bold">Your first review is waiting</p>
            <p className="mt-1 text-[15px] text-muted">Finish Episode 1 to unlock it.</p>
          </div>
          <Link href={`/read/${tokyoDaysEp1.id}`} className={cn(buttonVariants(), "w-full")}>
            Continue Reading
          </Link>
        </div>
      )}
    </div>
  )
}
