import { CalendarCheck, Timer, Users } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { DashboardMock } from "@/components/blocks/dashboard-mock"
import { Frame } from "@/components/blocks/frame"
import { StartButton } from "@/components/blocks/start-button"
import { Button } from "@/components/ui/button"
import { hero } from "@/content"

const factIcons = { timer: Timer, number: Users, calendar: CalendarCheck }
const ease = [0.23, 1, 0.32, 1] as const

/**
 * First screen. The copy lands first and the product follows a beat later, so
 * the eye reads the promise before it studies the screenshot.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? "none" : "translateY(12px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.7, ease, delay },
  })

  return (
    <section className="relative overflow-hidden bg-surface pt-10 pb-16 md:pt-20 lg:pb-24">
      <DotField />
      <Frame className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-10">
        <div>
          <motion.p
            {...rise(0)}
            className="inline-flex h-6 items-center rounded-full bg-surface px-2.5 text-[11px] text-ink-soft shadow-button"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1 {...rise(0.06)} className="mt-4 text-display">
            <span className="font-normal text-ink-2">{hero.titleLight}</span>{" "}
            <span className="font-[650]">{hero.titleBold}</span>
          </motion.h1>
          <motion.p {...rise(0.12)} className="mt-4 max-w-[26rem] text-[14px] leading-relaxed text-ink-soft">
            {hero.body}
          </motion.p>
          <motion.div {...rise(0.18)} className="mt-6 flex flex-wrap items-center gap-2">
            <StartButton label={hero.primary} />
            <Button asChild variant="pill-ghost" size="cta">
              <a href="#">{hero.secondary}</a>
            </Button>
          </motion.div>
          <motion.ul {...rise(0.24)} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ink-faint">
            {hero.facts.map((f) => {
              const Icon = factIcons[f.icon as keyof typeof factIcons]
              return (
                <li key={f.label} className="flex items-center gap-1.5">
                  <Icon className="size-3.5" />
                  {f.strong && <strong className="font-semibold text-ink">{f.strong}</strong>}
                  {f.label}
                </li>
              )
            })}
          </motion.ul>
        </div>

        <motion.div {...rise(0.3)} className="lg:-mr-10 xl:-mr-24">
          <DashboardMock />
        </motion.div>
      </Frame>
    </section>
  )
}

/** The faint dot grid behind the hero's lower left, as on the reference. */
function DotField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-[max(0px,calc(50%-36rem))] hidden h-56 w-44 opacity-60 md:block"
      style={{
        backgroundImage: "radial-gradient(var(--ink-ghost) 1px, transparent 1.2px)",
        backgroundSize: "18px 18px",
        maskImage: "radial-gradient(ellipse at 20% 60%, black 20%, transparent 70%)",
      }}
    />
  )
}
