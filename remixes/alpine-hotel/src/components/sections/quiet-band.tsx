import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { quiet } from "@/content"

/**
 * A rust band with one enormous line, and a film that grows out of it as it
 * rises — the loud colour saved for the quiet pitch.
 */
export function QuietBand({ title = quiet.title, lede = quiet.lede, cta = "Book the quiet" }: { title?: string; lede?: string; cta?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [28, 16])

  return (
    <section id="quiet" className="bg-rust pt-20 pb-4 text-night sm:pb-6">
      <Container className="max-w-none">
        <h2 className="font-headline text-mega leading-[0.86] font-bold tracking-[-0.055em] text-balance">{title}</h2>
        <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <p className="max-w-[36ch] text-base leading-snug">{lede}</p>
          <Button variant="ink" size="lg" onClick={() => scrollTo("#book")}>
            {cta}
          </Button>
        </div>
      </Container>
      <div ref={ref} className="mt-10 px-3 sm:px-4" data-canvas-ignore>
        <motion.div style={{ scale, borderRadius: radius }} className="aspect-[4/5] overflow-hidden bg-night sm:aspect-video">
          <video src={quiet.film.src} poster={quiet.film.poster} autoPlay muted loop playsInline className="size-full object-cover" aria-label="A guest reading beside a fire" />
        </motion.div>
      </div>
    </section>
  )
}
