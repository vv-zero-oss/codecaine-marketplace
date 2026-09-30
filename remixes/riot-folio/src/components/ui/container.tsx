import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * What centres every section. `size` picks the measure: `wide` for the header
 * and footer, `default` for the work grid, `narrow` for reading.
 */
export function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "wide" | "default" | "narrow" }) {
  // `data-canvas-ignore`: a centring wrapper, not a layer anyone designs. The
  // canvas editor's pointer looks through it to the section it sits in and
  // the content inside it; it is still in the layers panel. A caller that
  // wants it pickable passes `data-canvas-ignore={false}`.
  return (
    <div
      data-canvas-ignore
      className={cn(
        "mx-auto w-full px-[var(--spacing-gutter)]",
        size === "wide" && "max-w-[80rem]",
        size === "default" && "max-w-[60rem]",
        size === "narrow" && "max-w-[40rem]",
        className,
      )}
      {...props}
    />
  )
}
