import { ChevronRight } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The quiet text link — "See integrations  ›": bone text, a hairline
 * underline under the words only, and a chevron that steps right on hover.
 */
export function ArrowLink({
  className,
  children,
  tone = "bone",
  ...props
}: React.ComponentProps<"a"> & { tone?: "bone" | "muted" }) {
  return (
    <a
      className={cn(
        "group/arrow inline-flex items-center gap-1 text-[15px] font-medium sm:text-base",
        tone === "bone" ? "text-bone" : "text-ash",
        className,
      )}
      {...props}
    >
      <span className="underline decoration-current/30 decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-(--duration-fast) group-hover/arrow:decoration-current">
        {children}
      </span>
      <ChevronRight
        aria-hidden
        className="size-4 transition-transform duration-(--duration-fast) ease-out-soft group-hover/arrow:translate-x-0.5"
        strokeWidth={1.75}
      />
    </a>
  )
}
