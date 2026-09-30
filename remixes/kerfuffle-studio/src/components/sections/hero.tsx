import { motion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"

import { ImageTrail } from "@/components/motion/image-trail"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { TRAIL } from "@/content"

const EASE = [0.23, 1, 0.32, 1] as const

const FACTS = [
  { label: "Studio", value: "Rotterdam, NL" },
  { label: "Since", value: "2019" },
  { label: "People", value: "Eight" },
]

/**
 * The opening screen: one plain sentence about what the studio does, set big
 * across the grid, with finished work dropping under the pointer behind it.
 */
export function Hero({
  title = "Animation, film and social content that people choose to watch.",
}: {
  title?: string
}) {
  const { designing } = useCanvasDesignMode()
  const words = title.split(" ")
  return (
    <section id="top" data-tone="light" className="relative flex min-h-svh flex-col overflow-hidden pt-24">
      <ImageTrail images={TRAIL.join("|")} size={260} tilt={0} />
      <Container className="pointer-events-none relative z-10 flex flex-1 flex-col justify-end pb-8 md:pb-10">
        <h1 className="display max-w-[15ch] text-[clamp(3rem,7.6vw,8rem)]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={designing ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.035, ease: EASE }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={designing ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-5 md:grid-cols-12"
        >
          {FACTS.map((fact) => (
            <dl key={fact.label} className="md:col-span-3">
              <dt className="label text-ink-mute">{fact.label}</dt>
              <dd className="mt-1 text-sm">{fact.value}</dd>
            </dl>
          ))}
          <div className="pointer-events-auto flex items-end md:col-span-3 md:justify-end">
            <ArrowLink label="Selected work" href="/#work" direction="down" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
