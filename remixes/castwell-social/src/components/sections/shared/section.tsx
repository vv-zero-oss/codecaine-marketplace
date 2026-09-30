import type * as React from "react"

import { cn } from "@/lib/utils"

/** A band of the page with the standard vertical rhythm and a ground colour. */
export function Section({
  id,
  tone = "page",
  className,
  children,
}: {
  id?: string
  tone?: "page" | "sage" | "night"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-(--spacing-section)",
        tone === "page" && "bg-page text-ink",
        tone === "sage" && "bg-sage text-ink",
        tone === "night" && "night bg-night text-night-ink",
        className,
      )}
    >
      {children}
    </section>
  )
}
