import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The start of every section, on the page grid: a numbered mono label in the
 * first three columns, the heading across the rest, and an optional line
 * beside it. A hairline runs above.
 */
export function SectionHeader({
  index,
  label,
  title,
  aside,
  as: Tag = "h2",
  size = "lg",
  className,
}: {
  index?: string
  label: string
  title: string
  aside?: React.ReactNode
  as?: "h1" | "h2"
  size?: "lg" | "xl"
  className?: string
}) {
  return (
    <div className={cn("grid gap-y-6 border-t border-current/15 pt-5 md:grid-cols-12 md:gap-x-6", className)}>
      <p className="label md:col-span-3">
        {index ? <span className="mr-3 opacity-50">{index}</span> : null}
        {label}
      </p>
      <div className="md:col-span-9">
        <Tag
          className={cn(
            "display max-w-[18ch] text-balance",
            size === "xl" ? "text-[clamp(3rem,8.4vw,8.5rem)]" : "text-[clamp(2.25rem,4.6vw,4.5rem)]",
          )}
        >
          {title}
        </Tag>
        {aside ? <div className="mt-6 max-w-[48ch] text-lg leading-snug text-current/70">{aside}</div> : null}
      </div>
    </div>
  )
}

/** A mono label on its own. */
export function Label({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("label", className)} {...props} />
}
