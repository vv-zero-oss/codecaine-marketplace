import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { StretchText } from "@/components/ui/stretch-text"
import { architecture } from "@/content"

/**
 * One enormous word over white walls. The frame pins while the picture
 * settles and the word rises into place; the caption follows it in.
 */
export function Architecture() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1])
  const wordY = useTransform(scrollYProgress, [0.3, 1], reduce ? ["0%", "0%"] : ["35%", "0%"])
  const captionOpacity = useTransform(scrollYProgress, (v) => (reduce ? 1 : Math.min(1, Math.max(0, (v - 0.7) / 0.2))))

  return (
    <section ref={ref} id="architecture" className="relative h-[180svh] bg-mist">
      <div data-tone="light" className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.img
          src={architecture.image}
          alt="Stacked white volumes against a deep blue sky"
          loading="lazy"
          style={{ scale }}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <motion.h2
          style={{ y: wordY }}
          className="absolute inset-x-0 top-[5%] text-center font-condensed text-[15.8vw] leading-[0.85] text-paper"
        >
          <StretchText text={architecture.word} />
        </motion.h2>
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-[8%] left-5 right-5 text-paper sm:left-[8vw] sm:right-auto sm:max-w-[36rem]"
        >
          <p className="font-condensed text-[clamp(1.9rem,2.5vw,2.8rem)] leading-[0.98]">{architecture.text}</p>
          <p className="label mt-8 leading-[1.6]">
            {architecture.by[0]}
            <br />
            <span className="opacity-80">{architecture.by[1]}</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
