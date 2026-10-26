import { Reveal } from "@/components/motion/reveal"
import { SectionLabel } from "@/components/sections/section-label"
import { Container } from "@/components/ui/container"
import { Accent } from "@/components/ui/heading"

export function Principle({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="grid gap-3 border-t border-line py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6 sm:py-10">
      <span className="font-serif text-2xl text-fg-subtle italic tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.15] font-medium tracking-[-0.03em]">{title}</h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">{body}</p>
      </div>
    </div>
  )
}

/** What we believe, one per row, beside a heading that stays put while they
 *  scroll past it. */
export function Principles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <section id="principles" className="bg-ink py-20 sm:py-[14vh]">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>Principles</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">
            Six things we will <Accent>not</Accent> trade.
          </h2>
        </div>
        <ol>
          {items.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={0.05}>
                <Principle index={i} {...p} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/** The partners' names under the manifesto, set like signatures. */
export function Signatories({ people }: { people: { name: string; role: string }[] }) {
  return (
    <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
      {people.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08}>
          <p className="font-serif text-3xl italic">{p.name}</p>
          <p className="mt-1 text-[10px] tracking-[0.14em] text-fg-subtle uppercase">{p.role}</p>
        </Reveal>
      ))}
    </div>
  )
}
