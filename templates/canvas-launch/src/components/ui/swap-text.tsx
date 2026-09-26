import type * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { EASE_SWAP, SWAP_BLUR, SWAP_DURATION, SWAP_LIFT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A headline that changes by blurring through itself — the reference's one
 * text transition, used by every scene. Old and new overlap (`popLayout`), the
 * old line lifting and blurring out while the new one sharpens in from below,
 * so the eye reads one line becoming another rather than two lines trading
 * places. Reduced motion keeps the crossfade and drops the movement and blur.
 */
export function SwapText({
  id,
  children,
  as = "h2",
  className,
  delay = 0,
}: {
  id: string | number
  children: React.ReactNode
  as?: "h1" | "h2" | "p"
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, filter: `blur(${SWAP_BLUR}px)`, transform: `translateY(${SWAP_LIFT}px)` }
  const gone = reduce
    ? { opacity: 0 }
    : { opacity: 0, filter: `blur(${SWAP_BLUR}px)`, transform: `translateY(-${SWAP_LIFT}px)` }
  return (
    <div className={cn("relative grid", className)}>
      <AnimatePresence mode="popLayout">
        <Tag
          key={id}
          className="display [grid-area:1/1]"
          initial={hidden}
          animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
          exit={gone}
          transition={{ duration: SWAP_DURATION, ease: EASE_SWAP, delay }}
        >
          {children}
        </Tag>
      </AnimatePresence>
    </div>
  )
}
