import { useId } from "react"

import { cn } from "@/lib/utils"

const SHAPES = {
  tall: [
    [30, 112, 26],
    [70, 92, 42],
    [112, 70, 46],
    [150, 46, 44],
    [192, 66, 46],
    [232, 92, 36],
    [266, 110, 24],
  ],
  long: [
    [28, 112, 20],
    [62, 100, 32],
    [104, 84, 40],
    [150, 76, 44],
    [196, 86, 36],
    [236, 98, 30],
    [270, 110, 20],
  ],
  puff: [
    [70, 96, 40],
    [120, 70, 48],
    [170, 92, 36],
  ],
} as const

/**
 * A cumulus, drawn: overlapping circles on a flat base, lit paper-white
 * on top and cooling to sky-50 underneath, over a blurred blue shadow. Draws only — the
 * drift and parallax are applied by whoever places it.
 */
export function Cloud({ shape = "tall", className }: { shape?: keyof typeof SHAPES; className?: string }) {
  const circles = SHAPES[shape]
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 300 140" aria-hidden className={cn("w-64 overflow-visible", className)}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor="var(--color-raised)" />
          <stop offset="1" stopColor="var(--color-sky-50)" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <g fill="var(--color-sky-200)" opacity="0.55" filter={`url(#${id}-soft)`}>
        {circles.map(([x, y, r]) => (
          <circle key={`s${x}`} cx={x + 6} cy={y + 8} r={r} />
        ))}
        <rect x="14" y="112" width="276" height="26" rx="13" />
      </g>
      <g fill={`url(#${id}-fill)`}>
        {circles.map(([x, y, r]) => (
          <circle key={x} cx={x} cy={y} r={r} />
        ))}
        <rect x="8" y="104" width="276" height="26" rx="13" />
      </g>
    </svg>
  )
}
