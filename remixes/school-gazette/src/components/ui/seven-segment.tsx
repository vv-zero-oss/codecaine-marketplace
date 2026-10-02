import { cn } from "@/lib/utils"

/** Segments a–g, clockwise from the top, middle last. */
const DIGITS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
  " ": "",
}

/** Polygons for one 40×72 digit: each segment is a hexagon with pointed ends. */
const SEGMENTS: Record<string, string> = {
  a: "8,4 12,0 28,0 32,4 28,8 12,8",
  b: "34,6 38,10 38,32 34,36 30,32 30,10",
  c: "34,38 38,42 38,62 34,66 30,62 30,42",
  d: "8,68 12,64 28,64 32,68 28,72 12,72",
  e: "6,38 10,42 10,62 6,66 2,62 2,42",
  f: "6,6 10,10 10,32 6,36 2,32 2,10",
  g: "8,36 12,32 28,32 32,36 28,40 12,40",
}

function Digit({ char }: { char: string }) {
  const on = DIGITS[char] ?? ""
  return (
    <svg viewBox="0 0 40 72" className="h-full w-auto overflow-visible" aria-hidden>
      {Object.entries(SEGMENTS).map(([name, points]) => (
        <polygon
          key={name}
          points={points}
          style={{
            fill: "var(--led-glow)",
            opacity: on.includes(name) ? 1 : 0.1,
            filter: on.includes(name) ? "drop-shadow(1.5px 2.5px 0 rgb(0 0 0 / 0.75)) drop-shadow(0 0 3px var(--led-glow)) drop-shadow(0 0 9px var(--led-glow))" : "none",
            transition: "opacity 120ms var(--ease-out)",
          }}
        />
      ))}
    </svg>
  )
}

/**
 * A seven-segment readout. `value` is a string of digits, with `:` or `.` for a
 * colon or a point. Unlit segments stay faintly visible, the way they do behind
 * the glass of a real one. The glow colour is `--led-glow`, set by the nearest
 * `data-led` ancestor — amber, red or green.
 */
export function SevenSegment({
  value,
  height = 56,
  label,
  className,
}: {
  value: string
  /** px */
  height?: number
  /** read aloud instead of the segments */
  label?: string
  className?: string
}) {
  return (
    <span role="img" aria-label={label ?? value} className={cn("inline-flex items-center gap-[0.18em]", className)} style={{ height }}>
      {[...value].map((char, i) =>
        char === ":" ? (
          <span key={i} aria-hidden className="flex h-full w-3 flex-col items-center justify-center gap-4">
            <i className="block size-2 rounded-full bg-led shadow-led-glow" />
            <i className="block size-2 rounded-full bg-led shadow-led-glow" />
          </span>
        ) : char === "." ? (
          <span key={i} aria-hidden className="flex h-full w-2 items-end pb-0.5">
            <i className="block size-2 rounded-full bg-led shadow-led-glow" />
          </span>
        ) : (
          <span key={i} className="h-full" style={{ transform: "skewX(-6deg)" }}>
            <Digit char={char} />
          </span>
        ),
      )}
    </span>
  )
}
