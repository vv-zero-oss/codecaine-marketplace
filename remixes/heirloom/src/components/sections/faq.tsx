import { useState } from "react"

import { CanvasSwitch } from "@/components/canvas-switch"
import { Reveal } from "@/components/motion/reveal"
import { SectionLabel } from "@/components/sections/section-label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { Accent } from "@/components/ui/heading"

/** Questions a careful applicant asks, one open at a time. Each answer is an
 *  editor switch. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState("")
  return (
    <section id="faq" className="bg-ink py-20 sm:py-[14vh]">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <Reveal>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">
            Asked before <Accent>joining.</Accent>
          </h2>
        </Reveal>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
              <CanvasSwitch label={`Answer ${i + 1}`} group="FAQ" on={open === item.q} set={(on) => setOpen(on ? item.q : "")} />
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
