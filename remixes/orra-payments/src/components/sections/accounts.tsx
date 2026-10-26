import { motion, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { OrraCard } from "@/components/mockups/orra-card"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SurfaceCard } from "@/components/ui/surface-card"
import { ACCOUNTS } from "@/content"
import { EASE } from "@/lib/easing"

/** Where the money lands: one account, a fan of cards, three things it does. */
export function Accounts() {
  return (
    <section id="accounts" className="scroll-mt-20 pt-5 md:pt-9">
      <Container>
        <Reveal>
          <SurfaceCard className="flex flex-col items-center px-5 pt-14 pb-14 sm:px-10 sm:pt-24 sm:pb-16">
            <SectionHeading eyebrow={ACCOUNTS.eyebrow} title={ACCOUNTS.title} className="max-w-[700px]" />
            <CardFan className="mt-10 sm:mt-14" />
            <ul className="mt-10 w-full max-w-[592px] border-t border-line text-center text-[15px] sm:text-base">
              {ACCOUNTS.points.map((point) => (
                <li key={point} className="border-b border-line py-2.5">
                  {point}
                </li>
              ))}
            </ul>
            <ArrowLink href="#accounts" className="mt-12">
              {ACCOUNTS.link}
            </ArrowLink>
          </SurfaceCard>
        </Reveal>
      </Container>
    </section>
  )
}

const FAN = [
  { finish: "tan", angle: -38, x: -150, y: 26 },
  { finish: "black", angle: -22, x: -80, y: 4 },
  { finish: "cream", angle: -8, x: -12, y: -8 },
  { finish: "ember", angle: 6, x: 54, y: -6 },
  { finish: "iris", angle: 22, x: 124, y: 12 },
] as const

/**
 * Five cards that spread from a neat stack into a fan the first time they
 * scroll into view. Purpose: explanation — one account, many cards.
 * `spread` scales the fan; 0 keeps them stacked.
 */
export function CardFan({ spread = 1, stagger = 0.05, className }: { spread?: number; stagger?: number; className?: string }) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing
  return (
    <div className={className} aria-hidden>
      <div className="relative h-[190px] w-[300px] scale-[0.78] sm:h-[220px] sm:w-[520px] sm:scale-100">
        {FAN.map((card, index) => {
          const open = `translate(${card.x * spread}px, ${card.y * spread}px) rotate(${card.angle * spread}deg)`
          return (
            <motion.div
              key={card.finish}
              className="absolute top-6 left-1/2 -ml-[100px] sm:-ml-[115px]"
              style={{ zIndex: index }}
              initial={still ? false : { transform: "translate(0px, 30px) rotate(0deg)", opacity: 0 }}
              whileInView={{ transform: open, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.8, delay: index * stagger, ease: EASE.out }}
            >
              <OrraCard finish={card.finish} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
