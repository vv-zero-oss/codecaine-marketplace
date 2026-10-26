import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * An endless, linear drift — a CSS animation, so it runs off the main thread
 * and the editor's Motion switch stops it like any stylesheet animation.
 *
 * The children are rendered twice and the track slides by half its width, so
 * the seam never shows. `speed` is seconds per loop.
 */
export function Marquee({
  children,
  speed = 40,
  direction = "left",
  paused = false,
  pauseOnHover = true,
  gap = 24,
  className,
}: {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  paused?: boolean
  pauseOnHover?: boolean
  gap?: number
  className?: string
}) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      {/* Structural: the moving track. The marquee and its items stay pickable. */}
      <div
        data-canvas-ignore
        className={cn(
          "flex w-max shrink-0 animate-marquee motion-reduce:animate-none",
          pauseOnHover && "[@media(hover:hover)]:group-hover/marquee:[animation-play-state:paused]",
        )}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : undefined,
            gap,
            paddingRight: gap,
          } as React.CSSProperties
        }
      >
        {children}
        <div aria-hidden className="contents">
          {children}
        </div>
      </div>
    </div>
  )
}
