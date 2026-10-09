import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres a section's content. `data-canvas-ignore` so the editor looks through it. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1080px] px-5 sm:px-8", className)} {...props} />
}
