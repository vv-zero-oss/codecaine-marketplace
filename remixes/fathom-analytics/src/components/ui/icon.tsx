import type * as React from "react"

import { cn } from "@/lib/utils"

/** An inline SVG icon wrapper for the few glyphs Lucide lacks. */
export function Icon({ className, children, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cn("size-5", className)} aria-hidden="true" {...props}>
      {children}
    </svg>
  )
}
