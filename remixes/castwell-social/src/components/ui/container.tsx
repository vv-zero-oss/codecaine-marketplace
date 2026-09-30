import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Centres a section's content between the page gutters.
 * `data-canvas-ignore`: a wrapper nobody designs — the editor looks through
 * it. Pass `data-canvas-ignore={false}` to make one use pickable.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-canvas-ignore
      className={cn("mx-auto w-full max-w-[1440px] px-(--spacing-gutter)", className)}
      {...props}
    />
  )
}
