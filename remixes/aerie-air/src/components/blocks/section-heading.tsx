import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/**
 * A section's opening line: a small eyebrow, then the headline, set loud
 * and tight. `size` picks the step of the golden scale.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  size = "h2",
  align = "left",
  className,
  children,
}: {
  eyebrow?: string
  title: string
  lead?: string
  size?: "h2" | "display" | "mega" | "giga"
  align?: "left" | "center"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && <p className="text-micro text-ink-3">{eyebrow}</p>}
      <h2
        className={cn(
          "type-head max-w-[18ch] text-balance",
          size === "h2" && "text-h2",
          size === "display" && "text-display",
          size === "mega" && "text-mega",
          size === "giga" && "text-giga",
        )}
      >
        {title}
      </h2>
      {lead && <p className="max-w-[44ch] text-lead text-ink-3">{lead}</p>}
      {children}
    </Reveal>
  )
}
