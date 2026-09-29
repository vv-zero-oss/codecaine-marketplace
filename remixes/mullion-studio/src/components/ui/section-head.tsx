import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The strip that opens every section: an index, a caps label and an optional
 * note on the right, over a hairline.
 */
export function SectionHead({
  index,
  label,
  aside,
  className,
}: {
  index: string
  label: string
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 border-b border-hairline pb-3 text-ui uppercase tracking-ui", className)}>
      <span className="flex gap-6">
        <span className="text-muted">{index}</span>
        <span>{label}</span>
      </span>
      {aside && <span className="hidden text-muted sm:inline">{aside}</span>}
    </div>
  )
}
