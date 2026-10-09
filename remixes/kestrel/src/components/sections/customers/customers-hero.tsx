import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { CUSTOMER_STATS } from "@/content/customers"

/**
 * The customers page opens loud — the number first, set in the mega step —
 * and the four figures that back it up count in underneath.
 */
export function CustomersHero() {
  return (
    <section className="relative pt-16 pb-12 sm:pt-24">
      <div aria-hidden className="dot-grid absolute inset-x-0 top-0 h-[480px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container className="relative">
        <Reveal>
          <p className="type-eyebrow text-ink-2">Customers</p>
          <h1 className="type-head text-mega mt-5 max-w-[13ch] text-balance">
            40,000 teams <span className="text-ink-soft">took their time back.</span>
          </h1>
          <p className="text-lead mt-6 max-w-[44ch] text-ink-2">
            Corner shops and hospital groups, five-person startups and three-plant manufacturers. Here's what they did with it.
          </p>
        </Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-panel) bg-line lg:grid-cols-4">
          {CUSTOMER_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="bg-page p-5 sm:p-7">
              <dd className="text-h2 type-head">
                <CountUp value={s.value} prefix={s.prefix} decimals={s.decimals} duration={1.4} />
                <span className="text-ink-soft">{s.suffix}</span>
              </dd>
              <dt className="mt-2 max-w-[22ch] text-[14px] text-ink-3">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
