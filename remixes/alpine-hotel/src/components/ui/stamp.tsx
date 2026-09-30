import { useId } from "react"
import { cn } from "@/lib/utils"

/**
 * A round rubber stamp in signal red: a ring of text, a line through the
 * middle. The ink is broken up with a turbulence mask so it reads as pressed,
 * not drawn, and multiplied into the paper beneath it.
 */
export function Stamp({
  ring = "Hotel Arven · Zermatt · 1620 m · ",
  top = "Est.",
  middle = "1911",
  bottom = "Valais",
  rotate = -12,
  className,
}: {
  ring?: string
  top?: string
  middle?: string
  bottom?: string
  rotate?: number
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${ring.replace(/ · $/, "")}, ${top} ${middle}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn("text-signal mix-blend-multiply", className)}
    >
      <defs>
        <path id={`ring-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        <filter id={`ink-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.45" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#ink-${id})`} fill="currentColor" stroke="currentColor">
        <circle cx="100" cy="100" r="94" fill="none" strokeWidth="4" />
        <circle cx="100" cy="100" r="58" fill="none" strokeWidth="2" />
        <text fontFamily="var(--font-mono)" fontSize="14" stroke="none">
          <textPath href={`#ring-${id}`} textLength="458" lengthAdjust="spacing">{ring.toUpperCase()}</textPath>
        </text>
        <text x="100" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="3" stroke="none">
          {top.toUpperCase()}
        </text>
        <text x="100" y="116" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="34" fontStyle="italic" stroke="none">
          {middle}
        </text>
        <text x="100" y="134" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" stroke="none">
          {bottom.toUpperCase()}
        </text>
      </g>
    </svg>
  )
}
