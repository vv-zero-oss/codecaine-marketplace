import { cn } from "@/lib/utils"

/**
 * The name set as wide as the page allows — an SVG line fitted to its box,
 * so it spans edge to edge at any width — and cropped at the foot by
 * `crop` (0–0.4 of its height), the way a poster runs off the sheet.
 */
export function GiantWordmark({ text = "Tidemark", crop = 0.24, className }: { text?: string; crop?: number; className?: string }) {
  const h = 200
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <svg viewBox={`0 0 1000 ${h * (1 - crop)}`} className="block h-auto w-full" preserveAspectRatio="xMidYMin meet">
        <text
          x="0"
          y={h * 0.86}
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className="fill-current"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "125%", fontVariationSettings: '"wdth" 125', fontSize: h * 1.06, textTransform: "uppercase" }}
        >
          {text.toUpperCase()}
        </text>
      </svg>
    </div>
  )
}
