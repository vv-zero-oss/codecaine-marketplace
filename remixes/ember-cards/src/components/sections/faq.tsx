import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { FAQ } from "@/content"

/** The six questions people ask before signing up, one open at a time. */
export function Faq({ eyebrow = FAQ.eyebrow, title = FAQ.title }: { eyebrow?: string; title?: string }) {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer", (next) => setOpen((next ?? open !== "q0") ? "q0" : ""), { on: open === "q0", group: "FAQ" })
  useCanvasAction("Cost answer", (next) => setOpen((next ?? open !== "q4") ? "q4" : ""), { on: open === "q4", group: "FAQ" })

  return (
    <section id="pricing" className="pt-8 pb-28 sm:pb-40">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-[572px] sm:mt-12">
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="flex flex-col gap-2.5">
            {FAQ.items.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
