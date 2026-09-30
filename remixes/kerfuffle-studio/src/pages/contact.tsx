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
        <div className="flex flex-col items-start justify-center px-gutter pt-36 pb-16 md:pt-28">
          <Reveal>
            <DisplayHeading as="h1" eyebrow="Contact" bold="Say" serif="hello" inline size="xl" align="left" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[32ch] text-lg leading-snug">Tell us what you are making. We will tell you how it could move — usually with a scribble or two.</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={STUDIO.phoneHref} tone="lime" icon={Phone} label="Call the studio" />
            <ButtonLink href={`mailto:${STUDIO.email}`} tone="flame" icon={Mail} label="Write to us" />
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 font-mono text-xs text-ink-mute uppercase">
              {STUDIO.street}, {STUDIO.postcode} {STUDIO.city}
            </p>
          </Reveal>
        </div>
        <div className="relative m-gutter mt-0 min-h-[60svh] overflow-hidden rounded-card border-2 border-ink md:mt-24">
          <Parallax speed={0.08} className="absolute inset-[-8%_0]">
            <img src={photo(11489970, 1400)} alt="The Kerfuffle crew outside the studio" className="size-full object-cover" />
          </Parallax>
          <div className="absolute top-[14%] left-[6%]">
            <Sticker text="Coffee’s on" tone="lime" rotate={-10} />
          </div>
        </div>
      </section>

      <section id="brief" data-tone="light" className="py-section">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <DisplayHeading eyebrow="Got a brief?" bold="Drop it" serif="right here" size="md" align="left" />
            <p className="mt-5 max-w-[38ch] text-lg leading-snug">
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
