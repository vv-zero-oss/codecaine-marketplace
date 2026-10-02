import { Container } from "@/components/ui/container"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"

const STATS: { value?: number; prefix?: string; suffix?: string; text?: string; small?: string; label: string }[] = [
  { value: 12000, suffix: "+", label: "banks and credit unions connect" },
  { text: "2.4M", label: "payments matched every day" },
  { text: "4.8", small: " / 5", label: "from people who stayed past month one" },
  { value: 0, prefix: "$", label: "ever moved by Tally. Read-only, always" },
]

/** Four large figures. Each counts up once, when it is seen. */
export function Numbers() {
  return (
    <section className="border-y border-ink-100 bg-white py-14 sm:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col-reverse gap-2">
                <dt className="max-w-[14rem] text-sm text-ink-600 sm:text-base">{stat.label}</dt>
                <dd className="tabular text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap">
                  {stat.text ? stat.text : <CountUp value={stat.value ?? 0} prefix={stat.prefix ?? ""} suffix={stat.suffix} duration={1.6} />}
                  {stat.small ? <span className="text-[0.45em] font-bold tracking-normal text-ink-400">{stat.small}</span> : null}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
