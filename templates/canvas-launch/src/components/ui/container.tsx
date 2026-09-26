import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres a section's content. `data-canvas-ignore`: a wrapper nobody
 * designs, so the canvas editor's pointer looks through it to what it holds
 * (it stays in the layers panel). Pass `data-canvas-ignore={false}` to opt one
 * use back in.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-gutter", className)} {...props} />
}
