import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small mono label that opens a section: `(02) What we make`. */
export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("type-label flex items-center gap-3 text-ink-3", className)}>
      {index && <span className="text-ink-5 tabular-nums">({index})</span>}
      {children}
    </p>
  )
}

/**
 * A section's opening: the label, then a two-tone headline — the claim in
 * ink, its reason in grey — set big with tight tracking.
 */
export function SectionHeading({
  index,
  label,
  title,
  continuation,
  size = "h2",
  className,
}: {
  index?: string
  label: string
  title: string
  continuation?: string
  size?: "h2" | "display"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 className={cn("type-head max-w-[18ch] text-ink", size === "h2" ? "text-h2" : "text-display")}>
        {title}
        {continuation && <span className="text-ink-4"> {continuation}</span>}
      </h2>
    </div>
  )
}
