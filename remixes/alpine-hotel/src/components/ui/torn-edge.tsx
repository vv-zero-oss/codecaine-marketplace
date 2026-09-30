import { useMemo } from "react"
import { cn } from "@/lib/utils"

/** A small deterministic random, so the tear is the same on every render. */
function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * The ragged top edge of the next sheet. Sits at the top of a section, in that
 * section's colour, and overlaps the one above so it looks torn off.
 */
export function TornEdge({
  tone = "pine",
  seed = 3,
  height = 22,
  flip = false,
  className,
}: {
  tone?: "pine" | "paper" | "paper-deep" | "sheet"
  seed?: number
  height?: number
  /** Tear along the bottom instead of the top. */
  flip?: boolean
  className?: string
}) {
  const d = useMemo(() => {
    const r = rand(seed)
    const pts: string[] = []
    let x = 0
    while (x < 1440) {
      const y = 4 + r() * 14 + (r() < 0.12 ? r() * 6 : 0)
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
      x += 4 + r() * 11
    }
    pts.push(`1440,${(6 + r() * 10).toFixed(1)}`)
    return `M0,24 L0,10 L${pts.join(" L")} L1440,24 Z`
  }, [seed])

  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      style={{ height }}
      className={cn(
        "pointer-events-none block w-full",
        flip && "rotate-180",
        tone === "pine" && "text-pine",
        tone === "paper" && "text-paper",
        tone === "paper-deep" && "text-paper-deep",
        tone === "sheet" && "text-sheet",
        className,
      )}
    >
      <path d={d} fill="currentColor" />
    </svg>
  )
}
