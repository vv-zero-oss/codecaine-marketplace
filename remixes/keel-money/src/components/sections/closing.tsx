import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { DashboardMock } from "@/components/mock/dashboard"
import { Laptop, ScaledScreen, Tablet, Wallpaper } from "@/components/mock/devices"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { KeelMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The last word: a short promise on the left and Keel on every screen on the
 * right, the devices drifting apart a little as the section scrolls through —
 * enough to feel like depth, not enough to watch.
 */
export function Closing({
  title = "Find your even keel",
  body = "Welcome to Keel, the money app that simply keeps up.",
  cta = "Start free",
}: {
  title?: string
  body?: string
  cta?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const near = useTransform(scrollYProgress, [0, 1], [40, -40])
  const far = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const still = reduced || designing

  return (
    <section ref={ref} className="relative overflow-hidden py-(--spacing-section)">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_60%_45%,var(--color-night-glow),transparent_70%)]" />
      <Container className="relative grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="type-display text-h2 text-balance text-fg">{title}</h2>
          <p className="mt-4 max-w-[26ch] text-lead text-fg-2">{body}</p>
          <ButtonLink href="#pricing" size="lg" className="mt-8 pl-2.5">
            <KeelMark className="size-6 rounded-[7px] text-blue" />
            {cta}
          </ButtonLink>
        </Reveal>
        <div className="relative aspect-[5/4] w-full">
          <motion.div style={{ y: still ? 0 : far }} className="absolute top-0 right-0 w-[54%]">
            <Laptop>
              <Wallpaper />
              <ScaledScreen className="absolute inset-[7%]" base={1000}>
                <DashboardMock />
              </ScaledScreen>
            </Laptop>
          </motion.div>
          <motion.div style={{ y: still ? 0 : near }} className="absolute bottom-[4%] left-[4%] w-[40%]">
            <Tablet>
              <Wallpaper />
              <ScaledScreen className="absolute inset-[8%]" base={820}>
                <DashboardMock />
              </ScaledScreen>
            </Tablet>
          </motion.div>
          <motion.div style={{ y: still ? 0 : near }} className="absolute top-[10%] left-[30%] w-[11%]">
            <PhoneFrame className="w-full p-[3px]">
              <ScaledScreen className="h-full" base={240}>
                <div className="h-[507px]">
                  <PhoneScreen />
                </div>
              </ScaledScreen>
            </PhoneFrame>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
