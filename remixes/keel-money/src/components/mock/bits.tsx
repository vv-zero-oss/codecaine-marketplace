import type * as React from "react"

import { cn } from "@/lib/utils"

/** A panel inside the app mocks: one step lighter than the card it sits in. */
export function MockPanel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-[14px] bg-surface-2 shadow-(--shadow-inner)", className)} {...props} />
}

/** The small header row every app panel has: a title and a quiet link. */
export function MockHeading({ title, action, className }: { title: string; action?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between text-[11px]", className)}>
      <span className="font-medium text-fg-2">{title}</span>
      {action ? <span className="text-fg-4">{action} ›</span> : null}
    </div>
  )
}

/** A money figure set the way the app sets it: a small raised dollar sign. */
export function Money({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("tabular-nums", className)}>
      <sup className="mr-px align-[0.35em] text-[0.6em]">$</sup>
      {value}
    </span>
  )
}

/** A budget ring: how much of a category's month is used, in its colour. */
export function BudgetRing({
  pct,
  colour,
  children,
  size = 40,
}: {
  pct: number
  colour: string
  children?: React.ReactNode
  size?: number
}) {
  const r = 16
  const c = 2 * Math.PI * r
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-surface-3)" strokeWidth="3.5" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={colour} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${c * Math.min(pct, 1)} ${c}`} />
      </svg>
      {children}
    </span>
  )
}
