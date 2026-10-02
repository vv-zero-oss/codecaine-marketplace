import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TESTIMONIALS } from "@/content"

export function Hearts({ count = 5, of = 5 }: { count?: number; of?: number }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${count} out of ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <PixelSprite key={i} name="heart" scale={2} className={i < count ? "" : "opacity-20 grayscale"} />
      ))}
    </span>
  )
}

export function Testimonials() {
  return (
    <section id="players" className="bg-bg py-24 sm:py-32">
      <Container>
        <SectionHeading kicker="player reviews" title="Teams that stopped thinking about it." />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <TiltCard maxTilt={9} lift={10} className="flex h-full flex-col gap-6 bg-surface p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)] sm:p-8">
                <Hearts count={t.hearts} />
                <blockquote className="text-xl leading-snug [transform:translateZ(22px)]">“{t.quote}”</blockquote>
                <figcaption className="mt-auto border-t-2 border-line pt-4">
                  <p className="font-display text-[10px] uppercase">{t.name}</p>
                  <p className="mt-1.5 font-mono text-xl text-fg-muted">{t.role}</p>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
