import { useEffect, useMemo, useRef } from "react"
import { animate, AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { PINS, RATES, SYMBOLS, type Currency, type Pin } from "@/content/home-end"
import { cn } from "@/lib/utils"

const SIZE = 400
const R = 176
const C = SIZE / 2
const RAD = Math.PI / 180

/** Continents, roughly: ellipses in latitude/longitude. Enough to read as a
 *  world at a glance, which is all a dot globe has to do. */
const LAND: [lat: number, lon: number, rLat: number, rLon: number][] = [
  [52, -105, 16, 30], [36, -95, 12, 22], [64, -150, 8, 18], [20, -100, 8, 9], [72, -42, 9, 18], [60, -75, 8, 12],
  [-12, -58, 18, 15], [-36, -66, 14, 7],
  [50, 12, 11, 20], [62, 18, 8, 12], [54, -3, 4, 3],
  [8, 20, 20, 20], [-18, 25, 16, 13], [24, 12, 9, 26],
  [52, 92, 16, 50], [34, 104, 13, 22], [22, 79, 10, 9], [12, 104, 8, 8], [36, 138, 6, 4], [27, 45, 9, 12], [-3, 115, 5, 15],
  [-25, 134, 10, 17],
]

function isLand(lat: number, lon: number) {
  return LAND.some(([la, lo, rla, rlo]) => {
    let d = lon - lo
    if (d > 180) d -= 360
    if (d < -180) d += 360
    return ((lat - la) / rla) ** 2 + (d / rlo) ** 2 <= 1
  })
}

/** Points spread evenly over a sphere (a Fibonacci lattice), kept where there is land. */
function landPoints(count: number) {
  const pts: [number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const lat = Math.asin(y) / RAD
    const lon = ((((i * golden) / RAD) % 360) + 360) % 360 - 180
    if (isLand(lat, lon)) pts.push([lat, lon])
  }
  return pts
}

/** Orthographic projection: screen x, y and how squarely the point faces us. */
function project(lat: number, lon: number, lon0: number, lat0: number) {
  const φ = lat * RAD
  const λ = (lon - lon0) * RAD
  const φ0 = lat0 * RAD
  const cosc = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ)
  const x = C + R * Math.cos(φ) * Math.sin(λ)
  const y = C - R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ))
  return { x, y, cosc }
}

function convert(pin: Pin, to: Currency | "local") {
  if (to === "local") return `${SYMBOLS[pin.currency]}${pin.amount.toLocaleString("en-US")}`
  const value = (pin.amount / RATES[pin.currency]) * RATES[to]
  const digits = to === "JPY" ? 0 : value < 100 ? 2 : 0
  return `${SYMBOLS[to]}${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`
}

