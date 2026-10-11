import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/**
 * Every section opens the same way: a serif headline set tight, and a grey
 * line under it that says what the section is for.
 */
export function SectionHeading({
  title,
  lead,
  eyebrow,
  align = "left",
  size = "h2",
  className,
  children,
}: {
  title: string
  lead?: string
  eyebrow?: string
  align?: "left" | "center"
  size?: "h2" | "display"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <p className="type-eyebrow text-accent-ink">{eyebrow}</p> : null}
      <h2 className={cn("type-serif max-w-[16ch] text-ink", size === "h2" ? "text-h2" : "text-display")}>{title}</h2>
      {lead ? <p className={cn("max-w-[44ch] text-lead text-ink-3", align === "center" && "mx-auto")}>{lead}</p> : null}
      {children}
    </Reveal>
  )
}
