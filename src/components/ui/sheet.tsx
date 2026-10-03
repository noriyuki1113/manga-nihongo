"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetTitle = DialogPrimitive.Title
export const SheetDescription = DialogPrimitive.Description

type SheetContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** "auto" fits content (max 85dvh). "full" fills most of the screen. */
  size?: "auto" | "full"
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, size = "auto", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[480px] flex-col rounded-t-[28px] bg-surface text-fg shadow-[0_-12px_48px_rgba(0,0,0,0.5)] ring-1 ring-line outline-none data-[state=closed]:animate-sheet-down data-[state=open]:animate-sheet-up",
        size === "full" ? "h-[92dvh]" : "max-h-[85dvh]",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-white/20" />
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
SheetContent.displayName = "SheetContent"
