import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center gap-1 font-type text-[0.62rem] uppercase leading-none tracking-[0.12em]", {
  variants: {
    variant: {
      tag: "rounded-[2px] bg-rust px-1.5 py-1 text-paper-bright",
      ink: "rounded-[2px] bg-ink px-1.5 py-1 text-paper-light",
      outline: "rounded-[2px] border border-ink px-1.5 py-[3px] text-ink",
    },
  },
  defaultVariants: { variant: "tag" },
})

export function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
