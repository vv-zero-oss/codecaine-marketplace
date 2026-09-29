import type * as React from "react"

import { cn } from "@/lib/utils"

/** Initials in a tinted square, standing in for a sender's avatar in the mock-ups. */
export function Initials({ name, tone, className }: { name: string; tone: string; className?: string }) {
  const letters = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
  return (
    <span className={cn("grid size-7 shrink-0 place-items-center rounded-[6px] text-[10px] font-semibold text-white", tone, className)}>
      {letters}
    </span>
  )
}

/** A small pill with a coloured dot: a label, a signal or a status in the mock-ups. */
export function Tag({ dot, children, className }: { dot: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-[5px] bg-paper px-1.5 py-0.5 text-[10.5px] text-ink-muted", className)}>
      <span className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </span>
  )
}

/** The app window every mock-up sits in: white, hairline, soft lift. */
export function AppWindow({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-panel)] bg-card text-ink shadow-(--shadow-app)", className)}>
      {children}
    </div>
  )
}
