import { motion, useReducedMotion } from "motion/react"

import { VERTIPORTS, vertiport } from "@/content/network"

/**
 * The network in miniature: six pads, and the line of the trip being
 * quoted drawing itself between two of them whenever the pair changes.
 */
export function RouteMini({ fromId = "midtown", toId = "airport", className }: { fromId?: string; toId?: string | null; className?: string }) {
  const reduced = useReducedMotion()
  const from = vertiport(fromId)
  const to = toId ? vertiport(toId) : null
  const Y = 0.56
  return (
    <svg viewBox="0 0 100 56" className={className} role="img" aria-label={to ? `Map: ${from.name} to ${to.name}` : `Map: leaving ${from.name}`}>
      <path d="M0 40 C 20 34, 34 44, 52 36 S 84 22, 100 28" fill="none" stroke="var(--color-haze)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {to && (
        <motion.line
          key={`${from.id}-${to.id}`}
          x1={from.x}
          y1={from.y * Y}
          x2={to.x}
          y2={to.y * Y}
          stroke="var(--color-sky)"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
      )}
      {VERTIPORTS.map((v) => {
        const on = v.id === from.id || v.id === to?.id
        return (
          <g key={v.id}>
            <circle cx={v.x} cy={v.y * Y} r={on ? 2 : 1.2} fill={on ? "var(--color-ink)" : "var(--color-ink-4)"} />
            {on && (
              <text x={v.x} y={v.y * Y - 3.4} textAnchor="middle" fontSize="3.4" fontWeight="600" fill="var(--color-ink)">
                {v.code}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
