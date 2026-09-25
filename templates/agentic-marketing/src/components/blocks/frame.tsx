import type * as React from "react"

import { cn } from "@/lib/utils"

/** The 1180px column every section sits in, with the reference's gutter. */
export function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-(--spacing-frame) px-(--spacing-gutter)", className)} {...props} />
}

/** A section with the page's vertical rhythm and an optional hairline above. */
export function Section({
  className,
  rule = false,
  ...props
}: React.ComponentProps<"section"> & { rule?: boolean }) {
  return (
    <section
      className={cn("relative scroll-mt-20 py-(--spacing-section)", rule && "border-t border-line", className)}
      {...props}
    />
  )
}
