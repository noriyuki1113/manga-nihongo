"use client"

import Link from "next/link"
import { Home, RotateCcw, Sparkles, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { FuriganaPicker } from "@/features/manga/furigana-picker"
import type { FuriganaMode } from "@/types"

function SheetHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-3">
      <div>
        <SheetTitle className="text-xl font-extrabold text-fg">{title}</SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">{description}</SheetDescription>
      </div>
      <SheetClose
        aria-label="Close"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-white/8 text-muted hover:text-fg"
      >
        <X aria-hidden className="size-5" />
      </SheetClose>
    </div>
  )
}

type FuriganaProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: FuriganaMode
  onChange: (mode: FuriganaMode) => void
}

export function FuriganaSheet({ open, onOpenChange, mode, onChange }: FuriganaProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader title="Furigana" description="Choose how much reading help you see above kanji." />
        <FuriganaPicker
          mode={mode}
          onChange={onChange}
          className="px-6 pb-[calc(var(--safe-bottom)+24px)] pt-5"
        />
      </SheetContent>
    </Sheet>
  )
}

type MenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRestart: () => void
  onShowGuide: () => void
}

export function ReaderMenuSheet({ open, onOpenChange, onRestart, onShowGuide }: MenuProps) {
  const row =
    "flex min-h-14 w-full items-center gap-4 rounded-2xl bg-surface-2 px-4 py-3 text-left text-base font-bold text-fg ring-1 ring-line transition-colors hover:bg-[#232837]"
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader title="Menu" description="Reader options" />
        <div className="flex flex-col gap-2.5 px-6 pb-[calc(var(--safe-bottom)+24px)] pt-5">
          <button type="button" className={row} onClick={onShowGuide}>
            <Sparkles aria-hidden className="size-5 text-mint" />
            Show the tap guide
          </button>
          <button type="button" className={row} onClick={onRestart}>
            <RotateCcw aria-hidden className="size-5 text-sky" />
            Restart episode
          </button>
          <Link href="/" className={row}>
            <Home aria-hidden className="size-5 text-coral" />
            Back to Home
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
