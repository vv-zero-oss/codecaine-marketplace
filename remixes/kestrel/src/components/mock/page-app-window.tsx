import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The window every product mockup on the inner pages sits in: three quiet
 * dots, a title, and a white body with a soft lift.
 */
export function AppWindow({
  title = "Kestrel",
  className,
  bodyClassName,
  children,
}: {
  title?: string
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-lift) ring-1 ring-ink/5", className)}>
      <div className="flex h-9 items-center gap-1.5 border-b border-line bg-panel px-3">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="flex-1 text-center text-[12px] text-ink-3">{title}</span>
        <span className="w-[42px]" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/** A small label above a mock's field or list. */
export function MockLabel({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <p className={cn("type-eyebrow text-[10.5px] text-ink-3", className)}>{children}</p>
}
