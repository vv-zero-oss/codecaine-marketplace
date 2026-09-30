import { cn } from "@/lib/utils"

/** Draws a pattern of `#` as squares on a unit grid. */
function PixelGrid({ rows, className, cell = 1, title }: { rows: string[]; className?: string; cell?: number; title?: string }) {
  const w = Math.max(...rows.map((r) => r.length))
  return (
    <svg viewBox={`0 0 ${w} ${rows.length}`} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {rows.flatMap((row, y) =>
        Array.from(row).map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x + (1 - cell) / 2} y={y + (1 - cell) / 2} width={cell} height={cell} fill="currentColor" /> : null,
        ),
      )}
    </svg>
  )
}

const CLOUD = ["..##.....", ".####.##.", "#########", "#########"]

/** The Cirrus mark: a cloud in nine squares' width. */
export function PixelMark({ className }: { className?: string }) {
  return <PixelGrid rows={CLOUD} cell={0.84} className={cn("h-[1.125rem] w-auto text-ink", className)} title="Cirrus" />
}

const FACES = {
  happy: ["#....#", "......", "#....#", ".####."],
  sad: ["#....#", "......", ".####.", "#....#"],
} as const

/** A face in eight squares: glad about one thing, hopeless at another. */
export function PixelFace({ mood = "happy", className }: { mood?: "happy" | "sad"; className?: string }) {
  return <PixelGrid rows={[...FACES[mood]]} className={cn("h-11 w-auto text-ink", className)} />
}

/** A step number in a notched navy tile. */
export function StepBadge({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        "notch notch-sm inline-flex size-[1.375rem] shrink-0 items-center justify-center bg-navy font-mono text-[0.5625rem] text-paper",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  )
}
