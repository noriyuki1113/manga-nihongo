"use client"

import { Check } from "lucide-react"
import { furiganaModeLabels, furiganaModes } from "@/lib/furigana"
import { cn } from "@/lib/utils"
import type { FuriganaMode } from "@/types"

type Props = {
  mode: FuriganaMode
  onChange: (mode: FuriganaMode) => void
  className?: string
}

export function FuriganaPicker({ mode, onChange, className }: Props) {
  return (
    <div role="radiogroup" aria-label="Furigana mode" className={cn("flex flex-col gap-2.5", className)}>
      {furiganaModes.map((m) => {
        const active = m === mode
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(m)}
            className={cn(
              "flex min-h-16 items-center gap-4 rounded-2xl px-4 py-3 text-left ring-1 transition-colors",
              active ? "bg-coral/12 ring-2 ring-coral" : "bg-surface-2 ring-line hover:bg-[#232837]",
            )}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-fg">{furiganaModeLabels[m].label}</span>
              <span className="block text-[13px] text-muted">{furiganaModeLabels[m].description}</span>
            </span>
            {active && <Check aria-hidden className="size-5 shrink-0 text-coral" />}
          </button>
        )
      })}
    </div>
  )
}
