import { useEffect, useMemo, useRef } from "react"
import { animate, motion, useReducedMotion, type AnimationPlaybackControls } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { VERTIPORTS, vertiport, type Vertiport } from "@/content/network"
import { cn } from "@/lib/utils"

/** The schematic is 160 × 100; pads are placed on it from their 0–100 map coordinates. */
const W = 160
const H = 100
export const padPoint = (v: Vertiport) => ({ x: 8 + v.x * 1.44, y: 6 + v.y * 0.88 })

/** A gentle arc between two pads, bowed to the left of the direction of travel. */
function arcPath(a: Vertiport, b: Vertiport) {
  const p = padPoint(a)
  const q = padPoint(b)
  const mx = (p.x + q.x) / 2
  const my = (p.y + q.y) / 2
  const dx = q.x - p.x
  const dy = q.y - p.y
  const len = Math.hypot(dx, dy) || 1
  const bow = Math.min(18, len * 0.28)
  const cx = mx + (dy / len) * bow
  const cy = my - (dx / len) * bow
  return `M${p.x} ${p.y} Q${cx} ${cy} ${q.x} ${q.y}`
}

const STREETS_X = Array.from({ length: 19 }, (_, i) => 8 + i * 8)
const STREETS_Y = Array.from({ length: 12 }, (_, i) => 4 + i * 8)

/**
 * The live network map: the city drawn as a schematic — coast, river, parks
 * and a faint street grid — with the six rooftop pads pulsing on it. Pick a
 * pad to leave from and one to land at; the route draws itself as an arc and
 * a small craft flies it.
 *
 * The flight is a Framer Motion `animate()` held in a ref for the
 * component's lifetime, so the editor can find and stop it. For reduced
 * motion and while designing, the craft is parked mid-route.
 */
