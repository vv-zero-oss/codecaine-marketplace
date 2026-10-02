import type * as React from "react"

import { cn } from "@/lib/utils"

/** What centres every section on the page. Structural, so the editor looks
 *  through it; pass `data-canvas-ignore={false}` to make one use pickable. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8", className)} {...props} />
}
