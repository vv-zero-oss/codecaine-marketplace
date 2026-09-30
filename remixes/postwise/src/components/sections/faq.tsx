import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FAQ } from "@/content"

/** The questions people ask before they connect an inbox. Each answer is an action in the editor. */
export function Faq() {
  const [open, setOpen] = useState("")

  FAQ.items.forEach((item, i) => {
    // Fixed order and count, one switch per question.
    useCanvasAction(item.q, (next) => setOpen((next ?? open !== `q${i}`) ? `q${i}` : ""), { on: open === `q${i}`, group: "FAQ" })
  })

  return (
    <section id="faq" className="border-t border-line py-section">
      <Container className="grid max-w-[1120px] gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal className="flex flex-col items-start gap-5">
          <h2 className="type-display text-[clamp(32px,3.6vw,44px)] text-balance">{FAQ.title}</h2>
          <p className="max-w-[340px] text-[16px] leading-[1.5] text-ink-muted">{FAQ.body}</p>
          <ButtonLink href="#contact" variant="outline" size="sm">
            Contact us
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
            {FAQ.items.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-[17px] font-normal tracking-[-0.01em] text-ink hover:no-underline md:text-[18px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15.5px] leading-[1.6] text-ink-muted">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
