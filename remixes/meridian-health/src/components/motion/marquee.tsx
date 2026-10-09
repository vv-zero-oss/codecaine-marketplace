import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A strip that drifts sideways, forever. The content is rendered twice so the
 * loop is seamless; it pauses on hover and while `paused` is set.
 */
export function Marquee({
  duration = 50,
  direction = "left",
  paused = false,
  gap = 12,
  pauseOnHover = true,
  className,
  children,
}: {
  /** Seconds for one full loop. */
  duration?: number
  direction?: "left" | "right"
  paused?: boolean
  /** Pixels between items. */
  gap?: number
  pauseOnHover?: boolean
  className?: string
  children?: ReactNode
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": `${gap}px`,
    gap,
    animationDirection: direction === "left" ? "normal" : "reverse",
    animationPlayState: paused ? "paused" : undefined,
  } as CSSProperties
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        data-canvas-ignore
        className={cn("flex w-max animate-marquee", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={style}
      >
        <div className="flex shrink-0" style={{ gap }}>{children}</div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
