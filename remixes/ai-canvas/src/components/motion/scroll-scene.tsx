import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"

import { BLUR } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { cn } from "@/lib/utils"

/**
 * One screen of the story, pinned. The section is `length` screens tall and
 * its stage sticks to the viewport, so the words hold still in the centre
 * while the reader scrolls through them — then, over the last stretch, blur
 * and fade away, smeared rather than cut, before the next scene arrives.
 *
 * `backdrop` is laid across the whole stage behind the words (the scattered
 * tiles, say) and leaves with them.
 */
export function ScrollScene({
  id,
  children,
  backdrop,
  length = 1.6,
  exitBlur = BLUR,
  className,
}: {
  id?: string
  children: ReactNode
  backdrop?: ReactNode
  /** How many screens of scroll the scene holds for. */
  length?: number
  /** Blur, in px, the scene reaches as it leaves. */
  exitBlur?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // Pinned for `length - 1` screens, then scrolling off for the last one:
  // the exit runs from the end of the pin to half-way out.
  const pinned = (length - 1) / length
  const leave: [number, number] = [pinned * 0.85, pinned + (1 - pinned) * 0.5]
  const opacity = useScrub(scrollYProgress, leave, [1, 0])
  const filter = useScrubBlur(scrollYProgress, leave, [0, reduced ? 0 : exitBlur])
  return (
    <section ref={ref} id={id} className={cn("relative", className)} style={{ height: `${length * 100}svh` }}>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-gutter" data-canvas-ignore>
        {backdrop && (
          <motion.div className="absolute inset-0" style={{ opacity, filter }} data-canvas-ignore>
            {backdrop}
          </motion.div>
        )}
        <motion.div style={{ opacity, filter }} className="relative z-10 text-center">
          {children}
        </motion.div>
      </div>
    </section>
  )
}
