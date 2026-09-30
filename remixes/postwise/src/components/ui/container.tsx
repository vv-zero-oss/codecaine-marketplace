import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section on the page. `data-canvas-ignore`: a centring
 * wrapper, not a layer anyone designs, so the canvas editor's pointer looks
 * through it (it stays in the layers panel). Pass
 * `data-canvas-ignore={false}` to make one use of it pickable.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1120px] px-gutter", className)} {...props} />
}
