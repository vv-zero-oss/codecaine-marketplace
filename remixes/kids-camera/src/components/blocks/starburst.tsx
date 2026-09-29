import type * as React from "react"

/** Twelve uneven points, filled with the night tone and outlined in paper, so
 *  it reads on both sides of the edge it sits across. */
function points() {
  const out: string[] = []
  const tips = [1, 0.82, 0.96, 0.78, 1, 0.86, 0.94, 0.8, 1, 0.84, 0.92, 0.8]
  const n = tips.length
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI * i) / n - Math.PI / 2
    const r = i % 2 === 0 ? 88 * tips[i / 2] : 44
    out.push(`${(90 + Math.cos(angle) * r).toFixed(1)},${(90 + Math.sin(angle) * r).toFixed(1)}`)
  }
  return out.join(" ")
}

const STAR = points()

export function Starburst(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 180 180" aria-hidden {...props}>
      <polygon points={STAR} fill="var(--night)" stroke="var(--paper)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
