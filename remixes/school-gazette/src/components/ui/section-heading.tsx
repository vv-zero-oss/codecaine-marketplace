import type * as React from "react"

import { cn } from "@/lib/utils"

/** A kicker, a big condensed headline and a deck — the shape every section opens with. */
export function SectionHeading({
  kicker,
  title,
  deck,
  align = "left",
  className,
}: {
  kicker?: string
  title: string
  deck?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <header className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {kicker ? <p className="kicker text-ink-soft">{kicker}</p> : null}
      <h2 className="display text-[clamp(2.4rem,6.5vw,5rem)]">{title}</h2>
      {deck ? <p className="max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-snug text-ink-soft">{deck}</p> : null}
    </header>
  )
}

/** A figure with the caption set under it, the way a paper prints a photo. */
export function Figure({ children, caption, className }: { children: React.ReactNode; caption?: string; className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      {children}
      {caption ? <figcaption className="mt-1.5 font-type text-[0.68rem] leading-tight text-ink-faint">{caption}</figcaption> : null}
    </figure>
  )
}
