import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { InviteCard } from "@/components/mock/invite-card"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

const TONIGHT = [
  ["Lisbon", "Cocktail Hour, Vol. 9"],
  ["Brooklyn", "Poker Night"],
  ["Seoul", "Records Only"],
  ["Mexico City", "Golden Hour Rooftop"],
  ["Melbourne", "Long Table Supper"],
  ["Berlin", "Hack Night 042"],
] as const

/** A figure that keeps ticking, the way a real count does on a Friday. */
function LiveCount({ start = 48210, everyMs = 1400 }: { start?: number; everyMs?: number }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [n, setN] = useState(start)
  useEffect(() => {
    if (reduced || designing) return
    const id = window.setInterval(() => setN((v) => v + 1 + Math.floor(Math.random() * 3)), everyMs)
    return () => window.clearInterval(id)
  }, [reduced, designing, everyMs])
  return (
    <span className="relative inline-flex overflow-hidden tabular-nums">
      <motion.span key={n} initial={reduced ? false : { y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}>
        {n.toLocaleString("en-US")}
      </motion.span>
    </span>
  )
}

/**
 * The guest's side. A real invitation to answer — tap Going, bring a friend,
 * get a ticket — beside a count of everyone else saying yes this week.
 */
export function SayYes() {
  return (
    <section id="rsvp" className="relative overflow-hidden py-section">
      <Container className="grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_440px] lg:gap-20">
        <div>
          <SectionHeading size="loud" eyebrow="For guests" title="Say yes in one tap." continuation="No account, no app, no fuss." className="mb-10 md:mb-12" />
          <Reveal delay={0.1}>
            <p className="max-w-[44ch] text-lead text-ink-3">
              Every Fête invite answers itself: a name, a plus-one, done. Your ticket is the code on your phone, and the host knows you’re coming before you’ve put it away.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-12 flex items-end gap-4">
            <p className="text-[clamp(53.29px,7vw,86.23px)] leading-none font-semibold tracking-[-0.05em] text-ink">
              <LiveCount />
            </p>
            <p className="mb-2 max-w-[14ch] text-[15px] leading-snug text-ink-3">
              <span className="mr-1.5 inline-block size-2 rounded-full bg-signal-green motion-safe:animate-pulse-dot" />
              people said yes this week
            </p>
          </Reveal>
        </div>
        <Reveal y={40} delay={0.1}>
          <InviteCard />
        </Reveal>
      </Container>
      <Marquee speed={46} className="mt-20 border-y border-line py-4 md:mt-28">
        {TONIGHT.map(([city, name]) => (
          <span key={city} className="flex items-center gap-3 px-6 text-[17px] whitespace-nowrap text-ink-3">
            <span className="text-ink">{city}</span> {name}
            <span aria-hidden className="ml-6 size-1.5 rounded-full flare-fill" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
