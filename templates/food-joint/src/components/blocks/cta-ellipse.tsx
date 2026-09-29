import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's call to action: an orange ellipse with condensed, underlined
 * words — a stamp more than a button. It tips and swells a little on hover
 * and presses in; the underline pulls back toward the start.
 * Transitions, not keyframes, so a quick hover in and out retargets smoothly.
 */
export function CtaEllipse({
  children,
  className,
  href,
  type,
  tone = "orange",
  ...props
}: {
  href?: string
  type?: "submit" | "button"
  tone?: "orange" | "forest"
} & React.ComponentProps<"a">) {
  const body = (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-[0.08em] min-h-[2px] origin-left bg-current transition-transform duration-(--duration-hover) ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-x-[0.6]"
      />
    </span>
  )
  const classes = cn(
    "group relative inline-flex min-h-11 items-center justify-center rounded-[50%] px-[1.6em] py-[0.9em] font-condensed uppercase outline-none",
    "transition-[rotate,scale,background-color] duration-(--duration-hover) ease-out-strong",
    "active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-lime",
    "[@media(hover:hover)_and_(pointer:fine)]:hover:-rotate-3 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.04]",
    tone === "orange" ? "bg-orange text-forest" : "bg-forest text-lime",
    className,
  )
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {body}
      </a>
    )
  }
  return (
    <button type={type ?? "button"} className={classes}>
      {body}
    </button>
  )
}
