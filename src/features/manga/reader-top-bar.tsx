"use client"

import Link from "next/link"
import { ChevronLeft, Languages, Menu } from "lucide-react"
import { Sparkles } from "lucide-react"
import { furiganaModeLabels } from "@/lib/furigana"
import type { FuriganaMode } from "@/types"

type Props = {
  episodeNumber: number
  title: string
  sceneNumber: number
  total: number
  furiganaMode: FuriganaMode
  showGuide: boolean
  onDismissGuide: () => void
  onOpenFurigana: () => void
  onOpenMenu: () => void
}

export function ReaderTopBar({
  episodeNumber,
  title,
  sceneNumber,
  total,
  furiganaMode,
  showGuide,
  onDismissGuide,
  onOpenFurigana,
  onOpenMenu,
}: Props) {
  return (
    <header
      className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-xl"
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="flex h-14 items-center gap-1 px-2">
        <Link
          href="/"
          aria-label="Back to Home"
          className="grid size-11 shrink-0 place-items-center rounded-full text-fg hover:bg-white/8"
        >
          <ChevronLeft aria-hidden className="size-6" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-center text-[15px] font-bold text-fg">
          Episode {episodeNumber} — {title}
        </h1>
        <button
          type="button"
          onClick={onOpenFurigana}
          aria-label={`Furigana settings. Current mode: ${furiganaModeLabels[furiganaMode].label}`}
          className="grid size-11 shrink-0 place-items-center rounded-full text-fg hover:bg-white/8"
        >
          <Languages aria-hidden className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="grid size-11 shrink-0 place-items-center rounded-full text-fg hover:bg-white/8"
        >
          <Menu aria-hidden className="size-[22px]" />
        </button>
      </div>

      <div
        role="progressbar"
        aria-label="Episode progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={sceneNumber}
        className="h-[3px] bg-white/8"
      >
        <div
          className="h-full bg-mint transition-[width] duration-500"
          style={{ width: `${(sceneNumber / total) * 100}%` }}
        />
      </div>

      {showGuide && (
        <div className="animate-pop-in flex min-h-12 items-center gap-3 bg-mint/14 px-4 py-2">
          <Sparkles aria-hidden className="size-4 shrink-0 text-mint" />
          <p className="flex-1 text-sm font-semibold text-fg">Tap Japanese phrases to learn</p>
          <button
            type="button"
            onClick={onDismissGuide}
            className="min-h-11 shrink-0 rounded-full px-3 text-sm font-bold text-mint hover:bg-white/8"
          >
            Got it
          </button>
        </div>
      )}
    </header>
  )
}
