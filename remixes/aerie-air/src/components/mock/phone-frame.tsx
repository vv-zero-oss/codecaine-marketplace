import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A phone, drawn in SVG — the frame, the side buttons and the island — with
 * a live screen inside it. Whatever is passed as children is the real UI,
 * not a picture of one. 9:19.5, scaling to its width.
 */
export function PhoneFrame({ className, screenClassName, children }: { className?: string; screenClassName?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative aspect-[390/844] w-[300px] drop-shadow-[0_40px_60px_rgb(18_21_28/0.28)]", className)}>
      <svg viewBox="0 0 390 844" aria-hidden className="absolute inset-0 size-full">
        <rect x="-3" y="150" width="4" height="34" rx="2" fill="#2a2d33" />
        <rect x="-3" y="210" width="4" height="62" rx="2" fill="#2a2d33" />
        <rect x="-3" y="284" width="4" height="62" rx="2" fill="#2a2d33" />
        <rect x="389" y="236" width="4" height="96" rx="2" fill="#2a2d33" />
        <rect x="0" y="0" width="390" height="844" rx="62" fill="#16181d" />
        <rect x="3" y="3" width="384" height="838" rx="59" fill="none" stroke="#4a4e57" strokeWidth="1.5" />
      </svg>
      <div className={cn("absolute inset-[11px] overflow-hidden rounded-[52px] bg-raised", screenClassName)}>
        {children}
        <div aria-hidden className="pointer-events-none absolute top-[11px] left-1/2 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-[#0b0c0f]" />
      </div>
    </div>
  )
}

/** The status bar every screen starts with. */
export function StatusBar({ tone = "dark", time = "8:42" }: { tone?: "dark" | "light"; time?: string }) {
  return (
    <div className={cn("flex h-[50px] items-center justify-between px-7 pt-1 text-[13px] font-semibold tabular-nums", tone === "light" ? "text-white" : "text-ink")}>
      <span>{time}</span>
      <svg viewBox="0 0 62 12" className="h-3 w-[62px]" aria-hidden fill="currentColor">
        <rect x="0" y="7" width="3" height="5" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
        <path d="M28 3.2a8.6 8.6 0 0 1 11.6 0l-1.3 1.4a6.7 6.7 0 0 0-9 0zM30.6 6a4.8 4.8 0 0 1 6.4 0l-1.3 1.4a2.9 2.9 0 0 0-3.8 0zM33.8 9.2l1.3 1.4-1.3 1.4-1.3-1.4z" />
        <rect x="44.5" y="1" width="15" height="10" rx="3" fill="none" stroke="currentColor" opacity="0.45" />
        <rect x="46" y="2.5" width="10" height="7" rx="1.6" />
        <rect x="60.5" y="4" width="1.5" height="4" rx="0.7" opacity="0.45" />
      </svg>
    </div>
  )
}
