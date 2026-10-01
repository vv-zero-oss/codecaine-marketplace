import { ArrowRight } from "lucide-react"

import { PixelEdge } from "@/components/motion/pixel-edge"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const CELL = 28
const ROWS = 4

/** The closing call: a sky field that dissolves into the page above and below: a wash fades it out and a pixel band breaks the edge. */
export function CallToAction() {
  return (
    <section id="cta">
      <div className="relative bg-gradient-to-b from-paper to-sky" style={{ height: ROWS * CELL }} aria-hidden data-canvas-ignore>
        <PixelEdge edge="bottom" rows={ROWS} cell={CELL} seed={21} density={1} solidEdge />
      </div>
      <div className="bg-sky py-16 sm:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.92] tracking-[-0.02em] text-balance">Start building with Vantage today</h2>
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-ink-2">Free credits, one API key, and an answer in your first request.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <ButtonLink href="#start" size="lg">
                Get API Access <ArrowRight />
              </ButtonLink>
              <ButtonLink href="#start" variant="outline" size="lg">
                Contact Sales
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </div>
      <div className="relative bg-gradient-to-b from-sky to-paper" style={{ height: ROWS * CELL }} aria-hidden data-canvas-ignore>
        <PixelEdge edge="top" rows={ROWS} cell={CELL} seed={33} density={1} solidEdge />
      </div>
    </section>
  )
}
