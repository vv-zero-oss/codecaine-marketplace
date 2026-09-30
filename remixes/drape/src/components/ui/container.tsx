import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres a section's content. `data-canvas-ignore`: a wrapper nobody
 *  designs, so the editor's pointer looks through it (see CLAUDE.md). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)} {...props} />
}
