import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { scrollToY } from "@/components/motion/smooth-scroll"
import { Button, ButtonLink } from "@/components/ui/button"
import { COFFEES, SERIES, type Series, type SeriesId } from "@/content/coffees"
import { photo } from "@/lib/photos"
import { Link } from "@/lib/router"
import { useStore, useWeight } from "@/lib/store"
import { cn } from "@/lib/utils"

/** Windows the last series stays pinned before the stack lets go. */
const HOLD = 0.5

const CHIP: Record<SeriesId, string> = {
  recess: "text-recess-ink",
  detour: "text-detour",
  field: "text-field",
  latebell: "text-latebell",
}

/**
 * One series, as a full-window panel that pins while the next slides up
 * over it. While it is being covered it settles back — 6% smaller and a
 * shade darker — so the stack reads as cards laid on top of each other.
 */
function SeriesPanel({ series, index, total, progress, still }: { series: Series; index: number; total: number; progress: MotionValue<number>; still: boolean }) {
  const reduced = useReducedMotion()
  const { add } = useStore()
  const weight = useWeight()
  const lead = COFFEES.find((c) => c.series === series.id)!
  // The stack scrolls (total − 1) windows; this panel is covered during
  // the window after its own.
  const last = index === total - 1
  const length = total - 1 + HOLD
  const span = last ? [0, 1] : [index / length, (index + 1) / length]
  const scale = useTransform(progress, span, [1, reduced || last ? 1 : 0.94])
  const shade = useTransform(progress, span, [0, reduced || last ? 0 : 0.35])
  const [added, setAdded] = useState(false)

  return (
    <div id={`series-${series.id}`} className={cn("relative lg:h-[100svh] lg:overflow-hidden", !still && "lg:sticky lg:top-0")} style={{ zIndex: index + 1 }}>
      <motion.article
        style={{ scale }}
        className="relative grid h-full origin-top gap-4 bg-paper px-[var(--spacing-gutter)] pt-4 pb-10 md:grid-cols-[1.618fr_1fr] md:gap-5 lg:pt-[72px] lg:pb-[var(--spacing-gutter)]"
      >
        <div className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-tag)] md:min-h-0">
          <img src={photo(series.photo, 1600)} alt={series.photoAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-strong)] hover:scale-[1.03]" />
          <div className="absolute inset-0 grid place-items-center">
            <span className={cn("type-display rounded-[var(--radius-tag)] bg-raised px-5 pt-3 pb-1.5 text-center text-d3 shadow-card", CHIP[series.id])}>
              {series.short}
              <br />
              Series
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius-tag)] bg-shelf md:aspect-auto md:flex-[1_1_0] md:min-h-[200px]">
            <div className="w-[38%] max-w-[180px] transition-transform duration-500 ease-[var(--ease-out-strong)] hover:-translate-y-1.5 hover:rotate-[-2deg]">
              <CoffeeBag coffeeId={lead.id} weight={weight("12oz")} tilt={4} />
            </div>
            <span className="type-eyebrow absolute top-3 left-3 text-ink-3">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="type-display mt-5 text-d3">{series.name}</h3>
          <p className="mt-3 max-w-[46ch] text-body text-ink-2">{series.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href={`/shop?series=${series.id}`}>Shop</ButtonLink>
            <Button
              variant="outline"
              onClick={() => {
                add(lead.id)
                setAdded(true)
                window.setTimeout(() => setAdded(false), 1400)
              }}
            >
              {added ? `${lead.name} added` : `Add ${lead.name}`}
            </Button>
          </div>
        </div>
      </motion.article>
      <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 hidden bg-ink lg:block" />
    </div>
  )
}

/**
 * The four series, stacked as you scroll: each pins to the window and the
 * next slides up over it. The arrows jump straight to a series and know
 * where you are.
 */
export function Collections({ title = "Collections" }: { title?: string }) {
  const [active, setActive] = useState(0)
  // Reduced motion and design mode lay the series out one after another,
  // so each can be read — and picked — on its own.
  const reducedMotion = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!reducedMotion || designing
  const stack = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] })
  // The heading bar bows out while the last series holds, so it never
  // rides over the photograph as the stack scrolls away.
  const barOpacity = useTransform(scrollYProgress, [(SERIES.length - 1) / (SERIES.length - 1 + HOLD), 1], [1, 0])

  useEffect(() => {
    const update = () => {
      const el = stack.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      let current = 0
      if (window.innerWidth >= 1024) {
        // Pinned panels all sit at the same top, so count windows scrolled.
        current = Math.floor((window.innerHeight * 0.5 - top) / window.innerHeight)
      } else {
        Array.from(el.children).slice(0, SERIES.length).forEach((child, i) => {
          if (child.getBoundingClientRect().top <= window.innerHeight * 0.5) current = i
        })
      }
      setActive(Math.max(0, Math.min(SERIES.length - 1, current)))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  // Sticky panels all report the same top once pinned, so jump by the
  // stack's own offset: one window per series.
  const go = (i: number) => {
    const n = Math.max(0, Math.min(SERIES.length - 1, i))
    const el = stack.current
    if (!el) return
    const base = el.getBoundingClientRect().top + window.scrollY
    const offset = window.innerWidth >= 1024 ? n * window.innerHeight : (el.children[n] as HTMLElement).offsetTop - 140
    scrollToY(base + offset)
  }

  useCanvasAction("Next series", () => go(active + 1), { group: "Collections" })

  return (
    <section id="collections" className="relative bg-paper">
      <motion.div style={{ opacity: barOpacity }} className="sticky top-[84px] z-20 flex items-center justify-between gap-4 bg-paper/90 px-[var(--spacing-gutter)] py-3 backdrop-blur-sm lg:top-0 lg:bg-transparent lg:pt-5 lg:pl-[calc(var(--spacing-gutter)+56px)] lg:backdrop-blur-none">
        <h2 className="text-lead tracking-[-0.02em]">{title}</h2>
        <div className="flex items-center gap-3">
          <Link href="/shop" className="text-caption underline underline-offset-4 transition-colors hover:text-tomato">
            View all
          </Link>
          {[
            { dir: -1, Icon: ArrowLeft, label: "Previous series", disabled: active === 0 },
            { dir: 1, Icon: ArrowRight, label: "Next series", disabled: active === SERIES.length - 1 },
          ].map(({ dir, Icon, label, disabled }) => (
            <button
              key={dir}
              type="button"
              aria-label={label}
              disabled={disabled}
              onClick={() => go(active + dir)}
              className="grid size-10 place-items-center rounded-full shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[opacity,background-color,color,transform] duration-200 hover:bg-ink hover:text-paper active:scale-90 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </motion.div>
      <div ref={stack} className="lg:-mt-[64px]">
        {SERIES.map((s, i) => (
          <SeriesPanel key={s.id} series={s} index={i} total={SERIES.length} progress={scrollYProgress} still={still} />
        ))}
        <div aria-hidden className={cn("hidden", !still && "lg:block")} style={{ height: `${HOLD * 100}svh` }} />
      </div>
    </section>
  )
}
