import { CircleCheck, FileSearch, Filter, Gauge, Loader, RefreshCw, ShieldCheck } from "lucide-react"
import type * as React from "react"

import { LogoMark } from "@/components/ui/logo-mark"
import { cn } from "@/lib/utils"

/** The "Glovebox working…" card that floats over each feature's footage. */
export function TaskPanel({
  title = "Glovebox working…",
  className,
  children,
}: {
  title?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("w-full max-w-[35rem] rounded-panel bg-surface-soft p-4 shadow-panel sm:p-5", className)}>
      <p className="flex items-center gap-2.5 text-base text-ink sm:text-[17px]">
        <LogoMark className="size-5" />
        {title}
      </p>
      <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">{children}</div>
    </div>
  )
}

const rowIcons = {
  search: FileSearch,
  filter: Filter,
  gauge: Gauge,
  shield: ShieldCheck,
  refresh: RefreshCw,
}

type TaskRowProps = {
  label: string
  status: string
  state?: "running" | "queued" | "done"
  icon?: keyof typeof rowIcons
  className?: string
}

/** One job in the panel: what it is, where it has got to. */
export function TaskRow({ label, status, state = "running", icon = "search", className }: TaskRowProps) {
  const Icon = rowIcons[icon]
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-5 shrink-0 place-items-center text-muted">
        {state === "running" && <Loader className="size-[18px] animate-spin-slow" strokeWidth={1.5} />}
        {state === "queued" && (
          <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden="true">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2.4 2.4" />
          </svg>
        )}
        {state === "done" && <CircleCheck className="size-[18px] text-check" strokeWidth={1.8} />}
      </span>
      <div className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-tile bg-surface px-3.5 shadow-hairline">
        <Icon className="size-4 shrink-0 text-ink-soft" strokeWidth={1.5} />
        <span className="truncate text-sm text-ink sm:text-[15px]">{label}</span>
        <span
          className={cn(
            "ml-auto hidden shrink-0 text-sm transition-colors duration-(--duration-ui) sm:inline",
            state === "done" ? "text-money" : "text-muted",
          )}
        >
          {status}
        </span>
      </div>
    </div>
  )
}
