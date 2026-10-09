import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * An endless row. `duration` is the seconds one loop takes; a CSS animation,
 * so the editor's Motion switch can stop it. The track is structural.
 */
export function Marquee({
  children,
  duration = 38,
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  children: ReactNode
  duration?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]", className)}
      style={{ "--marquee-duration": `${duration}s`, "--marquee-gap": "3.5rem" } as React.CSSProperties}
    >
      <div
        data-canvas-ignore
        className={cn(
          "flex min-w-max shrink-0 animate-marquee items-center gap-14 pr-14",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        <div aria-hidden className="contents">{children}</div>
      </div>
    </div>
  )
}
