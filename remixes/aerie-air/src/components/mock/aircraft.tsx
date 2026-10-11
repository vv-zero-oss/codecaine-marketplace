import { useId } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * Each tilting nacelle: its pivot, the length of its pod, and whether it
 * sits on the far side of the craft (drawn behind the body, in shade).
 */
const NACELLES = [
  { x: 318, y: 90, length: 74, far: true },
  { x: 556, y: 62, length: 58, far: true },
  { x: 214, y: 96, length: 82, far: false },
  { x: 576, y: 70, length: 62, far: false },
] as const

/**
 * The Aerie craft, side on — an original drawing, not a picture. A
 * teardrop cabin under a high wing, a wraparound canopy, a V-tail, and
 * four visible rotors on nacelles that tilt with `mode`: forward to
 * cruise, straight up to hover, turning on a 900ms ease-in-out the way a
 * tilt-rotor transitions. The blades spin in CSS, so the editor's Motion
 * switch stops them. Colours are tokens.
 */
export function AircraftSide({
  mode = "cruise",
  spinning = true,
  tone = "light",
  className,
}: {
  mode?: "hover" | "cruise"
  spinning?: boolean
  /** "light": a pale craft for dark or blue grounds; "dark" for cream. */
  tone?: "light" | "dark"
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!(reduced || designing)
  const angle = mode === "hover" ? 90 : 0
  const spin = spinning && !still

  const c =
    tone === "light"
      ? { body: "var(--color-raised)", lit: "#ffffff", shade: "var(--color-panel-deep)", deep: "var(--color-line-strong)", glass: "var(--color-ink)", stripe: "var(--color-sky)" }
      : { body: "var(--color-ink)", lit: "var(--color-ink-2)", shade: "var(--color-ink-2)", deep: "var(--color-ink-3)", glass: "var(--color-ink-3)", stripe: "var(--color-sky)" }

  return (
    <svg viewBox="0 0 640 250" role="img" aria-label={`The Aerie aircraft, rotors set to ${mode}`} className={cn("w-full overflow-visible", className)}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.lit} />
          <stop offset="0.55" stopColor={c.body} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.glass} stopOpacity="0.92" />
          <stop offset="1" stopColor={c.glass} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${id}-disc`}>
          <stop offset="0" stopColor={c.glass} stopOpacity="0.1" />
          <stop offset="0.75" stopColor={c.glass} stopOpacity="0.3" />
          <stop offset="1" stopColor={c.glass} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* far side, in shade */}
      <path d="M520 108 L548 60 L566 62 L548 112 Z" fill={c.deep} />
      {NACELLES.filter((n) => n.far).map((n) => (
        <Nacelle key={n.x} {...n} angle={angle} fill={c.deep} hub={c.glass} disc={`url(#${id}-disc)`} spin={spin} still={still} />
      ))}

      {/* fuselage */}
      <path
        d="M58 170 C58 142 92 120 150 111 C200 104 262 101 322 103 C404 105 478 109 560 106 C572 106 574 118 564 122 C504 138 424 162 334 180 C262 193 164 195 112 189 C78 185 58 180 58 170 Z"
        fill={`url(#${id}-body)`}
      />
      <path d="M108 182 C200 188 300 182 430 154" fill="none" stroke={c.stripe} strokeWidth="3" strokeLinecap="round" />
      {/* canopy, and the cabin window behind it */}
      <path d="M72 162 C78 140 110 122 160 116 L238 112 C254 112 260 124 252 136 L234 158 C228 166 220 170 208 170 L92 174 C78 174 70 170 72 162 Z" fill={`url(#${id}-glass)`} />
      <path d="M266 116 L318 115 C326 115 328 123 323 130 L307 150 C304 154 299 156 293 156 L256 157 C250 157 248 152 251 147 Z" fill={`url(#${id}-glass)`} />
      <path d="M104 140 C124 126 156 120 196 118" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <path d="M246 118 L232 168" stroke={c.shade} strokeWidth="2" />
      {/* V-tail, near fin */}
      <path d="M528 112 L566 66 L584 70 L556 118 Z" fill={`url(#${id}-body)`} />
      {/* wing on its pylon */}
      <path d="M262 103 L286 92 L300 92 L292 104 Z" fill={c.shade} />
      <path d="M178 98 C214 86 312 82 352 88 C358 92 354 98 346 98 L182 104 C174 104 172 100 178 98 Z" fill={`url(#${id}-body)`} />
      {/* gear */}
      <g stroke={c.glass} strokeWidth="5" strokeLinecap="round">
        <path d="M150 190 L144 214" />
        <path d="M372 172 L382 214" />
      </g>
      <circle cx="144" cy="219" r="8" fill={c.glass} />
      <circle cx="382" cy="219" r="8" fill={c.glass} />

      {/* near side */}
      {NACELLES.filter((n) => !n.far).map((n) => (
        <Nacelle key={n.x} {...n} angle={angle} fill={`url(#${id}-body)`} hub={c.glass} disc={`url(#${id}-disc)`} spin={spin} still={still} />
      ))}
    </svg>
  )
}

/**
 * A pod pointing forward from its pivot, its rotor on the nose. At 0° it
 * pulls forward (the disc seen edge-on, upright); at 90° it lifts (the
 * disc flat).
 */
function Nacelle({
  x,
  y,
  length,
  angle,
  fill,
  hub,
  disc,
  spin,
  still,
}: {
  x: number
  y: number
  length: number
  angle: number
  fill: string
  hub: string
  disc: string
  spin: boolean
  still: boolean
}) {
  const nose = x - length
  return (
    <motion.g
      initial={false}
      animate={{ rotate: angle }}
      transition={still ? { duration: 0 } : { duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
      style={{ originX: `${x}px`, originY: `${y}px`, transformBox: "view-box" }}
    >
      <rect x={nose} y={y - 9} width={length + 12} height="18" rx="9" fill={fill} />
      <path d={`M${nose + 2} ${y - 7} Q${nose - 12} ${y} ${nose + 2} ${y + 7} Z`} fill={hub} />
      <ellipse cx={nose - 8} cy={y} rx="6" ry="58" fill={disc} />
      <rect
        x={nose - 10}
        y={y - 56}
        width="4"
        height="112"
        rx="2"
        fill={hub}
        opacity="0.7"
        style={{ transformOrigin: `${nose - 8}px ${y}px`, transformBox: "view-box" }}
        className={spin ? "animate-[blade-y_0.16s_linear_infinite]" : undefined}
      />
    </motion.g>
  )
}
