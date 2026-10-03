import { X } from "lucide-react"
import { ScoreStars } from "@/components/score-stars"
import { SheetClose, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { ScoreMeter } from "@/features/expressions/score-meter"
import { animeVsRealInsight } from "@/lib/scores"
import type { Expression } from "@/types"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-muted">{title}</h3>
      {children}
    </section>
  )
}

function UsageRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-[15px] font-semibold text-fg">{label}</span>
      <ScoreStars value={value} label={label} tone="mint" />
    </div>
  )
}

type Props = { expression: Expression }

/** Full expression view: scores, transformations and usage by audience. */
export function ExpressionDetail({ expression: e }: Props) {
  const forms: { label: string; text: string; current?: boolean }[] = [
    { label: "Casual", text: e.text, current: true },
    ...(e.standardForm ? [{ label: "Standard", text: e.standardForm }] : []),
    ...(e.politeForm ? [{ label: "Polite", text: e.politeForm }] : []),
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-3">
        <div className="min-w-0">
          <SheetTitle asChild>
            <h2 lang="ja" className="text-[38px] font-black leading-tight tracking-tight text-fg">
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

      <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto overscroll-contain px-6 pb-[calc(var(--safe-bottom)+32px)]">
        <SheetDescription asChild>
          <ul className="flex flex-wrap gap-2" aria-label="Meaning">
            {e.meaning.map((m) => (
              <li key={m} className="rounded-full bg-white/8 px-3.5 py-1.5 text-[15px] font-semibold text-fg">
                {m}
              </li>
            ))}
          </ul>
        </SheetDescription>

        <div className="flex flex-col gap-3 rounded-2xl bg-mint/10 p-4 ring-1 ring-mint/30">
          <p className="text-sm font-bold text-mint">In this scene</p>
          <p className="text-[15px] leading-relaxed text-fg">{e.sceneExplanation}</p>
        </div>

        <Section title="Explanation">
          <p className="text-[15px] leading-relaxed text-fg">{e.explanation}</p>
        </Section>

        <Section title="Anime vs Real Japanese">
          <div className="flex flex-col gap-3.5 rounded-2xl bg-bg/60 p-4 ring-1 ring-line">
            <ScoreMeter label="Anime" value={e.animeScore} tone="coral" />
            <ScoreMeter label="Real Japanese" value={e.realScore} tone="mint" />
            <p className="text-sm text-muted">{animeVsRealInsight(e)}</p>
          </div>
        </Section>

        <Section title="Where it fits">
          <div className="flex flex-col gap-2 rounded-2xl bg-bg/60 p-4 ring-1 ring-line">
            <UsageRow label="Work" value={e.workScore} />
            <UsageRow label="Casual" value={e.casualScore} />
          </div>
        </Section>

        <Section title="Transformations">
          <ol className="flex flex-col gap-2">
            {forms.map((f) => (
              <li
                key={f.label}
                className={
                  f.current
                    ? "flex items-center justify-between gap-4 rounded-2xl bg-coral/12 px-4 py-3.5 ring-1 ring-coral/40"
                    : "flex items-center justify-between gap-4 rounded-2xl bg-bg/60 px-4 py-3.5 ring-1 ring-line"
                }
              >
                <span className="text-sm font-semibold text-muted">{f.label}</span>
                <span lang="ja" className="text-right text-xl font-bold text-fg">
                  {f.text}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Used with">
          <div className="flex flex-col gap-1 rounded-2xl bg-bg/60 p-4 ring-1 ring-line">
            <UsageRow label="Friends" value={e.friendsUsage} />
            <UsageRow label="Teacher" value={e.teacherUsage} />
            <UsageRow label="Boss" value={e.bossUsage} />
          </div>
        </Section>
      </div>
    </div>
  )
}
