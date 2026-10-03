"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { expressions } from "@/content/expressions"
import { FuriganaPicker } from "@/features/manga/furigana-picker"
import { activeStreak } from "@/lib/date"
import { cn } from "@/lib/utils"
import { progressActions, useHydrated, useProgress } from "@/stores/progress-store"

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface px-4 py-4 ring-1 ring-line">
      <p data-value className="text-2xl font-extrabold leading-none">
        {value}
      </p>
      <p className="mt-1.5 text-xs font-semibold text-muted">{label}</p>
    </div>
  )
}

export function MeScreen() {
  const progress = useProgress()
  const ready = useHydrated()
  const [confirming, setConfirming] = useState(false)

  const streak = activeStreak(progress.streak, progress.lastStudyDate)
  const learned = progress.learnedExpressionIds.length
  const episodesDone = Object.keys(progress.episodeCompleted).length

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-3xl font-black tracking-tight">Me</h1>
      </header>

      <section aria-label="Stats" className={cn("grid grid-cols-2 gap-3", !ready && "[&_[data-value]]:invisible")}>
        <Stat label="XP" value={String(progress.xp)} />
        <Stat label="Day streak" value={String(streak)} />
        <Stat label="Expressions learned" value={`${learned} / ${expressions.length}`} />
        <Stat label="Episodes completed" value={String(episodesDone)} />
      </section>

      <section aria-labelledby="furigana-heading" className="flex flex-col gap-3">
        <div>
          <h2 id="furigana-heading" className="text-lg font-bold">
            Furigana
          </h2>
          <p className="text-sm text-muted">Applies everywhere Japanese appears.</p>
        </div>
        <FuriganaPicker mode={progress.furiganaMode} onChange={progressActions.setFuriganaMode} />
      </section>

      <section aria-labelledby="data-heading" className="flex flex-col gap-3">
        <div>
          <h2 id="data-heading" className="text-lg font-bold">
            Your data
          </h2>
          <p className="text-sm text-muted">Progress is saved on this device only.</p>
        </div>
        {confirming ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-coral/10 p-4 ring-1 ring-coral/40">
            <p className="text-[15px] font-semibold">Erase all XP, streak and progress?</p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  progressActions.resetAll()
                  setConfirming(false)
                }}
              >
                Erase
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setConfirming(true)}>
            Reset progress
          </Button>
        )}
      </section>
    </div>
  )
}
