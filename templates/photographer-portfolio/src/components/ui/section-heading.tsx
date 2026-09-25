import type * as React from "react"

import { cn } from "@/lib/utils"

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-[11px] font-medium uppercase tracking-[0.28em] text-ink-400", className)} {...props} />
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">{title}</h2>
      {children && <p className="mt-5 leading-relaxed text-ink-600">{children}</p>}
    </div>
  )
}
