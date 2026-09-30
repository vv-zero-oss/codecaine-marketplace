import { motion, useReducedMotion } from "motion/react"

import { AvatarCloud, Duotone, LockCard, PayPattern, WordmarkCard } from "@/components/media/media"
import { CycleStack } from "@/components/motion/cycle-stack"
import { FloatingCard } from "@/components/motion/floating-card"
import { FlightSlot } from "@/components/motion/scroll-flight"
import { CLIENTS, PERSON, pexels } from "@/content"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

const card = "aspect-[4/5] w-full rounded-[var(--radius-media)] shadow-[var(--shadow-float)]"

/** A client's name set as its mark, on a white card — one face of a hero card. */
export function ClientFace({ index, className }: { index: number; className?: string }) {
  const client = CLIENTS[index % CLIENTS.length]
  return (
    <div className={cn("flex items-center justify-center bg-ink px-3 text-night", className)}>
      <span className={cn("text-center text-lg leading-none", client.style)}>{client.name}</span>
    </div>
  )
}

/**
 * The intro, alone in the middle of the screen, with the work hung round it.
 *
 * On a wide screen three of the cards are `FlightSlot`s: the first projects'
 * pictures start there and fly into the work grid as you scroll (see
 * `ScrollFlight`). The rest are `FloatingCard`s that drift and rise away.
 */
export function HomeHero({
  intro = PERSON.intro,
  based = PERSON.based,
}: {
  intro?: string
  based?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative flex min-h-[max(40rem,calc(100svh-4.5rem))] items-center justify-center">
      {/* Wide screens: the parking spots for the three pictures that fly. */}
      <FlightSlot id="crowdline" top="7%" left="-1.5%" rotate={-14} />
      <FlightSlot id="tapwise" top="10%" right="-1.5%" rotate={11} />
      <FlightSlot id="open-floor" top="68%" left="-1%" rotate={-8} className="w-44" />

      {/* Small screens: the same three, just hanging there. */}
      <FloatingCard top="4%" left="-6%" rotate={-12} size="sm" className="lg:hidden">
        <AvatarCloud className={card} />
      </FloatingCard>
      <FloatingCard top="6%" right="-7%" rotate={10} size="sm" delay={0.35} className="lg:hidden">
        <PayPattern className={card} />
      </FloatingCard>

      <FloatingCard top="80%" left="-7%" rotate={-9} size="sm" delay={0.45} className="sm:hidden">
        <Duotone src={pexels(5807613, 400)} alt="Cyclists racing on an open road" tone="mint" className={card} />
      </FloatingCard>

      {/* The cards that stay behind. */}
      <FloatingCard top="76%" left="11%" rotate={6} size="md" delay={0.4} driftSeconds={8} className="max-lg:hidden">
        <LockCard className={card} />
      </FloatingCard>
      <FloatingCard top="52%" right="-2%" rotate={12} size="lg" delay={0.3} driftSeconds={9} className="max-sm:hidden">
        <Duotone src={pexels(5807613, 600)} alt="Cyclists racing on an open road" tone="mint" className={card} />
      </FloatingCard>
      <FloatingCard top="80%" left="58%" rotate={-3} size="md" delay={0.5} drift={8}>
        <CycleStack interval={3.4}>
          <WordmarkCard word="Halden" sub="Homes" className={card} />
          <ClientFace index={3} className={card} />
          <ClientFace index={4} className={card} />
          <ClientFace index={6} className={card} />
        </CycleStack>
      </FloatingCard>

      <motion.div
        className="relative z-20 max-w-[42rem] px-6 text-center"
        initial={reduce ? false : { opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        transition={{ duration: 0.6, ease: ease("out") }}
      >
        <h1 className="text-[clamp(1.25rem,1rem+1vw,1.55rem)] leading-[1.28] font-normal tracking-[-0.012em] text-balance text-ink">
          {intro}
        </h1>
        <p className="mt-4 text-[clamp(1.25rem,1rem+1vw,1.55rem)] leading-[1.28] tracking-[-0.012em] text-lime">{based}</p>
      </motion.div>
    </section>
  )
}
