import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small breadcrumb-style label above a heading ("Product ›"). */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-1 text-[13px] font-medium text-ink-2", className)}>
      {children}
      <span aria-hidden className="text-ink-3">›</span>
    </p>
  )
}

/** A serif section heading. Wrap the accent in `<em>` for the italic. */
export function SectionTitle({ as: Tag = "h2", className, ...props }: React.ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return <Tag className={cn("display text-[clamp(2rem,5vw,3rem)]", className)} {...props} />
}

export function Lede({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-[34rem] text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.55] text-ink-2 text-pretty", className)} {...props} />
}
