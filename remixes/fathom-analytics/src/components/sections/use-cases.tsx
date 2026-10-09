import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { Container } from "@/components/ui/container"
import { Eyebrow, SectionTitle } from "@/components/ui/section-title"
import { USE_CASES } from "@/content"
import { useMedia } from "@/lib/use-media"
import { cn } from "@/lib/utils"

const TONE = { peach: "bg-peach text-ember", lilac: "bg-lilac text-glow", sky: "bg-sky text-sky-ink" } as const

function Card({ i, n, progress, reduce }: { i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const c = USE_CASES[i]
  // As the next card slides over this one it settles back a little, so the pile reads as depth.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.045])
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, i === n - 1 ? 0 : 0.28])
  return (
    <div className="sticky top-[10vh] h-[64vh] min-h-[28rem] pb-4" style={{ top: `calc(10vh + ${i * 14}px)` }} data-canvas-ignore>
      <motion.article style={reduce ? undefined : { scale }} className={cn("relative grid h-full origin-top overflow-hidden rounded-[22px] md:grid-cols-[1.1fr_1fr]", TONE[c.tone])}>
        <div className="flex flex-col justify-between p-6 sm:p-10">
          <p className="w-fit rounded-pill border border-current/25 px-3 py-1 text-xs font-medium">{c.tag}</p>
          <div>
            <h3 className="display text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink">{c.title}</h3>
            <p className="mt-4 max-w-[26rem] text-[15px] leading-snug text-ink-2">{c.body}</p>
          </div>
        </div>
        <div className="relative hidden items-center justify-center md:flex">
          <div className="w-[min(88%,22rem)] rounded-card bg-window p-6 text-ink shadow-float">
            <p className="text-[11px] text-ink-3">{c.statLabel}</p>
            <p className="tnum display mt-2 text-6xl">{c.stat}</p>
            <svg viewBox="0 0 200 60" className="mt-6 h-16 w-full" fill="none" aria-hidden>
              <path d={`M0 50C30 48 40 ${30 + i * 4} 70 32S110 ${42 - i * 5} 140 22 180 ${10 + i * 3} 200 6`} stroke="currentColor" strokeWidth="1.6" className="text-current" style={{ color: "inherit" }} />
            </svg>
          </div>
        </div>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-night" />
      </motion.article>
    </div>
  )
}

/**
 * Sticky stacked cards, made with plain CSS `position: sticky`: each use case
 * pins just under the last and the pile settles back as the next one covers it.
 * Why: three scenarios compared in place, no carousel, no click.
 */
export function UseCases({ title = "Built for every team that asks", accent = "why" }: { title?: string; accent?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useMedia("(prefers-reduced-motion: reduce)")
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <section id="use-cases" data-canvas-ignore className="bg-paper pt-20 pb-24 sm:pt-28">
      <Container>
        <div className="mb-12 max-w-[34rem]">
          <Eyebrow>Use cases</Eyebrow>
          <SectionTitle className="mt-4">{title} <em>{accent}</em></SectionTitle>
        </div>
        <div ref={ref} data-canvas-ignore className="relative">
          {USE_CASES.map((c, i) => <Card key={c.tag} i={i} n={USE_CASES.length} progress={scrollYProgress} reduce={reduce} />)}
        </div>
      </Container>
    </section>
  )
}
