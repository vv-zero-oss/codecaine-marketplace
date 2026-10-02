import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A ticker. `speed` is how many seconds one lap takes, `paused` freezes it, and
 * the track — a purely structural wrapper — is `data-canvas-ignore`, so the
 * items in it stay pickable.
 */
export function Marquee({
  speed = 30,
  direction = "left",
  paused = false,
  className,
  children,
}: {
  speed?: number
  direction?: "left" | "right"
  paused?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        data-canvas-ignore
        className="flex min-w-max shrink-0 animate-marquee items-center gap-10 pr-10"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
        <div data-canvas-ignore aria-hidden className="flex items-center gap-10">
          {children}
        </div>
      </div>
    </div>
  )
}
