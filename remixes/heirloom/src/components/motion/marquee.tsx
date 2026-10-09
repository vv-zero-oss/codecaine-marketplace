import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A row that drifts sideways forever. The children are rendered twice and the
 * track moves by half its width, so the loop has no seam. Pure CSS: the
 * editor's Motion switch stops and reduces it without help.
 */
export function Marquee({
  duration = 48,
  direction = "left",
  pauseOnHover = true,
  className,
  children,
}: {
  duration?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn("group/marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]", className)}
    >
      <div
        data-canvas-ignore
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
