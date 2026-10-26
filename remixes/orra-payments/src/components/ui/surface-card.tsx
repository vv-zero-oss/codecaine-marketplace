import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const surfaceCard = cva("relative overflow-hidden rounded-xl", {
  variants: {
    tone: {
      warm: "bg-surface shadow-card",
      espresso: "bg-espresso text-ink-inverse",
      night: "bg-night text-ink-inverse",
    },
  },
  defaultVariants: { tone: "warm" },
})

/** The warm, barely-lifted card every product block sits on. */
export function SurfaceCard({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof surfaceCard>) {
  return <div className={cn(surfaceCard({ tone }), className)} {...props} />
}
