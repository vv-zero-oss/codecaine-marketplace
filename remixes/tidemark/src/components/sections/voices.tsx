import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { VOICES } from "@/content"
import { avatar, pexels } from "@/lib/photos"

/** A short quote from a customer, with who said it. */
export function VoiceCard({ quote = "", name = "", role = "", photo = 39058025 }: { quote?: string; name?: string; role?: string; photo?: number }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-panel)] bg-card p-6 shadow-(--shadow-card)">
      <blockquote className="font-serif text-[24px] leading-[1.2] text-ink">“{quote}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <img src={avatar(photo)} alt={name} loading="lazy" className="size-10 rounded-full object-cover" />
        <span className="flex flex-col text-[13.5px] leading-tight">
          <span className="font-medium text-ink">{name}</span>
          <span className="text-ink-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Customers: one story told large, three told short. */
export function Voices() {
  const f = VOICES.featured
  return (
    <section id="stories" className="py-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={VOICES.eyebrow} title="Companies that stopped" accent="thinking" titleEnd="about their bank" />
        </Reveal>
        <Reveal y={32} className="mt-12 grid overflow-hidden rounded-[var(--radius-panel)] bg-forest text-forest-fg md:grid-cols-[0.9fr_1.1fr]">
          <img src={pexels(f.photo, 900, 900)} alt={`${f.name}, ${f.role}`} loading="lazy" className="aspect-square size-full object-cover md:aspect-auto" />
          <figure className="flex flex-col justify-between gap-10 p-7 md:p-12">
            <blockquote className="font-serif text-[clamp(28px,3vw,42px)] leading-[1.12]">“{f.quote}”</blockquote>
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-forest-line pt-6">
              <figcaption className="text-[14.5px] leading-tight">
                <span className="block font-medium">{f.name}</span>
                <span className="text-forest-muted">{f.role}</span>
              </figcaption>
              <div className="text-right">
                <p className="font-mono text-[22px] tracking-[-0.02em] text-lime">{f.stat.value}</p>
                <p className="text-[12.5px] text-forest-muted">{f.stat.label}</p>
              </div>
            </div>
          </figure>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {VOICES.items.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06}>
              <VoiceCard {...v} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
