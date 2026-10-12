import { cn } from "@/lib/utils"

/**
 * A tasting dial: a little stopwatch face whose hand points further round
 * the higher the score (1–5). Three of them sit under every coffee —
 * sweetness, acidity, complexity — and read at a glance across a row.
 */
export function FlavorDial({ label = "Sweetness", value = 3, className }: { label?: string; value?: number; className?: string }) {
  const angle = -120 + ((value - 1) / 4) * 240
  return (
    <div className={cn("flex w-14 flex-col items-center gap-1", className)} title={`${label}: ${value} of 5`}>
      <svg viewBox="0 0 24 24" className="size-6 text-ink" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
        <path d="M10.5 2.5 L13.5 2.5 M12 2.5 L12 4.5" />
        <circle cx="12" cy="13.5" r="8.5" />
        {Array.from({ length: 5 }, (_, i) => {
          const a = ((-120 + i * 60 - 90) * Math.PI) / 180
          return <line key={i} x1={12 + Math.cos(a) * 6.6} y1={13.5 + Math.sin(a) * 6.6} x2={12 + Math.cos(a) * 7.6} y2={13.5 + Math.sin(a) * 7.6} opacity={i < value ? 1 : 0.3} />
        })}
        <line x1="12" y1="13.5" x2="12" y2="8" style={{ transform: `rotate(${angle}deg)`, transformOrigin: "12px 13.5px" }} strokeWidth="1.8" />
      </svg>
      <span className="type-label text-[7.5px] leading-none tracking-[0.06em] text-ink-3">{label}</span>
      <span className="sr-only">{value} of 5</span>
    </div>
  )
}

/** Light → dark on a rust bar, with a cream tick where this coffee sits. */
export function RoastBar({ level = 0.5, roast = "Medium", className }: { level?: number; roast?: string; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="relative h-[3px] rounded-full bg-gradient-to-r from-ember via-rust to-cocoa" role="meter" aria-valuemin={0} aria-valuemax={1} aria-valuenow={level} aria-label="Roast level">
        <span className="absolute top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cocoa/40 bg-page" style={{ left: `${level * 100}%` }} />
      </div>
      <p className="text-[13px] text-ink-2">{roast} Roast</p>
    </div>
  )
}
