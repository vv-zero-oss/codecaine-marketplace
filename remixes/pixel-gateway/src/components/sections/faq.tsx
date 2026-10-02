import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FAQ } from "@/content"

export function Faq() {
  return (
    <section id="faq" className="bg-bg py-phi-6 sm:py-phi-7">
      <Container className="grid gap-phi-5 lg:grid-cols-[1fr_1.618fr]">
        <SectionHeading kicker="hint book" title="Questions, answered." blurb="Not here? Book a demo and ask a person." />
        <Accordion type="single" collapsible defaultValue="item-0" className="grid gap-phi-2">
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
