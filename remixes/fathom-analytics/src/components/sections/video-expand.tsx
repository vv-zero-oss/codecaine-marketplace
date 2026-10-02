import { motion, useMotionTemplate, useTransform, type MotionValue } from "motion/react"

import { StickyScene } from "@/components/motion/sticky-scene"
import { Container } from "@/components/ui/container"
import { Eyebrow, SectionTitle } from "@/components/ui/section-title"

const STATS = [["214", "governed metrics"], ["41 ms", "median query"], ["99.98%", "answers cited"]]

function Stage({ p, pinned, src, poster }: { p: MotionValue<number>; pinned: boolean; src: string; poster: string }) {
  const inset = useTransform(p, [0.05, 0.7], [24, 0])
  const sides = useTransform(p, [0.05, 0.7], [30, 0])
  const radius = useTransform(p, [0.05, 0.7], [28, 0])
  const clip = useMotionTemplate`inset(${inset}% ${sides}% ${inset}% ${sides}% round ${radius}px)`
  const scale = useTransform(p, [0, 1], [1.12, 1])
  const lead = useTransform(p, [0, 0.3], [1, 0])
  const leadY = useTransform(p, [0, 0.3], [0, -24])
  const copy = useTransform(p, [0.62, 0.85], [0, 1])
  const copyY = useTransform(p, [0.62, 0.9], [26, 0])

  if (!pinned) {
    return (
      <Container className="py-20 text-center">
        <Eyebrow>Fathom in the wild</Eyebrow>
        <SectionTitle className="mt-4">One picture, <em>seen by everyone</em></SectionTitle>
        <video src={src} poster={poster} autoPlay muted loop playsInline className="mt-10 aspect-video w-full rounded-card object-cover" />
        <ul className="mt-8 grid grid-cols-3 gap-3 text-left">{STATS.map(([v, l]) => <li key={l}><p className="tnum font-serif text-2xl">{v}</p><p className="text-xs text-ink-2">{l}</p></li>)}</ul>
      </Container>
    )
  }
  return (
    <div data-canvas-ignore className="relative h-full bg-paper">
      <motion.div style={{ opacity: lead, y: leadY }} className="absolute inset-x-0 top-[9vh] z-10 px-5 text-center" data-canvas-ignore>
        <Eyebrow>Fathom in the wild</Eyebrow>
        <SectionTitle className="mt-4">One picture, <em>seen by everyone</em></SectionTitle>
      </motion.div>
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-night will-change-[clip-path]">
        <motion.video style={{ scale }} src={src} poster={poster} autoPlay muted loop playsInline className="size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />
      </motion.div>
      <motion.div style={{ opacity: copy, y: copyY }} className="absolute inset-x-0 bottom-[8vh] z-10 text-ink-inverse" data-canvas-ignore>
        <Container className="flex flex-wrap items-end justify-between gap-8">
          <h3 className="display max-w-[28rem] text-[clamp(2rem,4.4vw,3.4rem)]">Every team, <em>the same numbers</em></h3>
          <ul className="flex gap-8">{STATS.map(([v, l]) => <li key={l}><p className="tnum font-serif text-3xl">{v}</p><p className="text-xs text-ink-inverse/70">{l}</p></li>)}</ul>
        </Container>
      </motion.div>
    </div>
  )
}

/**
 * A pinned video that opens like a window: it starts as a small rounded frame
 * and a clip-path inset animates out to full bleed while the video eases down
 * from a slight zoom. `heightVh` is the scroll it takes. Why: it turns a
 * background clip into a moment the visitor controls with their scroll.
 */
export function VideoExpand({ heightVh = 230, src = "/video/10444089.mp4", poster = "/video/10444089.jpg" }: { heightVh?: number; src?: string; poster?: string }) {
  return (
    <section id="film" data-canvas-ignore className="bg-paper">
      <StickyScene heightVh={heightVh}>{(p, pinned) => <Stage {...{ p, pinned, src, poster }} />}</StickyScene>
    </section>
  )
}
