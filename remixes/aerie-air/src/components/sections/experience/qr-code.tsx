import { useMemo } from "react"

import { cn } from "@/lib/utils"

/**
 * A boarding code drawn in SVG: three finder squares and a field of modules
 * seeded from `value`, so a different booking reference draws a different
 * code. Decorative — the reference is always printed beside it in text.
 */
export function QrCode({ value = "AER-0000", size = 25, className }: { value?: string; size?: number; className?: string }) {
  const path = useMemo(() => {
    let seed = 2166136261
    for (const ch of value) seed = Math.imul(seed ^ ch.charCodeAt(0), 16777619)
    const next = () => {
      seed ^= seed << 13
      seed ^= seed >>> 17
      seed ^= seed << 5
      return (seed >>> 0) / 4294967296
    }
    const inFinder = (x: number, y: number) =>
      (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)
    let d = ""
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (inFinder(x, y)) continue
        if (next() > 0.52) d += `M${x} ${y}h1v1h-1z`
      }
    }
    for (const [fx, fy] of [[0, 0], [size - 7, 0], [0, size - 7]]) {
      d += `M${fx} ${fy}h7v7h-7zM${fx + 1} ${fy + 1}v5h5v-5zM${fx + 2} ${fy + 2}h3v3h-3z`
    }
    return d
  }, [value, size])

  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className={cn("block", className)} role="img" aria-label={`Boarding code for ${value}`}>
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="var(--color-raised)" />
      <path d={path} fill="currentColor" fillRule="evenodd" shapeRendering="crispEdges" />
    </svg>
  )
}
