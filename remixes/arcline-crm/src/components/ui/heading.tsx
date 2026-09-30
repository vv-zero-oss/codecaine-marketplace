import type * as React from "react"

import { cn } from "@/lib/utils"

const SIZES = {
  mega: "text-[clamp(52px,7.5vw,96px)] leading-[1] font-semibold tracking-[-0.024em]",
  display: "text-[clamp(42px,5.6vw,80px)] leading-[0.95] font-semibold tracking-[-0.02em]",
  h1: "text-[clamp(38px,4.4vw,56px)] leading-[1.07] font-semibold tracking-[-0.015em]",
  h2: "text-[32px] leading-9 font-medium tracking-[-0.01em] md:text-h2",
  h3: "text-h3 font-medium",
  statement: "text-[20px] leading-[26px] font-medium tracking-[-0.01em] md:text-h3",
} as const

/**
 * A heading in two tones: the first sentence in full ink, the rest muted —
 * one voice, two volumes. Either half can be left out.
 */
export function Heading({
  lead,
  rest,
  as: Tag = "h2",
  size = "h2",
  className,
}: {
  lead?: string
  rest?: string
  as?: "h1" | "h2" | "h3" | "p"
  size?: keyof typeof SIZES
  className?: string
}) {
  return (
    <Tag className={cn("font-display text-ink", SIZES[size], className)}>
      {lead}
      {lead && rest && " "}
      {rest && <span className="text-ink-2">{rest}</span>}
    </Tag>
  )
}

/** Body copy under a heading: muted, never bigger than 18px. */
export function Lede({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-base text-ink-2 md:text-lead", className)} {...props} />
}
