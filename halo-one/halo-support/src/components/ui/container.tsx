import type * as React from "react"

import { cn } from "@/lib/utils"

/** What centres every section. A structural wrapper, so the editor looks
 *  through it (`data-canvas-ignore={false}` opts a use back in). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-canvas-ignore className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[42px]", className)} {...props} />
}
