import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { DeckMock } from "@/components/mock/deck-mocks"
import { PLATFORM, type DeckCardKey } from "@/content"
import { cn } from "@/lib/utils"

type Card = (typeof PLATFORM.cards)[number]

/**
 * A stack of feature cards, one in front and the rest peeking out above it
 * by their tabs. Click the stack (or a tab) and the next card comes forward.
 *
 * Measured off the reference: each card behind sits 30px higher and 4%
 * narrower; a swap takes ~350ms on an ease-out. `autoplay` advances on its
 * own every `interval` seconds, and stops while the page is being designed.
 * Every card is an action in the editor, so any one can be brought forward
 * without clicking.
 */
export function FeatureDeck({
  start = "triage",
  step = 30,
  shrink = 0.04,
  duration = 0.35,
  autoplay = false,
  interval = 6,
  className,
}: {
  start?: DeckCardKey
  /** Pixels each card behind rises above the one in front. */
  step?: number
  /** How much narrower each card behind is (0–0.1). */
  shrink?: number
  /** Seconds a swap takes. */
  duration?: number
  autoplay?: boolean
  interval?: number
  className?: string
}) {
  const cards = PLATFORM.cards
  const [front, setFront] = useState<DeckCardKey>(start)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()

  useEffect(() => setFront(start), [start])

  for (const card of cards) {
    // One switch per card, always registered in the same order.
    useCanvasAction(card.label, (next) => next !== false && setFront(card.key), { on: front === card.key, group: "Platform" })
  }

  const index = cards.findIndex((c) => c.key === front)
  const order: Card[] = cards.map((_, i) => cards[(index + i) % cards.length])
  const next = () => setFront(order[1].key)

  useEffect(() => {
    if (!autoplay || designing || reduced) return
    const id = window.setInterval(() => setFront((k) => cards[(cards.findIndex((c) => c.key === k) + 1) % cards.length].key), interval * 1000)
    return () => window.clearInterval(id)
  }, [autoplay, designing, reduced, interval, cards])

  const behind = cards.length - 1

  return (
    <div className={cn("relative", className)} style={{ paddingTop: behind * step }}>
      {order.map((card, depth) => {
        const isFront = depth === 0
        return (
          <motion.article
            key={card.key}
            role={isFront ? undefined : "button"}
            tabIndex={isFront ? undefined : 0}
            aria-label={isFront ? undefined : `Show ${card.label}`}
            onClick={isFront ? undefined : () => setFront(card.key)}
            onKeyDown={(e) => !isFront && (e.key === "Enter" || e.key === " ") && setFront(card.key)}
            initial={false}
            animate={{ y: -depth * step, scale: 1 - depth * shrink }}
            transition={reduced ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] }}
            style={{ zIndex: cards.length - depth, top: isFront ? undefined : behind * step }}
            className={cn(
              "origin-top overflow-hidden rounded-[var(--radius-panel)] border border-line bg-card shadow-(--shadow-sheet)",
              isFront ? "relative" : "absolute inset-x-0 cursor-pointer",
            )}
          >
            <header className="flex h-10 items-start gap-2.5 px-4 pt-[9px] text-[13px] text-ink-soft">
              <span className={cn("mt-[5px] size-2 rotate-45 rounded-[2px]", card.dot)} />
              {card.label}
            </header>
            <motion.div
              initial={false}
              animate={{ opacity: isFront ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : duration * 0.8, delay: isFront && !reduced ? duration * 0.3 : 0 }}
              className="grid gap-6 px-4 pb-4 md:grid-cols-[0.8fr_1.4fr] md:gap-8 md:pb-0 md:pl-4"
              aria-hidden={!isFront}
            >
              <div className="flex flex-col gap-3 pt-2 md:pt-6 md:pb-10">
                <h3 className="type-display text-[clamp(26px,3vw,34px)] text-balance">{card.title}</h3>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-ink-muted">{card.body}</p>
                {isFront && (
                  <button
                    type="button"
                    onClick={next}
                    className="mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-ink underline-offset-4 hover:underline"
                  >
                    Next: {order[1].label} →
                  </button>
                )}
              </div>
              <div className="min-h-[300px] rounded-t-[12px] border border-b-0 border-line bg-card md:mt-4 md:min-h-[360px] md:rounded-tr-none md:border-r-0">
                <DeckMock card={card.key} paused={!isFront} />
              </div>
            </motion.div>
          </motion.article>
        )
      })}
    </div>
  )
}
