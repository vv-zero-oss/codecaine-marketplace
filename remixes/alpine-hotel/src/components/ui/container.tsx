import type * as React from "react"

import { cn } from "@/lib/utils"

/** What centres every section. `data-canvas-ignore`: a centring wrapper, not a
 *  layer anyone designs — the editor looks through it (see CLAUDE.md). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-canvas-ignore className={cn("mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-7", className)} {...props} />
  )
}
