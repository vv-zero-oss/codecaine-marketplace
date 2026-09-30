import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section. `data-canvas-ignore`: a centring wrapper, not a
 * layer anyone designs, so the editor's pointer looks through it. A caller
 * that wants it pickable passes `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-canvas-ignore
      className={cn("mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
