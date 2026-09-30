import { useRef } from "react"
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"
import { useRange } from "./progress"
import { useAutoplay } from "./use-autoplay"

type ClipCardProps = {
  src: string
  poster?: string
  /** Side inset while it waits below the card before it, in % of its width. */
  insetX?: number
  /** Corner radius, px. */
  radius?: number
  /** Footage scale as it arrives; it settles to 1 at the centre. */
  zoom?: number
  /** Blur on the footage, px — the smeared, painterly backdrop. 0 for sharp. */
  blur?: number
  paused?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * A rounded video card that waits tucked under the one above it, narrowed by
 * a `clip-path` inset, and widens to full as it scrolls to the middle of the
 * screen while its footage eases back from a slight zoom. In a column of them
 * each card hands over to the next like a stack being dealt.
 */
export function ClipCard({
  src,
  poster,
  insetX = 7,
  radius = 48,
  zoom = 1.18,
  blur = 26,
  paused = false,
  className,
  children,
}: ClipCardProps) {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "center center"] })
  const ix = useRange(scrollYProgress, [0, 1], [insetX, 0])
  const clipPath = useMotionTemplate`inset(0% ${ix}% 0% ${ix}% round ${radius}px)`
  const scale = useRange(scrollYProgress, [0, 1], [zoom, 1])
  // The blur needs overscan, or its soft edge shows inside the corners.
  const overscan = blur > 0 ? 1.18 : 1
  const transform = useTransform(scale, (s) => `scale(${(s * overscan).toFixed(4)})`)

  useAutoplay(video, !paused)
  const still = reduce || designing

  return (
    <motion.div
      ref={root}
      className={cn("relative isolate overflow-hidden bg-sand", className)}
      style={{ clipPath: still ? `inset(0% 0% 0% 0% round ${radius}px)` : clipPath, borderRadius: radius }}
    >
      <motion.video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full object-cover"
        style={{
          filter: blur > 0 ? `blur(${blur}px) saturate(1.1)` : undefined,
          transform: still ? `scale(${overscan})` : transform,
        }}
      />
      {children}
    </motion.div>
  )
}
