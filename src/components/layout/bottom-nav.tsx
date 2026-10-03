"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, RotateCcw, UserRound, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const items: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/stories", label: "Stories", icon: BookOpen },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/me", label: "Me", icon: UserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-line bg-bg/92 backdrop-blur-xl"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <ul className="flex h-16 items-stretch justify-around px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full min-h-11 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition-colors",
                  active ? "text-coral" : "text-muted hover:text-fg",
                )}
              >
                <Icon aria-hidden className="size-[22px]" strokeWidth={active ? 2.5 : 2} />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
