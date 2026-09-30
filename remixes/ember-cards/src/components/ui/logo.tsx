import type * as React from "react"

import { cn } from "@/lib/utils"

/** Ember's mark: two virtual cards, one stacked behind the other. */
export function LogoMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-6", className)} {...props}>
      <rect x="4" y="3.5" width="10" height="15" rx="2.6" stroke="currentColor" strokeWidth="1.8" transform="rotate(-12 9 11)" />
      <rect x="9.5" y="5" width="10" height="15" rx="2.6" fill="currentColor" transform="rotate(8 14.5 12.5)" />
    </svg>
  )
}

/** The mark and the name, as the header shows them. */
export function Logo({ name = "Ember", href = "#top", className }: { name?: string; href?: string; className?: string }) {
  return (
    <a href={href} className={cn("inline-flex items-center gap-1.5 text-ink", className)} aria-label={`${name} home`}>
      <LogoMark className="size-7" />
      <span className="text-[1.0625rem] font-medium tracking-[-0.02em]">{name}</span>
    </a>
  )
}
