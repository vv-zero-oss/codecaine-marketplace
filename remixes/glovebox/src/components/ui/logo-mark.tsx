import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The Glovebox mark: a glovebox lid, seen straight on, with its latch.
 * Drawn in `currentColor`, so it is ink on paper and white on footage.
 */
export function LogoMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-5", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M9.5 6h13A6.5 6.5 0 0 1 29 12.5v5.2c0 4.8-3.9 8.3-8.7 8.3h-8.6C6.9 26 3 22.5 3 17.7v-5.2A6.5 6.5 0 0 1 9.5 6Zm3 7.2a1.6 1.6 0 0 0 0 3.2h7a1.6 1.6 0 0 0 0-3.2h-7Z"
      />
    </svg>
  )
}

/** The mark with the name beside it, as the nav's first segment shows it. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <LogoMark className="size-[18px]" />
      <span className="font-display text-[17px] leading-none tracking-[-0.01em]">Glovebox</span>
    </span>
  )
}
