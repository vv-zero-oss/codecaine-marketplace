import { useId } from "react"

import { coffeeById, seriesById, type SeriesId } from "@/content/coffees"
import { cn } from "@/lib/utils"

/** Panel colours per series, read from the tokens. */
const PANEL: Record<SeriesId, { fill: string; ink: string; art: string }> = {
  recess: { fill: "var(--color-recess)", ink: "var(--color-recess-ink)", art: "var(--color-ink)" },
  detour: { fill: "var(--color-detour)", ink: "var(--color-detour-ink)", art: "var(--color-paper)" },
  field: { fill: "var(--color-field)", ink: "var(--color-field-ink)", art: "var(--color-field-ink)" },
  latebell: { fill: "var(--color-latebell)", ink: "var(--color-latebell-ink)", art: "var(--color-latebell-ink)" },
}

/** Each series' line drawing on the bag's front panel. */
function Art({ series, color }: { series: SeriesId; color: string }) {
  const stroke = { stroke: color, strokeWidth: 2.2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (series === "recess")
    return (
      <g {...stroke}>
        <circle cx="120" cy="118" r="20" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={120 + Math.cos(a) * 27} y1={118 + Math.sin(a) * 27} x2={120 + Math.cos(a) * 36} y2={118 + Math.sin(a) * 36} />
        })}
        <path d="M58 172 C 84 150, 104 150, 124 166 S 168 182, 182 160" />
        <path d="M58 186 C 92 172, 140 176, 182 182" />
      </g>
    )
  if (series === "detour")
    return (
      <g {...stroke}>
        <path d="M70 188 C 70 160, 160 168, 160 142 S 96 126, 106 104 S 150 92, 150 80" strokeWidth={9} stroke={color} opacity={0.9} />
        <path d="M70 188 C 70 160, 160 168, 160 142 S 96 126, 106 104 S 150 92, 150 80" strokeWidth={1.6} stroke="var(--color-detour)" strokeDasharray="5 6" />
        <circle cx="166" cy="96" r="9" />
        <path d="M60 108 l 14 -18 l 14 18 z" />
      </g>
    )
  if (series === "field")
    return (
      <g {...stroke}>
        <path d="M54 170 L 94 110 L 114 136 L 136 98 L 186 170" />
        <path d="M126 112 l 10 -14 l 10 14" />
        <path d="M62 150 h 36 M 120 156 h 50 M 72 182 h 96" strokeDasharray="10 7" />
        <path d="M54 170 h 132" />
      </g>
    )
  return (
    <g {...stroke}>
      <path d="M136 90 a 30 30 0 1 0 22 50 a 24 24 0 1 1 -22 -50 z" fill={color} stroke="none" />
      {[
        [76, 104],
        [96, 150],
        [170, 168],
        [70, 176],
        [186, 116],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 5} v10 M${x - 5} ${y} h10`} strokeWidth={1.8} />
      ))}
      <path d="M56 186 C 90 174, 150 174, 184 186" />
    </g>
  )
}

/**
 * A stand-up coffee pouch, drawn and typeset live from the catalogue.
 *
 * Not a photograph: the front panel, the line drawing, the vertical brand
 * strip and every word on the label are SVG built from the coffee's record,
 * so a new coffee in `content/coffees.ts` arrives with its own bag, and the
 * subscription builder can change the label as the visitor picks. A soft
 * drop shadow sits it on the shelf; `tilt` leans it.
 */
export function CoffeeBag({
  coffeeId = "half-day-4",
  weight = "12 oz",
  tilt = 0,
  shadow = true,
  className,
}: {
  coffeeId?: string
  /** Printed in the corner of the label. */
  weight?: string
  /** Degrees; the bag leans about its base. */
  tilt?: number
  shadow?: boolean
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  const coffee = coffeeById[coffeeId] ?? coffeeById["half-day-4"]
  const series = seriesById[coffee.series]
  const panel = PANEL[coffee.series]
  const words = coffee.name.toUpperCase().split(" ")
  // Two lines at most: the longest names break before their last word.
  const lines = words.length > 2 ? [words.slice(0, -1).join(" "), words.at(-1)!] : coffee.name.length > 11 ? words : [coffee.name.toUpperCase()]

  return (
    <svg
      viewBox="0 0 240 340"
      role="img"
      aria-label={`${coffee.name}, ${series.name} — a ${weight} bag`}
      className={cn("block h-auto w-full origin-bottom select-none", shadow && "drop-shadow-[0_18px_22px_rgb(20_20_20/0.22)]", className)}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <defs>
        <linearGradient id={`${uid}-shade`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.08" stopColor="#000" stopOpacity="0.02" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.9" stopColor="#000" stopOpacity="0.03" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-bag`}>
          <path d="M28 22 L 212 22 L 216 300 Q 216 326 196 328 L 44 328 Q 24 326 24 300 Z" />
        </clipPath>
      </defs>

      {/* The pouch: crimped seal, white body, gusset at the foot */}
      <path d="M26 6 L 214 6 L 214 24 L 26 24 Z" fill="#f4f2ef" />
      <path
        d={`M26 6 ${Array.from({ length: 24 }, (_, i) => `L ${26 + (i + 0.5) * 7.83} ${i % 2 ? 6 : 3}`).join(" ")} L 214 6`}
        fill="#f4f2ef"
      />
      <g clipPath={`url(#${uid}-bag)`}>
        <rect x="0" y="0" width="240" height="340" fill="#fbfaf8" />
        {/* The front panel */}
        <rect x="46" y="58" width="166" height="170" fill={panel.fill} />
        <Art series={coffee.series} color={panel.art} />
        {/* Brand strip, running up the left edge */}
        <rect x="24" y="22" width="22" height="306" fill={panel.fill} />
        <text
          transform="translate(40 300) rotate(-90)"
          fontFamily="var(--font-display)"
          fontSize="19"
          letterSpacing="0.5"
          fill={panel.ink}
        >
          TRUANT COFFEE CO.
        </text>
        {/* Label */}
        <text x="58" y="50" fontFamily="var(--font-sans)" fontWeight="600" fontSize="7.4" letterSpacing="0.9" fill="var(--color-ink-2)">
          {series.name.toUpperCase()}
        </text>
        <text x="202" y="50" textAnchor="end" fontFamily="var(--font-sans)" fontWeight="500" fontSize="7.4" fill="var(--color-ink-3)">
          {weight.toUpperCase()}
        </text>
        {lines.map((line, i) => (
          <text key={i} x="56" y={260 + i * 26} fontFamily="var(--font-display)" fontSize="28" fill="var(--color-ink)">
            {line}
          </text>
        ))}
        <text x="58" y={lines.length > 1 ? 302 : 280} fontFamily="var(--font-sans)" fontSize="7.4" fontWeight="500" fill="var(--color-ink-2)">
          {coffee.country.toUpperCase()} · {coffee.process.toUpperCase()}
        </text>
        <text x="58" y={lines.length > 1 ? 314 : 292} fontFamily="var(--font-sans)" fontSize="7.4" fill="var(--color-ink-3)">
          {coffee.notes.join(" · ")}
        </text>
        {/* Degassing valve */}
        <circle cx="190" cy="36" r="6" fill="none" stroke="#d9d4ce" strokeWidth="1.4" />
        <circle cx="190" cy="36" r="2" fill="#d9d4ce" />
        {/* Paper shading */}
        <rect x="0" y="0" width="240" height="340" fill={`url(#${uid}-shade)`} />
        <rect x="0" y="22" width="240" height="20" fill={`url(#${uid}-top)`} />
      </g>
      <path d="M24 300 Q 24 326 44 328 L 196 328 Q 216 326 216 300" fill="none" stroke="#000" strokeOpacity="0.08" />
    </svg>
  )
}
