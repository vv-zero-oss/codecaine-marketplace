import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { FloatingPill } from "@/components/motion/floating-pill"
import { Laurel } from "@/components/sections/laurel"
import { KeelMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const LAURELS = ["Best new money app, 2026", "Editors’ pick", "Design award finalist", "Top budgeting tool", "Readers’ favourite"]

/**
 * The opening: a three-line headline in brushed silver, ringed by the
 * categories a life actually spends on, drifting at different depths.
 */
export function Hero({
  line1 = "Every dollar,",
  line2 = "calmly",
  line3 = "accounted for.",
  subhead = "Checking, cards, savings and investments, sorted the moment they move.",
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
    <section id="top" className="relative overflow-hidden pt-[calc(var(--banner-offset)+96px)] pb-10 md:pt-[calc(var(--banner-offset)+110px)]">
      <Container>
        <div className="relative">
          <FloatingPill label="Travel" icon="plane" colour="green" x={-32} y={-42} rotate={22} blur={3} depth={0.5} delay={0.1} className="max-sm:hidden" />
          <FloatingPill label="Night out" icon="night" colour="violet" x={30} y={-44} rotate={-18} blur={2.5} depth={0.6} delay={0.25} />
          <FloatingPill label="Groceries" icon="basket" colour="red" x={42} y={-31} rotate={14} depth={1.2} delay={0.05} className="max-sm:hidden" />
          <FloatingPill label="Fitness" icon="gym" colour="slate" x={-43} y={-6} rotate={-4} blur={1.5} depth={0.8} delay={0.3} className="max-sm:hidden" />
          <FloatingPill label="Pets" icon="pets" colour="pink" x={42} y={13} rotate={-14} blur={0.5} depth={1.1} delay={0.15} className="max-sm:hidden" />
          <FloatingPill label="Home" icon="house" colour="orange" x={-38} y={31} rotate={-16} blur={1} depth={0.9} delay={0.2} />
          <FloatingPill label="Gifts" icon="gift" colour="orange" x={41} y={39} rotate={16} blur={1.2} depth={0.7} delay={0.35} className="max-sm:hidden" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h1 {...rise(0)} className="type-display text-hero text-silver">
              {line1}
              <br />
              {line2}
              <br />
              {line3}
            </motion.h1>
            <motion.p {...rise(0.15)} className="mt-7 max-w-[34ch] text-lead text-balance text-fg">
              {subhead}
            </motion.p>
            <motion.div {...rise(0.28)} className="mt-9">
              <ButtonLink href="#pricing" size="lg" className="pl-2.5">
                <KeelMark className="size-6 rounded-[7px] text-blue" />
                {cta}
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        <motion.ul {...rise(0.45)} className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-4 md:mt-16 lg:gap-x-7">
          {LAURELS.map((title) => (
            <li key={title}>
              <Laurel title={title} />
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
