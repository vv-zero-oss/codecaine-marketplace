import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MetalCard, type MetalFinish } from "@/components/ui/metal-card"
import { SplitText } from "@/components/motion/split-text"
import { USES } from "@/content"
import { cn } from "@/lib/utils"

const PHOTOS = import.meta.glob<string>("@/assets/uses/*.jpg", { eager: true, query: "?url", import: "default" })
const photo = (key: string) => PHOTOS[`/src/assets/uses/${key}.jpg`]
const FINISHES: MetalFinish[] = ["titanium", "chrome", "champagne", "graphite", "copper"]

/** A tall photo card with the Ember card that lives there pinned to its foot. */
export function UseCaseCard({
  image,
  title,
  body,
  last4,
  rule,
  finish = "titanium",
  className,
}: {
  image: string
  title: string
  body: string
  last4: string
  rule: string
  finish?: MetalFinish
  className?: string
}) {
  return (
    <article
      className={cn(
        "group relative aspect-[3/4] w-[min(78vw,360px)] shrink-0 snap-start overflow-hidden rounded-card bg-surface shadow-card",
        className,
      )}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/85" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-serif text-[1.75rem] leading-tight text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/70">{body}</p>
        <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-white/10 p-2.5 backdrop-blur-md">
          <MetalCard size="sm" finish={finish} last4={last4} interactive={false} className="w-14 shrink-0 [&_p]:hidden" />
          <span className="font-mono text-xs text-white tabular-nums">•••• {last4}</span>
          <span className="ml-auto text-[0.6875rem] text-white/75">{rule}</span>
        </div>
      </div>
    </article>
  )
}

/**
 * The use cases as a row that moves sideways while the page scrolls down:
 * the section pins, and the vertical scroll drives the row left until its
 * last card is in view. Below `md`, and under reduced motion, it is a plain
 * swipeable row instead.
 */
export function UseCases({ eyebrow = USES.eyebrow, title = USES.title }: { eyebrow?: string; title?: string }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [travel, setTravel] = useState(0)
  const [wide, setWide] = useState(true)

  useLayoutEffect(() => {
    const measure = () => {
      const el = track.current
      if (!el) return
      setWide(window.matchMedia("(min-width: 768px)").matches)
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const pinned = wide && !reduce
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -travel])
  const transform = useTransform(x, (v) => `translateX(${v}px)`)

  const cards = USES.items.map((item, i) => (
    <UseCaseCard key={item.key} finish={FINISHES[i % FINISHES.length]} image={photo(item.key)} title={item.title} body={item.body} last4={item.last4} rule={item.rule} />
  ))

  return (
    <section
      id="uses"
      ref={section}
      className="relative"
      style={{ height: pinned ? `calc(100svh + ${travel}px)` : undefined }}
    >
      <div
        data-canvas-ignore
        className={cn("flex flex-col justify-center py-20", pinned && "sticky top-0 h-svh overflow-hidden py-0")}
      >
        <Container className="mb-10 flex flex-col items-start gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow label={eyebrow} className="mb-5" />
            <SplitText text={title} className="font-serif text-headline text-ink" />
          </div>
          <p className="max-w-xs text-[0.9375rem] leading-relaxed text-muted md:text-right">
            Six habits, six cards, one app. {pinned ? "Keep scrolling." : "Swipe along."}
          </p>
        </Container>
        {pinned ? (
          <motion.div
            ref={track}
            data-canvas-ignore
            className="flex w-max gap-5 pr-[max(1rem,calc((100vw-1176px)/2+1.5rem))] pl-[max(1rem,calc((100vw-1176px)/2+1.5rem))]"
            style={{ transform }}
          >
            {cards}
          </motion.div>
        ) : (
          <div
            ref={track}
            data-canvas-ignore
            data-lenis-prevent
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none]"
          >
            {cards}
          </div>
        )}
      </div>
    </section>
  )
}
