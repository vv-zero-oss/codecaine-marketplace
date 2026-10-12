import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FAQ } from "@/content/pricing"

/**
 * The questions a buyer asks before they sign. One open at a time; the
 * first three are switches in the editor so each answer can be styled open.
 */
export function PricingFaq() {
  const [open, setOpen] = useState("")
  const flip = (q: string) => (next?: boolean) => setOpen((next ?? open !== q) ? q : "")
  useCanvasAction("FAQ: first answer", flip(FAQ[0].q), { on: open === FAQ[0].q, group: "Pricing FAQ" })
  useCanvasAction("FAQ: second answer", flip(FAQ[1].q), { on: open === FAQ[1].q, group: "Pricing FAQ" })
  useCanvasAction("FAQ: third answer", flip(FAQ[2].q), { on: open === FAQ[2].q, group: "Pricing FAQ" })

  return (
    <section className="py-(--spacing-section)">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <SectionHeading title="Questions," continuation="answered plainly." body="Still unsure? A person — not a bot — answers within the hour on weekdays." />
          <ButtonLink href="/pricing#signup" variant="outline" className="mt-6">Ask us anything</ButtonLink>
        </div>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-line">
              <AccordionTrigger className="min-h-14 py-5 text-[17px] font-medium hover:no-underline [&>svg]:size-5">{item.q}</AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-6 text-[16px] leading-relaxed text-ink-2">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
