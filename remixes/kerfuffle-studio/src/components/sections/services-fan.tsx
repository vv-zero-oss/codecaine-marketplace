import { FanCards } from "@/components/motion/fan-cards"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { ScribbleLink } from "@/components/ui/scribble-link"
import { photo, SERVICES } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const PANEL = { blue: "bg-blue", pink: "bg-pink", orange: "bg-orange" } as const

/** What we do, as three cards that fan out: animation, video, social. */
export function ServicesFan() {
  return (
    <section id="services" data-tone="light" className="py-section">
      <Container className="flex flex-col items-center">
        <Reveal>
          <DisplayHeading eyebrow="Our services" bold="What we do" size="lg" />
        </Reveal>
        <FanCards className="mt-12 w-full max-w-5xl md:mt-16">
          {SERVICES.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </FanCards>
        <Reveal className="mt-16 md:mt-24">
          <ScribbleLink href="/what-we-do" label="Discover more" />
        </Reveal>
      </Container>
    </section>
  )
}

export function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Link href={`/what-we-do#${service.key}`} className={cn("block p-3 text-snow shadow-lift", PANEL[service.color])}>
      <div className="aspect-[5/4] overflow-hidden">
        <img src={photo(service.image, 700)} alt="" loading="lazy" className="size-full object-cover" />
      </div>
      <div className="px-2 pt-4 pb-3 text-center">
        <h3 className="display text-[clamp(2.5rem,4.2vw,3.75rem)]">{service.title}</h3>
        <p className="mx-auto mt-1 max-w-[20ch] font-serif text-xl leading-[1.05] md:text-2xl">{service.short}</p>
      </div>
    </Link>
  )
}
