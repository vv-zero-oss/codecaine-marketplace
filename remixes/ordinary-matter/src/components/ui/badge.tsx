import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "type-label inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-(--radius-chip) px-2 py-1 text-[10px] whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-sheet text-ink-2",
        ink: "bg-ink text-page",
        timber: "bg-timber text-page",
        moss: "bg-moss text-page",
        outline: "text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
