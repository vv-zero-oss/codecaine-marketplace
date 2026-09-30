import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * An endless row. The children are rendered twice and the track slides by
 * half its width, so the loop has no seam. CSS-driven: the editor's Motion
 * switch stops, reduces and resumes it.
 */
export function Marquee({
  children,
  duration = 38,
  direction = "left",
  pauseOnHover = true,
  gap = 96,
  className,
}: {
  children: ReactNode
  /** Seconds for one full loop. */
  duration?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  /** Pixels between items. */
  gap?: number
  className?: string
}) {
  return (
    <div className={cn("group/marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]", className)}>
      <div
        data-canvas-ignore
        className={cn(
          "flex w-max shrink-0 items-center motion-reduce:[animation-play-state:paused]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
