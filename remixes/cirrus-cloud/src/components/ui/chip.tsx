import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** A tool tag: mono caps on a notched block of one pixel colour. */
const chipVariants = cva("notch notch-sm label inline-flex h-6 items-center px-3 !tracking-[0.08em]", {
  variants: {
    tone: {
      red: "bg-chip-red text-paper",
      blue: "bg-chip-blue text-paper",
      violet: "bg-chip-violet text-paper",
      ink: "bg-chip-ink text-paper",
      lime: "bg-chip-lime text-ink",
    },
  },
  defaultVariants: { tone: "ink" },
})

export type ChipTone = NonNullable<VariantProps<typeof chipVariants>["tone"]>

export function Chip({ className, tone, ...props }: React.ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span className={cn(chipVariants({ tone }), className)} {...props} />
}
