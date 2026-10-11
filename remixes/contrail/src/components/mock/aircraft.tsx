import { cn } from "@/lib/utils"

/**
 * A narrow-body airliner in side view, drawn as line work with a white body —
 * no livery, so it can stand for any carrier. The windows are generated so
 * the row stays even at any size.
 */
export function Aircraft({ className, accent = "var(--color-violet)" }: { className?: string; accent?: string }) {
  const windows = Array.from({ length: 30 }, (_, i) => 108 + i * 9.4)
  return (
    <svg viewBox="0 0 480 140" className={cn("w-full", className)} role="img" aria-label="Side view of a narrow-body airliner">
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f1f1f5" />
          <stop offset="1" stopColor="#d9d9e2" />
        </linearGradient>
      </defs>
      {/* tail fin */}
      <path d="M392 72 L430 8 L452 8 L440 72 Z" fill="url(#hull)" stroke="#bdbdca" strokeWidth={0.8} />
      <path d="M418 30 L432 8 L452 8 L446 30 Z" fill={accent} opacity={0.9} />
      {/* fuselage */}
      <path d="M20 84 C 22 70 40 62 70 62 L 400 62 C 430 62 455 70 468 78 L 470 82 C 455 92 420 98 400 98 L 70 98 C 40 98 20 94 20 84 Z" fill="url(#hull)" stroke="#bdbdca" strokeWidth={0.8} />
      {/* cheatline */}
      <path d="M40 90 L 440 86" stroke={accent} strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
      {/* cockpit */}
      <path d="M34 72 L 52 68 L 54 74 L 36 77 Z" fill="#2b2b38" />
      {/* doors */}
      <rect x={78} y={67} width={8} height={18} rx={2} fill="none" stroke="#bdbdca" />
      <rect x={380} y={67} width={8} height={18} rx={2} fill="none" stroke="#bdbdca" />
      {windows.map((x) => (
        <rect key={x} x={x} y={72} width={4.2} height={6} rx={2} fill="#3a3a4a" />
      ))}
      {/* wing and engine */}
      <path d="M190 90 L 300 92 L 250 124 L 232 124 Z" fill="#e6e6ee" stroke="#bdbdca" strokeWidth={0.8} />
      <rect x={196} y={98} width={58} height={20} rx={10} fill="#f4f4f8" stroke="#bdbdca" strokeWidth={0.8} />
      <rect x={196} y={98} width={12} height={20} rx={6} fill="#2b2b38" />
      {/* horizontal stabiliser */}
      <path d="M420 80 L 470 74 L 474 78 L 432 86 Z" fill="#e6e6ee" stroke="#bdbdca" strokeWidth={0.8} />
      {/* gear */}
      <path d="M96 98 V 120 M 246 104 V 124" stroke="#6b6b76" strokeWidth={2} />
      <circle cx={96} cy={124} r={5} fill="#2b2b38" />
      <circle cx={246} cy={128} r={6} fill="#2b2b38" />
    </svg>
  )
}

/** Hand-drawn-looking terrain lines: a stack of offset waves, fading out. */
export function ContourLines({ className, color = "var(--color-violet-bright)" }: { className?: string; color?: string }) {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const y = 40 + i * 9
    const a = 18 + (i % 5) * 4
    return `M -10 ${y} C 80 ${y - a} 140 ${y + a * 0.6} 220 ${y - a * 0.4} S 380 ${y + a} 470 ${y - a * 0.3}`
  })
  return (
    <svg viewBox="0 0 460 260" preserveAspectRatio="none" className={cn("w-full", className)} aria-hidden>
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth={0.9} opacity={0.12 + (i / 22) * 0.4} />
      ))}
    </svg>
  )
}
