import { motion, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { NoteCard } from "@/components/mockups/note-card"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SurfaceCard } from "@/components/ui/surface-card"
import { MEMORY } from "@/content"
import { EASE } from "@/lib/easing"

/** Where the notes land: one shared memory, a fan of notes, three things it does. */
export function Memory() {
  return (
    <section id="memory" className="scroll-mt-24 pt-4">
      <Container>
        <Reveal>
          <SurfaceCard size="large" className="flex flex-col items-center px-5 pt-14 pb-14 sm:px-10 sm:pt-20 sm:pb-16">
            {/* The violet wash — a single pulse of colour along the top edge. */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--gradient-wash)" }} />
            <SectionHeading align="center" eyebrow={MEMORY.eyebrow} title={MEMORY.title} className="max-w-[720px]" />
            <NoteFan className="mt-10 sm:mt-14" />
            <ol className="mt-12 flex w-full max-w-[560px] flex-col gap-5 text-body">
              {MEMORY.points.map((point, index) => (
                <li key={point} className="flex items-baseline justify-between gap-6 text-bone">
                  {point}
                  <span className="text-ash tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
            <ArrowLink href="#memory" className="mt-10">
              {MEMORY.link}
            </ArrowLink>
          </SurfaceCard>
        </Reveal>
      </Container>
    </section>
  )
}

const FAN = [
  { finish: "void", angle: -38, x: -150, y: 26, title: "Hiring sync", date: "Mon · 30 min" },
  { finish: "graphite", angle: -22, x: -80, y: 4, title: "Client kickoff", date: "Mon · 48 min" },
  { finish: "raised", angle: -8, x: -12, y: -8, title: "Design crit", date: "Tue · 41 min" },
  { finish: "glass", angle: 6, x: 54, y: -6, title: "Standup", date: "Wed · 12 min" },
  { finish: "snow", angle: 22, x: 124, y: 12, title: "Weekly planning", date: "Thu · 32 min" },
] as const

/**
 * Five meeting notes that spread from a neat stack into a fan the first time
 * they scroll into view. Purpose: explanation — one memory, every meeting.
 * `spread` scales the fan; 0 keeps them stacked.
 */
export function NoteFan({ spread = 1, stagger = 0.05, className }: { spread?: number; stagger?: number; className?: string }) {
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
              <NoteCard finish={card.finish} title={card.title} date={card.date} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
