import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** The logical screen the content is laid out on, in CSS px — like a 14 Pro. */
const SCREEN_W = 390
const SCREEN_H = 844

const BODY = {
  black: "bg-[linear-gradient(145deg,#3a3d44,#0e0f12_40%,#2b2d33)]",
  titanium: "bg-[linear-gradient(145deg,#d9d6cf,#8f8c85_45%,#c9c6bf)]",
  white: "bg-[linear-gradient(145deg,#fafafa,#cfd3da_45%,#f1f2f4)]",
} as const

/**
 * A phone you can use. The frame is pure CSS and the screen is a live React
 * tree: it is laid out at 390 × 844 and scaled to whatever width the frame is
 * given, so everything inside stays clickable and keeps its proportions.
 */
export function PhoneFrame({
  tone = "black",
  time = "9:41",
  statusTone = "dark",
  className,
  children,
}: {
  tone?: "black" | "titanium" | "white"
  time?: string
  /** "dark" paints the status bar dark on a light screen, "light" the reverse. */
  statusTone?: "dark" | "light"
  className?: string
  children?: ReactNode
}) {
  const host = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = host.current
    if (!el) return
    const read = () => setScale(el.clientWidth / SCREEN_W)
    read()
    const observer = new ResizeObserver(read)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn("relative w-full rounded-[13.5%/6.2%] p-[2.4%] shadow-phone", BODY[tone], className)}
      style={{ aspectRatio: "1 / 2.08" }}
    >
      {/* the screen */}
      <div ref={host} className="relative size-full overflow-hidden rounded-[11.5%/5.3%] bg-paper">
        <div
          data-canvas-ignore
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` } as CSSProperties}
        >
          {children}
          <StatusBar time={time} tone={statusTone} />
          <div className="pointer-events-none absolute top-[11px] left-1/2 z-30 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black" />
          <div className={cn("pointer-events-none absolute bottom-2 left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full", statusTone === "dark" ? "bg-ink" : "bg-paper")} />
        </div>
      </div>
      {/* side buttons */}
      <span className="absolute top-[14%] -left-[0.8%] h-[3.5%] w-[1.2%] rounded-l bg-black/70" />
      <span className="absolute top-[20%] -left-[0.8%] h-[6%] w-[1.2%] rounded-l bg-black/70" />
      <span className="absolute top-[28%] -left-[0.8%] h-[6%] w-[1.2%] rounded-l bg-black/70" />
      <span className="absolute top-[24%] -right-[0.8%] h-[9%] w-[1.2%] rounded-r bg-black/70" />
    </div>
  )
}

function StatusBar({ time, tone }: { time: string; tone: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[54px] items-center justify-between px-9 pt-1 text-[16px] font-semibold",
        tone === "dark" ? "text-ink" : "text-paper",
      )}
    >
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="2.2" fill="currentColor" />
          <path d="M24 4v4c.8-.3 1.4-1 1.4-2s-.6-1.7-1.400-2z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}
