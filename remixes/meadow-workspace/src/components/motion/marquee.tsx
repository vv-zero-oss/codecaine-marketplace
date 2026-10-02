import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A row that drifts sideways forever, built from CSS only so the editor's
 * Motion switch stops and reduces it like any stylesheet animation.
 * `speed` is seconds per loop, `direction` flips it, `pauseOnHover` holds it
 * under the cursor. The children are rendered twice for the seamless loop; the
 * second copy is hidden from assistive tech.
 */
export function Marquee({
  children,
  speed = 32,
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  children: ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}) {
  const track = cn("flex w-max shrink-0 items-center gap-10 pr-10", pauseOnHover && "group-hover:[animation-play-state:paused]")
  const style = { animation: `marquee ${speed}s linear infinite`, animationDirection: direction === "right" ? "reverse" : "normal" } as const
  return (
    <div className={cn("group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]", className)}>
      {/* A purely structural track: the editor looks through it. */}
      <div data-canvas-ignore className="flex w-max" style={style}>
        <div className={track}>{children}</div>
        <div className={track} aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
