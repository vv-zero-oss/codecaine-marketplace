import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres every section. `data-canvas-ignore`: a layout wrapper, not something anyone designs. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-8", className)} {...props} />
}
