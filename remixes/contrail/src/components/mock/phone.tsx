import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A phone, drawn — titanium edge, glass, the island and a status bar — with a
 * live screen inside. It is a container: everything on the screen is sized in
 * `em` off a font size tied to the phone's own width, so the same screen reads
 * the same at 180px on a phone and 340px on a desktop.
 */
export function Phone({
  tone = "light",
  time = "09:41",
  tilt = 0,
  className,
  screenClassName,
  children,
}: {
  /** Light or dark status bar and glass. */
  tone?: "light" | "dark"
  time?: string
  /** Degrees the phone leans. */
  tilt?: number
  className?: string
  screenClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("@container relative w-[300px]", className)} style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      <div className="relative aspect-[9/19.4] rounded-[15cqw] bg-[linear-gradient(145deg,#3a3a40,#121216_38%,#2a2a30)] p-[1.6cqw] shadow-(--shadow-phone)">
        <div className="absolute inset-[0.7cqw] rounded-[14.4cqw] bg-[#050507]" aria-hidden />
        <div
          className={cn(
            "relative size-full overflow-hidden rounded-[13.2cqw] text-[3.7cqw] leading-[1.25]",
            tone === "dark" ? "bg-night text-night-fg" : "bg-page text-ink",
            screenClassName,
          )}
        >
          {children}
          <StatusBar tone={tone} time={time} />
        </div>
        {/* side buttons */}
        <span aria-hidden className="absolute top-[22%] -left-[0.9cqw] h-[7%] w-[0.9cqw] rounded-l-sm bg-[#2a2a30]" />
        <span aria-hidden className="absolute top-[32%] -left-[0.9cqw] h-[11%] w-[0.9cqw] rounded-l-sm bg-[#2a2a30]" />
        <span aria-hidden className="absolute top-[28%] -right-[0.9cqw] h-[14%] w-[0.9cqw] rounded-r-sm bg-[#2a2a30]" />
      </div>
    </div>
  )
}

/** The time, the island, signal and battery — over whatever the screen shows. */
function StatusBar({ tone, time }: { tone: "light" | "dark"; time: string }) {
  const ink = tone === "dark" ? "#ffffff" : "#0b0b10"
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[3.3em] items-center justify-between px-[2.4em] pt-[0.2em]">
      <span className="w-[4em] text-[1em] font-semibold tabular-nums" style={{ color: ink }}>
        {time}
      </span>
      <span className="absolute left-1/2 top-[0.75em] h-[2em] w-[7.6em] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex w-[4em] items-center justify-end gap-[0.3em]">
        <svg viewBox="0 0 18 12" className="h-[0.75em]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.6} y={9 - i * 3} width={3.2} height={3 + i * 3} rx={0.8} fill={ink} />
          ))}
        </svg>
        <svg viewBox="0 0 16 12" className="h-[0.75em]" aria-hidden>
          <path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0ZM3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0ZM1 4.4a9.9 9.9 0 0 1 14 0l-1.4 1.4a7.9 7.9 0 0 0-11.2 0Z" fill={ink} />
        </svg>
        <svg viewBox="0 0 26 12" className="h-[0.8em]" aria-hidden>
          <rect x={0.5} y={0.5} width={22} height={11} rx={3.2} fill="none" stroke={ink} opacity={0.4} />
          <rect x={2} y={2} width={17} height={8} rx={2} fill={ink} />
          <rect x={23.6} y={4} width={1.6} height={4} rx={0.8} fill={ink} opacity={0.4} />
        </svg>
      </span>
    </div>
  )
}
