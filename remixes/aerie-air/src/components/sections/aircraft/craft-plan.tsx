import { useEffect, useRef } from "react"
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/** The drawing's own units: the craft seen from above, nose up. */
export const PLAN_W = 600
export const PLAN_H = 560

/** The six rotors: four along the wing, two on the tail. */
export const ROTORS = [
  { id: 1, x: 112, y: 214, name: "Left outer" },
  { id: 2, x: 214, y: 206, name: "Left inner" },
  { id: 3, x: 386, y: 206, name: "Right inner" },
  { id: 4, x: 488, y: 214, name: "Right outer" },
  { id: 5, x: 206, y: 462, name: "Left tail" },
  { id: 6, x: 394, y: 462, name: "Right tail" },
] as const

const R = 46

export type PlanPart = "none" | "cabin" | "computer" | "battery" | "motors" | "parachute" | "gear"

const TONES = {
  light: { body: "var(--color-dusk-fg)", edge: "rgb(18 21 28 / 0.18)", glass: "var(--color-dusk-2)", rotor: "var(--color-dusk-fg)", xray: "var(--color-dusk-2)" },
  dark: { body: "var(--color-raised)", edge: "var(--color-ink)", glass: "var(--color-ink)", rotor: "var(--color-ink)", xray: "var(--color-ink-3)" },
} as const

/**
 * The Aerie craft from directly above — an original drawing whose six rotors
 * tilt and spin. Seen from the top, a rotor lifting straight up is a full
 * disc; tipped forward to cruise it closes to a thin line at the front of its
 * nacelle, so `tilt` (0 hover – 90 cruise) reads at a glance.
 *
 * `tilt` is a scalar for the editor; a scroll story can drive it frame by
 * frame through `tiltValue` instead. `failed` lists stopped rotors ("2,5"),
 * `emphasis` lights one system of the x-ray in sky blue.
 */
export function CraftPlan({
  tilt = 0,
  tiltValue,
  spin = true,
  spinSeconds = 0.32,
  tone = "light",
  failed = "",
  emphasis = "none",
  xray = false,
  className,
}: {
  tilt?: number
  tiltValue?: MotionValue<number>
  spin?: boolean
  /** Seconds per blade turn. */
  spinSeconds?: number
  tone?: "light" | "dark"
  /** Comma-separated rotor numbers (1–6) that have stopped. */
  failed?: string
  emphasis?: PlanPart
  /** Show the systems under the skin as faint outlines. */
  xray?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const own = useMotionValue(tilt)
  const t = tiltValue ?? own
  const still = !!(reduced || designing)

  useEffect(() => {
    if (tiltValue) return
    if (still) return own.set(tilt)
    const controls = animate(own, tilt, { duration: 0.9, ease: [0.77, 0, 0.175, 1] })
    return () => controls.stop()
  }, [tilt, tiltValue, still, own])

  const c = TONES[tone]
  const down = new Set(failed.split(",").map((s) => Number(s.trim())).filter(Boolean))
  const lit = (part: PlanPart) => (emphasis === part ? "var(--color-sky)" : undefined)
  const showX = xray || emphasis !== "none"

  return (
    <svg
      viewBox={`0 0 ${PLAN_W} ${PLAN_H}`}
      role="img"
      aria-label="The Aerie aircraft seen from above, with six tilting rotors"
      className={cn("w-full overflow-visible", className)}
    >
      {/* wing */}
      <path d="M70 236 Q70 228 80 228 L520 228 Q530 228 530 236 L534 262 Q534 270 524 270 L76 270 Q66 270 66 262 Z" fill={c.body} stroke={c.edge} strokeWidth="1.5" />
      {/* tail plane */}
      <path d="M188 476 L412 476 Q420 476 420 484 L420 494 Q420 500 412 500 L188 500 Q180 500 180 494 L180 484 Q180 476 188 476 Z" fill={c.body} stroke={c.edge} strokeWidth="1.5" />
      {/* nacelles */}
      {ROTORS.map((r) => (
        <rect
          key={r.id}
          x={r.x - 9}
          y={r.y - 8}
          width="18"
          height="58"
          rx="9"
          fill={lit("motors") ?? c.body}
          stroke={c.edge}
          strokeWidth="1.5"
          className="transition-[fill] duration-(--duration-swap)"
        />
      ))}
      {/* fuselage: a long teardrop, nose up */}
      <path
        d="M300 46 C326 46 338 90 338 150 L338 250 C338 330 326 420 312 512 Q300 524 288 512 C274 420 262 330 262 250 L262 150 C262 90 274 46 300 46 Z"
        fill={c.body}
        stroke={c.edge}
        strokeWidth="1.5"
      />
      {/* canopy */}
      <path
        d="M300 64 C318 64 326 96 326 136 L326 196 Q326 204 318 204 L282 204 Q274 204 274 196 L274 136 C274 96 282 64 300 64 Z"
        fill={lit("cabin") ?? c.glass}
        className="transition-[fill] duration-(--duration-swap)"
      />
      <path d="M288 86 C292 76 300 72 308 74" stroke="var(--color-dusk-fg)" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* x-ray: what sits under the skin */}
      {showX && (
        <g fill="none" strokeWidth="1.5" strokeDasharray="4 4">
          <rect x="288" y="214" width="24" height="16" rx="3" stroke={lit("computer") ?? c.xray} fill={lit("computer") ? "var(--color-sky)" : "none"} />
          <g stroke={lit("battery") ?? c.xray} fill={lit("battery") ? "var(--color-sky)" : "none"} fillOpacity="0.5">
            <rect x="276" y="282" width="48" height="22" rx="3" />
            <rect x="276" y="310" width="48" height="22" rx="3" />
            <rect x="150" y="238" width="40" height="22" rx="3" />
            <rect x="410" y="238" width="40" height="22" rx="3" />
          </g>
          <circle cx="300" cy="384" r="16" stroke={lit("parachute") ?? c.xray} fill={lit("parachute") ? "var(--color-sky)" : "none"} />
          <g stroke={lit("gear") ?? c.xray} fill={lit("gear") ? "var(--color-sky)" : "none"}>
            <rect x="294" y="98" width="12" height="20" rx="4" />
            <rect x="246" y="330" width="12" height="22" rx="4" />
            <rect x="342" y="330" width="12" height="22" rx="4" />
          </g>
        </g>
      )}

      {ROTORS.map((r) => (
        <Rotor
          key={r.id}
          x={r.x}
          y={r.y}
          tilt={t}
          color={lit("motors") ?? c.rotor}
          failed={down.has(r.id)}
          spinning={spin && !still && !down.has(r.id)}
          spinSeconds={spinSeconds}
          offset={r.id * 0.037}
        />
      ))}
    </svg>
  )
}

