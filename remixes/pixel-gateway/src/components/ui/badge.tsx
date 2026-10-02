import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 font-display text-[8px] uppercase leading-none tracking-wide shadow-px-sm",
  {
    variants: {
      tone: {
        neutral: "bg-surface-2 text-fg-muted [--px-edge:var(--color-surface-2)]",
        accent: "bg-accent text-accent-fg [--px-edge:var(--color-accent)]",
        good: "bg-good text-bg [--px-edge:var(--color-good)]",
        warn: "bg-warn text-bg [--px-edge:var(--color-warn)]",
        bad: "bg-bad text-bg [--px-edge:var(--color-bad)]",
        outline: "bg-transparent text-fg [--px-edge:var(--color-line-strong)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
)

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
