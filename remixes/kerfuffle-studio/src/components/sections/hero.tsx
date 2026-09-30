import { motion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"

import { ImageTrail } from "@/components/motion/image-trail"
import { Marquee } from "@/components/motion/marquee"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Eyebrow } from "@/components/ui/heading"
import { CLIENTS, TRAIL } from "@/content"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The opening screen: a big left-set headline — heavy caps, then italic serif
 * words — with our work dropping under the pointer, a short hello beside it,
 * and the clients we make things for rolling along the bottom.
 */
export function Hero({
  eyebrow = "Animation · Video · Social",
  bold = "Motion that makes",
  serif = "some noise",
  intro = "We're a small Rotterdam crew turning brands into things people watch twice — and send to a friend.",
}: {
  eyebrow?: string
  bold?: string
  serif?: string
  intro?: string
}) {
  const { designing } = useCanvasDesignMode()
  const rise = (delay: number) =>
    designing
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 1, delay, ease: EASE },
        }
  const fade = (delay: number) =>
    designing ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } }
  return (
    <section id="top" data-tone="light" className="relative flex min-h-svh flex-col overflow-hidden pt-28">
      <ImageTrail images={TRAIL.join("|")} />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col justify-end px-gutter pb-10 md:pb-14">
        <motion.div {...fade(0.05)}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="mt-6 text-[clamp(3.25rem,10vw,10rem)] leading-[0.88]">
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block display" {...rise(0.15)}>
              {bold}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block display-serif text-flame" {...rise(0.27)}>
              {serif}
            </motion.span>
          </span>
        </h1>
        <motion.div {...fade(0.45)} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[34ch] text-lg leading-snug md:text-xl">{intro}</p>
          <div className="pointer-events-auto">
            <ArrowLink label="Scroll for the good stuff" href="/#intro" direction="down" />
          </div>
        </motion.div>
      </div>
      <ClientRow className="relative z-10 border-t border-line pb-6" />
    </section>
  )
}

/** The clients, rolling past. */
export function ClientRow({ className }: { className?: string }) {
  return (
    <div className={cn("pt-6", className)}>
      <p className="sr-only">Some of the brands we make things for</p>
      <Marquee duration={36} gap={72}>
        {CLIENTS.map((client) => (
          <span key={client.name} className="flex items-center gap-[72px]">
            <span className={cn("text-2xl whitespace-nowrap text-ink/70 md:text-3xl", client.style)}>{client.name}</span>
            <svg aria-hidden viewBox="0 0 20 20" className="size-3 text-flame">
              <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
