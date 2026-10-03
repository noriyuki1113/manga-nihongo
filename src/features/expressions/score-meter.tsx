import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: number
  max?: number
  tone: "coral" | "mint"
}

/** Horizontal meter, used for the Anime vs Real comparison. */
export function ScoreMeter({ label, value, max = 5, tone }: Props) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${value} out of ${max}`}
      className="grid grid-cols-[112px_1fr_auto] items-center gap-3"
    >
      <span className="text-sm font-semibold text-fg">{label}</span>
      <span className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <span
          className={cn("block h-full rounded-full", tone === "coral" ? "bg-coral" : "bg-mint")}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </span>
      <span className="w-8 text-right text-sm font-bold tabular-nums text-muted">
        {value}/{max}
      </span>
    </div>
  )
}
