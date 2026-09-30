import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { FAQ } from "@/content"

/** The questions people ask before they move money. Each answer is an editor action. */
export function Faq() {
  const [open, setOpen] = useState("")
  FAQ.items.forEach((item, i) => {
    // Fixed order and count: one switch per question.
    useCanvasAction(item.q, (next) => setOpen((next ?? open !== `q${i}`) ? `q${i}` : ""), { on: open === `q${i}`, group: "FAQ" })
  })

  return (
    <section id="faq" className="border-t border-line py-section">
      <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <SectionHeading eyebrow={FAQ.eyebrow} title={FAQ.title} />
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
            {FAQ.items.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-[19px] font-medium tracking-[-0.01em] text-ink hover:no-underline md:text-[21px]">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-[1.6] text-ink-muted">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
