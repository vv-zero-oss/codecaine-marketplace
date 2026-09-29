import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section on the page.
 *
 * `mx-auto` is also exactly what a careless transfer across the frame boundary
 * strips, which is why the scaffolding pages are built on it.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  // `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
  // canvas editor's pointer looks through it to the section it sits in and
  // the content inside it; it is still in the layers panel. A caller that
  // wants it pickable passes `data-canvas-ignore={false}`.
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />
}
