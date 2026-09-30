import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

export type Stat = { value: number; suffix?: string; decimals?: number; label: string; tone: string }

/** Big serif numbers that count up, on the night ground. */
export function StatBand({ eyebrow, title, stats }: { eyebrow: string; title: string; stats: Stat[] }) {
  return (
    <Section tone="night" className="night-grid">
      <Container>
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <Eyebrow className="text-night-muted">{eyebrow}</Eyebrow>
          <h2 className="font-serif text-title font-light text-balance text-night-ink">{title}</h2>
        </Reveal>
        <div className="mt-12 grid border-t border-l border-night-line md:mt-16 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="flex flex-col gap-4 border-r border-b border-night-line p-6 md:p-10">
              <span className={cn("size-2.5", s.tone)} />
              <p className="font-serif text-[4rem] leading-none font-light text-night-ink md:text-[5.5rem]">
                <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
              </p>
              <p className="text-[15px] text-night-ink/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
