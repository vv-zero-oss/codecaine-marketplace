import { forwardRef } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A pinned scene: a section `beats` screens tall with one sticky, screen-high
 * stage inside it. The section is what somebody designs (it carries the id and
 * the tone the header reads); the stage is only the pin.
 */
export const Scene = forwardRef<
  HTMLElement,
  { beats: number; tone?: "light" | "dark" | "bare"; stageClassName?: string } & React.ComponentProps<"section">
>(function Scene({ beats, tone = "light", className, stageClassName, children, style, ...props }, ref) {
  return (
    <section
      ref={ref}
      data-tone={tone}
      className={cn("relative", className)}
      style={{ height: `${beats * 100}svh`, ...style }}
      {...props}
    >
      <div className={cn("sticky top-0 h-svh w-full overflow-hidden", stageClassName)}>{children}</div>
    </section>
  )
})
