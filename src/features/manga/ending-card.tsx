import type { SceneEnding } from "@/types"

export function EndingCard({ ending }: { ending: SceneEnding }) {
  return (
    <section
      aria-label="End of episode"
      className="animate-pop-in mt-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-coral/20 via-surface to-mint/10 p-6 ring-1 ring-line"
    >
      <p className="font-display text-3xl font-black italic tracking-tight text-fg">{ending.toBeContinued}</p>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-sm font-semibold text-muted">Episode 2</p>
        <p lang="ja" className="mt-1 text-2xl font-extrabold text-fg">
          {ending.nextTitleJa}
        </p>
        <p className="text-base text-muted">{ending.nextTitleEn}</p>
      </div>
    </section>
  )
}
