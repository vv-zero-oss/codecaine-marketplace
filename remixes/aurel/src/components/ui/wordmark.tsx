import type * as React from "react"

import { cn } from "@/lib/utils"
import { brand } from "@/content"

/** The name, set in the display serif. Size it with `className`. */
export function Wordmark({ text = brand.wordmark, className, ...props }: { text?: string; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("block font-display leading-[0.8] tracking-[-0.01em]", className)} {...props}>
      {text}
    </span>
  )
}
