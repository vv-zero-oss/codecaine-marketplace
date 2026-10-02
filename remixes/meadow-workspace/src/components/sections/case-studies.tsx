import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const CASES = [
  { image: "/images/case-ceramics.jpg", alt: "Hands shaping clay at a pottery wheel", company: "Kiln & Co.", kind: "Ceramics studio", metric: "11 hrs", result: "saved on orders and wholesale mail every week", quote: "Every wholesale enquiry now lands with its history attached." },
  { image: "/images/case-team.jpg", alt: "Colleagues working together at a laptop", company: "Larkfield", kind: "Operations team of 14", metric: "3×", result: "faster from first reply to signed contract", quote: "Nobody asks ‘where did we leave that?’ any more." },
  { image: "/images/case-market.jpg", alt: "A market stall with fresh produce", company: "Orchard Row", kind: "Grocery collective", metric: "−62%", result: "time spent chasing suppliers and invoices", quote: "The assistant does the chasing. We do the buying." },
]

/** Three customers, each with the number they would quote. A photo first, so
 *  the card reads as a person's business before it reads as a statistic. */
export function CaseStudies() {
  return (
    <section id="cases" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Teams already working in the meadow" description="Small shops, studios and growing companies, and what changed once the busywork stopped being theirs." />
        </Reveal>
        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {CASES.map((c, i) => (
            <li key={c.company}>
              <Reveal delay={i * 0.07} className="h-full">
                <a href="#cases" className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-card transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="overflow-hidden">
                    <img src={c.image} alt={c.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-[12px] text-ink-400"><span className="font-semibold text-ink-900">{c.company}</span> · {c.kind}</p>
                    <p className="font-display text-[40px] leading-none font-semibold tracking-[-0.045em] tabular-nums">{c.metric}</p>
                    <p className="text-[14px] leading-snug text-ink-500">{c.result}</p>
                    <p className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4 text-[13px] text-ink-700">
                      “{c.quote}”
                      <ArrowUpRight className="size-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
