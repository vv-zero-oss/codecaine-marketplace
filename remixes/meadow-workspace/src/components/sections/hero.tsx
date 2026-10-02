import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { AppWindow } from "@/components/mocks/app-window"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The hero: a sky that fades into a meadow, the promise in the display serif,
 * and the product itself rising out of the bottom edge. The window is the
 * proof, so it is drawn from the same components as the real thing.
 */
export function Hero({
  title = "Open space for the work that matters",
  description = "Meadow gathers your inbox, conversations, customers and projects into one quiet workspace — with an assistant that tends the busywork while you get on with the good part.",
  badge = "Take the two-minute tour",
}: {
  title?: string
  description?: string
  badge?: string
}) {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as const },
        }
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-sky-300">
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[46%] w-full object-cover object-[50%_88%] [mask-image:linear-gradient(to_bottom,transparent,black_38%)] opacity-90"
      />
      <Container className="flex flex-col items-center pt-28 text-center sm:pt-32">
        <motion.a
          {...rise(0)}
          href="#overview"
          className="inline-flex h-7 items-center gap-1.5 rounded-md bg-surface/95 px-2 text-[12px] font-semibold shadow-card transition-transform duration-150 active:scale-95"
        >
          <img src="/images/avatar-1.jpg" alt="" className="size-4 rounded-[3px] object-cover" />
          {badge}
        </motion.a>
        <motion.h1
          {...rise(0.06)}
          className="mt-5 max-w-[760px] font-display text-[clamp(40px,8vw,64px)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-white drop-shadow-[0_2px_24px_rgb(30_90_170/0.25)]"
        >
          {title}
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-pretty text-white/90 sm:text-[17px]">
          {description}
        </motion.p>
        <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap justify-center gap-2.5">
          <ButtonLink href="#start" size="lg">
            Sign up
          </ButtonLink>
          <ButtonLink href="#start" variant="light" size="lg">
            Talk to sales <ArrowUpRight className="opacity-50" />
          </ButtonLink>
        </motion.div>
        <motion.div {...rise(0.3)} className="mt-14 w-full max-w-[900px] sm:mt-[72px]">
          <AppWindow className="h-[380px] sm:h-[440px]" />
        </motion.div>
      </Container>
    </section>
  )
}
