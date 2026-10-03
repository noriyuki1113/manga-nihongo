import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative grid size-9 place-items-center rounded-[14px] bg-coral text-[19px] font-black text-ink"
      >
        漫
        <span className="absolute -bottom-1 left-1.5 size-3 rotate-45 rounded-[3px] bg-coral" />
      </span>
      <span className="font-display text-[19px] font-extrabold tracking-tight text-fg">
        Manga Nihongo
      </span>
    </div>
  )
}