function Rotor({
  x,
  y,
  tilt,
  color,
  failed,
  spinning,
  spinSeconds,
  offset,
}: {
  x: number
  y: number
  tilt: MotionValue<number>
  color: string
  failed: boolean
  spinning: boolean
  spinSeconds: number
  offset: number
}) {
  // Forward is up: the disc slides to the nacelle's nose and closes to a line.
  // Written straight onto the SVG attribute, so a scroll story drives it
  // every frame without re-rendering.
  const ref = useRef<SVGGElement>(null)
  const place = (v: number) => {
    const k = Math.min(Math.max(v, 0), 90) / 90
    const squash = Math.max(0.07, Math.cos((k * Math.PI) / 2))
    return `translate(${x} ${(y - k * 20).toFixed(2)}) scale(1 ${squash.toFixed(3)})`
  }
  useMotionValueEvent(tilt, "change", (v) => ref.current?.setAttribute("transform", place(v)))
  useEffect(() => ref.current?.setAttribute("transform", place(tilt.get())))
  const stroke = failed ? "var(--color-ember)" : color

  return (
    <g ref={ref} transform={place(tilt.get())}>
      <circle r={R} fill={stroke} fillOpacity={failed ? 0.08 : 0.12} stroke={stroke} strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <g
        className={spinning ? "animate-spin-prop" : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: `${spinSeconds}s`, animationDelay: `-${offset}s` }}
      >
        <rect x={-R + 2} y={-3} width={(R - 2) * 2} height="6" rx="3" fill={stroke} opacity={failed ? 0.5 : 0.85} />
        <rect x={-3} y={-R + 2} width="6" height={(R - 2) * 2} rx="3" fill={stroke} opacity={failed ? 0.5 : 0.85} />
      </g>
      <circle r="6" fill={stroke} />
      {failed && (
        <g stroke="var(--color-ember)" strokeWidth="3" strokeLinecap="round">
          <path d="M-14 -14 L14 14" />
          <path d="M14 -14 L-14 14" />
        </g>
      )}
    </g>
  )
}
