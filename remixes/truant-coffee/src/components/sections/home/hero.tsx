import { useRef, useState } from "react"
import { ArrowUp, Plus } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { LineReveal } from "@/components/motion/line-reveal"
import { Marquee } from "@/components/motion/marquee"
import { ButtonLink } from "@/components/ui/button"
import { coffeeById, type Coffee } from "@/content/coffees"
import { money, photo } from "@/lib/photos"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

/** A steaming cup, drawn in line — the brand card's small illustration. */
function CupDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={cn("size-12", className)} aria-hidden>
      <path d="M10 24h24v6a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10z" />
      <path d="M34 27h3a4 4 0 0 1 0 8h-4" />
      <path d="M6 44h34" />
      {[16, 22, 28].map((x, i) => (
        <path key={x} d={`M${x} 19c-2-3 2-5 0-9`} className="motion-safe:animate-steam" style={{ animationDelay: `${i * 0.45}s`, transformBox: "fill-box" }} />
      ))}
    </svg>
  )
}

/**
 * One coffee in the hero's strip: name, price and three spec rows, framed in
 * a 1px white line. Hover lifts a wash behind it and slides in an add; a
 * click puts a 12 oz bag in the cart and confirms in place.
 */
function HeroCoffeeCard({ coffee, className }: { coffee: Coffee; className?: string }) {
  const { add } = useStore()
  const [added, setAdded] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        add(coffee.id)
        setAdded(true)
        window.setTimeout(() => setAdded(false), 1400)
      }}
      className={cn(
        "group relative flex min-h-[156px] w-full flex-col justify-between rounded-[var(--radius-card)] p-4 text-left text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.85)] transition-colors duration-300 ease-[var(--ease-out-strong)] hover:bg-white/12",
        className,
      )}
    >
      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:gap-3">
        <span className="type-display text-[21px] leading-none sm:text-d1 [text-shadow:0_1px_12px_rgb(0_0_0/0.25)]">{coffee.name}</span>
        <span className="text-[13px] tabular-nums sm:pt-0.5 sm:text-[14px]">{money(coffee.price)}</span>
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-display text-[13px] sm:gap-x-6 sm:text-[14px] uppercase leading-tight tracking-[0.03em]">
        <dt>Type:</dt>
        <dd>{coffee.series === "field" ? "Micro-lot" : "Single origin"}</dd>
        <dt>Origin:</dt>
        <dd>{coffee.country}</dd>
        <dt>Process:</dt>
        <dd>{coffee.process}</dd>
      </dl>
      <span
        className={cn(
          "type-display absolute right-3 bottom-3 flex items-center gap-1 rounded-[var(--radius-tag)] bg-paper px-2 pt-1 pb-0.5 text-[15px] text-ink opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          added && "translate-y-0 bg-recess opacity-100",
        )}
      >
        {added ? "In the bag" : (
          <>
            <Plus className="size-3" /> Add
          </>
        )}
      </span>
    </button>
  )
}

/**
 * The opening: one photograph, the promise stacked huge down its left side,
 * the pitch and a paper button on the right, and along the bottom a brand
 * card, two coffees you can drop straight in the bag and a ticker that never
 * stops. As you scroll, the headline lifts away faster than the photograph.
 */
export function Hero({
  headline = "Take|the|long|way",
  pitch = "Coffee for the hour you stole back. Single origins roasted on the shore of Lake Superior, shipped the morning they cool.",
  ticker = "New * Fresh off the drum * New",
}: {
  headline?: string
  pitch?: string
  ticker?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"])
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-38%"])
  const pitchOpacity = useTransform(scrollYProgress, [0, 0.12, 0.5], [0.85, 1, 1])
  const first = coffeeById["half-day-4"]
  const second = coffeeById["hall-pass"]

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[max(100svh,720px)] flex-col overflow-hidden bg-ink text-white lg:min-h-[max(100svh,760px)]">
      <motion.div style={{ y: photoY }} className="absolute inset-0 -z-10">
        <img src={photo("hero", 2000)} alt="A woman in a red turtleneck holding a cup of coffee at a café window in winter" className="h-[115%] w-full object-cover object-[50%_30%]" fetchPriority="high" />
        <div className="photo-scrim absolute inset-0" />
      </motion.div>

      <motion.div style={{ y: headY }} className="px-[var(--spacing-gutter)] pt-10 lg:pt-[72px]">
        <LineReveal text={headline} className="type-display text-d6 text-paper [text-shadow:0_2px_40px_rgb(0_0_0/0.18)]" />
      </motion.div>

      <motion.div
        style={{ opacity: pitchOpacity }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-10 px-[var(--spacing-gutter)] md:absolute md:top-[34%] md:right-[var(--spacing-gutter)] md:mt-0 md:max-w-[min(30ch,36vw)] md:px-0"
      >
        <p className="type-display text-d1 leading-[1.02] tracking-[0.005em] text-paper [text-shadow:0_1px_18px_rgb(0_0_0/0.25)] md:text-[clamp(25.89px,2.1vw,32.94px)]">{pitch}</p>
        <ButtonLink href="/shop" variant="paper" size="md" className="mt-6">
          Shop now
        </ButtonLink>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-auto px-[var(--spacing-gutter)] pt-12 pb-[var(--spacing-gutter)]"
      >
        <div className="grid gap-px md:grid-cols-[1.15fr_1fr_1fr] md:grid-rows-[auto_auto] lg:max-w-[1120px]">
          <div className="hidden flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] p-6 text-center shadow-[inset_0_0_0_1px_rgb(255_255_255/0.85)] md:row-span-2 md:flex">
            <p className="type-display text-d2">A Lake Superior specialty coffee company</p>
            <CupDrawing />
          </div>
          <div className="grid grid-cols-2 gap-px md:col-span-2 md:grid-cols-2">
            <HeroCoffeeCard coffee={first} />
            <HeroCoffeeCard coffee={second} />
          </div>
          <div className="flex h-14 items-center overflow-hidden rounded-[var(--radius-card)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.85)] md:col-span-2">
            <Marquee speed={22} className="type-display text-[22px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="flex items-center gap-5 px-5 pt-1">
                  {[0, 1, 2, 3, 4].map((a) => (
                    <ArrowUp key={a} className="size-5 stroke-[1.6]" />
                  ))}
                  <span className="whitespace-nowrap">{ticker}</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
