import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A hand-drawn paper plane with a lilac trail, flying in from the bottom
 * right as the page loads and drifting up and away as it scrolls.
 *
 * Entrance measured off the reference: in by ~0.6s from a 0.1s start, an
 * ease-out with no overshoot.
 */
export function PaperPlane({
  delay = 0.1,
  duration = 0.6,
  drift = 120,
  className,
}: {
  delay?: number
  duration?: number
  /** Pixels it climbs over the first screen of scroll. */
  drift?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, still ? 0 : -drift])
  const x = useTransform(scrollY, [0, 900], [0, still ? 0 : drift * 0.6])

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn("pointer-events-none", className)} aria-hidden>
      <motion.svg
        viewBox="0 0 320 260"
        className="h-auto w-full overflow-visible"
        initial={still ? false : { opacity: 0, x: 80, y: 90 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="plane-trail" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-lilac)" stopOpacity="0" />
            <stop offset="0.55" stopColor="var(--color-lilac)" stopOpacity="0.85" />
            <stop offset="1" stopColor="#8f74d6" />
          </linearGradient>
        </defs>
        {/* The trail: a wide lilac ribbon with pencil speed-lines over it */}
        <path d="M-40 250 C 60 220, 120 190, 186 150 L 206 176 C 140 206, 70 238, -30 262 Z" fill="url(#plane-trail)" />
        <g stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M40 236 C 90 220, 130 200, 168 176" />
          <path d="M70 244 C 110 230, 150 212, 184 190" />
          <path d="M20 226 C 70 210, 110 192, 150 166" strokeDasharray="4 7" />
        </g>
        {/* The plane: folded sheet, drawn in ink on white */}
        <g stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M160 150 L 300 40 L 238 196 Z" fill="#fff" />
          <path d="M160 150 L 300 40 L 206 172 Z" fill="#f4f2f0" />
          <path d="M206 172 L 214 206 L 238 196" fill="#fff" />
          <path d="M206 172 L 300 40" />
          <path d="M226 132 l 18 -14 M 240 150 l 16 -12 M 252 170 l 12 -10" strokeWidth="1.3" />
        </g>
        {/* A few loose motion strokes ahead of the nose */}
        <g stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M306 20 l 10 -10" />
          <path d="M290 16 l 4 -12" />
          <path d="M316 38 l 12 -4" />
        </g>
      </motion.svg>
    </motion.div>
  )
}
