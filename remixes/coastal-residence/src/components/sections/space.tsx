import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { EASE_OUT } from "@/components/motion"
import { CircleLink } from "@/components/ui/circle-link"
import { CircleReveal } from "@/components/ui/circle-reveal"
import { ScriptReveal, StretchText } from "@/components/ui/stretch-text"
import { amenities, notes, space } from "@/content"

/** The chapter title, rising into the disc once it has covered. */
export function SpaceTitle({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - 0.5) / 0.2)))
  const y = useTransform(progress, [0.5, 1], ["12vh", "-6vh"])
  return (
    <motion.h2
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center font-condensed text-[clamp(4.5rem,9vw,10.5rem)] leading-[0.86] text-ink"
    >
      {space.lines.map((line, i) => (
        <StretchText key={line} text={line} delay={i * 0.1} className="block" />
      ))}
      <span className="ml-[0.5em] mt-[0.06em] block -rotate-[3deg] font-script italic text-[0.95em] normal-case leading-none tracking-normal">
        <ScriptReveal delay={0.4}>{space.script}</ScriptReveal>
      </span>
    </motion.h2>
  )
}

/** A picture that drifts against the scroll by `amount` pixels. */
export function Drift({ src, alt, className, amount = 60 }: { src: string; alt: string; className?: string; amount?: number }) {
  const ref = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount])
  return <motion.img ref={ref} src={src} alt={alt} loading="lazy" style={{ y }} className={className} />
}

/**
 * Inside the homes: a cream disc swallows the last amenity, the chapter title
 * writes itself in, then a loose collage of the rooms and what goes into them.
 */
export function Space() {
  return (
    <>
      <CircleReveal id="space" color="shell" image={amenities[amenities.length - 1].image} imageAlt="A rooftop solarium">
        {(progress) => <SpaceTitle progress={progress} />}
      </CircleReveal>

      <section data-tone="dark" className="relative overflow-hidden bg-shell pb-24 text-ink">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-0">
          <div className="relative flex h-[62vw] justify-end overflow-hidden bg-deep md:col-span-5 md:mt-[22vh] md:h-[38vw]">
            <Drift src={space.images[0]} alt="Bougainvillea in full flower" className="h-[115%] w-[62%] object-cover" amount={40} />
          </div>
          <div className="px-5 md:col-span-5 md:col-start-8 md:-mt-[18vh] md:px-0">
            <Drift src={space.images[1]} alt="A terrace with sofas under the pergola" className="aspect-[4/5] w-full object-cover" amount={50} />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mx-5 mt-16 max-w-[38rem] font-condensed text-[clamp(1.8rem,2.3vw,2.6rem)] leading-[1] md:ml-[42vw]"
        >
          {space.statement}
        </motion.p>

        <div className="mt-24 grid items-center gap-12 md:grid-cols-12 md:gap-0">
          <div className="relative flex items-start justify-start bg-deep pb-[12%] md:col-span-4 md:h-[34vw] md:pb-0">
            <Drift src={space.images[2]} alt="A quiet walled courtyard" className="ml-[14%] mt-[10%] aspect-[4/5] w-[62%] object-cover" amount={30} />
          </div>
          <div className="flex flex-col gap-10 px-5 md:col-span-3 md:col-start-6 md:px-0">
            <p className="text-body text-ink-soft">{space.specs}</p>
            <div>
              <p className="label">Optional upgrades</p>
              <ul className="mt-3 space-y-1">
                {space.upgrades.map((u) => (
                  <li key={u} className="label font-normal">
                    — {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="justify-self-center md:col-span-3 md:col-start-10">
            <CircleLink href="#residences">{notes.cta}</CircleLink>
          </div>
        </div>

        <div className="mt-24 px-5 sm:pl-[16vw] sm:pr-0">
          <Drift src={space.interior} alt="A living room opening onto the balcony and the sea" className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" amount={40} />
        </div>
      </section>
    </>
  )
}
