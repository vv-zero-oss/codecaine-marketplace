import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { duration, ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * The page change: the old page blurs out where it stands, the view jumps to
 * the top, and the new page comes into focus.
 *
 * Measured off the reference frame by frame: roughly a quarter second out,
 * half a second in, with a strong ease-out, and blur rather than movement
 * doing the work. `blur` and `rise` are the knobs; reduced motion keeps only
 * the fade.
 */
export function PageTransition({
  pageKey,
  blur = 10,
  rise = 0,
  onExitComplete,
  className,
  children,
}: {
  pageKey: string
  /** How soft the page is at the start of the fade, in px. */
  blur?: number
  /** How far the new page rises as it arrives, in px. */
  rise?: number
  onExitComplete?: () => void
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const b = reduce ? 0 : blur
  const y = reduce ? 0 : rise
  return (
    <AnimatePresence mode="wait" initial onExitComplete={onExitComplete}>
      <motion.div
        key={pageKey}
        className={cn(className)}
        data-canvas-ignore
        initial={{ opacity: 0, filter: `blur(${b}px)`, y }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: duration("page", 520), ease: ease("out") },
          // Leave no filter behind once in: a filtered ancestor becomes the
          // containing block for anything `fixed` inside it.
          transitionEnd: { filter: "none" },
        }}
        exit={{
          opacity: 0,
          filter: `blur(${b}px)`,
          transition: { duration: duration("page-exit", 240), ease: ease("exit") },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
