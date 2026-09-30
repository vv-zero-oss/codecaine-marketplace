import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { faqs } from "@/content"

/** The questions a careful driver asks before handing over their policies. */
export function Faq() {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer open", (next) => setOpen((next ?? open !== "q0") ? "q0" : ""), {
    on: open === "q0",
    group: "FAQ",
  })

  return (
    <section id="faq" className="pb-[12svh] sm:pb-[16svh]">
      <Container className="max-w-[38rem]">
        <Reveal>
          <SectionHeading>FAQ</SectionHeading>
        </Reveal>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="mt-10 space-y-2 sm:mt-12">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`q${index}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
