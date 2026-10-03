import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetClose, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { ScoreStars } from "@/components/score-stars"
import { X } from "lucide-react"
import type { Expression } from "@/types"

type Props = {
  expression: Expression
  onLearnMore: () => void
}

/** Bottom-sheet summary shown when a phrase is tapped in the reader. */
export function ExpressionCompact({ expression: e, onLearnMore }: Props) {
  return (
    <div className="flex flex-col gap-5 px-6 pb-[calc(var(--safe-bottom)+24px)] pt-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <SheetTitle asChild>
            <h2 lang="ja" className="text-[40px] font-black leading-tight tracking-tight text-fg">
              {e.text}
            </h2>
          </SheetTitle>
          <p lang="ja" className="mt-0.5 text-base text-muted">
            {e.reading}
          </p>
        </div>
        <SheetClose
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/8 text-muted hover:text-fg"
        >
          <X aria-hidden className="size-5" />
        </SheetClose>
      </div>

      <SheetDescription className="text-lg font-semibold text-fg">
        {e.meaning.join(" / ")}
      </SheetDescription>

      <dl className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 rounded-2xl bg-bg/60 px-4 py-4 ring-1 ring-line">
        <dt className="text-sm font-semibold text-muted">Anime</dt>
        <dd>
          <ScoreStars value={e.animeScore} label="Anime" tone="coral" />
        </dd>
        <dt className="text-sm font-semibold text-muted">Real Japanese</dt>
        <dd>
          <ScoreStars value={e.realScore} label="Real Japanese" tone="mint" />
        </dd>
      </dl>

      <Button onClick={onLearnMore} size="lg" className="w-full">
        Learn more
        <ChevronRight aria-hidden className="size-5" />
      </Button>
    </div>
  )
}
