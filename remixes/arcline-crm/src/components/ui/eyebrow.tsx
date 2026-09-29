import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small tinted label above a section heading. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-control bg-accent-tint px-1.5 text-sm font-medium text-accent-ink",
        className,
      )}
      {...props}
    />
  )
}
