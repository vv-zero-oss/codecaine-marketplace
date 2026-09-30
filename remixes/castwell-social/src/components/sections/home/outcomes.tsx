import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

export type Outcome = { stat: number; suffix?: string; statLabel: string; quote: string; name: string; role: string }

export const OUTCOMES: Outcome[] = [
  {
    stat: 11,
    suffix: " hrs",
    statLabel: "Saved per marketer, every week",
    quote:
      "We used to spend Mondays copying the same post into six tabs. Now Castwell drafts the week on Sunday night and we just approve it over coffee.",
    name: "Priya Anand",
    role: "Head of Social, Fernbrook",
  },
  {
    stat: 0,
    statLabel: "Posts missed since we switched",
    quote:
      "Three markets, four time zones, one calendar. The scheduler knows when Lisbon is awake and when Austin is, and it hasn't dropped a slot since March.",
    name: "Tomás Keller",
    role: "Brand Director, Northloop",
  },
  {
    stat: 4.2,
    suffix: "×",
    statLabel: "More short-form video, same team",
    quote:
      "The video studio turns one long interview into a week of Reels and Shorts. Our editor went from cutting clips to directing the good ones.",
    name: "Ama Owusu",
    role: "Content Lead, Kiln & Co",
  },
]

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * A number and the customer who earned it, one at a time. Advances on its
 * own every `interval` seconds (not while being designed); the three bars
 * underneath fill as the timer runs.
 */
export function OutcomesCarousel({
  interval = 7,
  autoplay = true,
  className,
}: {
  /** Seconds each slide stays up. */
  interval?: number
  autoplay?: boolean
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = autoplay && !designing && !reduce
  const slide = OUTCOMES[index]

  OUTCOMES.forEach((o, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Slide ${i + 1} — ${o.name}`, () => setIndex(i), { on: index === i, group: "Outcomes" })
  })

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % OUTCOMES.length), interval * 1000)
    return () => window.clearTimeout(t)
  }, [index, running, interval])

  const go = (d: number) => setIndex((i) => (i + d + OUTCOMES.length) % OUTCOMES.length)

  return (
    <Reveal className={cn("relative mx-auto mt-12 max-w-[1100px] md:mt-16", className)}>
      {/* the tab that sits on the card's top edge */}
      <span aria-hidden className="absolute -top-9 left-0 hidden h-9 w-40 border border-b-0 border-line bg-page md:block" />
      <div className="grid border border-line bg-page md:grid-cols-[1fr_1.55fr]">
        <div className="flex flex-col justify-between gap-8 border-b border-line p-6 md:border-r md:border-b-0 md:p-11">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-serif text-[5.5rem] leading-none font-light text-ink md:text-[7rem]">
                <CountUp value={slide.stat} decimals={slide.stat % 1 ? 1 : 0} suffix={slide.suffix ?? ""} />
              </p>
              <p className="mt-4 text-[15px] text-ink-soft md:text-base">{slide.statLabel}</p>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-3 gap-2">
            {OUTCOMES.map((o, i) => (
              <button
                key={o.name}
                type="button"
                aria-label={`Show story ${i + 1}`}
                onClick={() => setIndex(i)}
                className="relative h-6 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-line-strong" />
                <span
                  key={`${index}-${i}`}
                  className="absolute top-1/2 left-0 h-[3px] w-full origin-left -translate-y-1/2 bg-mint"
                  style={{
                    transform: `translateY(-50%) scaleX(${i < index ? 1 : i === index && !running ? 1 : 0})`,
                    animation: i === index && running ? `fill-bar ${interval}s linear forwards` : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 md:p-11">
          <svg viewBox="0 0 40 32" className="h-7 w-9 text-mint md:h-9 md:w-11" fill="currentColor" aria-hidden>
            <path d="M0 32V18Q0 6 12 0l3 5Q8 9 8 16h8v16zm22 0V18q0-12 12-18l3 5q-7 4-7 11h8v16z" />
          </svg>
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-6px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-6"
            >
              <p className="font-serif text-[1.35rem] leading-snug font-light text-pretty text-ink md:text-[1.9rem]">
                {slide.quote}
              </p>
              <footer className="mt-6 text-[13px]">
                <p className="font-medium text-ink">{slide.name}</p>
                <p className="mt-1 text-muted">{slide.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="grid grid-cols-2 border border-t-0 border-line bg-page">
          <button
            type="button"
            aria-label="Previous story"
            onClick={() => go(-1)}
            className="grid size-12 cursor-pointer place-items-center border-r border-line transition-[background-color,transform] duration-150 hover:bg-sage active:scale-[0.97] md:size-[60px]"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next story"
            onClick={() => go(1)}
            className="grid size-12 cursor-pointer place-items-center transition-[background-color,transform] duration-150 hover:bg-sage active:scale-[0.97] md:size-[60px]"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </Reveal>
  )
}

export function Outcomes({
  eyebrow = "Outcomes",
  title = "Consistent. On-brand. Always posting.",
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <Section id="outcomes" tone="sage">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <OutcomesCarousel />
      </Container>
    </Section>
  )
}
