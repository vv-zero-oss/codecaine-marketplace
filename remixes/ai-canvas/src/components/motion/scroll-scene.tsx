import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"

import { BLUR } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { cn } from "@/lib/utils"

/**
 * One screen of the story: its words centred, and — as it scrolls away — a
 * blur and a fade tied to the scroll, so every scene leaves the way the
 * reference's do, smeared rather than cut.
 *
 * `backdrop` is laid across the whole screen behind the words (the scattered
 * tiles, say) and leaves with them.
 */
export function ScrollScene({
  id,
  children,
  backdrop,
  exitBlur = BLUR,
  className,
}: {
  id?: string
  children: ReactNode
  backdrop?: ReactNode
  /** Blur, in px, the scene reaches as it leaves the top. */
  exitBlur?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["center center", "end start"] })
  const opacity = useScrub(scrollYProgress, [0, 0.7], [1, 0])
  const filter = useScrubBlur(scrollYProgress, [0, 0.7], [0, reduced ? 0 : exitBlur])
  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative flex min-h-scene items-center justify-center overflow-hidden px-gutter", className)}
    >
      {backdrop && (
        <motion.div className="absolute inset-0" style={{ opacity, filter }} data-canvas-ignore>
          {backdrop}
        </motion.div>
      )}
      <motion.div style={{ opacity, filter }} className="relative z-10 text-center">
        {children}
      </motion.div>
    </section>
  )
}
