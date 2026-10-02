import { BatteryFull, Signal, Wifi } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** A phone bezel with a dynamic island, a status bar and a home indicator. `tone` picks the screen's base. */
export function PhoneFrame({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark"
  className?: string
  children?: React.ReactNode
}) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "relative aspect-[9/18.5] w-full rounded-[2.4rem] border-[6px] border-ink-900 shadow-device",
        dark ? "bg-night-950" : "bg-white",
        className,
      )}
    >
      <span className="absolute top-2.5 left-1/2 z-10 h-5 w-1/3 -translate-x-1/2 rounded-full bg-ink-950" />
      <div className={cn("absolute inset-0 flex flex-col overflow-hidden rounded-[1.9rem]", dark ? "text-white" : "text-ink-900")}>
        <div className="flex h-10 shrink-0 items-end justify-between px-5 pb-1 text-[10px] font-bold tabular-nums">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="size-3" strokeWidth={2.5} />
            <Wifi className="size-3" strokeWidth={2.5} />
            <BatteryFull className="size-3.5" strokeWidth={2} />
          </span>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
        <span className={cn("mx-auto mb-1.5 h-1 w-1/3 shrink-0 rounded-full", dark ? "bg-white/70" : "bg-ink-900")} />
      </div>
    </div>
  )
}
