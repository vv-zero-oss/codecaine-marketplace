import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { Faq } from "@/components/sections/faq"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo, STUDIO } from "@/content"

export function ContactPage() {
  const details = [
    { label: "Email", value: STUDIO.email, href: `mailto:${STUDIO.email}` },
    { label: "Phone", value: STUDIO.phone, href: STUDIO.phoneHref },
    { label: "Studio", value: `${STUDIO.street}, ${STUDIO.postcode} ${STUDIO.city}` },
  ]
  return (
    <>
      <section data-tone="light" className="pt-40 pb-section md:pt-48">
        <Container>
          <Reveal>
            <SectionHeader as="h1" size="xl" label="Contact" title="Tell us what you are working on." />
          </Reveal>
          <div className="mt-16 grid gap-y-12 md:grid-cols-12 md:gap-x-6">
            <dl className="space-y-6 md:col-span-3 md:col-start-4">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="label text-ink-mute">{d.label}</dt>
                  <dd className="mt-1 text-base">
                    {d.href ? (
                      <a href={d.href} className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <Reveal delay={0.06} className="md:col-span-6">
              <ContactForm />
            </Reveal>
          </div>
          <img src={photo(6141089, 1800)} alt="The studio, from the street" loading="lazy" className="mt-24 aspect-[21/9] w-full object-cover" />
        </Container>
      </section>
      <Faq />
    </>
  )
}
