import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The small tinted pill the app puts on a session or a change: a zone or
 * activity in caps, or a percentage with its arrow.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-(--radius-chip) px-2 py-0.5 text-[10px] leading-none font-semibold whitespace-nowrap tabular-nums [&_svg]:size-2.5",
  {
    variants: {
      tone: {
        lime: "bg-tag-lime/14 text-tag-lime",
        mist: "bg-tag-mist/12 text-tag-mist",
        sky: "bg-tag-sky/14 text-tag-sky",
        coral: "bg-tag-coral/14 text-tag-coral",
        sand: "bg-tag-sand/14 text-tag-sand",
        sage: "bg-tag-sage/14 text-tag-sage",
        gain: "bg-gain-soft text-gain",
        loss: "bg-loss-soft text-loss",
        day: "bg-linen-mist text-forest-ink",
      },
      caps: { true: "uppercase tracking-[0.04em]", false: "" },
    },
    defaultVariants: { tone: "lime", caps: true },
  },
)

export function Chip({ className, tone, caps, ...props }: React.ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span className={cn(chipVariants({ tone, caps }), className)} {...props} />
}
