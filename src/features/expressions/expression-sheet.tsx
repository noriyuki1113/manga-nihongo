"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { getExpression } from "@/content/expressions"
import { ExpressionCompact } from "@/features/expressions/expression-compact"
import { ExpressionDetail } from "@/features/expressions/expression-detail"

type Props = {
  expressionId: string | null
  open: boolean
  detail: boolean
  onOpenChange: (open: boolean) => void
  onLearnMore: () => void
}

/**
 * One sheet, two sizes: compact on tap, full on "Learn more".
 * The parent owns the state so the content stays visible during the exit animation.
 */
export function ExpressionSheet({ expressionId, open, detail, onOpenChange, onLearnMore }: Props) {
  const expression = expressionId ? getExpression(expressionId) : undefined
  if (!expression) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent size={detail ? "full" : "auto"}>
        {detail ? (
          <ExpressionDetail expression={expression} />
        ) : (
          <ExpressionCompact expression={expression} onLearnMore={onLearnMore} />
        )}
      </SheetContent>
    </Sheet>
  )
}
