import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FAQ } from "@/content"

/** The last questions before a decision, one open at a time. */
export function Faq() {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer open", (next) => setOpen((next ?? open !== "0") ? "0" : ""), {
    on: open === "0",
    group: "FAQ",
  })

  return (
    <section id="faq" className="pb-[var(--spacing-section)]">
      <Container className="grid gap-10 lg:grid-cols-[1fr_58.2%] lg:gap-0">
        <Reveal>
          <SectionHeading size="md" className="text-[clamp(32px,2.6vw,48px)]">
            {FAQ.title}
          </SectionHeading>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line-strong">
            {FAQ.items.map((item, i) => (
              <AccordionItem key={item.q} value={String(i)} className="border-line-strong">
                <AccordionTrigger className="items-center py-6 text-[19px] font-normal tracking-[-0.01em] text-fg hover:no-underline md:py-7 md:text-[24px] [&>svg]:size-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[60ch] pb-7 text-[16px] leading-[1.6] text-muted md:text-[18px]">
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
