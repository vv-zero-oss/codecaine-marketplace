import { animate, motion, useMotionValue } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { scrollToTop } from "@/components/motion/smooth-scroll"
import { useMotionAllowed } from "@/components/motion/use-motion"
import { navigate, onNavigateRequest } from "@/lib/router"

/**
 * The page change: one fat blue brush stroke loops across the screen until
 * nothing else shows, the page swaps underneath, and the stroke pulls its tail
 * through and off the other end.
 *
 * Timing read off the stroke, frame by frame: about 0.9s to cover (slow
 * start, fast middle, slow finish — `ease-brush`), a beat of solid colour,
 * then about 0.7s to clear, tail first.
 */
const PATH =
  "M -420 120 C 300 -260, 1500 -180, 1800 260 C 2050 640, 1500 1180, 820 1110 C 180 1040, -160 700, 260 470 C 640 260, 1320 360, 1300 640 C 1280 880, 980 900, 820 820"

export function BrushTransition({
  color = "var(--color-blue)",
  cover = 0.9,
  hold = 0.12,
  reveal = 0.7,
  width = 640,
}: {
  color?: string
  /** Seconds the stroke takes to cover the screen. */
  cover?: number
  /** Seconds of solid colour while the page swaps. */
  hold?: number
  /** Seconds the stroke takes to clear. */
  reveal?: number
  /** Stroke width, in the 1600×1000 drawing's units. */
  width?: number
}) {
  const { allowed } = useMotionAllowed()
  const [visible, setVisible] = useState(false)
  const length = useMotionValue(0)
  const offset = useMotionValue(0)
  const fill = useMotionValue(0)
  const running = useRef(false)
  const controls = useRef<{ stop: () => void }[]>([])

  const play = useCallback(
    async (to?: string) => {
      if (running.current) return
      running.current = true
      setVisible(true)
      length.set(0)
      offset.set(0)
      fill.set(0)
      const ease = [0.7, 0, 0.3, 1] as const
      const drawing = animate(length, 1, { duration: cover, ease })
      const solid = animate(fill, 1, { duration: cover * 0.25, delay: cover * 0.8, ease: "linear" })
      controls.current = [drawing, solid]
      await Promise.all([drawing, solid])
      if (to) {
        navigate(to)
        if (!to.includes("#")) scrollToTop()
      }
      await new Promise((resolve) => setTimeout(resolve, hold * 1000))
      fill.set(0)
      const clearing = animate(offset, 1, { duration: reveal, ease })
      const shrinking = animate(length, 0, { duration: reveal, ease })
      controls.current = [clearing, shrinking]
      await Promise.all([clearing, shrinking])
      setVisible(false)
      running.current = false
    },
    [cover, hold, reveal, length, offset, fill],
  )

  useEffect(
    () =>
      onNavigateRequest((to) => {
        if (!allowed) return false
        void play(to)
        return true
      }),
    [allowed, play],
  )

  useEffect(() => () => controls.current.forEach((c) => c.stop()), [])

  useCanvasAction("Play page transition", () => void play(), { group: "Motion" })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ visibility: visible ? "visible" : "hidden", pointerEvents: visible ? "auto" : "none" }}
    >
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="size-full">
        <motion.rect x="-200" y="-200" width="2000" height="1400" fill={color} style={{ opacity: fill }} />
        <motion.path
          d={PATH}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          style={{ pathLength: length, pathOffset: offset }}
        />
      </svg>
    </div>
  )
}
