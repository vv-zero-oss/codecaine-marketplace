import type * as React from "react"

import { cn } from "@/lib/utils"

/** A phone bezel with a dynamic island. `tone` picks the screen's base. */
export function PhoneFrame({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/18.5] w-full rounded-[2.4rem] border-[6px] border-ink-900 shadow-device",
        tone === "dark" ? "bg-night-950" : "bg-white",
        className,
      )}
    >
      <span className="absolute top-2.5 left-1/2 z-10 h-5 w-1/3 -translate-x-1/2 rounded-full bg-ink-950" />
      <div className="absolute inset-0 overflow-hidden rounded-[1.9rem] pt-10">{children}</div>
    </div>
  )
}
