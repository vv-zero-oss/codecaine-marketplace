import { useMemo } from "react"

import { rng } from "@/lib/rng"
import { cn } from "@/lib/utils"

/** A QR-ish block of pixels, from a seed — the boarding-pass barcode, in 1-bit. */
export function PixelCode({ seed = "pixelkeep", cols = 8, rows = 34, className }: { seed?: string; cols?: number; rows?: number; className?: string }) {
  const d = useMemo(() => {
    const r = rng(seed)
    let path = ""
    for (let y = 0; y < rows; y++) {
      // Every sixth row is a solid guide stripe, the rest is noise.
      const stripe = y % 6 < 1
      let x = 0
      while (x < cols) {
        const on = stripe ? true : r.chance(0.52)
        let end = x
        while (end < cols && (stripe ? true : r.chance(0.52) === on) && end - x < 4) end++
        if (end === x) end = x + 1
        if (on) path += `M${x} ${y}h${end - x}v1h-${end - x}z`
        x = end
      }
    }
    return path
  }, [seed, cols, rows])
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} shapeRendering="crispEdges" preserveAspectRatio="none" aria-hidden className={cn("fill-fg/80", className)}>
      <path d={d} />
    </svg>
  )
}
