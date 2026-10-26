import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const surfaceCard = cva("relative overflow-hidden", {
  variants: {
    tone: {
      glass: "bg-glass shadow-subtle backdrop-blur-[4px]",
      graphite: "bg-graphite shadow-subtle",
      void: "bg-void shadow-subtle",
    },
    size: {
      card: "rounded-card",
      large: "rounded-large",
    },
  },
  defaultVariants: { tone: "glass", size: "card" },
})

/**
 * A panel on the dark canvas: frosted glass at 10%, graphite, or void black —
 * with a 1px inset hairline instead of a shadow.
 */
export function SurfaceCard({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof surfaceCard>) {
  return <div className={cn(surfaceCard({ tone, size }), className)} {...props} />
}
