import type * as React from "react"
import { motion, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A striking header from somebody else's site — the thing the "recreate it"
 * scene copies. Big type over a drifting gradient, with a scroll effect: the
 * words split apart and the gradient tilts as the page scrolls. `scroll` is
 * that page's own scroll position (0–1), so the original and the copy can be
 * scrolled in step. `built` (0–1) reveals it layer by layer, for the copy.
 */
export function AuroraHeader({
  scroll,
  built = 1,
  className,
}: {
  scroll: MotionValue<number>
  built?: number
  className?: string
}) {
  const split = useTransform(scroll, [0, 1], [0, 46])
  const splitNeg = useTransform(split, (v) => -v)
  const tilt = useTransform(scroll, [0, 1], [0, 14])
  const fade = useTransform(scroll, [0, 1], [1, 0.4])
  const layer = (i: number): React.CSSProperties => ({
    opacity: built >= (i + 1) / 4 ? 1 : 0,
    transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1)",
  })
  return (
    <div className={cn("relative h-full overflow-hidden bg-art-bg text-art-cream", className)}>
      <motion.div
        className="absolute -inset-[20%] bg-[conic-gradient(from_200deg_at_50%_60%,var(--color-art-violet),var(--color-art-cyan),var(--color-art-coral),var(--color-art-amber),var(--color-art-violet))] opacity-70 blur-[40px] motion-safe:animate-[turn-flat_18s_linear_infinite]"
        style={{ rotate: tilt, ...layer(0) }}
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[6%] py-[4%] text-[clamp(8px,1.1vw,12px)]" style={layer(1)}>
        <span className="font-semibold tracking-[0.2em]">AURORA</span>
        <span className="flex gap-[1.6em] opacity-80">
          <span>Work</span>
          <span>Studio</span>
          <span>Contact</span>
        </span>
      </div>
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ opacity: fade }}>
        <motion.span className="block text-[clamp(22px,4.4vw,64px)] leading-[0.9] font-semibold tracking-[-0.05em]" style={{ y: splitNeg, ...layer(2) }}>
          Light, bent
        </motion.span>
        <motion.span className="block text-[clamp(22px,4.4vw,64px)] leading-[0.9] font-semibold tracking-[-0.05em] italic" style={{ y: split, ...layer(2) }}>
          into shape.
        </motion.span>
        <span className="mt-[5%] rounded-pill bg-art-cream px-[1.2em] py-[0.5em] text-[clamp(8px,1vw,12px)] font-medium text-art-bg" style={layer(3)}>
          See the work
        </span>
      </motion.div>
    </div>
  )
}
