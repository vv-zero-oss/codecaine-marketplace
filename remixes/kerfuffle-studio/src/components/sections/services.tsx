import { HoverPreview } from "@/components/motion/hover-preview"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo, SERVICES } from "@/content"
import { Link } from "@/lib/router"

/** What we do, as three rows; hovering one shows a still from that kind of work. */
export function Services({ index = "02" }: { index?: string }) {
  return (
    <section id="services" data-tone="light" className="py-section">
      <Container>
        <Reveal>
          <SectionHeader index={index} label="Services" title="Three things, done in-house." />
        </Reveal>
        <HoverPreview
          className="mt-16"
          images={SERVICES.map((s) => photo(s.image, 700)).join("|")}
          rows={SERVICES.map((service, i) => <ServiceRow key={service.key} service={service} index={i} />)}
        />
      </Container>
    </section>
  )
}

export function ServiceRow({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  return (
    <Link
      href={`/what-we-do#${service.key}`}
      className="group/row grid grid-cols-12 items-baseline gap-4 py-6 transition-colors duration-(--duration-fast) md:gap-6 md:py-8"
    >
      <span className="label col-span-2 text-ink-mute md:col-span-3">0{index + 1}</span>
      <h3 className="col-span-10 display text-[clamp(2.25rem,5vw,4.5rem)] transition-transform duration-(--duration-base) ease-out group-hover/row:translate-x-2 md:col-span-4">
        {service.title}
      </h3>
      <p className="col-span-10 col-start-3 max-w-[36ch] text-base leading-snug text-ink-soft md:col-span-4 md:col-start-auto">
        {service.short}
      </p>
      <img src={photo(service.image, 500)} alt="" loading="lazy" className="col-span-10 col-start-3 aspect-[4/3] w-full object-cover md:hidden" />
      <span aria-hidden className="hidden text-right text-xl transition-transform duration-(--duration-base) group-hover/row:translate-x-1 md:col-span-1 md:block">
        →
      </span>
    </Link>
  )
}
