import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A pointer with a label hanging off it — a person, the assistant, or a
 * component's name. The colour comes in as a token-backed class pair so the
 * arrow and the pill always match.
 */
export function NameTag({
  label,
  tone = "bg-signal text-white",
  arrow = "text-signal",
  className,
  ...props
}: { label: React.ReactNode; tone?: string; arrow?: string } & React.ComponentProps<"div">) {
  return (
    <div className={cn("pointer-events-none flex select-none flex-col items-start", className)} {...props}>
      <svg viewBox="0 0 16 16" className={cn("-mb-0.5 size-[15px]", arrow)} aria-hidden>
        <path d="M1.5 1.2 14.6 6.1 8.4 8.1 6.3 14.5Z" fill="currentColor" />
      </svg>
      <span
        className={cn(
          "ml-3 whitespace-nowrap rounded-pill px-[15px] py-[5px] text-sm leading-[18px] font-medium tracking-[-0.01em]",
          tone,
        )}
      >
        {label}
      </span>
    </div>
  )
}
