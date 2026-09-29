import type * as React from "react"

import { cn } from "@/lib/utils"

/** The pill above the hero: a dot, and a sentence about a release. */
export function Badge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-quartz-200 bg-quartz-50 px-3 py-1 text-xs font-medium text-quartz-600",
        className,
      )}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-emerald-500" />
      {children}
    </span>
  )
}

/** The one on the pricing card — `absolute` inside a `relative` parent, which
 *  is the shape a transfer that rewrites positions it does not own gets wrong. */
export function RibbonBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "absolute -top-3 left-8 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white",
        className,
      )}
      {...props}
    />
  )
}
