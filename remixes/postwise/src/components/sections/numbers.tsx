import { ArrowDown, Info } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { NUMBERS } from "@/content"

/** One figure in the band: a quiet label over a number set in mono. */
export function Stat({ label = "", value = "" }: { label?: string; value?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] text-ink-muted md:text-[17px]">{label}</p>
      <p className="font-mono text-[clamp(30px,3vw,42px)] leading-none tracking-[-0.02em] text-ink">{value}</p>
    </div>
  )
}

/**
 * The page's numbers, framed by hairlines: a statement on the left, three
 * figures on the right, a vertical rule between them.
 */
export function Numbers() {
  return (
    <section id="numbers" className="py-10 md:py-16">
      <Container className="max-w-[1240px]">
        <div className="grid border-y border-line md:grid-cols-2 md:border-x">
          <Reveal className="flex flex-col justify-between gap-10 py-8 md:px-10 md:py-12">
            <p className="text-[19px] leading-[1.4] tracking-[-0.01em] text-ink md:text-[21px]">
              {NUMBERS.statement[0]}
              <br />
              {NUMBERS.statement[1]}
            </p>
            <a
              href="#copilot"
              aria-label="Keep reading"
              className="grid h-7 w-12 place-items-center rounded-full bg-paper-deep text-ink transition-colors duration-(--duration-hover) hover:bg-line-strong"
            >
              <ArrowDown className="size-3.5" />
            </a>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-8 border-t border-line py-8 md:border-t-0 md:border-l md:px-10 md:py-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {NUMBERS.stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
            <a href="#methodology" className="inline-flex w-fit items-center gap-2 text-[13px] text-ink-subtle transition-colors hover:text-ink">
              <Info className="size-4" strokeWidth={1.5} />
              {NUMBERS.note}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
