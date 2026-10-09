import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Doodle } from "@/components/mock/doodles"
import { Container } from "@/components/ui/container"

/** Days until the next Tuesday roast (0 on a Tuesday). */
export function daysToRoast(now = new Date()) {
  return (2 - now.getDay() + 7) % 7
}

/**
 * The shop opens loud: "The shelf." set huge, a line of intro, how many
 * things are on it right now, and when the next batch comes out of the drum.
 */
export function ShopHero({ count = 8, kind = "coffees" }: { count?: number; kind?: string }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const days = daysToRoast()
  const still = reduced || designing

  return (
    <section className="border-b border-line">
      <Container className="grid gap-8 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14">
        <div>
          <p className="type-label mb-4 text-[11.5px] text-ink-3">Shop · roasted to order</p>
          <h1 className="type-display text-mega">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={still ? false : { transform: "translateY(100%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              >
                The <span className="text-rust">shelf.</span>
              </motion.span>
            </span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lead text-ink-2">
            Everything we roast and everything we print, in one place. Pick a bag, pick a grind — it leaves the plant the same day it comes out of the drum.
          </p>
        </div>
        <div className="flex items-end gap-6">
          <div className="space-y-3 border-l border-line pl-6">
            <p>
              <span className="type-display block text-h1 tabular" aria-live="polite">
                {String(count).padStart(2, "0")}
              </span>
              <span className="type-label text-[11px] text-ink-3">{kind} on the shelf</span>
            </p>
            <p className="inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1.5 text-[13px] text-ink-2">
              <span className="size-2 rounded-full bg-ember" />
              {days === 0 ? "Roasting today — ships this afternoon" : `Roasted Tuesday — next roast in ${days} day${days === 1 ? "" : "s"}`}
            </p>
          </div>
          <Doodle name="crate" className="hidden w-32 md:block" />
        </div>
      </Container>
    </section>
  )
}
