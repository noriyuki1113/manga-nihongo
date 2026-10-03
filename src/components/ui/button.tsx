import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold transition-[transform,background-color,opacity] active:scale-[0.97] disabled:pointer-events-none disabled:bg-surface-2 disabled:text-muted disabled:shadow-none disabled:ring-1 disabled:ring-inset disabled:ring-line",
  {
    variants: {
      variant: {
        primary: "bg-coral text-ink hover:bg-[#ff8294]",
        secondary: "bg-surface-2 text-fg ring-1 ring-inset ring-line hover:bg-[#232837]",
        mint: "bg-mint text-ink hover:bg-[#8cf0d6]",
        ghost: "text-muted hover:text-fg",
      },
      size: {
        default: "h-12",
        lg: "h-14 px-6 text-base",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
)
Button.displayName = "Button"

export { buttonVariants }
