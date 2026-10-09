import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { Reveal } from "@/components/motion/reveal"

const FAQS = [
  { q: "Can Tally move my money?", a: "No. The connection is read-only, so Tally can see balances and payments and nothing else. There is no way for it to send, pull or schedule a transfer." },
  { q: "Which banks does it work with?", a: "More than 12,000 banks and credit unions. If yours is not on the list when you search, tell us from the app and we will say honestly when it is coming." },
  { q: "Where is my data kept?", a: "Encrypted, on servers in your own region. We never sell it, never use it for ads, and delete an account’s history the moment you disconnect it." },
  { q: "Is the free plan really free?", a: "Yes. Two linked accounts, automatic categories, search and the monthly view cost nothing, with no card needed. Plus adds depth, not a paywall around the basics." },
  { q: "What if I want to leave?", a: "Export your statements, switch every account off, and delete your profile from Settings. It takes about a minute, and nothing is kept." },
]

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Display>Questions, answered.</Display>
          <p className="mt-5 max-w-sm text-lg text-ink-600">
            Still wondering? Write to <a href="#download" className="font-semibold text-brand-600 underline-offset-4 hover:underline">help@tally.money</a> and a person replies within a day.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="py-5 text-lg font-bold tracking-tight">{item.q}</AccordionTrigger>
                <AccordionContent className="max-w-xl text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
