import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-2 py-0.5 text-[12.58px] font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-panel text-ink-2",
        amber: "bg-amber text-amber-ink",
        green: "bg-green/10 text-green",
        blue: "bg-blue-soft text-blue",
        red: "bg-red/10 text-red",
        violet: "bg-violet-soft text-violet",
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
