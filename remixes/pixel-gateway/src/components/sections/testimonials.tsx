import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TESTIMONIALS } from "@/content"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/lib/router"

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
    <section id="players" className="bg-bg py-phi-6 sm:py-phi-7">
      <Container>
        <SectionHeading kicker="player reviews" title="Teams that stopped thinking about it." />
        <div className="mt-phi-5 grid gap-phi-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <TiltCard maxTilt={9} lift={10} className="flex h-full flex-col gap-phi-3 bg-surface p-phi-3 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)] sm:p-phi-4">
                <Hearts count={t.hearts} />
                <blockquote className="text-lg leading-snug [transform:translateZ(22px)]">“{t.quote}”</blockquote>
                <figcaption className="mt-auto border-t-2 border-line pt-phi-2">
                  <p className="font-display text-label uppercase">{t.name}</p>
                  <p className="mt-1.5 font-mono text-lg text-fg-muted">{t.role}</p>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Link href="/customers" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-phi-5" })}>Read the case files</Link>
      </Container>
    </section>
  )
}
