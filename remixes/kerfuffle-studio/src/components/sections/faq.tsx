import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { FAQ } from "@/content"

/** The questions people ask on the first call, answered before it. */
export function Faq({ id = "faq" }: { id?: string }) {
  const [open, setOpen] = useState<string>("")
  useCanvasAction("First question open", (on) => setOpen((on ?? open !== "q0") ? "q0" : ""), {
    group: "FAQ",
    on: open === "q0",
  })
  return (
    <section id={id} data-tone="light" className="scroll-mt-16 py-section">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <DisplayHeading eyebrow="Before you ask" bold="Good" serif="questions" size="md" align="left" />
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-ink">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="border-ink">
                <AccordionTrigger className="rounded-none py-5 font-serif text-2xl leading-tight tracking-tight hover:no-underline md:text-3xl [&>svg]:size-6 [&>svg]:text-blue">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[60ch] pb-6 text-base leading-relaxed text-ink-soft md:text-lg">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
