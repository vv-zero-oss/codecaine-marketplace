import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section on the page.
 *
 * `mx-auto` is also exactly what a careless transfer across the frame boundary
 * strips, which is why the scaffolding pages are built on it.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />
}
