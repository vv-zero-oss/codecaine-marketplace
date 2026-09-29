import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { CircleLink } from "@/components/ui/circle-link"
import { StretchText } from "@/components/ui/stretch-text"
import { seaViews } from "@/content"

/** The last picture before the contact details: the view from the roof. */
export function SeaViews() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"])

  return (
    <section ref={ref} id="views" data-tone="light" className="relative h-[110svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <motion.img src={seaViews.image} alt="A rooftop terrace looking over the sea" loading="lazy" style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/20" />
      <div className="relative flex flex-col items-center pt-[14vh] text-center">
        <h2 className="font-condensed text-[clamp(4rem,9vw,10rem)] leading-[0.86]">
          {seaViews.lines.map((line, i) => (
            <StretchText key={line} text={line} delay={i * 0.12} className="block" />
          ))}
        </h2>
        <p className="label mt-8 text-[0.8rem] tracking-[var(--tracking-wide)]">{seaViews.sub}</p>
      </div>
      <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2">
        <CircleLink href="#residences" tone="light">
          {seaViews.cta}
        </CircleLink>
      </div>
    </section>
  )
}
