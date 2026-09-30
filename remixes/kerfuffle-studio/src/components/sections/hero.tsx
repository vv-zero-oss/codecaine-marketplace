import { motion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"

import { ImageTrail } from "@/components/motion/image-trail"
import { Marquee } from "@/components/motion/marquee"
import { Eyebrow } from "@/components/ui/heading"
import { ScribbleLink } from "@/components/ui/scribble-link"
import { CLIENTS, TRAIL } from "@/content"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The opening screen: a two-line headline — heavy caps, then a light serif
 * word — with our work dropping under the pointer, and the clients we make it
 * for rolling past underneath.
 */
export function Hero({
  eyebrow = "Animation, video & social content,",
  bold = "Gets your brand",
  serif = "moving",
}: {
  eyebrow?: string
  bold?: string
  serif?: string
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
  return (
    <section id="top" data-tone="light" className="relative flex min-h-svh flex-col overflow-hidden pt-28">
      <ImageTrail images={TRAIL.join("|")} />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-gutter text-center">
        <motion.div {...(designing ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 0.1 } })}>
          <Eyebrow className="mx-auto max-w-[14ch]">{eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="mt-4 text-[clamp(3.25rem,11vw,10.5rem)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block display" {...rise(0.15)}>
              {bold}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block display-serif" {...rise(0.27)}>
              {serif}
            </motion.span>
          </span>
        </h1>
        <div className="pointer-events-auto mt-6">
          <ScribbleLink label="Discover more" href="/#intro" direction="down" className="text-xl md:text-2xl" />
        </div>
      </div>
      <ClientRow className="relative z-10 pb-8 md:pb-10" />
    </section>
  )
}

/** The clients, rolling past in the brand blue. */
export function ClientRow({ className }: { className?: string }) {
  return (
    <div className={cn("pt-10", className)}>
      <p className="sr-only">Some of the brands we make things for</p>
      <Marquee duration={36} gap={88}>
        {CLIENTS.map((client) => (
          <span key={client.name} className={cn("text-2xl whitespace-nowrap text-blue md:text-3xl", client.style)}>
            {client.name}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
