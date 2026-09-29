import type * as React from "react"

import { cn } from "@/lib/utils"

/** The Arcline symbol: three stepped arcs, the way a deal climbs a pipeline. */
export function ArclineMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 40 32" fill="currentColor" aria-hidden className={cn("shrink-0", className)} {...props}>
      <path d="M0 6a6 6 0 0 1 6-6h14a6 6 0 0 1 0 12H6a6 6 0 0 1-6-6Z" />
      <path d="M8 16a6 6 0 0 1 6-6h14a6 6 0 0 1 0 12H14a6 6 0 0 1-6-6Z" opacity="0.72" />
      <path d="M16 26a6 6 0 0 1 6-6h12a6 6 0 0 1 0 12H22a6 6 0 0 1-6-6Z" opacity="0.46" />
    </svg>
  )
}

/** Symbol and name, as the header and footer set them. */
export function Wordmark({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      href="#top"
      aria-label="Arcline home"
      className={cn("inline-flex items-center gap-2 text-fg", className)}
      {...props}
    >
      <ArclineMark className="h-[22px] w-auto" />
      <span className="text-[26px] leading-none font-normal tracking-[-0.045em]">Arcline</span>
    </a>
  )
}
