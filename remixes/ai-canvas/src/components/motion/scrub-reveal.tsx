import type { CSSProperties, ReactNode } from "react"
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react"

import { BLUR } from "@/lib/motion"
import { cn } from "@/lib/utils"

const amount = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)))

/**
 * Something that sharpens into place as a scroll progress passes `from` →
 * `to` — the page's blur-in, tied to the reader's hand instead of a clock —
 * and, if `dimFrom`/`dimTo` are set, recedes to `dimTo`'s opacity later on.
 *
 * Function transforms throughout, for the reason in `lib/scrub.ts`.
 */
export function ScrubReveal({
  progress,
  from,
  to,
  dimFrom,
  dimTo,
  dimOpacity = 0.35,
  blur = BLUR,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  dimFrom?: number
  dimTo?: number
  dimOpacity?: number
  blur?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  const opacity = useTransform(progress, (v) => {
    const shown = amount(v, from, to)
    if (dimFrom === undefined || dimTo === undefined) return shown
    return shown * (1 - (1 - dimOpacity) * amount(v, dimFrom, dimTo))
  })
  const filter = useTransform(progress, (v) => `blur(${(reduced ? 0 : (1 - amount(v, from, to)) * blur).toFixed(2)}px)`)
  return (
    <motion.div className={cn(className)} style={{ ...style, opacity, filter }}>
      {children}
    </motion.div>
  )
}
