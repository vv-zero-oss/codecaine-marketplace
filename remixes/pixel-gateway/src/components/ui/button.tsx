import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The pixel button: a flat fill with a notched, four-sided hard border, an
 * 8-bit label, and a press that drops it 2px onto its own shadow. No radius,
 * no blur, and the hover is a colour swap rather than a fade.
 */
const buttonVariants = cva(
  "relative inline-flex min-h-11 select-none items-center justify-center gap-phi-1 whitespace-nowrap font-display text-label uppercase leading-none tracking-wide shadow-px transition-[transform,background-color,color] duration-100 ease-[steps(2,end)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70 focus-visible:ring-offset-0 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-surface-3 text-fg [--px-edge:var(--color-surface-3)] hover:bg-line-strong hover:[--px-edge:var(--color-line-strong)]",
        primary:
          "bg-fg text-bg [--px-edge:var(--color-fg)] hover:bg-accent-hi hover:[--px-edge:var(--color-accent-hi)]",
        accent:
          "bg-accent text-accent-fg [--px-edge:var(--color-accent)] hover:bg-accent-hi hover:text-bg hover:[--px-edge:var(--color-accent-hi)]",
        outline:
          "bg-transparent text-fg shadow-px-sm [--px-edge:var(--color-fg)] hover:bg-fg hover:text-bg",
        ghost:
          "bg-transparent text-fg-muted shadow-none hover:bg-surface-3 hover:text-fg",
        glass:
          "bg-fg/10 shadow-px-sm text-fg backdrop-blur-[2px] [--px-edge:var(--color-fg)] hover:bg-fg hover:text-bg",
      },
      size: {
        default: "h-11 px-phi-3",
        sm: "h-10 px-phi-2 text-label-sm",
        lg: "h-14 px-phi-3 text-label",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button, as a link — a component of its own rather than `asChild`,
 * so the editor's layers panel reads `ButtonLink` and not Radix's `Slot`.
 */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
