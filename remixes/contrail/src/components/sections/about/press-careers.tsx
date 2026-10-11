import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const FACTS = [
  ["Founded", "2020, Lisbon"],
  ["Travellers", "3 million"],
  ["Team", "41 people, 3 offices"],
  ["Airlines covered", "1,000+"],
]

const ROLES = [
  { title: "Senior iOS engineer", where: "Lisbon or remote (EU)", body: "Own the flight screen — the one people open at the gate with 4% battery. SwiftUI, performance and a lot of care about the first 300 milliseconds." },
  { title: "Data scientist, delay prediction", where: "Montréal", body: "Improve how we model delays rolling from one airport to the next. You'll work with dispatchers who can tell you why a prediction was wrong." },
  { title: "Support specialist, Japanese & English", where: "Kyoto", body: "Help travellers in the moment it matters. Shifts are designed around flight banks, not office hours." },
]

/** Press facts, a link to the brand assets, and who we're hiring. */
export function PressCareers() {
  return (
    <section id="press" data-theme="day" className="bg-page pb-section">
      <Container className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="type-eyebrow text-violet">Press</p>
          <h2 className="type-display mt-4 max-w-[14ch] text-h2 text-balance">Writing about Contrail?</h2>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) bg-line">
            {FACTS.map(([k, v]) => (
              <div key={k} className="bg-panel p-5">
                <dt className="text-[13.5px] text-ink-3">{k}</dt>
                <dd className="mt-1 font-data text-[22px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/brand" variant="ink">Logos and brand <ArrowUpRight /></ButtonLink>
            <ButtonLink href="mailto:press@contrail.app" variant="outline">press@contrail.app</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="type-eyebrow text-violet">Careers</p>
          <h2 className="type-display mt-4 max-w-[14ch] text-h2 text-balance">Come make flying calmer.</h2>
          <Accordion type="single" collapsible className="mt-6">
            {ROLES.map((r) => (
              <AccordionItem key={r.title} value={r.title} className="border-line">
                <AccordionTrigger className="py-5 hover:no-underline">
                  <span className="flex flex-col text-left">
                    <span className="text-[17px] font-semibold">{r.title}</span>
                    <span className="text-[14px] font-normal text-ink-3">{r.where}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[16px] text-ink-2">
                  {r.body}
                  <a href={`mailto:jobs@contrail.app?subject=${encodeURIComponent(r.title)}`} className="mt-3 flex w-fit items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                    Apply by email <ArrowUpRight className="size-4" />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
