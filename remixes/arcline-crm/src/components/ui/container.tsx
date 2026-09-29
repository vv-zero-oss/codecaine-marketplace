import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page gutter every section sits inside: full width, 5vw each side.
 *
 * `data-canvas-ignore`: a centring wrapper, not a layer anyone designs, so the
 * canvas editor looks through it to what it holds. A caller that wants it
 * pickable passes `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1920px] px-gutter", className)} {...props} />
}
