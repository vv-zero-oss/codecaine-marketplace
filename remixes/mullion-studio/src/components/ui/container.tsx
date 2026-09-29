import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page gutter every section sits inside. Full-bleed, like the archive's
 * own layout — only the gutter, and a cap for very wide screens.
 *
 * `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. Pass
 * `data-canvas-ignore={false}` to make one use of it pickable.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1920px] px-gutter", className)} {...props} />
}
