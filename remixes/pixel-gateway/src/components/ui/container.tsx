import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section on the page. `data-canvas-ignore`: a centring
 * wrapper, not a layer anyone designs — the editor's pointer looks through it
 * to what it holds. A caller that wants it pickable passes
 * `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-canvas-ignore
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  )
}
