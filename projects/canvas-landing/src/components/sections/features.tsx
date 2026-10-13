import { motion, useReducedMotion } from "motion/react"

import { Container } from "@/components/ui/container"

/** The curve every entrance on this page shares: out, strongly. */
const EASE = [0.23, 1, 0.32, 1] as const

type Feature = {
  title: string
  body: string
  /** A still today; a looping clip of the same two things (the control, its result) once filmed. */
  image: string
  video?: string
}

const FEATURES: Feature[] = [
  {
    title: "Start from nothing",
    body: "Draw frames, type words, drop photographs. Every layer is real markup with a real tag, so what you build is already a page, not a picture of one.",
    image: "/media/features/build.jpg",
  },
  {
    title: "Layout that reads your design",
    body: "Select a pile of layers, press ⇧A, and they become a row with the gap they already had. Change the number and everything follows.",
    image: "/media/features/layout.jpg",
  },
  {
    title: "Ask from the bubble",
    body: "Select anything and say what you want. The layer is held while the assistant works, so you can see what it is touching and what it is not.",
    image: "/media/features/ask.jpg",
  },
  {
    title: "Scroll scenes you can preview",
    body: "Open any frame as a page. Pinned sections, scrubbed motion, a cover that opens and pages that turn, played back before it ships.",
    image: "/media/features/scroll.jpg",
  },
  {
    title: "Design it standing still",
    body: "One switch stops, reduces or plays everything that moves on the page. Stop it to style it, reduce it to check it, play it to love it.",
    image: "/media/features/motion.jpg",
  },
  {
    title: "Stay on brand",
    body: "Bring a section into a project and keep it on that project's own styles with one toggle. Nothing arrives wearing somebody else's colours.",
    image: "/media/features/styles.jpg",
  },
]

/** One card: the control and its result on top, a title and two lines under it. */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.06 * (index % 3), ease: EASE }}
      className="flex flex-col rounded-card bg-surface p-3"
    >
      <div className="aspect-[3/2] overflow-hidden rounded-card-inner bg-[#fafafa]">
        {feature.video ? (
          <video src={feature.video} poster={feature.image} muted loop playsInline autoPlay className="size-full object-cover" />
        ) : (
          <img src={feature.image} alt="" loading="lazy" className="size-full object-cover" />
        )}
      </div>
      <div className="px-3 pt-5 pb-4">
        <h3 className="text-[18px] leading-tight font-semibold tracking-[-0.015em] text-ink">{feature.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.45] tracking-[-0.005em] text-ink-2">{feature.body}</p>
      </div>
    </motion.article>
  )
}

/**
 * Six things the editor does, each shown as the control and what it makes:
 * never the whole canvas, and nothing zooming or panning, so six of them
 * side by side stay quiet.
 */
export function Features() {
  return (
    <section id="features" className="py-[clamp(64px,9vw,140px)]">
      <Container className="max-w-none px-[clamp(16px,4.6vw,80px)]">
        <h2 className="mx-auto max-w-[18ch] text-balance text-center text-[clamp(30px,4.2vw,64px)] leading-[1.06] font-semibold tracking-[-0.04em] text-ink">
          Everything you'd do to a page, on one canvas.
        </h2>
        <div className="mx-auto mt-[clamp(32px,5vw,72px)] grid max-w-[1320px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
