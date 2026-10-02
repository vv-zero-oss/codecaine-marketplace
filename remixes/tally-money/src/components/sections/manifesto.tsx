import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { SpinningCoin } from "@/components/motion/coin"

/** The closing argument, and the last thing to ask for. */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container className="relative">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-ink-600 uppercase">Our goal</p>
          <h2 className="mt-2 text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">
            To separate anxiety from money.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-900/85 sm:text-lg">
            Salt and pepper, tea and biscuits, rent and Friday are desirable pairs. An undesirable
            pair is money and anxiety. Does it have to be this way? What can software and good
            design, in their limited reach, do to pull the pair apart? That is the question we asked
            ourselves.
          </p>
          <ButtonLink href="#download" variant="primary" size="lg" className="mt-8">
            Read our manifesto <ArrowRight />
          </ButtonLink>
        </Reveal>
        <SpinningCoin className="mt-12 w-28 sm:absolute sm:top-6 sm:right-4 sm:mt-0 sm:w-36 lg:right-24 lg:w-44" />
      </Container>
      <Container className="mt-20 sm:mt-28">
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-ink-600 uppercase">You know,</p>
          <p className="mt-1 text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance">
            It’s just money.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
