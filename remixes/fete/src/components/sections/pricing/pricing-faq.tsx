import { SectionHeading } from "@/components/blocks/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const FAQ = [
  { q: "Is Fête really free for free events?", a: "Yes. No fee per guest, no cap on events, no trial that runs out. We make money when you sell tickets, or when you choose Plus." },
  { q: "When do I get paid?", a: "Two business days after each event, straight to your bank. On Plus you can take payouts as tickets sell." },
  { q: "Who pays the fee — me or my guests?", a: "You choose. Absorb it into the price, or pass it on and guests see it at checkout before they pay." },
  { q: "Can I bring my mailing list?", a: "Import a CSV, or connect the tool you already use. Your guests stay yours — export them any time, in one click." },
  { q: "What happens if I cancel an event?", a: "One button refunds every ticket, card fees included on Plus, and tells every guest — kindly." },
  { q: "Do you take a cut of donations?", a: "No. Pay-what-you-like and donation tickets carry card fees only, on every plan." },
]

/** The questions people ask before they host with money involved. */
export function PricingFaq() {
  return (
    <section className="pb-section">
      <Container className="grid max-w-[1080px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading size="loud" title="Questions," continuation="answered plainly." className="mb-0 md:mb-0" />
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-b border-line">
              <AccordionTrigger className="py-5 text-[18px] font-medium tracking-[-0.016em] text-ink hover:no-underline [&>svg]:size-5">{f.q}</AccordionTrigger>
              <AccordionContent className="max-w-[56ch] pb-6 text-[16px] leading-relaxed text-ink-3">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
