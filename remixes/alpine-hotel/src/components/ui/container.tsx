import type * as React from "react"

import { cn } from "@/lib/utils"

/** What centres every section. `data-canvas-ignore`: a centring wrapper, not a
 *  layer anyone designs — the editor looks through it (see CLAUDE.md). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-canvas-ignore className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-10", className)} {...props} />
  )
}
