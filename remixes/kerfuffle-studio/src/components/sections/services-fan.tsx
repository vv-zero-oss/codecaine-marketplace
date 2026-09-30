import { ArrowUpRight } from "lucide-react"

import { FanCards } from "@/components/motion/fan-cards"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { photo, SERVICES } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const PANEL = {
  flame: "bg-flame text-snow",
  lime: "bg-lime text-ink",
  violet: "bg-violet text-snow",
} as const

/** What we do, as three numbered cards that fan out: animation, video, social. */
export function ServicesFan() {
  return (
    <section id="services" data-tone="light" className="py-section">
      <Container className="flex flex-col items-center">
        <Reveal>
          <DisplayHeading eyebrow="Three ways in" bold="Our" serif="craft" inline size="lg" />
        </Reveal>
        <FanCards className="mt-12 w-full max-w-5xl md:mt-16">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} />
          ))}
        </FanCards>
        <Reveal className="mt-16 md:mt-24">
          <ArrowLink href="/what-we-do" label="How we work" />
        </Reveal>
      </Container>
    </section>
  )
}

export function ServiceCard({ service, index = 0 }: { service: (typeof SERVICES)[number]; index?: number }) {
  return (
    <Link
      href={`/what-we-do#${service.key}`}
      className={cn("group/service flex flex-col gap-4 rounded-card border-2 border-ink p-3 shadow-lift", PANEL[service.color])}
    >
      <div className="flex items-center justify-between px-2 pt-1">
        <span className="font-mono text-xs">0{index + 1}</span>
        <span className="flex size-9 items-center justify-center rounded-full border-2 border-current transition-transform duration-(--duration-base) group-hover/service:rotate-45">
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </span>
      </div>
      <div className="aspect-[5/4] overflow-hidden rounded-[14px]">
        <img src={photo(service.image, 700)} alt="" loading="lazy" className="size-full object-cover" />
      </div>
      <div className="px-2 pb-3">
        <h3 className="display text-[clamp(2.5rem,4.2vw,3.5rem)]">{service.title}</h3>
        <p className="mt-2 max-w-[28ch] text-base leading-snug">{service.short}</p>
      </div>
    </Link>
  )
}
