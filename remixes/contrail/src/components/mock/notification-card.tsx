import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A notification, as the lock screen shows it: an icon, a bold line and a
 * quiet one, on a white card with the page's soft shadow.
 */
export function NotificationCard({
  title = "Gate changed",
  body = "Now Terminal 1 · Gate B27",
  icon,
  tone = "day",
  dim = false,
  className,
}: {
  title?: string
  body?: string
  icon?: React.ReactNode
  tone?: "day" | "night"
  /** Faded back, the way the cards not about this moment sit. */
  dim?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-(--radius-card) px-4 py-3.5 transition-[opacity,filter,background-color,box-shadow] duration-(--duration-phase) ease-(--ease-out-strong)",
        tone === "day" ? "bg-raised shadow-(--shadow-card)" : "bg-night-2/90 shadow-(--shadow-night)",
        dim && "opacity-25 shadow-none",
        className,
      )}
    >
      {icon ? <span className="grid size-9 shrink-0 place-items-center">{icon}</span> : null}
      <div className="min-w-0">
        <p className={cn("truncate text-[15px] leading-tight font-semibold", tone === "day" ? "text-ink" : "text-night-fg")}>{title}</p>
        <p className={cn("mt-1 truncate text-[13.5px] leading-tight", tone === "day" ? "text-ink-2" : "text-night-2fg")}>{body}</p>
      </div>
    </div>
  )
}
