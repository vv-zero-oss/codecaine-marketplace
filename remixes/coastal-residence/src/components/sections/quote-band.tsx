import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { StretchText } from "@/components/ui/stretch-text"
import { quote } from "@/content"

/** A full-bleed photograph with a line from the people who drew the place. */
export function QuoteBand() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"])

  return (
    <section ref={ref} id="studio" data-tone="light" className="relative h-[130svh] min-h-[640px] overflow-hidden bg-ink">
      <motion.img
        src={quote.image}
        alt="A stone villa and its pool at sunset"
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
      <figure className="absolute inset-x-5 bottom-[12%] text-paper sm:inset-x-auto sm:right-[16%] sm:w-[min(40rem,60vw)]">
        <span aria-hidden="true" className="block font-display text-7xl leading-none">
          &ldquo;
        </span>
        <blockquote>
          <StretchText as="p" text={quote.text} className="font-condensed text-[clamp(1.9rem,2.7vw,3rem)] leading-[1]" />
        </blockquote>
        <figcaption className="label mt-10 leading-[1.6]">
          {quote.by[0]}
          <br />
          <span className="opacity-80">{quote.by[1]}</span>
        </figcaption>
      </figure>
    </section>
  )
}
