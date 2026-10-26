import { Mail, MapPin } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { PageHero } from "@/components/sections/page-hero"
import { SectionLabel } from "@/components/sections/section-label"
import { Container } from "@/components/ui/container"
import { INBOXES, OFFICES, PAGE_HEROES } from "@/content"

export function Office({ city, address, hours }: { city: string; address: string; hours: string }) {
  return (
    <div className="flex gap-3 border-t border-line py-5">
      <MapPin aria-hidden className="mt-1 size-3.5 shrink-0 text-fg-subtle" />
      <div>
        <p className="text-[15px] font-medium">{city}</p>
        <p className="mt-1 text-sm text-fg-muted">{address}</p>
        <p className="text-xs text-fg-subtle">{hours}</p>
      </div>
    </div>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        before="Write to a"
        accent="person."
        body="Every note is read by a partner, whether you are raising, joining, or simply curious about what we do."
        {...PAGE_HEROES.contact}
      />
      <section className="bg-ink py-20 sm:py-[12vh]">
        <Container className="grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>
          <aside className="flex flex-col gap-12">
            <Reveal delay={0.1}>
              <SectionLabel>Direct</SectionLabel>
              <ul className="mt-4">
                {INBOXES.map((box) => (
                  <li key={box.email} className="flex items-center justify-between gap-4 border-t border-line py-4">
                    <span className="text-sm text-fg-muted">{box.label}</span>
                    <a
                      href={`mailto:${box.email}`}
                      className="inline-flex min-h-11 items-center gap-2 text-sm underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      <Mail aria-hidden className="size-3.5 text-fg-subtle" />
                      {box.email}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <SectionLabel>Offices</SectionLabel>
              <div className="mt-4">
                {OFFICES.map((o) => (
                  <Office key={o.city} {...o} />
                ))}
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>
    </>
  )
}
