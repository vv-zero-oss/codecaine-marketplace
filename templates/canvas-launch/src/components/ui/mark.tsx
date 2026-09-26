import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The Codecaine mark: a solid square with a board-shaped window cut through it —
 * the frame of the app icon, flattened to one ink. The window is a real hole
 * (even-odd fill), so whatever sits behind the mark shows through it; the
 * opening and the closing scene both depend on that.
 */
export const MARK_HOLE = { inset: 0.18, radius: 0.2 } as const

export function Mark({ className, children, ...props }: React.ComponentProps<"svg">) {
  const i = MARK_HOLE.inset * 100
  const r = MARK_HOLE.radius * 100
  const s = 100 - i * 2
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("block", className)} {...props}>
      {children}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d={`M0 0H100V100H0Z M${i + r} ${i}H${i + s - r}A${r} ${r} 0 0 1 ${i + s} ${i + r}V${i + s - r}A${r} ${r} 0 0 1 ${i + s - r} ${i + s}H${i + r}A${r} ${r} 0 0 1 ${i} ${i + s - r}V${i + r}A${r} ${r} 0 0 1 ${i + r} ${i}Z`}
      />
    </svg>
  )
}

/** The mark and the name, as the header and the footer set them. */
export function Wordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("inline-flex items-center gap-[0.3em] font-[560] tracking-[-0.035em]", className)} {...props}>
      <Mark className="size-[1.17em] shrink-0" />
      <span>Codecaine</span>
    </span>
  )
}
