import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/**
 * The top of an inner page: an eyebrow, a headline set at the mega step
 * (the claim in ink, the turn in grey), and a lead. Every inner page opens
 * with one, so they read as chapters of the same book.
 */
export function PageHero({
  eyebrow = "Pricing",
  title = "One flight free.",
  turn = "Every flight better.",
  lead,
  tone = "day",
  className,
  children,
}: {
  eyebrow?: string
  title?: string
  /** The second half of the headline, set in a quieter tone. */
  turn?: string
  lead?: string
  tone?: "day" | "night"
  className?: string
  children?: React.ReactNode
}) {
  const night = tone === "night"
  return (
    <section data-theme={tone} className={cn("pt-36 pb-16 sm:pt-44 md:pb-24", night ? "bg-night" : "bg-page", className)}>
      <Container>
        <Reveal>
          <p className={cn("type-eyebrow", night ? "text-violet-glow" : "text-violet")}>{eyebrow}</p>
          <h1 className={cn("type-display mt-5 text-mega text-balance", night ? "text-night-fg" : "text-ink")}>
            {title} {turn ? <span className={night ? "text-night-dim" : "text-ink-4"}>{turn}</span> : null}
          </h1>
          {lead ? <p className={cn("mt-8 max-w-[52ch] text-lead text-pretty", night ? "text-night-2fg" : "text-ink-2")}>{lead}</p> : null}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
