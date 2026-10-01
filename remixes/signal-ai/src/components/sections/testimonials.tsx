import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TestimonialCard } from "@/components/ui/testimonial-card"

const QUOTES = [
  { quote: "We moved our support copilot to Vantage on a Tuesday and had it in front of customers by Thursday.", name: "Maya Lindqvist", role: "Head of Platform, Northwind Health" },
  { quote: "Latency stopped being a topic in our roadmap meetings. That alone paid for the switch.", name: "Dario Okonkwo", role: "CTO, Parcelwise" },
  { quote: "One API for text, voice and images let us delete three vendors and a lot of glue code.", name: "Priya Raman", role: "Staff Engineer, Lumen Studio" },
]

const STATS = [
  { to: 400, suffix: "M+", label: "requests served every day" },
  { to: 200, suffix: "K", label: "GPUs in one training cluster" },
  { to: 12, suffix: "", label: "regions, with failover" },
]

/** What teams say, then the scale behind it in three counted figures. */
export function Testimonials() {
  return (
    <section id="customers" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <SectionHeading title="Teams that ship, on Vantage" sub="From two-person startups to regulated enterprises." />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <TestimonialCard {...q} />
            </Reveal>
          ))}
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 text-center sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <dt className="text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-normal tracking-[-0.04em]">
                <CountUp to={s.to} suffix={s.suffix} delay={i * 0.12} />
              </dt>
              <dd className="mt-3 text-[11px] text-ink-3">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
