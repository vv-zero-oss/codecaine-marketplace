import { Mail, Phone } from "lucide-react"

import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { Faq } from "@/components/sections/faq"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { Sticker } from "@/components/ui/sticker"
import { photo, STUDIO } from "@/content"

export function ContactPage() {
  return (
    <>
      <section data-tone="light" className="grid md:min-h-svh md:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-gutter pt-36 pb-16 text-center md:pt-28">
          <Reveal>
            <DisplayHeading as="h1" eyebrow="Contact" bold="Ready to" serif="move too?" size="lg" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[26ch] font-serif text-2xl leading-tight">Tell us what is bothering you. We will make it visible.</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href={STUDIO.phoneHref} tone="pink" icon={Phone} label="Call us" />
            <ButtonLink href={`mailto:${STUDIO.email}`} tone="blue" icon={Mail} label="Email us" />
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 font-serif text-lg text-ink-soft">
              {STUDIO.street}, {STUDIO.postcode} {STUDIO.city}
            </p>
          </Reveal>
        </div>
        <div className="relative min-h-[60svh] overflow-hidden">
          <Parallax speed={0.08} className="absolute inset-[-8%_0]">
            <img src={photo(11489970, 1400)} alt="The Kerfuffle crew outside the studio" className="size-full object-cover" />
          </Parallax>
          <div className="absolute top-[14%] left-[6%]">
            <Sticker text="Come say hi" tone="yellow" rotate={-10} />
          </div>
        </div>
      </section>

      <section id="brief" data-tone="light" className="py-section">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <DisplayHeading eyebrow="Or skip the small talk" bold="Send us" serif="a brief" size="md" align="left" />
            <p className="mt-5 max-w-[34ch] font-serif text-xl leading-snug">
              A few lines is plenty. We read every brief ourselves and come back with questions, a first idea, or an
              honest “not for us” — within one working day.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  )
}
