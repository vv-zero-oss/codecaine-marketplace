import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasAction } from "@canvas/react"
import { cn } from "@/lib/utils"

type Size = { w: number; h: number }

/** A rounded rectangle as an SVG path — `clip-path: path()` takes several at once. */
function roundedRect(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2))
  return (
    `M${x + rr},${y}H${x + w - rr}A${rr},${rr} 0 0 1 ${x + w},${y + rr}` +
    `V${y + h - rr}A${rr},${rr} 0 0 1 ${x + w - rr},${y + h}` +
    `H${x + rr}A${rr},${rr} 0 0 1 ${x},${y + h - rr}` +
    `V${y + rr}A${rr},${rr} 0 0 1 ${x + rr},${y}Z`
  )
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * A film pinned to the viewport that grows from a small card to the full
 * screen, holds, then parts into `panes` cards along gutters that open between
 * them — one video, clipped by one path of several rounded rectangles, so the
 * footage runs unbroken across the split.
 *
 * Everything is scroll-scrubbed; `length` is how long the pin lasts in
 * viewport heights. Under reduced motion it renders the finished split.
 */
export function VideoZoomSplit({
  src,
  poster,
  panes = 3,
  gutter = 16,
  margin = 16,
  radius = 20,
  startWidth = 0.34,
  startHeight = 0.46,
  zoom = 1.25,
  length = 3.4,
  overlay = "",
  top = 72,
  className,
  children,
}: {
  src: string
  poster?: string
  panes?: number
  /** Gap between the cards once split, in px. */
  gutter?: number
  /** Space round the cards once split, in px. */
  margin?: number
  radius?: number
  /** The frame's starting width and height, as a share of the viewport. */
  startWidth?: number
  startHeight?: number
  /** How far the footage is magnified at the start. */
  zoom?: number
  /** Pin length, in viewport heights. */
  length?: number
  /** A line shown over the footage while it fills the screen. */
  overlay?: string
  /** Room left above the split panels for a fixed header, in px. */
  top?: number
  className?: string
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [size, setSize] = useState<Size>({ w: 1280, h: 800 })
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The editor can jump straight to the split cards to style them.
  useCanvasAction("Show split cards", (next) => setEnded(next ?? !ended), { on: ended, group: "Valley" })

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const done = reduce || ended
  const rows = size.w < 640

  const clip = useTransform(scrollYProgress, (raw) => {
    const p = done ? 1 : raw
    const { w, h } = size
    // Phase one, 0 → 0.42: a small card grows to the whole screen.
    const g = ease(clamp01(p / 0.42))
    // Phase two, 0.55 → 0.85: the screen parts into panes.
    const s = ease(clamp01((p - 0.55) / 0.3))
    if (s <= 0) {
      const sw = rows ? Math.min(1, startWidth * 2.2) : startWidth
      const bw = lerp(w * sw, w, g)
      const bh = lerp(h * startHeight, h, g)
      return `path("${roundedRect((w - bw) / 2, (h - bh) / 2, bw, bh, lerp(radius, 0, g))}")`
    }
    const m = lerp(0, margin, s)
    const gap = lerp(0, gutter, s)
    const r = lerp(0, radius, s)
    const topGap = m + top * s
    const innerW = w - m * 2
    const innerH = h - topGap - m
    let d = ""
    for (let i = 0; i < panes; i++) {
      if (rows) {
        const ph = (innerH - gap * (panes - 1)) / panes
        d += roundedRect(m, topGap + i * (ph + gap), innerW, ph, r)
      } else {
        const pw = (innerW - gap * (panes - 1)) / panes
        d += roundedRect(m + i * (pw + gap), topGap, pw, innerH, r)
      }
    }
    return `path("${d}")`
  })

  const scale = useTransform(scrollYProgress, [0, 0.42], [zoom, 1])
  const overlayOpacity = useTransform(scrollYProgress, [0.36, 0.44, 0.5, 0.56], [0, 1, 1, 0])
  const cardsOpacity = useTransform(scrollYProgress, [0.74, 0.86], [0, 1])
  const cardsY = useTransform(scrollYProgress, [0.74, 0.86], [18, 0])

  return (
    <div ref={track} style={{ height: done ? "100svh" : `${length * 100}svh` }} className={cn("relative", className)} data-canvas-ignore>
      <div ref={stage} className="sticky top-0 h-svh overflow-hidden" data-canvas-ignore>
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-pine">
          <motion.video
            ref={video}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            style={{ scale: done ? 1 : scale }}
            className="size-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/0 to-ink/0" />
        </motion.div>
        {overlay && !done && (
          <Overlay text={overlay} opacity={overlayOpacity} />
        )}
        <motion.div
          style={{ opacity: done ? 1 : cardsOpacity, y: done ? 0 : cardsY, padding: margin, paddingTop: margin + top, gap: gutter }}
          className={cn("pointer-events-none absolute inset-0 grid", rows ? "grid-rows-3" : "grid-cols-3")}
          data-canvas-ignore
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

function Overlay({ text, opacity }: { text: string; opacity: MotionValue<number> }) {
  return (
    <motion.p
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 text-center font-serif text-display text-balance text-sheet italic"
    >
      {text}
    </motion.p>
  )
}
