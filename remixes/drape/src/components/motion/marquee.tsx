import { useCanvasDesignMode } from "@canvas/react"
import { useReducedMotion } from "motion/react"
import { Children, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Marquee — a row that drifts forever, drawn twice so the loop has no seam.
 *
 * A CSS animation, so the editor's Motion switch stops and reduces it. `speed`
 * is pixels per second (the duration is worked out from the track's width),
 * `direction` which way it runs, `paused` holds it; hovering pauses it too.
 */
export function Marquee({
  children,
  speed = 40,
  direction = "left",
  paused = false,
  gap = 64,
  fade = true,
  className,
}: {
  children: ReactNode
  speed?: number
  direction?: "left" | "right"
  paused?: boolean
  gap?: number
  fade?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const items = Children.toArray(children)
  // Roughly 180px an item; exact enough for a steady speed.
  const seconds = Math.max(8, (items.length * (180 + gap)) / Math.max(speed, 1))
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        fade && "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        data-canvas-ignore
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${seconds}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationPlayState: paused || reduced || designing ? "paused" : undefined,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
            {items}
          </div>
        ))}
      </div>
    </div>
  )
}
