import { Check } from "lucide-react"

import { CtaBand } from "@/components/layout/site-footer"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { StickerBurst } from "@/components/motion/sticker-burst"
import { Faq } from "@/components/sections/faq"
import { Container } from "@/components/ui/container"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { Sticker } from "@/components/ui/sticker"
import { photo, SERVICES } from "@/content"
import { cn } from "@/lib/utils"

const PANEL = { blue: "bg-blue", pink: "bg-pink", orange: "bg-orange" } as const

const STEPS = [
  { n: "01", title: "A call", body: "Half an hour, no deck. You tell us what is stuck; we ask the awkward questions." },
  { n: "02", title: "An idea", body: "Within a week: a concept, a sketch or a rough cut, and a fixed quote." },
  { n: "03", title: "The making", body: "Script, shoot, animate, edit. You see it move early and often." },
  { n: "04", title: "Out there", body: "Cut for every channel, delivered with captions, covers and a plan to post." },
]

export function WhatWeDoPage() {
  return (
    <>
      <section data-tone="light" className="pt-36 pb-section md:pt-44">
        <Container>
          <StickerBurst count={6} className="mx-auto max-w-6xl py-10">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>What we do</Eyebrow>
              <h1 className="mt-3 text-[clamp(3.25rem,10.5vw,10rem)] leading-[0.88]">
                <span className="display">Everything</span> <span className="display-serif">moves</span>
              </h1>
              <p className="mt-6 max-w-[30ch] font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.08] tracking-tight">
                Brands, people, attention. But not everything moves by itself. That is what we are for.
              </p>
            </div>
          </StickerBurst>
        </Container>
      </section>

      {SERVICES.map((service, i) => (
        <section key={service.key} id={service.key} data-tone="light" className="scroll-mt-0">
          <div className={cn("grid md:min-h-svh md:grid-cols-2", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
            <div className="flex items-center px-gutter py-20 md:px-[8%]">
              <Reveal className="md:sticky md:top-32">
                <Eyebrow>{service.eyebrow}</Eyebrow>
                <h2 className="mt-2 display text-[clamp(3.5rem,8vw,7.5rem)]">{service.title}</h2>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed md:text-lg">{service.body}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 font-serif text-xl">
                      <span className="flex size-5 items-center justify-center bg-blue text-snow">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className={cn("relative flex min-h-[70svh] items-center justify-center overflow-hidden p-8 md:p-16", PANEL[service.color])}>
              <Parallax speed={0.1} className="w-full max-w-lg">
                <img src={photo(service.image, 1000)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover shadow-lift" />
              </Parallax>
              <div className="absolute right-[8%] bottom-[12%]">
                <Sticker text={["Frame by frame", "Roll camera", "Stop the scroll"][i]} tone={(["yellow", "blue", "pink"] as const)[i]} rotate={6} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section data-tone="light" className="py-section">
        <Container>
          <Reveal>
            <DisplayHeading eyebrow="From first call to first view" bold="How we" serif="work" size="md" />
          </Reveal>
          <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07} className="h-full">
                <li className="h-full bg-paper p-6 md:p-8">
                  <span className="font-mono text-xs text-blue">{step.n}</span>
                  <h3 className="mt-3 display text-4xl">{step.title}</h3>
                  <p className="mt-2 font-serif text-xl leading-snug">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <Faq />
      <CtaBand />
    </>
  )
}
