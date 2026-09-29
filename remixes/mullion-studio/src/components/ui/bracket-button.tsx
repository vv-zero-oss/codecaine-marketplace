import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * `[ LABEL ]` — the one button on the page. Monospace caps between two
 * brackets, no fill and no radius; active means underlined, and `solid`
 * inverts it to ink for the one primary action in a block.
 */
type BracketButtonProps = React.ComponentProps<"button"> & {
  active?: boolean
  solid?: boolean
}

export function BracketButton({ active, solid, className, children, type = "button", ...props }: BracketButtonProps) {
  return (
    <button
      type={type}
      data-active={active || undefined}
      className={cn(
        "group/bracket inline-flex min-h-11 items-center gap-[0.9em] text-ui uppercase tracking-ui whitespace-nowrap outline-none select-none md:min-h-8",
        "transition-[color,background-color,transform] duration-[var(--duration-press)] ease-out active:scale-[0.97]",
        "focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        solid ? "bg-ink px-4 text-paper hover:bg-blueprint" : "text-ink",
        className,
      )}
      {...props}
    >
      <Bracket side="[" solid={solid} />
      <span
        className={cn(
          "underline-offset-[5px] decoration-1",
          !solid && "group-hover/bracket:underline group-data-[active]/bracket:underline",
        )}
      >
        {children}
      </span>
      <Bracket side="]" solid={solid} />
    </button>
  )
}

function Bracket({ side, solid }: { side: "[" | "]"; solid?: boolean }) {
  return (
    <span aria-hidden className={cn("font-light", solid ? "text-paper/60" : "text-muted")}>
      {side}
    </span>
  )
}
