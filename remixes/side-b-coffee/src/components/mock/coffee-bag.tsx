import { useId } from "react"

import type { LabelTone, Roast } from "@/content/products"
import { cn } from "@/lib/utils"

/** Fill and ink for each label colour, from the tokens. */
export const TONE: Record<LabelTone, { fill: string; ink: string }> = {
  honey: { fill: "var(--color-honey)", ink: "var(--color-ink)" },
  sky: { fill: "var(--color-sky)", ink: "var(--color-navy)" },
  moss: { fill: "var(--color-moss-soft)", ink: "var(--color-moss)" },
  lilac: { fill: "var(--color-lilac)", ink: "var(--color-navy)" },
  ember: { fill: "var(--color-ember)", ink: "var(--color-page)" },
  paper: { fill: "var(--color-navy)", ink: "var(--color-page)" },
}

/**
 * The Side B bag, drawn in SVG so every coffee gets its own: a navy
 * stand-up pouch with a crimped top and tin tie, a sun rising out of record
 * grooves, the wordmark, and a printed label carrying the coffee's name,
 * roast dots and tasting notes — all from props, so a new coffee is a new
 * bag without opening an illustration tool.
 */
export function CoffeeBag({
  name = "Side B Blend",
  notes = "Caramel · Orange peel · Milk chocolate",
  origin = "Colombia · Ethiopia",
  roast = "Medium",
  label = "honey",
  artwork = "cream",
  weight = "12 oz · 340 g",
  className,
}: {
  name?: string
  notes?: string
  origin?: string
  roast?: Roast
  label?: LabelTone
  /** colour of the sun-and-grooves print */
  artwork?: "cream" | "honey"
  weight?: string
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const art = artwork === "honey" ? "var(--color-honey)" : "var(--color-page)"
  const tone = TONE[label]
  const dots = roast === "Light" ? 1 : roast === "Medium" ? 2 : 3

  return (
    <svg viewBox="0 0 200 280" role="img" aria-label={`${name} — a bag of Side B coffee`} className={cn("h-auto w-full [filter:var(--drop-bag)]", className)}>
      <defs>
        <clipPath id={`bag-${id}`}>
          <path d="M24 30 L176 30 L184 256 Q184 270 170 270 L30 270 Q16 270 16 256 Z" />
        </clipPath>
        <linearGradient id={`sheen-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-white)" stopOpacity="0.16" />
          <stop offset="0.18" stopColor="var(--color-white)" stopOpacity="0" />
          <stop offset="0.82" stopColor="var(--color-cocoa)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-cocoa)" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* crimped top */}
      <path d="M26 10 Q26 6 30 6 L170 6 Q174 6 174 10 L176 32 L24 32 Z" fill="var(--color-navy)" />
      <g stroke={art} strokeOpacity="0.35" strokeWidth="1">
        {Array.from({ length: 30 }, (_, i) => (
          <line key={i} x1={31 + i * 4.6} x2={31 + i * 4.6} y1="10" y2="22" />
        ))}
      </g>

      {/* body */}
      <path d="M24 30 L176 30 L184 256 Q184 270 170 270 L30 270 Q16 270 16 256 Z" fill="var(--color-navy)" />

      <g clipPath={`url(#bag-${id})`}>
        {/* sun rays */}
        <g stroke={art} strokeWidth="5" strokeLinecap="round" opacity="0.92">
          {Array.from({ length: 18 }, (_, i) => {
            const a = Math.PI + (i / 17) * Math.PI
            return <line key={i} x1={100 + Math.cos(a) * 32} y1={96 + Math.sin(a) * 32} x2={100 + Math.cos(a) * 150} y2={96 + Math.sin(a) * 150} />
          })}
        </g>
        {/* the sun */}
        <circle cx="100" cy="96" r="24" fill={art} />
        <circle cx="100" cy="96" r="24" fill="none" stroke="var(--color-navy)" strokeWidth="2.5" strokeDasharray="1 5" />
        <circle cx="100" cy="96" r="5" fill="var(--color-navy)" />
        {/* record grooves rolling across the bag */}
        <g fill="none" stroke={art} strokeWidth="3.4">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M-10 ${118 + i * 8} C 50 ${104 + i * 8}, 120 ${140 + i * 8}, 210 ${114 + i * 8}`} />
          ))}
        </g>
        {/* lower field */}
        <path d={`M-10 158 C 50 144, 120 180, 210 154 L210 280 L-10 280 Z`} fill="var(--color-navy)" />
        <rect x="16" y="30" width="168" height="240" fill={`url(#sheen-${id})`} />
      </g>

      {/* tin tie */}
      <rect x="22" y="32" width="156" height="4" rx="1" fill="var(--color-honey)" opacity="0.9" />

      {/* wordmark */}
      <g fontFamily="var(--font-display)" fontWeight="700" textAnchor="middle" fill={art} stroke="var(--color-navy)" strokeWidth="5" paintOrder="stroke" strokeLinejoin="round">
        <text x="100" y="164" fontSize="34" letterSpacing="-0.8">side b</text>
        <text x="100" y="182" fontSize="15" letterSpacing="-0.2" strokeWidth="4">coffee roasters</text>
      </g>

      {/* label */}
      <g>
        <rect x="40" y="194" width="120" height="54" rx="3" fill={tone.fill} stroke="var(--color-page)" strokeOpacity="0.55" strokeWidth="1" />
        <text x="100" y="210" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="9" letterSpacing="0.8" fill={tone.ink}>
          {name.toUpperCase()}
        </text>
        <g fill={tone.ink}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={92 + i * 8} cy="218" r="2.2" opacity={i < dots ? 1 : 0.28} />
          ))}
        </g>
        <text x="100" y="231" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.4" letterSpacing="0.3" fill={tone.ink} opacity="0.9">
          {origin.toUpperCase()}
        </text>
        <text x="100" y="241" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" letterSpacing="0.2" fill={tone.ink} opacity="0.8">
          {notes.toUpperCase().slice(0, 42)}
        </text>
      </g>

      <text x="100" y="262" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" letterSpacing="0.8" fill={art} opacity="0.75">
        {weight.toUpperCase()} · ROASTED IN THE PLANT
      </text>
    </svg>
  )
}
