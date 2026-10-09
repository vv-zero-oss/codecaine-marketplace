import { cn } from "@/lib/utils"

/** A decorative QR-style tile: three finder squares and a seeded field of modules. Not scannable. */
export function QrCode({ className }: { className?: string }) {
  const size = 21
  const cells: [number, number][] = []
  let seed = 7
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const finder = (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9)
      seed = (seed * 9301 + 49297) % 233280
      if (!finder && seed / 233280 > 0.52) cells.push([x, y])
    }
  }
  const finders = [[0, 0], [size - 7, 0], [0, size - 7]]
  return (
    <span className={cn("block rounded-lg bg-white p-1.5 shadow-card", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="block size-full" shapeRendering="crispEdges" aria-label="QR code to get the app" role="img">
        {cells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--color-ink-900)" />
        ))}
        {finders.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="7" height="7" fill="var(--color-ink-900)" />
            <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
            <rect x={x + 2} y={y + 2} width="3" height="3" fill="var(--color-ink-900)" />
          </g>
        ))}
      </svg>
    </span>
  )
}