export function NetworkMap({
  from,
  to,
  onPick,
  flightSeconds = 2.6,
  loop = true,
  pulse = true,
  showStreets = true,
  showNames = true,
  crop = false,
  className,
}: {
  from: string | null
  to: string | null
  onPick?: (id: string) => void
  /** How long the little craft takes to fly the drawn arc. */
  flightSeconds?: number
  /** Keep flying the route, with a pause at each landing. */
  loop?: boolean
  pulse?: boolean
  showStreets?: boolean
  showNames?: boolean
  /** Frame just the pads, bigger — for narrow screens. */
  crop?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!(reduced || designing)
  const pathRef = useRef<SVGPathElement>(null)
  const craftRef = useRef<SVGGElement>(null)
  const flight = useRef<AnimationPlaybackControls | null>(null)

  const a = from ? vertiport(from) : null
  const b = to ? vertiport(to) : null
  const d = useMemo(() => (a && b ? arcPath(a, b) : null), [a, b])

  useEffect(() => {
    const path = pathRef.current
    const craft = craftRef.current
    if (!path || !craft || !d) return
    const length = path.getTotalLength()
    const place = (t: number) => {
      const at = path.getPointAtLength(t * length)
      const ahead = path.getPointAtLength(Math.min(length, t * length + 0.6))
      const behind = path.getPointAtLength(Math.max(0, t * length - 0.6))
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI
      craft.setAttribute("transform", `translate(${at.x} ${at.y}) rotate(${angle})`)
    }
    if (still) {
      place(0.55)
      return
    }
    place(0)
    flight.current = animate(0, 1, {
      duration: flightSeconds,
      delay: 0.55,
      ease: [0.77, 0, 0.175, 1],
      repeat: loop ? Infinity : 0,
      repeatDelay: 1.6,
      onUpdate: place,
    })
    return () => {
      flight.current?.stop()
      flight.current = null
    }
  }, [d, still, flightSeconds, loop])

  return (
    <svg
      viewBox={crop ? "26 6 120 84" : `0 0 ${W} ${H}`}
      role="group"
      aria-label="Schematic map of the city with six rooftop vertiports"
      className={cn("block h-auto w-full select-none", className)}
    >
      {/* water: the coast on the west and the river running in from the north-east */}
      <path d="M0 50 C14 52 30 56 34 67 C38 78 29 90 33 100 L0 100 Z" fill="var(--color-sky-hover)" />
      <path
        d="M160 20 C134 24 120 38 104 46 C86 55 72 50 60 58 C48 66 41 72 34 75"
        fill="none"
        stroke="var(--color-sky-hover)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* parks */}
      <ellipse cx="117" cy="32" rx="9" ry="4.6" fill="var(--color-sky-press)" opacity="0.55" />
      <ellipse cx="68" cy="22" rx="6" ry="3.6" fill="var(--color-sky-press)" opacity="0.55" />
      <path d="M84 70 c6 -4 14 -2 15 3 c1 5 -8 8 -13 6 c-4 -1 -5 -6 -2 -9 Z" fill="var(--color-sky-press)" opacity="0.55" />
      {/* the stadium and the runways */}
      <ellipse cx="65.6" cy="81.7" rx="6" ry="3.6" fill="none" stroke="var(--color-on-sky-soft)" strokeOpacity="0.4" strokeWidth="0.5" />
      <g opacity="0.35" stroke="var(--color-on-sky-soft)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M120 80 L150 66" />
        <path d="M124 86 L152 73" />
      </g>

      {/* the street grid, and two avenues across it */}
      {showStreets && (
        <g stroke="var(--color-on-sky-soft)" strokeOpacity="0.16" strokeWidth="0.25">
          {STREETS_X.map((x) => (
            <line key={`x${x}`} x1={x} y1="0" x2={x} y2={H} />
          ))}
          {STREETS_Y.map((y) => (
            <line key={`y${y}`} x1="0" y1={y} x2={W} y2={y} />
          ))}
          <path d="M20 96 L150 8" strokeOpacity="0.3" strokeWidth="0.5" />
          <path d="M36 4 L156 92" strokeOpacity="0.3" strokeWidth="0.5" />
        </g>
      )}

      {/* the route */}
      {d && (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-page)" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="1 1.4" />
          <motion.path
            ref={pathRef}
            d={d}
            fill="none"
            stroke="var(--color-page)"
            strokeWidth="0.7"
            strokeLinecap="round"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          />
          <g ref={craftRef}>
            <Craft />
          </g>
        </g>
      )}

      {/* the pads */}
      {VERTIPORTS.map((v) => {
        const p = padPoint(v)
        const role = v.id === from ? "from" : v.id === to ? "to" : null
        const right = v.x < 75
        return (
          <g
            key={v.id}
            role="button"
            tabIndex={-1}
            aria-label={`${v.name} (${v.code})`}
            onClick={() => onPick?.(v.id)}
            className="cursor-pointer outline-none [&:hover_.pad-core]:opacity-100"
          >
            {/* a generous hit area */}
            <circle cx={p.x} cy={p.y} r="7" fill="transparent" />
            {pulse && !still && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="2.4"
                fill="none"
                stroke="var(--color-page)"
                strokeWidth="0.4"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: [0.23, 1, 0.32, 1], delay: (v.x % 7) * 0.18 }}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r="2.6"
              fill={role === "to" ? "var(--color-ember)" : role === "from" ? "var(--color-ink)" : "var(--color-sky)"}
              stroke="var(--color-page)"
              strokeWidth="0.8"
              className="transition-[fill] duration-200"
            />
            <circle className="pad-core opacity-80 transition-opacity duration-200" cx={p.x} cy={p.y} r="0.9" fill="var(--color-page)" />
            <text
              x={right ? p.x + 4.4 : p.x - 4.4}
              y={p.y + 1.2}
              textAnchor={right ? "start" : "end"}
              fill="var(--color-page)"
              style={{ font: `500 ${crop ? 4.2 : 3.4}px var(--font-mono)` }}
            >
              {v.code}
            </text>
            {showNames && (
              <text
                x={right ? p.x + 4.4 : p.x - 4.4}
                y={p.y + 5}
                textAnchor={right ? "start" : "end"}
                fill="var(--color-on-sky-soft)"
                className="hidden md:block"
                style={{ font: "500 2.6px var(--font-sans)" }}
              >
                {v.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/** The craft from above, nose along +x: fuselage, wing, tail and four rotor discs. */
function Craft() {
  return (
    <g fill="var(--color-page)">
      <ellipse cx="0" cy="0" rx="3.2" ry="0.9" />
      <rect x="-0.9" y="-4" width="1.3" height="8" rx="0.5" />
      <rect x="-3.4" y="-1.8" width="0.7" height="3.6" rx="0.3" />
      {[-3.4, -1.6, 1.6, 3.4].map((y) => (
        <circle key={y} cx="0.6" cy={y} r="0.85" fillOpacity="0.55" />
      ))}
    </g>
  )
}
