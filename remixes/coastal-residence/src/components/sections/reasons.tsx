import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { EASE_OUT } from "@/components/motion"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { CircleReveal } from "@/components/ui/circle-reveal"
import { Emblem } from "@/components/ui/emblem"
import { StretchText } from "@/components/ui/stretch-text"
import { brand, reasons, reasonsFooter, reasonsIntro } from "@/content"
import { cn } from "@/lib/utils"

/** Once the disc has covered: the region either side of the mark, a hairline, and the promise. */
export function IntroCentre({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - 0.62) / 0.18)))
  const line = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - 0.62) / 0.33)))
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-ink">
      <div className="flex items-center gap-8">
        <span className="label text-[0.8rem] tracking-[0.12em]">{brand.region[0]}</span>
        <Emblem className="size-14" />
        <span className="label text-[0.8rem] tracking-[0.12em]">{brand.region[1]}</span>
      </div>
      <motion.span style={{ scaleY: line }} className="mt-12 block h-[22vh] w-px origin-top bg-ink" />
      <p className="label mt-12 text-center">
        {reasonsIntro.tagline[0]}
        <br />
        {reasonsIntro.tagline[1]}
      </p>
    </motion.div>
  )
}

/** A small photo carousel with "‹ 1 —— 2 ›" underneath. */
export function ReasonPhotos({ images, title }: { images: string[]; title: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!api) return
    const update = () => setIndex(api.selectedScrollSnap())
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <div className="w-[min(28rem,78vw)]">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <img src={src} alt={`${title}, view ${i + 1}`} loading="lazy" className="aspect-[2/1] w-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-8 flex items-center justify-center gap-6 font-sans text-sm font-semibold">
        <button type="button" aria-label="Previous photo" onClick={() => api?.scrollPrev()} className="grid size-11 place-items-center transition-transform active:scale-90">
          <ChevronLeft className="size-4" strokeWidth={1.5} />
        </button>
        <span className="tabular-nums">{index + 1}</span>
        <span className="relative block h-px w-28 bg-ink/20 sm:w-44">
          <motion.span
            className="absolute inset-y-0 left-0 bg-ink"
            animate={{ width: `${((index + 1) / images.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        </span>
        <span className="tabular-nums">{images.length}</span>
        <button type="button" aria-label="Next photo" onClick={() => api?.scrollNext()} className="grid size-11 place-items-center transition-transform active:scale-90">
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

/**
 * Three reasons, pinned: the headline re-letters itself as you scroll from one
 * to the next, the photographs and the paragraph change beneath it.
 */
export function Reasons() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(reasons.length - 1, Math.max(0, Math.floor(v * reasons.length))))
  })
  const reason = reasons[step]

  return (
    <>
      <CircleReveal id="reasons-intro" image={reasonsIntro.image} imageAlt="A villa and its terrace at dusk" arc={reasonsIntro.arc}>
        {(progress) => <IntroCentre progress={progress} />}
      </CircleReveal>

      <section ref={ref} id="reasons" data-tone="dark" className="relative h-[300vh] bg-pale text-ink">
        <div className="sticky top-0 flex h-[100svh] flex-col items-center overflow-hidden px-5 pt-28 sm:pt-6">
          <h2 className="sr-only">Three reasons to choose {brand.word[0]}</h2>
          <StretchText
            key={reason.title}
            as="p"
            play={reduce ? true : "mount"}
            text={reason.title}
            className="text-center font-condensed max-w-[64vw] text-[clamp(3.2rem,8.6vw,10.5rem)] leading-[0.85] max-sm:max-w-none"
          />
          <motion.div
            key={`body-${step}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
            className="mt-[6vh] flex flex-col items-center sm:mt-[12vh]"
          >
            <ReasonPhotos images={reason.images} title={reason.title} />
            <p className="mt-10 max-w-[40rem] text-center text-body text-ink-soft sm:mt-[8vh]">{reason.body}</p>
          </motion.div>
          <p className="label absolute bottom-8 text-center">
            {reasonsFooter[0]}
            <br />
            {reasonsFooter[1]}
          </p>
          <ol className="absolute bottom-8 right-6 flex gap-2 sm:right-14" aria-label="Reason">
            {reasons.map((r, i) => (
              <li key={r.title} className={cn("h-px w-6 bg-ink transition-opacity duration-500", i === step ? "opacity-100" : "opacity-20")} />
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
