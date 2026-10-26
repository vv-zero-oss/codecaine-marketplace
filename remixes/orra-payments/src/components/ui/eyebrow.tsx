import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small mono label over every heading — `POWERED BY …`, `ONLINE PAYMENTS`. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-mono text-eyebrow text-ink-2 uppercase", className)} {...props} />
}
