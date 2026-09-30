import { ScaledFrame } from "@/components/blocks/scaled-frame"
import { DashboardMock } from "@/components/mock/dashboard-mock"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { SHOWCASE } from "@/content"
import { pexels } from "@/lib/photos"

/**
 * The team view, set on a sunlit desk: the dashboard rises out of the
 * bottom of a photograph, and a lagoon strip under it makes the ask.
 */
export function Showcase() {
  return (
    <section id="teams" className="border-y border-line bg-card-soft">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative overflow-hidden px-4 pt-14 sm:px-10 md:px-[8%] md:pt-24">
          <ParallaxImage src={pexels(SHOWCASE.photo, 1800)} alt="A sunlit desk with a laptop by a window" />
          <Reveal y={40} className="relative">
            <ScaledFrame width={1320}>
              <DashboardMock />
            </ScaledFrame>
          </Reveal>
        </div>
        <div data-nav-tone="night" className="flex flex-col gap-6 bg-lagoon px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between md:py-10">
          <p className="text-[clamp(20px,2vw,26px)] leading-[1.3] tracking-[-0.01em] text-night-fg">
            {SHOWCASE.lineOne}
            <br />
            <span className="text-night-muted">{SHOWCASE.lineTwo}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#cta" size="lg" className="h-12 rounded-full bg-go px-6 text-[17px] text-lagoon shadow-none hover:bg-go-hover">
              {SHOWCASE.primary}
            </ButtonLink>
            <ButtonLink href="#cta" size="lg" className="h-12 rounded-full border-2 border-go bg-transparent px-6 text-[17px] text-go shadow-none hover:bg-go/10">
              {SHOWCASE.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
