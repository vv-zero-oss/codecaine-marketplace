import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useMediaQuery } from "@/components/motion/smooth-scroll"
import { cn } from "@/lib/utils"

/**
 * A card that sits at a slight angle and travels against the scroll by
 * `speed` px — pieces of a pinboard drifting at different depths. The angle
 * straightens as it passes the middle of the screen. Halved on phones.
 */
export function ParallaxCard({
  children,
  speed = 80,
  tilt = -3,
  className,
}: {
  children: ReactNode
  speed?: number
  tilt?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const small = useMediaQuery("(max-width: 767px)")
  const k = reduce ? 0 : small ? 0.5 : 1
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * k, -speed * k])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [tilt * k, tilt * 0.3 * k, tilt * k])
  return (
    <motion.div ref={ref} style={{ y, rotate }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
