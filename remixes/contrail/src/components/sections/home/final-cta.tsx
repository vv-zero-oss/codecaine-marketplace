import { useRef } from "react"
import { Smartphone } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Laptop, PassportBooklet, Tablet, WatchFace } from "@/components/mock/devices"
import { FlightMap } from "@/components/mock/flight-map"
import { Phone } from "@/components/mock/phone"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The last ask. The devices settle together as the section scrolls in — each
 * one travels a little less than the one behind it, so the group gathers
 * rather than slides.
 */
export function FinalCta({ title = "Have a smooth flight." }: { title?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const near = useTransform(scrollYProgress, [0, 1], [still ? 0 : 80, 0])
  const far = useTransform(scrollYProgress, [0, 1], [still ? 0 : 140, 0])

  return (
    <section data-theme="day" className="bg-page pb-24">
      <Container className="text-center">
        <Reveal>
          <h2 className="type-display text-display text-balance">{title}</h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-lead text-ink-2">We'll keep an eye on everything. You just enjoy the trip. On iPhone, iPad, Mac and Watch — free to download.</p>
          <ButtonLink href="/pricing" variant="ink" size="lg" className="mt-8">
            <Smartphone /> Give Contrail a try
          </ButtonLink>
        </Reveal>
      </Container>
      <div ref={ref} className="relative mx-auto mt-16 h-[300px] max-w-[1180px] sm:h-[420px] lg:h-[460px]" data-canvas-ignore>
        <div className="absolute left-1/2 top-0 w-[1180px] origin-top -translate-x-1/2 scale-[0.32] sm:scale-[0.5] md:scale-[0.66] lg:scale-[0.86] xl:scale-100">
          <motion.div style={{ y: far }} className="absolute top-[120px] left-[40px]"><WatchFace className="w-[120px]" /></motion.div>
          <motion.div style={{ y: near }} className="absolute top-[40px] left-[190px]">
            <Phone className="w-[160px]">
              <div className="absolute inset-0"><FlightMap region="usa" routes="LAX-JFK,SEA-MIA" width={300} height={640} labels={false} /></div>
            </Phone>
          </motion.div>
          <div className="absolute top-0 left-[380px]"><Laptop className="w-[520px]" /></div>
          <motion.div style={{ y: near }} className="absolute top-[110px] left-[860px]"><Tablet className="w-[300px]" /></motion.div>
          <motion.div style={{ y: far }} className="absolute top-[150px] left-[1010px] rotate-[12deg]"><PassportBooklet className="w-[140px]" /></motion.div>
        </div>
      </div>
    </section>
  )
}
