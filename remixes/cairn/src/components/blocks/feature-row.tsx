import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/**
 * The page's main rhythm: a product shot on one side, a short claim on the
 * other, swapping sides from one section to the next. On a phone the shot
 * comes second, under the words it illustrates.
 */
export function FeatureRow({
  id,
  title,
  body,
  media,
  action,
  flip = false,
  className,
}: {
  id?: string
  title: string
  body: string
  media: React.ReactNode
  action?: React.ReactNode
  /** put the shot on the right */
  flip?: boolean
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 md:py-24", className)}>
      <Container className="grid max-w-[1020px] grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-16">
        <Reveal className={cn("order-2 min-w-0", flip ? "md:order-2" : "md:order-1")}>{media}</Reveal>
        <Reveal delay={0.08} className={cn("order-1 flex min-w-0 flex-col items-start gap-5", flip ? "md:order-1" : "md:order-2")}>
          <h2 className="type-serif max-w-[12ch] text-h2 text-ink">{title}</h2>
          <p className="max-w-[34ch] text-lead text-ink-3">{body}</p>
          {action ? <div className="mt-2">{action}</div> : null}
        </Reveal>
      </Container>
    </section>
  )
}
