import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres every section. A structural wrapper: the editor looks through it. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1024px] px-4 sm:px-6", className)} {...props} />
}
