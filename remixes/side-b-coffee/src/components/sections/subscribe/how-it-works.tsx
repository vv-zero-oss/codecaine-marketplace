import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const STEPS = [
  { title: "You choose a rhythm.", body: "Every one, two or four weeks. The calendar starts the Tuesday after you sign up.", caption: "A four-week month, every two weeks" },
  { title: "We roast on Tuesday.", body: "Five-kilo batches, roasted to the orders that came in over the weekend. Every batch is tasted before it's bagged.", caption: "Roast days" },
  { title: "It lands by Friday.", body: "Packed the same afternoon, posted free, through your letterbox three days off the drum — the week it tastes best.", caption: "Delivery days" },
  { title: "Skip it, swap it, stop it.", body: "Away for a fortnight? Skip one from the email. Fancy the new Kenyan? Swap. No calls, no cancellation maze.", caption: "One delivery skipped" },
]

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]

/**
 * How it works, as a calendar that fills in while you read. The month
 * pins on the left; as each step reaches the middle of the screen the
 * calendar marks what it's about — roast days in rust, delivery days with
 * a bag, a skipped week struck through — each mark popping in with a short
 * spring. Below `lg` the calendar pins to the top and the steps slide under.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0)
  useCanvasAction("How it works step", (next) => setActive((a) => (next == null ? (a + 1) % STEPS.length : next ? STEPS.length - 1 : 0)), {
    on: active === STEPS.length - 1,
    group: "Subscribe",
  })

  return (
    <section className="border-b border-line py-(--spacing-section)">
      <Container>
        <SectionHeading kicker="How it works" before="Fresh on" highlight="Friday," after=" every time." tone="rust" doodle="cup" size="h1" className="mb-12 lg:mb-16" />
        <div className="relative grid lg:grid-cols-2 lg:gap-(--spacing-gutter)">
          <div className="sticky top-14 z-10 bg-page py-3 lg:top-[68px] lg:h-[calc(100svh-88px)] lg:bg-transparent lg:py-0">
            <Calendar active={active} />
          </div>
          <ol>
            {STEPS.map((s, i) => (
              <Step key={s.title} index={i} active={i === active} onEnter={() => setActive(i)} title={s.title} body={s.body} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

function Step({ index, active, onEnter, title, body }: { index: number; active: boolean; onEnter: () => void; title: string; body: string }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  useEffect(() => {
    if (inView) onEnter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  return (
    <li ref={ref} className="flex min-h-[48svh] flex-col justify-center border-t border-line py-12 first:border-t-0 lg:min-h-[64svh]">
      <div className={cn("max-w-[480px] space-y-4 transition-opacity duration-500", active ? "opacity-100" : "opacity-35")}>
        <p className="type-label text-[11.5px] text-ember-ink">Step {String(index + 1).padStart(2, "0")}</p>
        <h3 className="type-display text-h2">{title}</h3>
        <p className="text-lead text-ink-2">{body}</p>
      </div>
    </li>
  )
}

function Calendar({ active }: { active: number }) {
  const reduced = useReducedMotion()
  // 28 days, Monday first. Roast on Tuesdays (1, 15 for a fortnightly plan), deliver Fridays (4, 18).
  const roast = new Set([1, 15])
  const deliver = new Set([4, 18])
  const skipped = 18
  const pop = reduced ? { initial: { opacity: 0 }, animate: { opacity: 1 } } : { initial: { opacity: 0, transform: "scale(0.6)" }, animate: { opacity: 1, transform: "scale(1)" } }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="rounded-(--radius-panel) bg-raised p-4 shadow-(--shadow-float) sm:p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="type-display text-h4">Your next four weeks</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={active} className="type-label text-[10.5px] text-ink-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {STEPS[active].caption}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center sm:gap-1.5">
          {DAYS.map((d, i) => (
            <span key={i} className="type-label pb-1 text-[10px] text-ink-3">
              {d}
            </span>
          ))}
          {Array.from({ length: 28 }, (_, i) => {
            const isRoast = active >= 1 && roast.has(i)
            const isDeliver = active >= 2 && deliver.has(i)
            const isSkipped = active >= 3 && i === skipped
            return (
              <div
                key={i}
                className={cn(
                  "relative grid aspect-square place-items-center rounded-(--radius-field) bg-panel font-mono text-[11px] text-ink-3 tabular transition-colors duration-(--duration-swap) sm:text-[12px]",
                  isRoast && "bg-rust text-page",
                  isDeliver && !isSkipped && "bg-honey-soft text-ink",
                )}
              >
                <span className={cn("absolute top-1 left-1.5", (isDeliver || isRoast) && "opacity-80")}>{i + 1}</span>
                <AnimatePresence>
                  {isRoast && (
                    <motion.span key="r" className="type-label mt-3 text-[8px] sm:text-[9px]" {...pop} exit={{ opacity: 0 }} transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}>
                      Roast
                    </motion.span>
                  )}
                  {isDeliver && (
                    <motion.span key="d" className={cn("mt-3 w-[42%]", isSkipped && "opacity-30")} {...pop} exit={{ opacity: 0 }} transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}>
                      <CoffeeBag />
                    </motion.span>
                  )}
                </AnimatePresence>
                {isSkipped && (
                  <motion.span
                    className="absolute inset-x-2 top-1/2 h-[2px] origin-left rounded-full bg-rust"
                    initial={reduced ? { opacity: 0 } : { transform: "scaleX(0) rotate(-20deg)" }}
                    animate={{ opacity: 1, transform: "scaleX(1) rotate(-20deg)" }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-[12.5px] text-ink-2">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-[3px] bg-rust" /> Roast day
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-[3px] bg-honey-soft shadow-[inset_0_0_0_1px_var(--color-line-strong)]" /> Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-[2px] w-3 -rotate-20 bg-rust" /> Skipped
          </span>
        </div>
      </div>
    </div>
  )
}
