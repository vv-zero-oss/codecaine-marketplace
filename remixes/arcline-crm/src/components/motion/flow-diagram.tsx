import type * as React from "react"
import {
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  FileSignature,
  Globe,
  Handshake,
  ListChecks,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Send,
  UserRound,
  Video,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The qualify figure: signals on the left, Arcline in the middle, deals and
 * next steps on the right, with light running along the wires between them.
 *
 * The wires carry a travelling dash (the `dash-travel` keyframes) and one
 * icon at a time on the right catches the light (`glint`) — both CSS, so the
 * editor's Motion switch stops and reduces them, and reduced motion leaves the
 * figure drawn and still. One SVG with a fixed viewBox, so it scales as a
 * picture on small screens.
 */

const SIGNALS: LucideIcon[] = [Mail, Phone, CalendarDays, MessageSquare, Globe, CreditCard, Video, Mic, UserRound]
const OUTCOMES: LucideIcon[] = [Briefcase, Handshake, CalendarCheck, Send, FileSignature, ListChecks]

const W = 1440
const H = 420
const CY = 210
const LEFT = { cx: 380, rx: 175, ry: 128 }
const RIGHT = { cx: 1060, rx: 175, ry: 128 }
const DIAMOND = { cx: 720, r: 88 }

const WIRES = [
  `M ${LEFT.cx + LEFT.rx} ${CY} L ${DIAMOND.cx - DIAMOND.r} ${CY}`,
  `M ${DIAMOND.cx + DIAMOND.r} ${CY} C 850 ${CY} 850 150 895 150 L 940 150`,
  `M ${DIAMOND.cx + DIAMOND.r} ${CY} L ${RIGHT.cx - RIGHT.rx} ${CY}`,
  `M ${DIAMOND.cx + DIAMOND.r} ${CY} C 850 ${CY} 850 270 895 270 L 940 270`,
]

export function FlowDiagram({
  speed = 2.6,
  paused = false,
  signalsLabel = "Signals",
  outcomesLabel = "Deals & next steps",
  className,
}: {
  /** Seconds for a dash to cross a wire. */
  speed?: number
  paused?: boolean
  signalsLabel?: string
  outcomesLabel?: string
  className?: string
}) {
  const play = { animationPlayState: paused ? "paused" : "running" } as const

  const dots: React.ReactNode[] = []
  let n = 0
  for (let row = -3; row <= 3; row++) {
    for (let col = -4; col <= 4; col++) {
      const x = LEFT.cx + col * 44 + (row % 2 ? 22 : 0)
      const y = CY + row * 38
      const Icon = SIGNALS[n++ % SIGNALS.length]
      dots.push(
        <g key={`${row}-${col}`}>
          <circle cx={x} cy={y} r={12} fill="var(--color-line)" stroke="var(--color-line-strong)" />
          <Icon x={x - 6} y={y - 6} width={12} height={12} stroke="var(--color-muted)" strokeWidth={2} />
        </g>,
      )
    }
  }

  const tiles: React.ReactNode[] = []
  let m = 0
  for (let row = -2; row <= 2; row++) {
    for (let col = -3; col <= 3; col++) {
      const x = RIGHT.cx + col * 56
      const y = CY + row * 48
      const Icon = OUTCOMES[m % OUTCOMES.length]
      tiles.push(
        <Icon
          key={`${row}-${col}`}
          x={x - 12}
          y={y - 12}
          width={24}
          height={24}
          stroke="var(--color-fg)"
          strokeWidth={1.25}
          className="animate-[glint_9s_linear_infinite] opacity-30 motion-reduce:animate-none"
          style={{ ...play, animationDelay: `${((m * 7) % 35) * 0.26}s` }}
        />,
      )
      m++
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${signalsLabel} flow through Arcline into ${outcomesLabel.toLowerCase()}`}
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <clipPath id="flow-left">
          <ellipse cx={LEFT.cx} cy={CY} rx={LEFT.rx} ry={LEFT.ry} />
        </clipPath>
        <clipPath id="flow-right">
          <ellipse cx={RIGHT.cx} cy={CY} rx={RIGHT.rx} ry={RIGHT.ry} />
        </clipPath>
        <linearGradient id="flow-dash" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-teal)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-teal)" />
        </linearGradient>
        <radialGradient id="flow-warm" cx="0.75" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-coral)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--color-coral)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={W} height={H} fill="url(#flow-warm)" />

      {/* The capsule around the whole flow */}
      <rect x={150} y={16} width={W - 300} height={H - 32} rx={(H - 32) / 2} stroke="var(--color-line-strong)" />

      {/* Signals */}
      <ellipse cx={LEFT.cx} cy={CY} rx={LEFT.rx} ry={LEFT.ry} stroke="var(--color-line-strong)" fill="var(--color-panel)" />
      <g clipPath="url(#flow-left)">{dots}</g>

      {/* Outcomes */}
      <ellipse cx={RIGHT.cx} cy={CY} rx={RIGHT.rx} ry={RIGHT.ry} stroke="color-mix(in oklab, var(--color-coral) 22%, var(--color-line-strong))" fill="var(--color-panel)" />
      <g clipPath="url(#flow-right)">{tiles}</g>

      {/* Wires, then the light running along them */}
      {WIRES.map((d) => (
        <path key={d} d={d} stroke="var(--color-line-strong)" />
      ))}
      {WIRES.map((d, i) => (
        <path
          key={`dash-${d}`}
          d={d}
          pathLength={100}
          stroke="url(#flow-dash)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="14 100"
          className="animate-[dash-travel_var(--flow-speed)_linear_infinite] motion-reduce:hidden"
          style={
            {
              ...play,
              "--flow-speed": `${speed}s`,
              "--dash-from": 14,
              "--dash-to": -100,
              animationDelay: `${i === 0 ? 0 : speed * 0.5 + i * 0.12}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Arcline */}
      <rect
        x={DIAMOND.cx - DIAMOND.r / Math.SQRT2}
        y={CY - DIAMOND.r / Math.SQRT2}
        width={DIAMOND.r * Math.SQRT2}
        height={DIAMOND.r * Math.SQRT2}
        transform={`rotate(45 ${DIAMOND.cx} ${CY})`}
        stroke="var(--color-line-button)"
        fill="var(--color-ink)"
      />
      <circle cx={DIAMOND.cx} cy={CY} r={16} stroke="var(--color-subtle)" />
      <circle cx={DIAMOND.cx} cy={CY} r={4} fill="var(--color-teal)" />

      <text x={LEFT.cx} y={CY + LEFT.ry + 44} textAnchor="middle" fill="var(--color-subtle)" fontSize={14} letterSpacing="0.08em" fontFamily="var(--font-mono)">
        {signalsLabel.toUpperCase()}
      </text>
      <text x={RIGHT.cx} y={CY + RIGHT.ry + 44} textAnchor="middle" fill="var(--color-fg)" fontSize={14} letterSpacing="0.08em" fontFamily="var(--font-mono)">
        {outcomesLabel.toUpperCase()}
      </text>
    </svg>
  )
}
