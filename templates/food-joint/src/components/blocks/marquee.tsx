import { useRef, type ReactNode } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

/**
 * A band that runs sideways for ever. Constant motion, so linear — but the
 * scroll pushes it: scroll faster and it hurries, scroll up and it turns
 * round, then it settles back to its own pace. That tie to the reader's hand
 * is the point of it; on its own it would only be movement.
 *
 * The content is rendered twice and the band wraps at half its width, so the
 * seam never shows. Reduced motion: it stands still.
 */
export function Marquee({
  children,
  speed = 40,
  direction = 1,
  className,
}: {
  children: ReactNode
  /** Pixels a second at rest. */
  speed?: number
  direction?: 1 | -1
  className?: string
}) {
  const reduced = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const offset = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const push = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const heading = useRef(direction)

  useAnimationFrame((_, delta) => {
    if (reduced || !track.current) return
    const half = track.current.scrollWidth / 2
    if (!half) return
    const p = push.get()
    if (p < -0.05) heading.current = (-direction) as 1 | -1
    else if (p > 0.05) heading.current = direction
    const step = heading.current * speed * (delta / 1000) * (1 + Math.abs(p))
    let next = offset.get() - step
    if (next <= -half) next += half
    if (next > 0) next -= half
    offset.set(next)
  })

  const transform = useTransform(offset, (x) => `translate3d(${x}px, 0, 0)`)
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div ref={track} className="flex w-max" style={{ transform }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
