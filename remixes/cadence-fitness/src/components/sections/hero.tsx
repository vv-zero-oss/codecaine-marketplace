import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { PillBurst } from "@/components/motion/pill-burst"
import { Laurel } from "@/components/sections/laurel"
import { CadenceMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const LAURELS = ["Best fitness app, 2026", "Editors’ pick", "Design award finalist", "Top recovery tracker", "Runners’ favourite"]

/**
 * The opening: a three-line block-letter headline, its middle line in lime.
 * Quiet until touched — click anywhere and the ways people actually move
 * burst out of the pointer and fall away (see `PillBurst`).
 */
export function Hero({
  line1 = "Every heartbeat,",
  line2 = "quietly",
  line3 = "understood.",
  subhead = "Heart rate, sleep, HRV and every workout, read the moment you move.",
  cta = "Start free",
}: {
  line1?: string
  line2?: string
  line3?: string
  subhead?: string
  cta?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] as const },
        }

  return (
    <section id="top" className="relative">
      <PillBurst className="cursor-crosshair pt-[calc(var(--banner-offset)+96px)] pb-14 md:pt-[calc(var(--banner-offset)+110px)] md:pb-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <motion.h1 {...rise(0)} className="type-display text-hero text-headline">
              {line1}
              <br />
              <span className="text-action">{line2}</span>
              <br />
              {line3}
            </motion.h1>
            <motion.p {...rise(0.15)} className="mt-7 max-w-[34ch] text-lead text-balance text-fg-2">
              {subhead}
            </motion.p>
            <motion.div {...rise(0.28)} className="mt-9">
              <ButtonLink href="#pricing" size="lg" className="pl-3">
                <CadenceMark className="size-6 rounded-full bg-forest-ink text-action" />
                {cta}
              </ButtonLink>
            </motion.div>
          </div>

        <motion.ul {...rise(0.45)} className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-4 md:mt-16 lg:gap-x-7">
          {LAURELS.map((title) => (
            <li key={title}>
              <Laurel title={title} />
            </li>
          ))}
        </motion.ul>
        </Container>
      </PillBurst>
    </section>
  )
}
