import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { ClipReveal, FadeUp, ParallaxImage } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { MixedTitle } from "@/components/ui/mixed-title"
import { house } from "@/content"

/** The house: the shop, the years, what it believes, and its rooms. */
export function HousePage() {
  return (
    <>
      <PageIntro eyebrow={house.eyebrow} title={house.title} intro={house.intro} />
      <div className="px-2">
        <ClipReveal src={house.image.src} alt={house.image.alt} className="aspect-[4/5] sm:aspect-[16/9]" />
      </div>
      <Timeline />
      <Container className="pb-section">
        <div className="grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-3">
          {house.values.map((value, index) => (
            <FadeUp key={value.title} delay={index * 0.08} className="flex flex-col gap-3">
              <span className="font-serif text-[15px] tabular-nums text-ink-muted">0{index + 1}</span>
              <h3 className="font-display text-[clamp(32px,3vw,52px)] leading-none">{value.title}</h3>
              <p className="max-w-[34ch] font-serif text-[17px] leading-[1.6] text-ink-soft">{value.body}</p>
            </FadeUp>
          ))}
        </div>
      </Container>
      <div className="grid gap-2 px-2 md:grid-cols-[1fr_1.4fr_1fr] md:items-end">
        {house.gallery.map((image, index) => (
          <ParallaxImage key={image.src} src={image.src} alt={image.alt} strength={index === 1 ? 8 : 14} className={index === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} />
        ))}
      </div>
      <Container className="pt-section text-center">
        <FadeUp className="mx-auto flex max-w-[520px] flex-col items-center gap-5">
          <MixedTitle as="h2" text={house.letters.title} className="text-[clamp(40px,5vw,88px)] leading-[0.9]" />
          <p className="font-serif text-[17px] leading-[1.6] text-ink-soft">{house.letters.body}</p>
          <p className="font-sans text-[13px] uppercase tracking-[0.06em] text-ink-muted">Sign up at the foot of the page ↓</p>
        </FadeUp>
      </Container>
      <ClosingCall />
    </>
  )
}

/**
 * The years, with the current one pinned large on the left and swapped —
 * old year up and out, new one up and in — as each row reaches the middle
 * of the screen.
 */
function Timeline() {
  const [current, setCurrent] = useState(0)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index))
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    for (const row of rows.current) if (row) observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <Container className="py-section">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="sticky top-[30svh] h-[clamp(160px,15vw,280px)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={house.timeline[current].year}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                className="font-display text-[clamp(140px,15vw,280px)] leading-[0.95] tracking-[-0.03em]"
              >
                {house.timeline[current].year}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <ol className="flex flex-col">
          {house.timeline.map((row, index) => (
            <li
              key={row.year}
              ref={(element) => {
                rows.current[index] = element
              }}
              data-index={index}
              className="flex min-h-[48svh] flex-col justify-center gap-3 border-t border-ink/15 py-10 transition-opacity duration-500 lg:opacity-40 lg:data-[current=true]:opacity-100"
              data-current={index === current}
            >
              <span className="font-display text-[48px] leading-none lg:hidden">{row.year}</span>
              <h3 className="font-sans text-[clamp(22px,1.7vw,30px)] font-medium tracking-[-0.02em]">{row.title}</h3>
              <p className="max-w-[40ch] font-serif text-[17px] leading-[1.6] text-ink-soft">{row.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  )
}
