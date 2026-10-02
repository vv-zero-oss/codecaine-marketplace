import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { SectionIntro } from "@/components/sections/section-intro"
import { Container } from "@/components/ui/container"
import { Tag } from "@/components/ui/tag"
import { CIRCLE, STATS } from "@/content"

export function StatCell({
  tag,
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  tag: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}) {
  return (
    <div className="flex flex-col gap-10 border-l border-line px-4 py-3 sm:gap-14">
      <Tag className="self-start">{tag}</Tag>
      <div>
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} className="block text-4xl font-light tracking-[-0.04em] tabular-nums sm:text-[2.5rem]" />
        <p className="mt-2 text-[9px] tracking-[0.12em] text-fg-subtle uppercase">{label}</p>
      </div>
    </div>
  )
}

/** A name set in type, standing in for the institutions a circle like this knows. */
export function CircleName({ children, index }: { children: string; index: number }) {
  const serif = index % 3 === 1
  return (
    <span
      className={
        serif
          ? "mx-8 font-serif text-2xl whitespace-nowrap text-fg/80 italic sm:mx-12 sm:text-3xl"
          : "mx-8 text-lg font-semibold tracking-[0.08em] whitespace-nowrap text-fg/80 uppercase sm:mx-12 sm:text-xl"
      }
    >
      {children}
    </span>
  )
}

export function Network() {
  return (
    <section className="bg-ink py-20 sm:py-[18vh]">
      <Container>
        <SectionIntro
          before="From early momentum to"
          accent="lasting"
          after="influence."
          body="Our circle of investors spans world-class athletes, artists and entrepreneurs: people who shape culture, shift perspective and open doors."
        />
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-y-8 sm:mt-20 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.tag} delay={i * 0.08}>
              <StatCell {...stat} />
            </Reveal>
          ))}
        </div>
      </Container>
      <Reveal className="mt-20 sm:mt-28">
        <Marquee duration={60}>
          {CIRCLE.map((name, i) => (
            <CircleName key={name} index={i}>
              {name}
            </CircleName>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
