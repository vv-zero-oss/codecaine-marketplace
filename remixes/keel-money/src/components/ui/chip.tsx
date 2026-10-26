import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The small tinted label the app puts on a transaction or a change: a
 * category in caps, or a percentage with its arrow.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-(--radius-chip) px-1.5 py-0.5 text-[10px] leading-none font-semibold whitespace-nowrap tabular-nums [&_svg]:size-2.5",
  {
    variants: {
      tone: {
        teal: "bg-tag-teal/14 text-tag-teal",
        lime: "bg-tag-lime/14 text-tag-lime",
        orange: "bg-tag-orange/14 text-tag-orange",
        pink: "bg-tag-pink/14 text-tag-pink",
        amber: "bg-tag-amber/14 text-tag-amber",
        violet: "bg-tag-violet/14 text-tag-violet",
        gain: "bg-gain-soft text-gain-ink",
        loss: "bg-loss-soft text-loss",
        blue: "bg-blue-soft text-[#7aa7ff]",
      },
      caps: { true: "uppercase tracking-[0.04em]", false: "" },
    },
    defaultVariants: { tone: "teal", caps: true },
  },
)

export function Chip({ className, tone, caps, ...props }: React.ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span className={cn(chipVariants({ tone, caps }), className)} {...props} />
}
