import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { SectionLabel } from "@/components/blocks/section-label"
import { cn } from "@/lib/utils"

/**
 * An inner page's opening: a mono label, then the page's claim set as large
 * as the window allows, each line rising out of its own mask on a short
 * stagger, and the lead underneath.
 */
export function PageHero({
  label,
  lines,
  muted,
  lead,
  children,
  className,
}: {
  label: string
  /** The headline, one entry per line. */
  lines: string[]
  /** Index of a line to set in grey — the continuation. */
  muted?: number
  lead?: string
  children?: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <section className={cn("px-(--spacing-gutter) pt-[clamp(120px,16vw,220px)] pb-[clamp(48px,7vw,112px)]", className)}>
      <SectionLabel>{label}</SectionLabel>
      <h1 className="type-head mt-8 text-giga text-ink">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className={cn("block", i === muted && "text-ink-4")}
              initial={still ? false : { transform: "translateY(105%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      {(lead || children) && (
        <motion.div
          className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_1fr] md:items-end"
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {lead && <p className="max-w-[44ch] text-lead text-ink-2">{lead}</p>}
          {children}
        </motion.div>
      )}
    </section>
  )
}
