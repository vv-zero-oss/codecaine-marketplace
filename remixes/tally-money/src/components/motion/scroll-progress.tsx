import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"

/** A hairline across the top of the page that fills as you read down it. */
export function ScrollProgress({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  if (reduced) return null
  return (
    <motion.div
      aria-hidden="true"
      data-canvas-ignore
      className={className ?? "fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand-500 to-leaf-500"}
      style={{ scaleX }}
    />
  )
}
