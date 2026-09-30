import { CtaBand } from "@/components/layout/site-footer"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { Faq } from "@/components/sections/faq"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo, SERVICES } from "@/content"

const STEPS = [
  { title: "Call", body: "Thirty minutes. You explain what is stuck; we ask what it needs to do." },
  { title: "Proposal", body: "Within a week: an approach, a sketch or reference cut, a schedule and a fixed quote." },
  { title: "Production", body: "Script, shoot, animate, edit. You see work in progress every week." },
  { title: "Delivery", body: "Final masters plus cut-downs for each channel, captions and covers included." },
]

export function WhatWeDoPage() {
  return (
    <>
      <section data-tone="light" className="pt-40 pb-section md:pt-48">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              size="xl"
              label="Services"
              title="Animation, film and social — separately or together."
              aside="Most projects mix two of the three. The same small team handles all of them, so a campaign film and its social cut-downs come from one place."
            />
          </Reveal>
        </Container>
      </section>

      {SERVICES.map((service, i) => (
        <section key={service.key} id={service.key} data-tone="light" className="scroll-mt-16 pb-section">
          <Container className="grid gap-y-10 border-t border-line pt-5 md:grid-cols-12 md:gap-x-6">
            <p className="label md:col-span-3">
              <span className="mr-3 opacity-50">0{i + 1}</span>
              {service.title}
            </p>
            <Reveal className="md:col-span-4">
              <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">{service.title}</h2>
              <p className="mt-6 text-lg leading-snug text-ink-soft">{service.body}</p>
              <ul className="mt-8 border-t border-line">
                {service.points.map((point) => (
                  <li key={point} className="border-b border-line py-2.5 text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="overflow-hidden md:col-span-5">
              <Parallax speed={0.06}>
                <img src={photo(service.image, 1200)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </Parallax>
            </div>
          </Container>
        </section>
      ))}

      <section data-tone="light" className="pb-section">
        <Container>
          <Reveal>
            <SectionHeader index="04" label="Process" title="From first call to delivery." />
          </Reveal>
          <ol className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} className="md:col-span-3">
                <li className="border-t border-ink pt-4">
                  <span className="label text-ink-mute">Step 0{i + 1}</span>
                  <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-2 text-base leading-snug text-ink-soft">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <Faq index="05" />
      <CtaBand />
    </>
  )
}
