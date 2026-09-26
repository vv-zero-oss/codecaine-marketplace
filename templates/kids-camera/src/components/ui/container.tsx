import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's gutter. The page runs edge to edge with a 16px margin, so this
 * holds only the side padding, no max-width.
 *
 * `data-canvas-ignore`: a layout wrapper, not a layer anyone designs. The
 * canvas editor's pointer looks through it to what it holds; it is still in
 * the layers panel. A caller that wants it pickable passes
 * `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("w-full px-gutter", className)} {...props} />
}
