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
      className={cn("mx-auto w-full max-w-7xl px-phi-3 sm:px-phi-4 lg:px-phi-5", className)}
      {...props}
    />
  )
}
