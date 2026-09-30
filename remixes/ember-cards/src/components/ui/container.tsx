import type * as React from "react"

import { cn } from "@/lib/utils"

/** What centres every section. Structural, so the canvas editor looks through it. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1176px] px-4 sm:px-6", className)} {...props} />
}
