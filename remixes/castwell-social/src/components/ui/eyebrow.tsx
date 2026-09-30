import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small grey label above a section title. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-[13px] leading-none text-muted md:text-sm", className)} {...props} />
}
