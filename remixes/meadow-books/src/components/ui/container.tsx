import type * as React from "react"

import { cn } from "@/lib/utils"

/** Centres every section. `data-canvas-ignore`: a structural wrapper the
 *  editor's pointer looks through; a caller opts back in with
 *  `data-canvas-ignore={false}`. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1000px] px-5 sm:px-6", className)} {...props} />
}
