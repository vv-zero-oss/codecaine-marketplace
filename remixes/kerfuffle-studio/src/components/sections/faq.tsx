import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { FAQ } from "@/content"

/** The questions people ask on the first call, answered before it. */
export function Faq({ id = "faq", index }: { id?: string; index?: string }) {
  const [open, setOpen] = useState<string>("")
  useCanvasAction("First question open", (on) => setOpen((on ?? open !== "q0") ? "q0" : ""), {
    group: "FAQ",
    on: open === "q0",
  })
  return (
    <section id={id} data-tone="light" className="scroll-mt-16 pb-section">
      <Container>
        <div className="grid gap-y-8 border-t border-line pt-5 md:grid-cols-12 md:gap-x-6">
          <p className="label md:col-span-3">
            {index ? <span className="mr-3 opacity-50">{index}</span> : null}
            Questions
          </p>
          <Reveal className="md:col-span-9">
            <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={`q${i}`} className="border-line first:border-t-0">
                  <AccordionTrigger className="rounded-none py-5 text-xl font-medium tracking-[-0.02em] hover:no-underline md:text-2xl [&>svg]:size-5 [&>svg]:text-ink-mute">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[60ch] pb-6 text-base leading-relaxed text-ink-soft">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
