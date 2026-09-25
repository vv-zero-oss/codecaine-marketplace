import type * as React from "react"

import { Mark } from "@/components/blocks/wordmark"
import { cn } from "@/lib/utils"

/** A chat message as Slack draws one: square avatar, name, time, text. */
export function ChatMessage({
  who,
  time,
  bot = false,
  children,
  className,
}: {
  who: string
  time: string
  bot?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-md text-[11px] font-semibold text-white",
          bot ? "bg-mint" : "bg-sky",
        )}
      >
        {bot ? <Mark className="size-4 text-pine" /> : who.charAt(0)}
      </span>
      <div className="min-w-0 text-[12px] leading-snug">
        <p className="flex items-center gap-1.5">
          <span className="font-semibold text-ink">{who}</span>
          {bot && <span className="rounded-[3px] bg-stone px-1 text-[9px] font-medium text-ink-soft">APP</span>}
          <span className="text-[10px] text-ink-faint">{time}</span>
        </p>
        <div className="mt-0.5 text-ink-2">{children}</div>
      </div>
    </div>
  )
}
