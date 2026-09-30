import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The house headline: a small tag, then a heavy condensed line answered by
 * italic serif words in lower case. `inline` puts both on one line
 * (“RECENT work”), otherwise they stack.
 */
export function DisplayHeading({
  eyebrow,
  bold,
  serif,
  inline = false,
  size = "lg",
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string
  bold: string
  serif?: string
  inline?: boolean
  size?: "md" | "lg" | "xl"
  align?: "left" | "center"
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  const sizes = {
    md: "text-[clamp(2.5rem,6vw,4.75rem)]",
    lg: "text-[clamp(3rem,8.5vw,7.5rem)]",
    xl: "text-[clamp(3.25rem,10.5vw,10rem)]",
  }
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? <Eyebrow className="mb-5 md:mb-6">{eyebrow}</Eyebrow> : null}
      <Tag className={cn(sizes[size], "leading-[0.88] text-balance")}>
        <span className="display">{bold}</span>
        {serif ? (
          <>
            {inline ? " " : <br />}
            <span className="display-serif">{serif}</span>
          </>
        ) : null}
      </Tag>
    </div>
  )
}

/** A small caps tag with a spark in front — what a section is about. */
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-pill border border-current/20 px-3.5 py-1.5 label text-xs text-balance",
        className,
      )}
      {...props}
    >
      <svg aria-hidden viewBox="0 0 20 20" className="size-2.5 shrink-0 text-flame">
        <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" fill="currentColor" />
      </svg>
      {children}
    </p>
  )
}
