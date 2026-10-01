import { motion } from "motion/react"
import { useMemo } from "react"

import { useCycle, useStill } from "@/components/motion"
import { LineChart, seriesFor, smoothPath } from "@/components/motion/line-chart"
import { LogoMarquee } from "@/components/motion/logo-marquee"
import { Rotator } from "@/components/motion/rotator"
import { ScrambleText } from "@/components/motion/scramble-text"
import { CliCard } from "@/components/sections/cli-card"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Glow } from "@/components/ui/glow"
import { HERO, LOGOS } from "@/content"

const SERIES = [
  { trend: "dip-rise" as const, seed: 3, color: "var(--color-chart-amber)", marks: [0.17, 0.5, 0.78] },
  { trend: "up" as const, seed: 5, color: "var(--color-chart)", marks: [0.12, 0.45, 0.8] },
  { trend: "dip-rise" as const, seed: 8, color: "var(--color-chart)", marks: [0.2, 0.55, 0.82] },
]

/** A crosshair on the line, with its experiment id underneath. */
function Mark({ x, y, id, delay }: { x: number; y: number; id: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-text" />
      <span className="absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-text" />
      <span className="absolute top-3 left-0 font-mono text-[9px] tracking-wider whitespace-nowrap text-faint uppercase">
        Experiment {id}
      </span>
    </motion.div>
  )
}

export function Hero({ cycleSeconds = 5.6, metrics = HERO.metrics }: { cycleSeconds?: number; metrics?: string }) {
  const words = metrics.split(",")
  const still = useStill()
  const [index] = useCycle(words.length, cycleSeconds, still)
  const s = SERIES[index % SERIES.length]
  const { at } = useMemo(() => smoothPath(seriesFor(s.trend, s.seed)), [s.trend, s.seed])

  return (
    <section id="top" className="relative flex min-h-[max(720px,100svh)] flex-col overflow-hidden pt-24 sm:pt-28">
      <Glow tone="amber" intensity={0.75} wide />
      <Container className="relative z-10 flex flex-1 flex-col">
        <h1 className="scanline text-[clamp(30px,4vw,58px)] leading-[1.28] tracking-[-0.03em] text-balance lg:max-w-[1010px]">
          <ScrambleText text={HERO.title} duration={1.3} scanlines={false} />
        </h1>

        <div className="mt-8 max-w-[760px] sm:mt-10">
          <h2 className="text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-medium tracking-[-0.025em] text-text">
            {HERO.lead} <Rotator words={words} index={index} />
          </h2>
          <p className="mt-5 max-w-[760px] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-muted">{HERO.body}</p>
          <ButtonLink href="#cta" size="lg" className="mt-8">
            {HERO.cta}
          </ButtonLink>
        </div>

        <div className="relative mt-12 flex-1 min-h-[220px]">
          <div className="absolute inset-x-[-5vw] bottom-24 h-[150px] sm:h-[190px] lg:right-[-42px]">
            <LineChart key={index} trend={s.trend} seed={s.seed} color={s.color} duration={2.6} />
            {s.marks.map((m, i) => {
              const [x, y] = at(Math.round(m * 23))
              return <Mark key={`${index}-${i}`} x={x} y={y} id={String(100000 + Math.round((x + y) * 7919 + index * 31337) % 899999)} delay={0.9 + i * 0.5} />
            })}
          </div>
          <div className="absolute right-0 bottom-20 z-10 hidden md:block">
            <CliCard />
          </div>
        </div>
      </Container>
      <LogoMarquee names={LOGOS} className="relative z-10 pb-9" />
    </section>
  )
}
