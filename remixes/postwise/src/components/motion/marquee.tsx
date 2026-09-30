import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A row that drifts sideways forever, its content doubled so the loop has no
 * seam.
 *
 * A CSS animation (the `marquee` keyframes in `index.css`), so the editor's
 * Motion switch stops and reduces it with nothing extra; reduced motion stops
 * it here too. The track is structural and marked `data-canvas-ignore`; the
 * marquee itself and every item in it stay pickable.
 */
export function Marquee({
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  children,
}: {
  /** Seconds for one full loop. Lower is faster. */
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        data-canvas-ignore
        className={cn(
          "flex w-max shrink-0 animate-marquee motion-reduce:animate-none",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
