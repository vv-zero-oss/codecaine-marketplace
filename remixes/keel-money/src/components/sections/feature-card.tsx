import type { ReactNode } from "react"

import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/**
 * A bento cell: a title, a line of explanation, and a piece of the product
 * that shows it. Night cards for the spending chapter, white ones for the
 * wealth chapter.
 */
export function FeatureCard({
  title,
  body,
  tone = "night",
  layout = "stack",
  delay = 0,
  className,
  children,
}: {
  title: string
  body: string
  tone?: "night" | "day"
  /** `stack` puts the visual under the words; `side` puts it beside them. */
  layout?: "stack" | "side"
  delay?: number
  className?: string
  children?: ReactNode
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "group relative flex min-w-0 overflow-hidden rounded-(--radius-card) transition-shadow duration-(--duration-hover)",
        tone === "night" ? "bg-gradient-to-b from-surface-2/70 to-surface shadow-(--shadow-card)" : "bg-day-card shadow-(--shadow-day-card)",
        layout === "stack" ? "flex-col" : "flex-col sm:flex-row",
        className,
      )}
    >
      <div className={cn("p-6 pb-4", layout === "side" && "sm:max-w-[48%] sm:pb-6")}>
        <h3 className={cn("type-display text-[20px] leading-tight tracking-[-0.01em]", tone === "night" ? "text-fg" : "text-day-ink")}>{title}</h3>
        <p className={cn("mt-2 max-w-[44ch] text-[14px] leading-snug", tone === "night" ? "text-fg-3" : "text-day-ink-3")}>{body}</p>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </Reveal>
  )
}
