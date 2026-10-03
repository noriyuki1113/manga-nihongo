"use client"

import Link from "next/link"
import { ChevronRight, Lock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { catalog, STORY_TITLE, tokyoDaysCover } from "@/content/episodes/catalog"
import { SceneArt } from "@/features/manga/art/scene-art"
import { cn } from "@/lib/utils"
import { progressActions, useHydrated, useProgress } from "@/stores/progress-store"

export function StoriesScreen() {
  const progress = useProgress()
  const ready = useHydrated()

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <div className="size-20 shrink-0 overflow-hidden rounded-3xl ring-1 ring-line">
          <SceneArt scene={tokyoDaysCover} className="size-full" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">{STORY_TITLE}</h1>
          <p className="mt-1 text-sm text-muted">A new exchange student. A very casual classroom.</p>
        </div>
      </header>

      <ol className="flex flex-col gap-3" aria-label="Episodes">
        {catalog.map((ep) => {
          const available = ep.status === "available"
          const done = Boolean(progress.episodeCompleted[ep.id])
          const label = `Episode ${ep.episodeNumber}`

          const body = (
            <>
              <span
                aria-hidden
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold",
                  available ? "bg-coral text-ink" : "bg-white/6 text-muted",
                )}
              >
                {ep.episodeNumber}
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-base font-bold", available ? "text-fg" : "text-fg/70")}>
                  {ep.titleEn}
                  {ep.subtitle && <span className="ml-2 text-sm font-medium text-muted">{ep.subtitle}</span>}
                </p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {ep.titleJa}
                  {available && ready && done && <span className="ml-2 font-semibold text-mint">Completed</span>}
                </p>
              </div>
              {available ? (
                <ChevronRight aria-hidden className="size-5 shrink-0 text-muted" />
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/6 px-3 py-1.5 text-xs font-semibold text-muted">
                  <Lock aria-hidden className="size-3.5" />
                  Coming Soon
                </span>
              )}
            </>
          )

          return (
            <li key={ep.id}>
              {available ? (
                <Link
                  href={`/read/${ep.id}`}
                  aria-label={`${label}: ${ep.titleEn}`}
                  onClick={() => {
                    if (done) progressActions.startEpisode(ep.id, true)
                  }}
                  className={cn(buttonVariants({ variant: "secondary" }), "h-auto min-h-[76px] w-full justify-start gap-4 rounded-3xl px-4 py-3 text-left")}
                >
                  {body}
                </Link>
              ) : (
                <div
                  aria-label={`${label}: ${ep.titleEn}, coming soon`}
                  className="flex min-h-[76px] items-center gap-4 rounded-3xl border border-dashed border-line px-4 py-3"
                >
                  {body}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
