import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

import { EASE_OUT } from "@/components/motion"
import { Bloom } from "@/components/ui/bloom"
import { Button } from "@/components/ui/button"
import { Emblem } from "@/components/ui/emblem"
import { StretchText } from "@/components/ui/stretch-text"
import { residences, story } from "@/content"

/** A small label over a figure set in the display face. */
function Figure({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-[0.8rem] uppercase tracking-[0.02em] [font-stretch:108%]">{label}</p>
      <p className="mt-3 font-condensed text-[2.6rem] leading-none">{children}</p>
    </div>
  )
}

/**
 * The coast from above, then the three kinds of home on a pale panel that
 * slides up over it — its top corners cut back as it arrives.
 */
export function Residences() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const type = residences.types[index]
  const total = residences.types.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const cut = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [9, 0])
  const clipPath = useTransform(cut, (c) => `polygon(${c}vw 0, calc(100% - ${c}vw) 0, 100% ${c}vw, 100% 100%, 0 100%, 0 ${c}vw)`)
  const go = (d: number) => setIndex((i) => (i + d + total) % total)

  return (
    <section id="residences" className="relative bg-mist">
      <div data-tone="light" className="sticky top-0 h-[100svh] overflow-hidden">
        <img src={residences.aerial} alt="The bay and the hills behind it, from the air" loading="lazy" className="size-full object-cover" />
      </div>

      <motion.div ref={ref} style={{ clipPath }} data-tone="dark" className="relative -mt-[35svh] bg-mist text-ink">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-10 pt-28 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-[13.5rem] lg:pt-40">
          <div className="order-2 flex gap-12 md:order-none md:flex-col md:gap-12 md:justify-self-start">
            <Figure label="Bedrooms">{type.bedrooms}</Figure>
            <Figure label="Area up to">
              {type.area} m<sup className="text-[0.5em]">2</sup>
            </Figure>
          </div>
          <div className="relative order-1 aspect-[3/4] w-full overflow-hidden md:order-none md:w-[min(30rem,32vw)]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={type.image}
                src={type.image}
                alt={type.name}
                loading="lazy"
                initial={{ clipPath: "inset(0% 0% 0% 100%)", scale: 1.08 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
          <div className="order-3 flex max-w-[20rem] flex-col items-start gap-8 md:order-none md:justify-self-end">
            <p className="text-body">{type.body}</p>
            <Button variant="pill" size="pill">
              {type.cta}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center px-5 pb-28">
          <StretchText
            key={type.name}
            as="h2"
            play={reduce ? true : "mount"}
            text={type.name}
            className="text-center font-condensed text-[clamp(3rem,7vw,8.5rem)] leading-[0.9]"
          />
          <div className="mt-8 flex items-center gap-6 font-sans text-sm font-semibold">
            <button type="button" aria-label="Previous residence" onClick={() => go(-1)} className="grid size-11 place-items-center transition-transform active:scale-90">
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </button>
            <span className="tabular-nums">{index + 1}</span>
            <span className="relative block h-px w-32 bg-ink/20 sm:w-44">
              <motion.span className="absolute inset-y-0 left-0 bg-ink" animate={{ width: `${((index + 1) / total) * 100}%` }} transition={{ duration: 0.6, ease: EASE_OUT }} />
            </span>
            <span className="tabular-nums">{total}</span>
            <button type="button" aria-label="Next residence" onClick={() => go(1)} className="grid size-11 place-items-center transition-transform active:scale-90">
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-10">
          <Bloom src={story.bloomAlt} corner="bottom-left" className="-left-12 bottom-0 h-[62vh] w-[26vw] min-w-56" />
          <StretchText
            as="p"
            text={residences.statement}
            className="relative max-w-[60rem] text-center font-condensed text-[clamp(2rem,3.8vw,4.6rem)] leading-[0.95]"
          />
          <Emblem className="relative mt-[14vh] size-14" />
        </div>
      </motion.div>
    </section>
  )
}
