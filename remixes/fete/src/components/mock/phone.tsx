import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** The status bar, drawn in SVG so it stays crisp at any scale. */
function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 390 44" className={cn("absolute inset-x-0 top-0 z-20 w-full", dark ? "text-white" : "text-ink")} aria-hidden>
      <text x="38" y="30" fill="currentColor" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui" letterSpacing="-0.3">
        9:41
      </text>
      {/* the island */}
      <rect x="138" y="11" width="114" height="32" rx="16" fill="#0b0b0d" />
      {/* signal */}
      <g fill="currentColor">
        <rect x="292" y="24" width="3.4" height="6" rx="1" />
        <rect x="297.4" y="21.5" width="3.4" height="8.5" rx="1" />
        <rect x="302.8" y="19" width="3.4" height="11" rx="1" />
        <rect x="308.2" y="16.5" width="3.4" height="13.5" rx="1" />
      </g>
      {/* wifi */}
      <path d="M318 20.5a12 12 0 0 1 15.5 0M320.6 23.6a7.6 7.6 0 0 1 10.3 0M323.3 26.6a3.4 3.4 0 0 1 4.9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* battery */}
      <rect x="339" y="17" width="24" height="12.5" rx="3.6" stroke="currentColor" strokeOpacity="0.4" fill="none" />
      <rect x="341" y="19" width="17" height="8.5" rx="2" fill="currentColor" />
      <rect x="364.5" y="21" width="1.8" height="4.5" rx="0.9" fill="currentColor" fillOpacity="0.45" />
    </svg>
  )
}

/**
 * A phone, as a frame for live UI: a 390×844 screen in a soft-shadowed
 * bezel, status bar and island in SVG, and a home indicator. The screen
 * inside is real markup — it scrolls, ticks and responds.
 */
export function Phone({ children, className, dark = false }: { children?: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn("relative aspect-[390/844] rounded-(--radius-device) bg-[#0b0b0d] p-[3%] shadow-(--shadow-device)", className)}>
      <div className={cn("@container relative size-full overflow-hidden rounded-[calc(var(--radius-device)-6px)]", dark ? "bg-night text-night-fg" : "bg-page text-ink")}>
        <StatusBar dark={dark} />
        <div className="absolute inset-0 pt-[11.5%]">{children}</div>
        <span aria-hidden className={cn("absolute bottom-[1.4%] left-1/2 z-20 h-[0.6%] w-[34%] -translate-x-1/2 rounded-full", dark ? "bg-white/70" : "bg-ink/80")} />
      </div>
    </div>
  )
}
