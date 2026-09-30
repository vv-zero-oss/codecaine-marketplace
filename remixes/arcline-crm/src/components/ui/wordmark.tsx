import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** The Arcline symbol: three stepped bars, the way a deal climbs a pipeline. */
export function ArclineMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 40 32" fill="currentColor" aria-hidden className={cn("shrink-0", className)} {...props}>
      <path d="M0 6a6 6 0 0 1 6-6h14a6 6 0 0 1 0 12H6a6 6 0 0 1-6-6Z" />
      <path d="M8 16a6 6 0 0 1 6-6h14a6 6 0 0 1 0 12H14a6 6 0 0 1-6-6Z" opacity="0.7" />
      <path d="M16 26a6 6 0 0 1 6-6h12a6 6 0 0 1 0 12H22a6 6 0 0 1-6-6Z" opacity="0.42" />
    </svg>
  )
}

/** Symbol and name, as the header and footer set them. */
export function Wordmark({ className, ...props }: Omit<React.ComponentProps<"a">, "href">) {
  return (
    <Link href="/" aria-label="Arcline home" className={cn("inline-flex items-center gap-2 text-ink", className)} {...props}>
      <ArclineMark className="h-[17px] w-auto" />
      <span className="font-display text-[21px] leading-none font-semibold tracking-[-0.03em]">arcline</span>
    </Link>
  )
}
