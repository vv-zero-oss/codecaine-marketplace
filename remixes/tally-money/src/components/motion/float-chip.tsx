import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const TONES = {
  out: "text-coral-500",
  in: "text-leaf-500",
  due: "text-ink-900",
} as const

/**
 * A small payment toast that pops in beside the hero and then bobs.
 * `delay` is when it appears (s), `duration` the bob (s), `rise` how far it bobs (px).
 * Purpose: explanation: this is what Tally notices, as it happens.
 */
export function FloatChip({
  label,
  amount,
  tone = "out",
  icon: Glyph,
  delay = 2.2,
  duration = 6,
  rise = 8,
  className,
}: {
  label: string
  amount: string
  tone?: keyof typeof TONES
  icon: LucideIcon
  delay?: number
  duration?: number
  rise?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <motion.div
      className={cn("absolute z-20", className)}
      initial={still ? false : { opacity: 0, transform: "translateY(12px) scale(0.9)" }}
      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="flex items-center gap-2.5 rounded-2xl bg-white/95 py-2 pr-4 pl-2 shadow-lift ring-1 ring-ink-900/5 backdrop-blur"
        style={still ? undefined : { animation: `float-y ${duration}s ease-in-out ${delay}s infinite alternate`, ["--rise" as string]: `${rise}px` }}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-ink-50 text-ink-900">
          <Glyph className="size-4" />
        </span>
        <span className="text-left">
          <span className="block text-[11px] leading-tight font-semibold text-ink-400">{label}</span>
          <span className={cn("tabular block text-sm leading-tight font-extrabold", TONES[tone])}>{amount}</span>
        </span>
      </div>
    </motion.div>
  )
}
