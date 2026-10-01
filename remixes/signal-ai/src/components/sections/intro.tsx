import { PixelEdge } from "@/components/motion/pixel-edge"
import { Container } from "@/components/ui/container"

const base = import.meta.env.BASE_URL

/** A short note on why, then the people it is for, under a mosaic that clears into the photograph. */
export function Intro() {
  return (
    <section id="intro" className="pt-20 sm:pt-28">
      <Container className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 className="font-serif text-[clamp(2rem,4vw,2.6rem)] leading-none tracking-[-0.01em]">Intro</h2>
        <p className="max-w-xl text-[14px] leading-[1.7] text-ink-2">
          At Vantage, we believe the best models are the ones people actually build with. That is why we train on the largest cluster we can find, ship every capability through one API, and measure ourselves by what our customers put into production. We pair frontier research with hands-on engineering, so a team that starts with a prompt on Monday can have something running for real users by Friday. Safety, reliability and plain pricing are part of the product, not an afterthought.
        </p>
      </Container>
      <div className="relative mt-16 h-[320px] sm:h-[420px]">
        <img src={`${base}img/team.jpg`} alt="Five friends holding hands and running through tall grass under a pale sky" className="size-full object-cover" loading="lazy" />
        <PixelEdge edge="top" rows={4} cell={32} color="var(--sky)" altColor="var(--paper)" altShare={0.35} seed={4} density={0.9} />
      </div>
    </section>
  )
}
