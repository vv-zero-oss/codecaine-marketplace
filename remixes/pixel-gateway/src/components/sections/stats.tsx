import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { Container } from "@/components/ui/container"
import { STATS } from "@/content"

export function Stats() {
  return (
    <section id="stats" className="bg-bg py-phi-6 sm:py-phi-7">
      <Container>
        <dl className="grid gap-phi-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <TiltCard maxTilt={8} lift={8} className="h-full bg-surface p-phi-3 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                <dd className="font-display text-xl leading-none text-accent-hi [transform:translateZ(24px)]">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
                <dt className="mt-phi-2 text-base text-fg-muted">{stat.label}</dt>
              </TiltCard>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
