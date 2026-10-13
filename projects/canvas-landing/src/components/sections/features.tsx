import { useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { Container } from "@/components/ui/container"

/** The curve every entrance on this page shares: out, strongly. */
const EASE = [0.23, 1, 0.32, 1] as const

type Feature = {
  /** The file under /media/features: a clip of the real editor, and its still. */
  id: string
  title: string
  line: string
}

const FEATURES: Feature[] = [
  { id: "control", title: "Full control", line: "Hug, fill, gap and scale, typed or dragged." },
  { id: "modes", title: "Modes", line: "Artboard and Code, one switch apart." },
  { id: "imports", title: "Import from anything", line: "Figma, web, PDF and CSV arrive as layers." },
  { id: "layouts", title: "Layouts", line: "Stack, row, column and grid, with the gap you set." },
  { id: "effects", title: "Effects", line: "Shadows, blurs and filters, all editable." },
  { id: "shortcuts", title: "Shortcuts", line: "Every action has a key, and a search." },
  { id: "exports", title: "Exports", line: "PNG, SVG, or the layer as HTML and JSX." },
  { id: "variables", title: "Variables", line: "Change a token once, everything bound follows." },
]

/**
 * A clip of the real editor: the control and what it makes, nothing else, so
 * the page never draws a lookalike of the product's own interface. It plays
 * while it is on screen and is held on its still for reduced motion.
 */
function FeatureVideo({ id }: { id: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (inView && !reduced) void video.play().catch(() => {})
    else video.pause()
  }, [inView, reduced])
  return (
    <video
      ref={ref}
      src={`/media/features/${id}.mp4`}
      poster={`/media/features/${id}.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="block aspect-square w-full bg-card object-cover"
    />
  )
}

/** One card: a small centred title and its line, then the clip, running to the card's edges. */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.06 * (index % 2), ease: EASE }}
      className="flex flex-col overflow-hidden rounded-card bg-card"
    >
      <header className="px-6 pt-6 text-center">
        <h3 className="text-[15px] leading-tight font-medium tracking-[-0.01em] text-ink">{feature.title}</h3>
        <p className="mx-auto mt-1 max-w-[26ch] text-[13px] leading-[1.4] text-ink-2">{feature.line}</p>
      </header>
      <FeatureVideo id={feature.id} />
    </motion.article>
  )
}

/** Eight things the editor does, each shown by the editor itself: its own control, and the page it changes. */
export function Features() {
  return (
    <section id="features" className="py-[clamp(64px,9vw,140px)]">
      <Container className="max-w-none px-[clamp(16px,4.6vw,80px)]">
        <h2 className="mx-auto max-w-[18ch] text-balance text-center text-[clamp(30px,4.2vw,64px)] leading-[1.06] font-semibold tracking-[-0.04em] text-ink">
          Everything you'd do to a page, on one canvas.
        </h2>
        <div className="mx-auto mt-[clamp(32px,5vw,72px)] grid max-w-[1180px] gap-3 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
