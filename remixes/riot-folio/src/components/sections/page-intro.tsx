import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** A page's title and the paragraph under it — the opening of every inner page. */
export function PageIntro({
  title,
  lede,
  className,
  children,
}: {
  title: string
  lede?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={cn("max-w-[36rem]", className)}>
      <h1 className="text-[clamp(2rem,1.6rem+1.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        {title}
      </h1>
      {lede ? <p className="mt-4 text-[17px] leading-[1.55] text-ink-muted sm:text-lg">{lede}</p> : null}
      {children}
    </div>
  )
}

/** A titled block of prose, as on the about page. */
export function ProseBlock({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-3 text-[17px] leading-[1.6] text-ink-muted">{children}</div>
    </section>
  )
}
