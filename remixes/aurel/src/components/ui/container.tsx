import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What holds every section to the page's gutters.
 *
 * `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
 * canvas editor looks through it to what is inside (it stays in the layers
 * panel). Pass `data-canvas-ignore={false}` to make one use pickable.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1920px] px-gutter", className)} {...props} />
}
