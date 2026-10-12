import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-(--radius-chip) px-2 py-1 font-mono text-[11.09px] uppercase tracking-[0.02em] whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-panel-2 text-ink-2",
        outline: "text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-3)]",
        ember: "bg-ember/14 text-ember",
        ok: "bg-ok/12 text-ok",
        warn: "bg-warn/12 text-warn",
        error: "bg-error/12 text-error",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
