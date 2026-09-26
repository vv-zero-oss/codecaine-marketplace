import type * as React from "react"
import { ChevronDown, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * The inspector's controls, at the editor's own sizes: 24px tall, radius 6,
 * #F5F5F5 fill, no border, 11px values. Static — the mockup shows the editor,
 * it does not run it — so these are plain elements with no handlers.
 */

export function Field({ label, children, className }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}>
      {label && <span className="text-[10px] leading-4 font-medium tracking-[0.045px] text-ed-text-2">{label}</span>}
      {children}
    </div>
  )
}

export function Select({ value, icon: Icon, className }: { value: string; icon?: LucideIcon; className?: string }) {
  return (
    <div className={cn("flex h-6 items-center gap-1.5 rounded-[6px] bg-ed-field pr-1.5 pl-1.5 text-[11px] text-ed-text", !Icon && "pl-2", className)}>
      {Icon && <Icon className="size-4 text-ed-text-2" strokeWidth={1.5} />}
      <span className="flex-1 truncate">{value}</span>
      <ChevronDown className="size-3 text-ed-text-2" strokeWidth={1.5} />
    </div>
  )
}

/** Number field with its own unit menu: the value, a 1px gap, a 24px chevron. */
export function Combo({ value, icon: Icon, className }: { value: string; icon?: LucideIcon; className?: string }) {
  return (
    <div className={cn("flex h-6 gap-px text-[11px] text-ed-text", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-l-[6px] bg-ed-field px-2">
        {Icon && <Icon className="-ml-0.5 size-4 shrink-0 text-ed-text-2" strokeWidth={1.5} />}
        <span className="truncate">{value}</span>
      </div>
      <div className="grid w-6 place-items-center rounded-r-[6px] bg-ed-field">
        <ChevronDown className="size-3 text-ed-text-2" strokeWidth={1.5} />
      </div>
    </div>
  )
}

export function NumberBox({ value, className }: { value: string; className?: string }) {
  return <div className={cn("flex h-6 items-center rounded-[6px] bg-ed-field px-2 text-[11px] text-ed-text", className)}>{value}</div>
}

export function Segmented({
  items,
  active = 0,
  className,
}: {
  items: (string | LucideIcon)[]
  active?: number
  className?: string
}) {
  return (
    <div className={cn("flex h-7 rounded-[8px] bg-ed-field p-0.5", className)}>
      {items.map((Item, i) => (
        <div
          key={i}
          className={cn(
            "grid flex-1 place-items-center rounded-[6px] px-2 text-[12px] font-medium",
            i === active ? "bg-ed-panel text-ed-text shadow-ed-chip" : "text-ed-text-2",
          )}
        >
          {typeof Item === "string" ? Item : <Item className="size-4" strokeWidth={1.5} />}
        </div>
      ))}
    </div>
  )
}

export function Section({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("border-b border-ed-line pb-3", !children && "pb-0 opacity-50", className)}>
      <div className="flex h-8 items-center justify-between pr-2 pl-4">
        <span className="flex items-center gap-1 text-[11px] font-[550] text-ed-text">
          {title}
          <ChevronDown className="size-3 text-ed-text-3" strokeWidth={1.5} />
        </span>
        {action}
      </div>
      {children && <div className="flex flex-col gap-2 pr-10 pl-4">{children}</div>}
    </div>
  )
}

export function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex gap-2", className)}>{children}</div>
}
