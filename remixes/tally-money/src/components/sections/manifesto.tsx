import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Magnetic } from "@/components/motion/magnetic"
import { SpinningCoin } from "@/components/motion/coin"

/** The closing argument, and the last thing to ask for. */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-white py-20 sm:py-32">
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-ink-600 uppercase">Our goal</p>
          <Display className="mt-2">To separate anxiety from money.</Display>
          <p className="mt-6 text-lg leading-relaxed text-ink-900/85 sm:text-xl">
            Salt and pepper, tea and biscuits, rent and Friday are desirable pairs. An undesirable
            pair is money and anxiety. Does it have to be this way? What can software and good
            design, in their limited reach, do to pull the pair apart? That is the question we asked
            ourselves.
          </p>
          <Magnetic className="mt-8">
            <ButtonLink href="#download" variant="primary" size="lg">
              Read our manifesto <ArrowRight />
            </ButtonLink>
          </Magnetic>
        </Reveal>
        <SpinningCoin className="mt-12 w-40 sm:absolute sm:top-0 sm:right-4 sm:mt-0 sm:w-48 lg:right-20 lg:w-64" />
      </Container>
    </section>
  )
}
