import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What every section's content sits in: the page gutter, and room for the
 * fixed rail on the right at desktop widths.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  // `data-canvas-ignore`: a gutter, not a layer anyone designs. The canvas
  // editor's pointer looks through it; it stays in the layers panel. A caller
  // that wants it pickable passes `data-canvas-ignore={false}`.
  return <div data-canvas-ignore className={cn("w-full px-[var(--spacing-gutter)]", className)} {...props} />
}
