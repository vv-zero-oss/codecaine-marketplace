import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * One band of the page. Bands meet at a hairline, and the page frame's two
 * vertical hairlines run past them all — the grid the whole site sits on.
 */
export function Section({
  tone = "page",
  className,
  ...props
}: { tone?: "page" | "canvas" | "void" } & React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative border-t border-line-strong first:border-t-0",
        tone === "canvas" && "bg-canvas",
        tone === "void" && "bg-void",
        className,
      )}
      {...props}
    />
  )
}
