import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The last ask: the hero's sky again, so the page ends where it began. */
export function Cta({
  title = "Spend this week in the meadow",
  description = "Connect your inbox in two minutes and let the first morning briefing show you what the assistant can do.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section id="cta" className="bg-page px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-[var(--radius-section)] bg-gradient-to-b from-sky-400 to-sky-300 py-16 text-center sm:py-24">
        <img src="/images/hero.jpg" alt="" aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full object-cover object-[50%_90%] [mask-image:linear-gradient(to_bottom,transparent,black_60%)] opacity-80" />
        <Container>
          <Reveal className="flex flex-col items-center gap-5">
            <h2 className="max-w-[640px] font-display text-[clamp(34px,6vw,56px)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-white drop-shadow-[0_2px_20px_rgb(30_90_170/0.25)]">{title}</h2>
            <p className="max-w-[460px] text-[15px] leading-relaxed text-white/90 sm:text-[17px]">{description}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2.5">
              <ButtonLink href="#pricing" size="lg">Sign up free</ButtonLink>
              <ButtonLink href="#footer" variant="light" size="lg">Talk to sales <ArrowUpRight className="opacity-50" /></ButtonLink>
            </div>
            <p className="text-[12px] text-white/80">No card needed · Cancel any time</p>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
