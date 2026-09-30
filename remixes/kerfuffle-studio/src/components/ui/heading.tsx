import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The house headline: a small serif eyebrow, then a heavy condensed line
 * answered by a light serif one. `inline` puts both on one line
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
      {eyebrow ? <Eyebrow className={cn("mb-3 md:mb-4", align === "center" && "mx-auto")}>{eyebrow}</Eyebrow> : null}
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

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("max-w-[22ch] font-serif text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.02] tracking-tight text-balance", className)}
      {...props}
    />
  )
}
