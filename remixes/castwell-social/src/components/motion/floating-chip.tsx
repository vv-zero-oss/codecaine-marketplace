import type * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

const TONES = {
  mint: { dot: "bg-mint", pill: "bg-mint" },
  "mint-soft": { dot: "bg-mint-soft", pill: "bg-mint-soft" },
  coral: { dot: "bg-coral-soft", pill: "bg-coral-soft" },
  butter: { dot: "bg-butter", pill: "bg-butter" },
  periwinkle: { dot: "bg-periwinkle", pill: "bg-periwinkle" },
  sage: { dot: "bg-sage-deep", pill: "bg-sage-deep" },
} as const

/**
 * A workflow chip floating around the hero: an icon disc and a label pill.
 * `depth` sets how fast it drifts against the scroll (parallax) and, past
 * 0.7, drops it out of focus as a background shape with no label.
 */
export function FloatingChip({
  label = "Caption drafting",
  tone = "mint",
  icon,
  depth = 0.3,
  size = "md",
  className,
}: {
  label?: string
  tone?: keyof typeof TONES
  icon?: React.ReactNode
  /** 0 sits still, 1 drifts fastest and blurs. */
  depth?: number
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => (reduce ? 0 : -v * depth * 0.55))
  const t = TONES[tone]
  const ghost = depth >= 0.7

  if (ghost) {
    return (
      <motion.span
        aria-hidden
        style={{ y }}
        className={cn("absolute hidden h-4 rounded-full blur-[5px] md:block", t.pill, size === "lg" ? "w-24" : "w-14", className)}
      />
    )
  }

  const h = { sm: "h-7 text-[11px] px-2.5", md: "h-9 text-sm px-4", lg: "h-10 text-[15px] px-[18px]" }[size]
  const d = { sm: "size-7", md: "size-9", lg: "size-10" }[size]
  return (
    <motion.span style={{ y }} className={cn("absolute hidden items-center gap-1.5 md:flex", className)}>
      <span className={cn("grid place-items-center rounded-full text-ink [&_svg]:size-[45%]", d, t.dot)}>{icon}</span>
      <span className={cn("inline-flex items-center rounded-full font-medium text-ink", h, t.pill)}>{label}</span>
    </motion.span>
  )
}
