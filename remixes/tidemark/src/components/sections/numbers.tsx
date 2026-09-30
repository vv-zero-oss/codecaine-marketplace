import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { NUMBERS } from "@/content"

/** One figure: a big mono number over the line that explains it. */
export function Figure({ value = "", label = "" }: { value?: string; label?: string }) {
  return (
    <div className="flex flex-col gap-3 py-8 md:px-8 md:py-10 md:first:pl-0">
      <p className="font-mono text-[clamp(34px,3.6vw,48px)] leading-none tracking-[-0.04em] text-ink">{value}</p>
      <p className="max-w-[220px] text-[14.5px] leading-snug text-ink-muted">{label}</p>
    </div>
  )
}

/** The numbers, four across between hairlines. */
export function Numbers() {
  return (
    <section id="numbers" className="py-8 md:py-12">
      <Container>
        <Reveal className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {NUMBERS.map((n) => (
            <Figure key={n.label} {...n} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
