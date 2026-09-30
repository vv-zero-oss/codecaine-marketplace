import { motion, useReducedMotion } from "motion/react"

import { HeadlineReveal } from "@/components/motion/headline-reveal"
import { TryOnStage } from "@/components/three/try-on-stage"
import { ButtonLink } from "@/components/ui/button"
import { ease } from "@/lib/tokens"

/**
 * Hero — the light, drafting-paper opening: the headline written in across
 * the full width, the WebGL carousel of sketched looks standing in front of
 * it, and the line and two buttons under them.
 */
export function Hero({
  script = "Wear",
  rest = "it first",
  lede = "Try any outfit on your own photo, in any colour, before it's yours.",
}: {
  script?: string
  rest?: string
  lede?: string
}) {
  const reduced = useReducedMotion()
  return (
    <section id="top" className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-linen grid-paper">
      <div className="pointer-events-none absolute inset-x-0 top-[13svh] z-0 flex justify-center max-sm:top-[17svh]">
        <HeadlineReveal
          script={script}
          rest={rest}
          className="text-[clamp(4.25rem,17.4vw,19rem)] max-sm:text-[21vw]"
        />
      </div>

      <TryOnStage className="absolute inset-x-0 top-[9svh] bottom-[13svh] z-10" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: ease.out }}
        className="absolute inset-x-0 bottom-[max(2.5rem,5svh)] z-20 flex flex-col items-center gap-4 px-4 text-center"
      >
        <p className="text-[15px] text-ink max-sm:max-w-[18rem]">{lede}</p>
        <div className="flex gap-2">
          <ButtonLink href="#toolkit">Try it on</ButtonLink>
          <ButtonLink href="#stories" variant="outline">
            See how it fits
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  )
}
