import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres every section. A wrapper nobody designs, so the editor looks through it. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />
}
