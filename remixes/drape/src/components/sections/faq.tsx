import { useCanvasAction } from "@canvas/react"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FAQS } from "@/content"

/** Faq — the questions people ask before they upload a photo of themselves. */
export function Faq({
  title = "Frequently asked questions",
  lede = "Anything else? Our team answers within a working day.",
}: {
  title?: string
  lede?: string
}) {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer open", (next) => setOpen((next ?? open !== "0") ? "0" : ""), { on: open === "0", group: "FAQ" })
  return (
    <section id="faq" className="bg-espresso py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <h2 className="max-w-xs font-display text-[clamp(2rem,4vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-cream">
            {title}
          </h2>
          <p className="mt-4 max-w-xs text-[14px] text-cream-2">{lede}</p>
          <ButtonLink href="mailto:hello@drape.example" size="sm" className="mt-6">
            Contact us
          </ButtonLink>
        </div>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
          {FAQS.map((item, index) => (
            <AccordionItem key={item.q} value={String(index)} className="border-line-dark">
              <AccordionTrigger className="min-h-14 items-center py-4 text-[15px] font-medium text-cream sm:text-base hover:text-cream-2">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-xl text-[14px] leading-relaxed text-cream-2">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
