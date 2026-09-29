import type * as React from "react"

import { cn } from "@/lib/utils"

/** A label over its value — muted caption, ink value — as in a spec sheet. */
export function MetaItem({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-body leading-tight text-muted">{label}</span>
      <span className="text-body leading-tight text-ink">{children}</span>
    </div>
  )
}
