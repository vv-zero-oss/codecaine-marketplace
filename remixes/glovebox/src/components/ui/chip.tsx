import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** A small monospaced status tag — "Imported", "Claim settled", a car's plate. */
const chipVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-chip px-2 py-1 font-mono text-[11px] leading-none tracking-[-0.01em] [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        link: "bg-link-soft text-link",
        money: "bg-money-soft text-money",
        neutral: "bg-paper text-muted shadow-hairline",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
)

export function Chip({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span className={cn(chipVariants({ tone, className }))} {...props} />
}
