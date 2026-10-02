import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { SkyBackdrop } from "@/components/motion/sky-backdrop"
import { Container } from "@/components/ui/container"
import sky from "@/assets/sky-pixel.png"

/** The short sky banner every inner page opens with. */
export function PageHero({ kicker, title, blurb, children }: { kicker: string; title: string; blurb?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pb-phi-6 pt-[calc(var(--header-h)+4rem)] sm:pb-phi-6 sm:pt-[calc(var(--header-h)+6rem)]">
      <SkyBackdrop image={sky} stars={20} clouds={2} parallax={80} />
      <Container className="relative">
        <Reveal>
          <p className="font-mono text-lg uppercase tracking-widest text-fg/70">{`> ${kicker}`}</p>
          <h1 className="mt-phi-2 max-w-4xl text-balance text-4xl font-bold">{title}</h1>
          {blurb ? <p className="mt-phi-3 max-w-measure text-pretty text-xl text-fg/85">{blurb}</p> : null}
          {children ? <div className="mt-phi-4 flex flex-wrap gap-phi-2">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  )
}
