import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  value: number
  label: string
  max?: number
  size?: "sm" | "md"
  className?: string
  tone?: "coral" | "mint" | "sky"
}

const TONES = {
  coral: "fill-coral text-coral",
  mint: "fill-mint text-mint",
  sky: "fill-sky text-sky",
}

/** Accessible 5-star rating. Announced as "<label>: <value> out of 5". */
export function ScoreStars({ value, label, max = 5, size = "md", className, tone = "coral" }: Props) {
  return (
    <span
      role="img"
      aria-label={`${label}: ${value} out of ${max}`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            size === "sm" ? "size-3.5" : "size-[18px]",
            i < value ? TONES[tone] : "fill-transparent text-white/20",
          )}
          strokeWidth={1.8}
        />
      ))}
    </span>
  )
}
