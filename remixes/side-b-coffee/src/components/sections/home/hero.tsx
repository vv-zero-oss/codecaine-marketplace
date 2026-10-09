import { motion, useReducedMotion } from "motion/react"
import { ArrowDown } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { HeroReel } from "@/components/motion/hero-reel"
import { RecordMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { VIDEOS } from "@/lib/photos"

const CLIPS = [
  { ...VIDEOS.roast, label: "Coffee turning in the roaster" },
  { ...VIDEOS.record, label: "A record spinning on the bar's turntable" },
]

/**
 * The window: footage from the roastery and the bar in a honey frame, the
 * wordmark set huge in honey over its top-left corner, and the two things people come
 * for — coffee to take home, and a bar to sit in.
 *
 * The wordmark's lines rise out of a mask on load (900ms ease-out, 90ms
 * apart) — the page's one big entrance.
 */
export function Hero({
  lineOne = "Side B",
  lineTwo = "Coffee",
  caption = "Roasted on Tuesdays in an old record-pressing plant. Poured all week with something good on the stereo.",
}: {
  lineOne?: string
  lineTwo?: string
  caption?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const rise = (i: number) =>
    still
      ? {}
      : {
          initial: { transform: "translateY(105%)" },
          animate: { transform: "translateY(0%)" },
          transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.23, 1, 0.32, 1] as const },
        }

  return (
    <section className="bg-honey p-2 sm:p-3">
    <div className="relative isolate flex h-[min(88svh,860px)] min-h-[540px] flex-col justify-between overflow-hidden rounded-(--radius-panel) text-page shadow-(--shadow-card)">
      <HeroReel clips={CLIPS} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,color-mix(in_oklab,var(--color-cocoa)_55%,transparent),transparent_60%),linear-gradient(to_top,color-mix(in_oklab,var(--color-cocoa)_50%,transparent),transparent_40%)]" />

      <h1 className="type-display relative p-(--spacing-gutter) text-mega text-honey">
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block" {...rise(0)}>
            {lineOne}
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span className="flex items-end gap-[0.1em]" {...rise(1)}>
            {lineTwo}
            <RecordMark className="mb-[0.12em] size-[0.5em] text-honey" />
          </motion.span>
        </span>
      </h1>

      <motion.div
        className="relative flex flex-col gap-5 p-(--spacing-gutter) pb-16 sm:flex-row sm:items-end sm:justify-between sm:pb-(--spacing-gutter)"
        initial={still ? false : { opacity: 0, transform: "translateY(12px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-[420px] space-y-4">
          <p className="text-lead text-page/90">{caption}</p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/shop" variant="paper">
              Shop coffee
            </ButtonLink>
            <ButtonLink href="/#bars" variant="outline" className="text-page shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-page)_50%,transparent)] hover:bg-page/10">
              Find a bar
            </ButtonLink>
          </div>
        </div>
        <a href="#manifesto" className="type-label group hidden items-center gap-2 text-[11px] text-page/80 transition-colors hover:text-page sm:mr-28 sm:inline-flex">
          <ArrowDown className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-y-0.5" /> Flip it over
        </a>
      </motion.div>
    </div>
    </section>
  )
}
