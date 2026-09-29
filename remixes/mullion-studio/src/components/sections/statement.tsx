import { CountUp } from "@/components/motion/count-up"
import { WordReveal } from "@/components/motion/word-reveal"
import { Container } from "@/components/ui/container"
import { SectionHead } from "@/components/ui/section-head"

const STATS = [
  { value: 11, suffix: "s", label: "Median time to edit one frame" },
  { value: 40, suffix: "×", label: "Faster than a retouching round-trip" },
  { value: 1.4, decimals: 1, suffix: "k", label: "Practices editing with Mullion" },
]

/**
 * Why it exists, in oversize type that inks itself in as it is read, and the
 * three numbers that back it up.
 */
export function Statement() {
  return (
    <section id="why" className="py-section" aria-labelledby="why-title">
      <Container>
        <SectionHead index="04" label="Why Mullion" />
        <h2 id="why-title" className="sr-only">
          Why Mullion
        </h2>
        <WordReveal
          className="mt-14 max-w-[26ch] text-[clamp(1.9rem,5.2vw,5.75rem)] leading-[1.02] font-extrabold tracking-[-0.045em]"
          text="Architecture is judged by its photographs long before anyone walks through the door. The weather on the day of the shoot should not get a vote."
        />
        <dl className="mt-20 grid gap-10 border-t border-hairline pt-8 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <dt className="order-2 text-ui uppercase tracking-ui text-muted">{stat.label}</dt>
              <dd className="order-1 text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
                <CountUp value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