/** One spend pin: a dot on the surface and its label card beside it. */
function GlobePin({ pin, currency, index, show, innerRef }: { pin: Pin; currency: Currency | "local"; index: number; show: boolean; innerRef: (el: HTMLDivElement | null) => void }) {
  const text = convert(pin, currency)
  return (
    <div ref={innerRef} className="pointer-events-none absolute top-0 left-0 will-change-transform" style={{ opacity: 0 }}>
      <motion.div
        initial={false}
        animate={show ? { opacity: 1, transform: "translateY(0px) scale(1)" } : { opacity: 0, transform: "translateY(6px) scale(0.96)" }}
        transition={{ duration: 0.45, delay: show ? 0.35 + index * 0.28 : 0, ease: [0.23, 1, 0.32, 1] }}
        className="flex -translate-y-1/2 items-center gap-1.5"
      >
        <span className="size-2.5 -translate-x-1/2 rounded-full border-2 border-raised bg-ink shadow-(--shadow-xs)" />
        <span className="flex items-center gap-2 rounded-(--radius-field) bg-raised py-1 pr-2.5 pl-1 shadow-(--shadow-float)">
          <span className="grid h-5 w-6 place-items-center rounded-[3px] bg-panel-deep font-mono text-[9px] text-ink-2">{pin.flag}</span>
          <span className="flex flex-col font-mono leading-tight uppercase">
            <span className="text-[10px] text-ink">{pin.city}</span>
            <span className="text-[8.5px] text-ink-3">{pin.tag}</span>
          </span>
          <span className="relative ml-1 min-w-[64px] overflow-hidden text-right font-mono text-[11px] text-ink tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={text}
                className="inline-block"
                initial={{ opacity: 0, transform: "translateY(8px)", filter: "blur(2px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-8px)", filter: "blur(2px)" }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                {text}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </motion.div>
    </div>
  )
}

/**
 * A slowly turning globe of dots with live spend pinned to the cities it
 * happened in. The turn is a Motion animation held in a ref, so the editor's
 * Motion switch can stop it; reduced motion holds it still.
 */
export function DotGlobe({
  speed = 9,
  dotSize = 2.6,
  paused = false,
  tilt = 22,
  density = 5200,
  startLongitude = -78,
  currency = "local",
  showPins = true,
  className,
}: {
  /** Degrees per second. */
  speed?: number
  dotSize?: number
  paused?: boolean
  /** How far the north pole leans toward the viewer, in degrees. */
  tilt?: number
  /** Lattice points before the land mask; more is finer. */
  density?: number
  startLongitude?: number
  currency?: Currency | "local"
  showPins?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || paused || designing
  const points = useMemo(() => landPoints(density), [density])
  const lon = useMotionValue(startLongitude)
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const front = useRef<SVGPathElement>(null)
  const back = useRef<SVGPathElement>(null)
  const pinEls = useRef<(HTMLDivElement | null)[]>([])
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { once: true, margin: "0px 0px -15% 0px" })

  useEffect(() => {
    const draw = (lon0: number) => {
      let f = ""
      let b = ""
      for (const [lat, lo] of points) {
        const p = project(lat, lo, lon0, tilt)
        if (p.cosc <= 0) continue
        const seg = `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h0`
        if (p.cosc > 0.28) f += seg
        else b += seg
      }
      front.current?.setAttribute("d", f)
      back.current?.setAttribute("d", b)
      PINS.forEach((pin, i) => {
        const el = pinEls.current[i]
        if (!el) return
        const p = project(pin.lat, pin.lon, lon0, tilt)
        const vis = Math.max(0, Math.min(1, (p.cosc - 0.12) / 0.25))
        el.style.transform = `translate(${(p.x / SIZE) * 100}cqw, ${(p.y / SIZE) * 100}cqw)`
        el.style.opacity = String(vis)
        el.style.zIndex = String(Math.round(p.cosc * 10))
      })
    }
    draw(lon.get())
    return lon.on("change", draw)
  }, [points, tilt, lon])

  useEffect(() => {
    if (still || speed <= 0) return
    const from = lon.get()
    controls.current = animate(lon, from + 360, { duration: 360 / speed, ease: "linear", repeat: Infinity })
    return () => {
      controls.current?.stop()
      controls.current = null
    }
  }, [still, speed, lon])

  return (
    <div ref={root} className={cn("relative aspect-square w-full [container-type:inline-size]", className)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="globe-shade" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="var(--color-raised)" />
            <stop offset="70%" stopColor="var(--color-panel)" />
            <stop offset="100%" stopColor="var(--color-panel-deep)" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R + 4} fill="url(#globe-shade)" />
        <path ref={back} stroke="var(--color-ink-4)" strokeWidth={dotSize * 0.85} strokeLinecap="round" fill="none" />
        <path ref={front} stroke="var(--color-ink-2)" strokeWidth={dotSize} strokeLinecap="round" fill="none" />
      </svg>
      {showPins &&
        PINS.map((pin, i) => (
          <GlobePin key={pin.city} pin={pin} index={i} currency={currency} show={inView || designing || !!reduced} innerRef={(el) => (pinEls.current[i] = el)} />
        ))}
    </div>
  )
}
