import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** Every serif headline on the page: centred, tight, one size scale. */
const headingVariants = cva("font-display text-balance text-ink [&_em]:italic", {
  variants: {
    size: {
      md: "text-[clamp(2.125rem,3.2vw+1rem,3.75rem)] leading-[1.06]",
      lg: "text-[clamp(2.5rem,4.2vw+1rem,4.75rem)] leading-[1.02]",
    },
    align: {
      center: "text-center",
      left: "text-left",
    },
  },
  defaultVariants: { size: "md", align: "center" },
})

export function SectionHeading({
  className,
  size,
  align,
  ...props
}: React.ComponentProps<"h2"> & VariantProps<typeof headingVariants>) {
  return <h2 className={cn(headingVariants({ size, align, className }))} {...props} />
}
