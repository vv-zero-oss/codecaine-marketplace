import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const BANDS = [
  { className: "bg-navy", height: "h-[clamp(40px,7vw,92px)]", lag: 0 },
  { className: "bg-ember", height: "h-[clamp(28px,4.6vw,58px)]", lag: 0.08 },
  { className: "bg-peach", height: "h-[clamp(10px,1.4vw,18px)]", lag: 0.16 },
] as const

/**
 * The horizon that closes every page: navy, ember and peach bands that
 * sweep in from the left as the footer scrolls up, each a beat behind the
 * one above, their leading edges curved like the earth's.
 *
 * Scroll-scrubbed through Framer Motion, smoothed by a spring so it glides
 * rather than tracks the wheel. Shown complete while designing and for
 * reduced motion.
 */
export function HorizonStripes({ className, stiffness = 120 }: { className?: string; stiffness?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness, damping: 30, mass: 0.6 })
  const still = reduced || designing

  return (
    <div ref={ref} aria-hidden className={cn("relative flex flex-col", className)}>
      {BANDS.map((band) => (
        <Band key={band.className} progress={progress} still={!!still} lag={band.lag} className={cn(band.className, band.height)} />
      ))}
      <div className="h-[clamp(14px,2vw,24px)] bg-haze" />
    </div>
  )
}

function Band({ progress, lag, still, className }: { progress: ReturnType<typeof useSpring>; lag: number; still: boolean; className: string }) {
  const width = useTransform(progress, [lag, Math.min(1, 0.72 + lag)], ["8%", "100%"])
  return (
    <div className="relative">
      <motion.div style={still ? { width: "100%" } : { width }} className={cn("rounded-r-[50vw_100%]", className)} />
    </div>
  )
}
