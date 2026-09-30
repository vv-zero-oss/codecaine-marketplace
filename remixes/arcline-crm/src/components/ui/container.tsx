import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The content column inside the page frame: one 58px grid column of air on
 * each side at desktop, less on smaller screens.
 *
 * `data-canvas-ignore`: a spacing wrapper, not a layer anyone designs, so the
 * canvas editor looks through it. A caller that wants it pickable passes
 * `data-canvas-ignore={false}`.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full px-5 sm:px-8 lg:px-[58px]", className)} {...props} />
}
