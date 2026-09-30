import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PixelList } from "@/components/ui/pixel-list"
import { cn } from "@/lib/utils"

export type Pillar = { icon: React.ReactNode; title: string; lede: string; items: string[] }

/**
 * Three (or four) columns between hairlines: a mint tile icon, a serif name,
 * a one-line promise and what it covers.
 */
export function PillarGrid({ pillars, className }: { pillars: Pillar[]; className?: string }) {
  return (
    <Container className={cn("px-0 md:px-(--spacing-gutter)", className)}>
      <div
        className={cn(
          "grid border-y border-line md:border-x",
          pillars.length === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {pillars.map((p, i) => (
          <PillarCard key={p.title} pillar={p} index={i} />
        ))}
      </div>
    </Container>
  )
}

export function PillarCard({ pillar, index = 0 }: { pillar: Pillar; index?: number }) {
  return (
    <Reveal
      delay={index * 0.06}
      className="flex flex-col border-b border-line px-(--spacing-gutter) py-10 last:border-b-0 md:border-r md:border-b-0 md:px-12 md:py-14 md:last:border-r-0"
    >
      <span className="grid size-14 place-items-center bg-mint-tile text-ink md:size-[72px] [&_svg]:size-7 md:[&_svg]:size-8">
        {pillar.icon}
      </span>
      <h3 className="mt-10 font-serif text-[1.75rem] leading-tight font-light text-ink md:mt-14">{pillar.title}</h3>
      <p className="mt-3 text-[15px] font-medium text-ink-soft md:text-base">{pillar.lede}</p>
      <PixelList items={pillar.items} className="mt-6 text-ink-soft" />
    </Reveal>
  )
}
