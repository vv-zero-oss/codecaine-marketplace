import { ArrowDown } from "lucide-react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { ParallaxPhoto } from "./parallax-photo"

/**
 * The opening: the whole trip in one oversized line, then the reference's
 * offset portrait pair — a small card high on the left, a tall one in the
 * middle, the lead on the right.
 */
export function ExperienceHero({
  title = "Door to door, by way of the sky.",
  lead = "One tap books the car, the seat and the car at the other end. In between, a few quiet minutes above the traffic you used to sit in.",
}: {
  title?: string
  lead?: string
}) {
  return (
    <section data-header-tone="dark" className="relative pt-28 pb-10 sm:pt-32">
      <Container>
        <Reveal>
          <h1 className="type-head max-w-[14ch] text-giga text-balance">{title}</h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-6 gap-x-4 gap-y-8 sm:mt-24 lg:grid-cols-12 lg:gap-x-6">
          <ParallaxPhoto
            name="cabin-smile"
            label="Seat 1A"
            distance={90}
            position="60% 40%"
            className="order-1 col-span-3 aspect-[4/5] sm:col-span-2 lg:order-none lg:col-start-2 lg:col-end-4 lg:aspect-[3/4]"
          />
          <ParallaxPhoto
            name="trench-turn"
            label="Midtown Roof, 08:41"
            distance={24}
            position="50% 75%"
            className="order-3 col-span-6 aspect-[4/5] sm:order-2 sm:col-span-4 sm:col-start-3 lg:order-none lg:col-start-4 lg:col-end-10 lg:row-span-2 lg:aspect-[10/13]"
          />
          <Reveal delay={0.1} className="order-2 col-span-3 flex flex-col justify-end gap-5 sm:order-3 sm:col-span-4 sm:col-start-3 sm:gap-6 lg:order-none lg:col-start-10 lg:col-end-13 lg:row-start-2 lg:self-center">
            <p className="max-w-[30ch] text-body text-ink-2 sm:text-lead">{lead}</p>
            <a href="#journey" className="link-line group inline-flex w-fit items-center gap-1.5 text-body">
              Walk the trip
              <ArrowDown className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <CornerLabels left="Experience" right="One trip, door to door" className="mt-16 sm:mt-20" />
      </Container>
    </section>
  )
}
