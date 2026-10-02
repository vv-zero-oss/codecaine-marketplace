import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { SkyBackdrop } from "@/components/motion/sky-backdrop"
import { Container } from "@/components/ui/container"
import sky from "@/assets/sky-pixel.png"

/** The short sky banner every inner page opens with. */
export function PageHero({ kicker, title, blurb, children }: { kicker: string; title: string; blurb?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+4rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+6rem)]">
      <SkyBackdrop image={sky} stars={20} clouds={2} parallax={80} />
      <Container className="relative">
        <Reveal>
          <p className="font-mono text-xl uppercase tracking-widest text-fg/70">{`> ${kicker}`}</p>
          <h1 className="mt-3 max-w-4xl text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight">{title}</h1>
          {blurb ? <p className="mt-5 max-w-2xl text-pretty text-2xl text-fg/85">{blurb}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  )
}
