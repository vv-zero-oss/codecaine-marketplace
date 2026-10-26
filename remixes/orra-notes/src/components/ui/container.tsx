import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section: 1320px of content with a 20px gutter on phones
 * and 40px from tablets up.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  // `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
  // canvas editor looks through it to what it holds; it stays in the layers
  // panel. Pass `data-canvas-ignore={false}` to make one use of it pickable.
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-10", className)} {...props} />
}
