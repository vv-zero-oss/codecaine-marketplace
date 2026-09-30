import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's gutter and measure.
 *
 * `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
 * canvas editor's pointer looks through it to what it holds; it is still in
 * the layers panel. A caller that wants it pickable passes
 * `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1440px] px-gutter", className)} {...props} />
}
