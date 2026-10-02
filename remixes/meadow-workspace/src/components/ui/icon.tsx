import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * An inline SVG, which serialises differently from ordinary markup: it lives
 * in its own namespace, and `viewBox` is one of the few genuinely camelCase
 * attributes that is not React's invention.
 */
export function Icon({ className, children, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={cn("size-5", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowIcon() {
  return (
    <Icon>
      <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function CheckIcon() {
  return (
    <Icon>
      <path d="M4 12.5l5 5 11-11" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}
