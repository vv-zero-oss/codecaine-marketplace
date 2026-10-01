import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A column of content that drifts upward forever. The children are rendered
 * twice so the loop closes without a jump. Pure CSS, so the editor's Motion
 * switch stops and reduces it.
 */
export function ChatLoop({
  duration = 28,
  paused = false,
  className,
  children,
}: {
  /** Seconds for one full pass. */
  duration?: number
  paused?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn("flex animate-chat-loop flex-col will-change-transform", className)}
      style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : "running" }}
    >
      <div className="flex flex-col gap-3 pb-3">{children}</div>
      <div className="flex flex-col gap-3 pb-3" aria-hidden>
        {children}
      </div>
    </div>
  )
}
