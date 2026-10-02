import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** A progress ring. The stroke eases to `value` (0–100) whenever it changes. */
export function Ring({
  value = 70,
  size = 64,
  stroke = 7,
  color = "var(--color-mint)",
  track = "color-mix(in oklab, currentColor 12%, transparent)",
  className,
  children,
}: {
  value?: number
  size?: number
  stroke?: number
  color?: string
  track?: string
  className?: string
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, value)) / 100)}
          style={{ transition: "stroke-dashoffset 800ms var(--ease-out)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
