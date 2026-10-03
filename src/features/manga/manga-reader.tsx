"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getChallenge } from "@/content/challenges"
import { StoryChoice } from "@/features/challenges/story-choice"
import { ExpressionSheet } from "@/features/expressions/expression-sheet"
import { EndingCard } from "@/features/manga/ending-card"
import { ReaderTopBar } from "@/features/manga/reader-top-bar"
import { FuriganaSheet, ReaderMenuSheet } from "@/features/manga/reader-sheets"
import { ScenePanel } from "@/features/manga/scene-panel"
import { cn } from "@/lib/utils"
import { progressActions, useHydrated, useProgress } from "@/stores/progress-store"
import type { Episode } from "@/types"

type SheetState = { id: string | null; open: boolean; detail: boolean }

export function MangaReader({ episode }: { episode: Episode }) {
  const router = useRouter()
  const progress = useProgress()
  const ready = useHydrated()

  const [sheet, setSheet] = useState<SheetState>({ id: null, open: false, detail: false })
  const [furiganaOpen, setFuriganaOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolledOnce = useRef(false)

  const total = episode.scenes.length
  const sceneIndex =
    progress.currentEpisode === episode.id ? Math.min(progress.currentScene, total - 1) : 0
  const scene = episode.scenes[sceneIndex]
  const isLast = sceneIndex === total - 1

  const challenge = scene.challengeId ? getChallenge(scene.challengeId) : undefined
  const choiceOk =
    !challenge ||
    (progress.storyChoiceResult?.challengeId === challenge.id && progress.storyChoiceResult.correct)

  // Make sure the store points at this episode.
  useEffect(() => {
    progressActions.startEpisode(episode.id)
  }, [episode.id])

  // Scroll to the newest scene (instantly on first load, smoothly afterwards).
  useEffect(() => {
    if (!ready) return
    const first = !scrolledOnce.current
    scrolledOnce.current = true
    if (first && sceneIndex === 0) return
    const el = document.getElementById(`scene-${sceneIndex + 1}`)
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ block: "start", behavior: first || reduce ? "auto" : "smooth" })
  }, [ready, sceneIndex])

  function handleExpressionTap(id: string) {
    progressActions.openExpression(id)
    progressActions.markTapGuideSeen()
    setSheet({ id, open: true, detail: false })
  }

  function handleLearnMore() {
    if (sheet.id) progressActions.learnExpression(sheet.id)
    setSheet((s) => ({ ...s, detail: true }))
  }

  function handleNext() {
    // If the current scene still has unread dialogue below the fold, scroll first.
    const current = document.getElementById(`scene-${sceneIndex + 1}`)
    if (current) {
      const visibleBottom = window.innerHeight - 120 // clear of the action bar
      const rect = current.getBoundingClientRect()
      if (rect.bottom > visibleBottom + 8) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollBy({
          top: Math.min(rect.bottom - visibleBottom + 24, window.innerHeight * 0.65),
          behavior: reduce ? "auto" : "smooth",
        })
        return
      }
    }
    if (isLast) {
      progressActions.completeEpisode(episode.id, episode.expressionIds, episode.xpReward)
      router.push(`/complete/${episode.id}`)
      return
    }
    progressActions.revealScene(sceneIndex + 1)
  }

  function handleRestart() {
    progressActions.startEpisode(episode.id, true)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  if (!ready) {
    return (
      <div className="min-h-dvh" aria-busy="true" aria-label="Loading episode">
        <div className="h-[calc(var(--safe-top)+57px)] border-b border-line" />
        <div className="px-4 pt-4">
          <div className="aspect-[4/3.1] w-full animate-pulse rounded-[26px] bg-surface" />
        </div>
      </div>
    )
  }

  const blocked = !choiceOk
  const nextLabel = blocked ? "Pick a reply to continue" : isLast ? "Finish Episode" : "Next"

  return (
    <div
      className="min-h-dvh"
      style={{ "--reader-top": progress.hasSeenTapGuide ? "74px" : "124px" } as React.CSSProperties}
    >
      <ReaderTopBar
        episodeNumber={episode.episodeNumber}
        title={episode.titleEn}
        sceneNumber={sceneIndex + 1}
        total={total}
        furiganaMode={progress.furiganaMode}
        showGuide={!progress.hasSeenTapGuide}
        onDismissGuide={progressActions.markTapGuideSeen}
        onOpenFurigana={() => setFuriganaOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <main className="flex flex-col gap-10 px-4 pb-44 pt-5">
        {episode.scenes.slice(0, sceneIndex + 1).map((s) => {
          const sceneChallenge = s.challengeId ? getChallenge(s.challengeId) : undefined
          return (
            <ScenePanel
              key={s.id}
              scene={s}
              total={total}
              mode={progress.furiganaMode}
              onExpressionTap={handleExpressionTap}
            >
              {sceneChallenge && <StoryChoice challenge={sceneChallenge} mode={progress.furiganaMode} />}
              {s.ending && <EndingCard ending={s.ending} />}
            </ScenePanel>
          )
        })}
      </main>

      {/* Bottom action */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px] bg-gradient-to-t from-bg via-bg/90 to-transparent px-4 pt-10"
        style={{ paddingBottom: "calc(var(--safe-bottom) + 16px)" }}
      >
        <Button
          size="lg"
          onClick={handleNext}
          disabled={blocked}
          className={cn("pointer-events-auto w-full", !blocked && "shadow-[0_8px_32px_rgba(255,107,129,0.35)]")}
        >
          {nextLabel}
          {!blocked &&
            (isLast ? <Check aria-hidden className="size-5" /> : <ArrowDown aria-hidden className="size-5" />)}
          <span className="sr-only">
            , scene {sceneIndex + 1} of {total}
          </span>
        </Button>
      </div>

      <ExpressionSheet
        expressionId={sheet.id}
        open={sheet.open}
        detail={sheet.detail}
        onOpenChange={(open) => setSheet((s) => ({ ...s, open, detail: open ? s.detail : false }))}
        onLearnMore={handleLearnMore}
      />
      <FuriganaSheet
        open={furiganaOpen}
        onOpenChange={setFuriganaOpen}
        mode={progress.furiganaMode}
        onChange={progressActions.setFuriganaMode}
      />
      <ReaderMenuSheet
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onRestart={handleRestart}
        onShowGuide={() => {
          progressActions.showTapGuideAgain()
          setMenuOpen(false)
        }}
      />
    </div>
  )
}
