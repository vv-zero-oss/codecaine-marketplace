import { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"
import { StageProgress, useRange } from "./progress"
import { useAutoplay } from "./use-autoplay"

type ClipZoomVideoProps = {
  src: string
  poster?: string
  /** "close": the frame starts full-bleed and closes in toward the centre while
   *  the footage pushes in (the hero). "open": it starts as a small rounded
   *  window and opens out as it arrives, the footage settling back (the CTA). */
  mode?: "close" | "open"
  /** Extra screen-heights the frame is held in place for while it plays. 0
   *  lets it scroll with the page. Halved on phones. */
  pin?: number
  /** Horizontal inset at the closed end, in % of the frame's width. */
  insetX?: number
  /** Vertical inset at the closed end, in % of the frame's height. */
  insetY?: number
  /** Corner radius at the closed end, in px. */
  radius?: number
  /** Corner radius at the open end, in px. */
  openRadius?: number
  /** Scale of the footage at the zoomed end. 1 turns the zoom off. */
  zoom?: number
  /** Darkens the footage so white type reads on it, 0–1. */
  scrim?: number
  paused?: boolean
  label?: string
  id?: string
  className?: string
  children?: React.ReactNode
}

/**
 * A video in a frame that a CSS `clip-path: inset(… round …)` closes toward
 * the centre (or opens from it) as the page scrolls, while the footage inside
 * zooms against it — the camera pushes in as the window narrows.
 *
 * Only `clip-path` and `transform` move, so it stays on the compositor. With
 * reduced motion the frame sits at its open state and the footage is still.
 */
export function ClipZoomVideo({
  src,
  poster,
  mode = "close",
  pin = 1,
  insetX = 7,
  insetY = 9,
  radius = 40,
  openRadius = 0,
  zoom = 1.3,
  scrim = 0.28,
  paused = false,
  label,
  id,
  className,
  children,
}: ClipZoomVideoProps) {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()

  const pinned = pin > 0
  const { scrollYProgress } = useScroll({
    target: root,
    offset: pinned ? ["start start", "end end"] : ["start end", "center center"],
  })
  // 0 is open and full size; 1 is closed in to the centre.
  const closed = useRange(scrollYProgress, [0, 1], mode === "close" ? [0, 1] : [1, 0])
  const ix = useRange(closed, [0, 1], [0, insetX])
  const iy = useRange(closed, [0, 1], [0, insetY])
  const r = useRange(closed, [0, 1], [openRadius, radius])
  const clipPath = useMotionTemplate`inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`
  const scale = useRange(closed, [0, 1], [1, zoom])
  const transform = useMotionTemplate`scale(${scale})`

  useAutoplay(video, !paused)
  const still = reduce || designing

  return (
    <StageProgress.Provider value={scrollYProgress}>
      <section
        ref={root}
        id={id}
        aria-label={label}
        style={pinned ? ({ "--pin": pin } as React.CSSProperties) : undefined}
        className={cn(
          "relative",
          pinned && "h-[calc(100svh+var(--pin)*50svh)] sm:h-[calc(100svh+var(--pin)*100svh)]",
          className,
        )}
      >
        <div
          data-canvas-ignore
          className={cn(pinned ? "sticky top-0 h-svh" : "relative h-full")}
        >
          <motion.div
            className="relative h-full w-full overflow-hidden bg-ink will-change-[clip-path]"
            style={{
              clipPath: reduce ? `inset(0% 0% 0% 0% round ${openRadius}px)` : clipPath,
            }}
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
              className="absolute inset-0 size-full object-cover"
              style={{ transform: still ? "none" : transform }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: `rgb(20 14 10 / ${scrim})` }}
            />
            {children}
          </motion.div>
        </div>
      </section>
    </StageProgress.Provider>
  )
}
