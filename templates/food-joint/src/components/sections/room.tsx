import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { Container } from "@/components/ui/container"
import { room } from "@/content"
import { DURATION, EASE_OUT } from "@/lib/motion"

/** How far each picture drifts against the scroll, and how much it turns —
 *  different for each, so the four read as layers, not a grid. */
const DEPTH = [
  { y: 60, rotate: 0, className: "col-span-7 aspect-[4/5]" },
  { y: -80, rotate: 0, className: "col-span-5 mt-[18%] aspect-square" },
  { y: -40, rotate: 50, className: "col-span-5 -mt-[12%] aspect-square" },
  { y: 90, rotate: 0, className: "col-span-7 mt-[6%] aspect-[16/10]" },
]

function Layer({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion()
  const depth = DEPTH[index]
  const y = useTransform(progress, [0, 1], reduced ? [0, 0] : [depth.y, -depth.y])
  const rotate = useTransform(progress, [0, 1], reduced ? [0, 0] : [-depth.rotate, depth.rotate])
  const photo = room.photos[index]
  return (
    <motion.div className={depth.className} style={{ y, rotate }}>
      <motion.div
        className="size-full"
        initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.9)" }}
        whileInView={{ opacity: 1, transform: "scale(1)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
      >
        <ClipShape shape={photo.shape} className="size-full">
          <Photo photo={photo} width={1100} className="absolute inset-0" />
        </ClipShape>
      </motion.div>
    </motion.div>
  )
}

/**
 * The room: four pictures of it in four shapes, drifting at different
 * depths as you pass (the starburst turns as well), beside a short line on
 * what it is like to sit there.
 */
export function Room() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  return (
    <section ref={ref} id="visit" className="overflow-hidden bg-cream py-section">
      <Container className="grid items-center gap-row lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Eyebrow>{room.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heavy text-title">
            <RiseText text="Loud in" />
            <br />
            <RiseText text="the best" delay={0.1} />
            <br />
            <RiseText text="way" delay={0.2} />
          </h2>
          <p className="mt-6 max-w-[40ch] text-body text-ink-soft">{room.body}</p>
        </div>
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {room.photos.map((photo, i) => (
            <Layer key={photo.id} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </Container>
    </section>
  )
}
