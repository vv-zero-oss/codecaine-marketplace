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
          <DisplayHeading eyebrow="Before you ask" bold="Fair" serif="questions" size="md" align="left" />
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="rounded-card border-2 border-ink bg-card px-5 last:border-b-2 data-[state=open]:bg-lime">
                <AccordionTrigger className="rounded-none py-5 label text-base leading-tight hover:no-underline md:text-lg [&>svg]:size-5 [&>svg]:text-ink">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[60ch] pb-6 text-base leading-relaxed text-ink">
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
