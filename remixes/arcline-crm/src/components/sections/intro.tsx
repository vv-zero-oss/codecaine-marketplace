import type * as React from "react"
import { BarChart3, Inbox, ShieldCheck, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { Container } from "@/components/ui/container"
import { INTRO } from "@/content"
import { photo, PHOTOS } from "@/photos"

const ICONS: Record<(typeof INTRO.points)[number]["icon"], LucideIcon> = {
  inbox: Inbox,
  shield: ShieldCheck,
  chart: BarChart3,
}

/** A short label on a black chip. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center rounded-[var(--radius-chip)] bg-void px-2 text-[15px] text-fg-soft md:text-[18px]">
      {children}
    </span>
  )
}

/**
 * The worry and the answer: AI made selling faster; Arcline makes it
 * accurate. Two photographs interlock under the copy — the tall one overlaps
 * the wide one's corner — and three short promises close the section.
 */
export function Intro() {
  return (
    <section id="intro" className="pt-20 pb-[var(--spacing-section)] md:pt-[100px]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_35.3%] lg:gap-0">
          <Reveal className="relative z-0 rounded-br-[var(--radius-media)] bg-ink pt-0 lg:pt-[100px] lg:pr-16 lg:pb-[120px]">
            <Badge>{INTRO.badge}</Badge>
            <h2 className="type-display mt-6 text-[clamp(40px,5vw,96px)] leading-[0.98] text-fg md:mt-10">
              <span className="block">{INTRO.title[0]}</span>
              <span className="block">
                {INTRO.title[1]}
                <span className="bg-linear-to-r from-blush to-coral/80 bg-clip-text text-transparent">{INTRO.accent}</span>
              </span>
            </h2>
            <p className="mt-8 max-w-[26ch] text-[22px] leading-[1.12] font-light tracking-[-0.02em] text-fg-soft md:mt-12 md:text-[clamp(26px,2.3vw,42px)]">
              {INTRO.body}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative z-20 lg:-mb-[50px] lg:self-end">
            <ParallaxImage
              src={photo("cubes", 1400)}
              alt={PHOTOS.cubes.alt}
              distance={60}
              className="aspect-[4/3] rounded-[var(--radius-media)] lg:aspect-square"
            />
          </Reveal>
        </div>

        <Reveal className="relative z-10 mt-4 lg:mt-0 lg:w-[67.6%]">
          <ParallaxImage
            src={photo("sculpture", 2000)}
            alt={PHOTOS.sculpture.alt}
            distance={80}
            className="aspect-[16/10] rounded-[var(--radius-media)] lg:aspect-[1169/780]"
          />
        </Reveal>

        <ul className="mt-16 grid gap-10 sm:grid-cols-3 md:mt-[110px] lg:w-[67.6%] lg:gap-8">
          {INTRO.points.map((point, i) => {
            const Icon = ICONS[point.icon]
            return (
              <Reveal as="li" key={point.text} delay={i * 0.08}>
                <Icon className="size-5 text-subtle" strokeWidth={1.25} />
                <p className="mt-5 max-w-[30ch] text-[17px] leading-[1.35] text-fg-soft md:text-[19px]">{point.text}</p>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
