import { motion, useReducedMotion } from "motion/react"

import { ORIGINS } from "@/content/origins"
import { cn } from "@/lib/utils"

const W = 720
const H = 360
/** Equirectangular: longitude −115…115 across, latitude 60…−40 down — the
 *  slice of the world between the roastery and the farthest farm. */
const x = (lon: number) => ((lon + 115) / 230) * W
const y = (lat: number) => ((60 - lat) / 100) * H
const HOME = { lat: 46.79, lon: -92.1 }

/**
 * The coffee belt, drawn: the band between the tropics where coffee grows,
 * a pin for every farm we buy from and a dashed route from each to the
 * roastery on Lake Superior. `active` lights one origin — its pin pulses
 * and its route inks itself in — which is what the field notes' chapters
 * drive as you scroll.
 */
export function OriginMap({ active = "colombia", className }: { active?: string; className?: string }) {
  const reduced = useReducedMotion()
  const hx = x(HOME.lon)
  const hy = y(HOME.lat)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("block h-auto w-full", className)} role="img" aria-label="Map of the coffee belt with each origin we buy from and its route to the roastery">
      <defs>
        <pattern id="belt-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="var(--color-night-fg)" opacity="0.16" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#belt-dots)" />
      {/* The belt */}
      <rect x="0" y={y(23.4)} width={W} height={y(-23.4) - y(23.4)} fill="var(--color-recess)" opacity="0.1" />
      {[23.4, 0, -23.4].map((lat) => (
        <g key={lat}>
          <line x1="0" x2={W} y1={y(lat)} y2={y(lat)} stroke="var(--color-night-fg)" strokeOpacity={lat === 0 ? 0.28 : 0.16} strokeDasharray={lat === 0 ? "0" : "3 5"} />
          <text x="8" y={y(lat) - 5} fontSize="10" fill="var(--color-night-muted)" fontFamily="var(--font-sans)">
            {lat === 0 ? "EQUATOR" : lat > 0 ? "TROPIC OF CANCER" : "TROPIC OF CAPRICORN"}
          </text>
        </g>
      ))}
      {/* Routes */}
      {ORIGINS.map((o) => {
        const ox = x(o.lon)
        const oy = y(o.lat)
        const mx = (ox + hx) / 2
        const my = Math.min(oy, hy) - 60
        const d = `M${ox} ${oy} Q ${mx} ${my} ${hx} ${hy}`
        const on = o.id === active
        return (
          <g key={o.id}>
            <path d={d} fill="none" stroke="var(--color-night-fg)" strokeOpacity="0.14" strokeDasharray="3 4" />
            {on && <motion.path key={`route-${o.id}`} d={d} fill="none" stroke="var(--color-recess)" strokeWidth="1.8" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }} />}
          </g>
        )
      })}
      {/* Pins */}
      {ORIGINS.map((o) => {
        const on = o.id === active
        return (
          <g key={o.id} transform={`translate(${x(o.lon)} ${y(o.lat)})`}>
            {on && !reduced && <motion.circle r="6" fill="none" stroke="var(--color-recess)" initial={{ r: 5, opacity: 0.9 }} animate={{ r: 18, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />}
            <circle r={on ? 5.5 : 3.5} fill={on ? "var(--color-recess)" : "var(--color-night-fg)"} style={{ transition: "r 300ms" }} />
            <text y={on ? -12 : -9} textAnchor="middle" fontFamily="var(--font-display)" fontSize={on ? 16 : 12} fill={on ? "var(--color-recess)" : "var(--color-night-muted)"}>
              {o.country.toUpperCase()}
            </text>
          </g>
        )
      })}
      <g transform={`translate(${hx} ${hy})`}>
        <rect x="-5" y="-5" width="10" height="10" fill="var(--color-tomato)" />
        <text x="10" y="4" fontFamily="var(--font-display)" fontSize="14" fill="var(--color-night-fg)">
          THE ROASTERY · DULUTH
        </text>
      </g>
    </svg>
  )
}
