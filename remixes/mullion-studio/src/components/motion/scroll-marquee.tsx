import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * One line of oversize type that slides sideways as the page scrolls past it.
 * The text is repeated so the line never runs out. A soft spring on the scroll
 * keeps the glide smooth even under a flicked wheel.
 *
 * Every knob is a prop: `direction`, `outline`, `distance` (how far it travels
 * across the scroll, in % of its width), `smoothing` (the spring's stiffness —
 * lower is floatier) and `repeat`.
 */
export function ScrollMarquee({
  text = "Relight — Re-sky — Re-season — Regrade —",
  direction = "left",
  outline = false,
  distance = 30,
  smoothing = 120,
  repeat = 4,
  className,
}: {
  text?: string
  direction?: "left" | "right"
  outline?: boolean
  distance?: number
  smoothing?: number
  repeat?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: smoothing, damping: 30, mass: 0.4 })
  const sign = direction === "left" ? -1 : 1
  const from = sign === 1 ? -distance : 0
  const x = useTransform(smooth, (p) => `${from + sign * distance * p}%`)

  return (
    <div
      ref={ref}
      role="img"
      aria-label={text}
      className={cn(
        "overflow-hidden text-giant font-extrabold uppercase tracking-giant whitespace-nowrap",
        outline ? "text-transparent [-webkit-text-stroke:1.5px_var(--ink)]" : "text-ink",
        className,
      )}
    >
      <motion.div aria-hidden data-canvas-ignore style={{ x: reduced ? 0 : x }} className="flex w-max will-change-transform">
        {Array.from({ length: Math.max(1, repeat) }, (_, i) => (
          <span key={i} className="pr-[0.35em]">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
