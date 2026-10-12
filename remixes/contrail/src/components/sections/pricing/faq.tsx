import { ArrowUpRight, Building2 } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const QUESTIONS = [
  { q: "How can you predict a delay before the airline does?", a: "Most delays start somewhere else: the plane you'll board is late leaving the airport before yours, or weather or air traffic control is slowing that airport down. We follow the aircraft itself, the forecast and the official advisories, and model how they roll forward to your departure." },
  { q: "What happens after my free week?", a: "You choose. Stay on Free and keep live status, gates, friends and this year's passport — or keep Pro. Nothing renews without you saying yes first." },
  { q: "Do the people following my flights need Contrail?", a: "No. They can follow from a link in any browser, and it stops working when you land. If they do have Contrail, they get notifications too." },
  { q: "Which airlines and airports does it cover?", a: "Commercial flights worldwide: more than 1,000 airlines and every airport with scheduled passenger service. Codeshares are matched to the aircraft actually flying." },
  { q: "Can I import flights I've already taken?", a: "Yes. Forward old confirmations, connect a calendar, or add them by flight number and date. Pro keeps every year in your passport." },
  { q: "Is my travel data private?", a: "Your trips are visible to you and the people you choose, nobody else. We don't sell data and there's no advertising in the app." },
]

/** Questions people ask before they pay, and a word for teams. */
export function Faq() {
  return (
    <section id="faq" data-theme="day" className="bg-page pb-section">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="type-display max-w-[12ch] text-h2 text-balance">Questions, answered plainly.</h2>
          <div id="business" className="mt-10 rounded-(--radius-card) bg-panel p-6">
            <Building2 className="size-6 text-violet" strokeWidth={1.7} />
            <p className="mt-4 font-semibold">Contrail for teams</p>
            <p className="mt-1 text-[15px] text-ink-2">Travel managers see every trip in one place and get told when a delay will break a connection. From ten travellers.</p>
            <a href="mailto:teams@contrail.app" className="mt-4 inline-flex min-h-11 items-center gap-1 text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink">
              teams@contrail.app <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <Accordion type="single" collapsible defaultValue="q0">
            {QUESTIONS.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-[17px] font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[16px] leading-relaxed text-ink-2">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
