import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section on the page: 1600px of content with a gutter that
 * grows with the window.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  // `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
  // canvas editor's pointer looks through it to what it holds; it is still in
  // the layers panel. A caller that wants it pickable passes
  // `data-canvas-ignore={false}`.
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1600px] px-(--spacing-gutter)", className)} {...props} />
}
