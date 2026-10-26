import { ChevronRight } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The orange "Explore …  ›" link: medium weight, a hairline underline under
 * the words only, and a chevron that steps right on hover.
 */
export function ArrowLink({
  className,
  children,
  tone = "ember",
  ...props
}: React.ComponentProps<"a"> & { tone?: "ember" | "ink" | "inverse" }) {
  return (
    <a
      className={cn(
        "group/arrow inline-flex items-center gap-1 text-[15px] font-medium sm:text-base",
        tone === "ember" && "text-ember",
        tone === "ink" && "text-ink",
        tone === "inverse" && "text-ink-inverse",
        className,
      )}
      {...props}
    >
      <span className="underline decoration-current/35 decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-(--duration-fast) group-hover/arrow:decoration-current">
        {children}
      </span>
      <ChevronRight
        aria-hidden
        className="size-4 transition-transform duration-(--duration-fast) ease-out-soft group-hover/arrow:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  )
}
