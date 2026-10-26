import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small caption over a heading — `SHARED MEMORY`, `ON YOUR CALLS`. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-caption font-medium tracking-[0.08em] text-mist uppercase", className)} {...props} />
}
