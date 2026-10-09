import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A row that scrolls forever. `speed` is seconds per loop, `direction` which way
 * it travels, `pauseOnHover` whether a mouse stops it. The track is a CSS
 * animation, so the editor's Motion switch stops and reduces it.
 */
export function Marquee({
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  children,
}: {
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <div
      className={cn("group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]", className)}
    >
      <div
        data-canvas-ignore
        className={cn("flex w-max gap-3", pauseOnHover && "[@media(hover:hover)]:group-hover:[animation-play-state:paused]")}
        style={still ? undefined : { animation: `marquee ${speed}s linear infinite ${direction === "right" ? "reverse" : "normal"}` }}
      >
        {children}
        <span aria-hidden="true" className="flex gap-3">
          {children}
        </span>
      </div>
    </div>
  )
}
