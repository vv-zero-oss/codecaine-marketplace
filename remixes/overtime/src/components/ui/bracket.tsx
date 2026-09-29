import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The site's one button: a label between square brackets — `[ GRID ]`,
 * `[ CLOSE ]`, `[ LEARN MORE ]`.
 *
 * The brackets stay put and only the word reacts: underlined when it is the
 * current page, and inverted into a solid block on hover, like a selection
 * in a terminal. On touch there is no hover, so the press gets the same block.
 */
const bracketVariants = cva(
  "group/bracket inline-flex min-h-11 items-center gap-[0.6em] whitespace-nowrap font-mono uppercase tracking-label select-none outline-none md:min-h-0",
  {
    variants: {
      size: {
        default: "text-label",
        caption: "text-caption",
      },
      tone: {
        ink: "text-current",
        muted: "text-ink-muted",
      },
    },
    defaultVariants: { size: "default", tone: "ink" },
  },
)

const wordClass =
  "px-[0.15em] underline-offset-[5px] decoration-1 transition-colors duration-(--duration-fast) group-hover/bracket:bg-(--page-ink) group-hover/bracket:text-(--page-bg) group-active/bracket:bg-(--page-ink) group-active/bracket:text-(--page-bg) group-focus-visible/bracket:bg-(--page-ink) group-focus-visible/bracket:text-(--page-bg)"

type BracketStyle = VariantProps<typeof bracketVariants> & {
  /** The current page: the word is underlined. */
  active?: boolean
  /** Leave the brackets off — `ABOUT THE PROJECT` is written bare. */
  bare?: boolean
}

function Word({ children, active, bare }: { children: React.ReactNode; active?: boolean; bare?: boolean }) {
  return (
    <>
      {!bare && <span aria-hidden>[</span>}
      <span className={cn(wordClass, active && "underline")}>{children}</span>
      {!bare && <span aria-hidden>]</span>}
    </>
  )
}

export function Bracket({
  className,
  size,
  tone,
  active,
  bare,
  children,
  ...props
}: React.ComponentProps<"button"> & BracketStyle) {
  return (
    <button type="button" className={cn(bracketVariants({ size, tone }), "cursor-pointer", className)} {...props}>
      <Word active={active} bare={bare}>
        {children}
      </Word>
    </button>
  )
}

export function BracketLink({
  className,
  size,
  tone,
  active,
  bare,
  children,
  ...props
}: React.ComponentProps<typeof Link> & BracketStyle) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(bracketVariants({ size, tone }), className)}
      {...props}
    >
      <Word active={active} bare={bare}>
        {children}
      </Word>
    </Link>
  )
}

export { bracketVariants }
