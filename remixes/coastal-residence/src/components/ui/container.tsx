import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres a section's content. `data-canvas-ignore`: a centring wrapper,
 * not a layer anyone designs — the canvas editor looks through it. A caller
 * that wants it pickable passes `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-canvas-ignore
      className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[13.5rem]", className)}
      {...props}
    />
  )
}
