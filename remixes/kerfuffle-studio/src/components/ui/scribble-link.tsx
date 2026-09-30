import { ArrowDown, ArrowRight } from "lucide-react"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * “Discover more”: a serif link with a hand-drawn underline and a small
 * square arrow. The underline draws itself on hover, and stays drawn when
 * `drawn` is set.
 */
export function ScribbleLink({
  label = "Discover more",
  href = "/",
  direction = "right",
  drawn = true,
  tone = "ink",
  className,
}: {
  label?: string
  href?: string
  direction?: "right" | "down"
  drawn?: boolean
  tone?: "ink" | "snow"
  className?: string
}) {
  const Arrow = direction === "down" ? ArrowDown : ArrowRight
  const content = (
    <>
      <span className="relative">
        {label}
        <Scribble drawn={drawn} />
      </span>
      <span className="flex size-[1.1em] items-center justify-center bg-blue text-snow transition-transform duration-(--duration-base) ease-out group-hover/scribble:translate-x-1">
        <Arrow className="size-[0.75em]" strokeWidth={3} />
      </span>
    </>
  )
  const classes = cn(
    "group/scribble inline-flex items-center gap-2 font-serif text-2xl tracking-tight md:text-3xl",
    tone === "snow" ? "text-snow" : "text-ink",
    className,
  )
  return href.startsWith("/") && !href.startsWith("/#") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href.replace(/^\//, "")} className={classes}>
      {content}
    </a>
  )
}

/** The blue marker loop under a link or the active nav item. */
export function Scribble({ drawn = false, className }: { drawn?: boolean; className?: string } & React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute -bottom-3 left-0 h-3.5 w-full overflow-visible text-blue", className)}
    >
      <path
        d="M2 9 C 40 13, 90 12, 120 9 C 150 6, 150 18, 128 16 C 110 14, 118 6, 150 7 C 170 8, 185 9, 198 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className={cn(
          "[stroke-dasharray:1] transition-[stroke-dashoffset] duration-(--duration-slow) ease-out group-hover/scribble:[stroke-dashoffset:0]",
          drawn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]",
        )}
      />
    </svg>
  )
}
