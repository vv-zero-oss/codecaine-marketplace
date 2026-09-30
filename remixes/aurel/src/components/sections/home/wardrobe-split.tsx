import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { ClipReveal, FadeUp } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { MixedTitle } from "@/components/ui/mixed-title"
import { SectionHeading } from "@/components/ui/section-heading"
import { home } from "@/content"

/**
 * The large photograph stays pinned on the left while the right column —
 * two pictures, the promise, a detail and the founder's line — scrolls
 * past it. The pinned picture eases out of a slight zoom as it goes.
 */
export function WardrobeSplit() {
  const { wardrobe } = home
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const zoom = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 1.12, 1])

  return (
    <section id="wardrobe" className="pt-section">
      <Container>
        <SectionHeading eyebrow={wardrobe.eyebrow} title={wardrobe.title} titleClassName="max-w-[8.6em]" />
      </Container>
      <div ref={ref} className="mt-16 grid gap-2 px-2 sm:mt-24 lg:grid-cols-2 lg:gap-2">
        <div className="lg:sticky lg:top-2 lg:h-[calc(100svh-16px)]">
          <div className="aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full">
            <motion.img src={wardrobe.large.src} alt={wardrobe.large.alt} style={{ scale: zoom }} className="size-full bg-paper-deep object-cover grayscale" loading="lazy" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            {wardrobe.small.map((image, index) => (
              <ClipReveal key={image.src} src={image.src} alt={image.alt} className="aspect-[3/4]" imageClassName={index === 1 ? "grayscale" : undefined} />
            ))}
          </div>
          <FadeUp className="mx-auto flex max-w-[440px] flex-col items-center gap-5 px-4 py-[16vh] text-center">
            <h3 className="font-sans text-[clamp(22px,1.6vw,28px)] font-medium leading-[1.15] tracking-[-0.02em] text-ink">{wardrobe.heading}</h3>
            <p className="font-serif text-[17px] leading-[1.6] text-ink-soft">{wardrobe.body}</p>
          </FadeUp>
          <div className="flex flex-col items-center gap-10 px-4">
            <ClipReveal src={wardrobe.detail.src} alt={wardrobe.detail.alt} className="aspect-[3/5] w-[clamp(120px,12vw,200px)]" />
            <ButtonLink href="/atelier" label={wardrobe.cta} />
          </div>
          <FadeUp className="mx-auto flex max-w-[460px] flex-col items-center gap-5 px-4 py-[18vh] text-center">
            <blockquote className="font-sans text-[clamp(22px,1.6vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-balance text-ink">{wardrobe.quote}</blockquote>
            <div>
              <p className="font-display text-[15px] tracking-[0.04em]">{wardrobe.by}</p>
              <MixedTitle as="p" text={wardrobe.role} className="text-[15px] text-ink-soft" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
