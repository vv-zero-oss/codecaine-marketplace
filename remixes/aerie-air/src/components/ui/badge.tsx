import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-(--radius-chip) px-1.5 py-0.5 text-[12px] font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-panel text-ink-2",
        sky: "bg-sky-50 text-sky-700",
        green: "bg-signal-green-soft text-signal-green",
        ember: "bg-peach text-ember-ink",
        dusk: "bg-dusk text-dusk-fg",
        outline: "text-ink-2 shadow-(--shadow-field)",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
