import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { CircleCheck, CreditCard, ReceiptText } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { MetalCard } from "@/components/mock/hero-metal-card"
import { EXPENSE_BUBBLES } from "@/content/home-top"
import { cn } from "@/lib/utils"

const ICON = { swipe: CreditCard, agent: ReceiptText, done: CircleCheck } as const

/**
 * The card in a wallet, and the conversation the agent has about it: the
 * swipe, the receipt hunt, the match. The bubbles arrive one by one while
 * the card is on screen, rest, and start over — the way it happens on every
 * real purchase. All three show at once while designing or reduced.
 */
export function ExpenseFeed({ step = 1.1, hold = 3.5, loop = true, className }: { step?: number; hold?: number; loop?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [shown, setShown] = useState(still ? EXPENSE_BUBBLES.length : 0)

  useEffect(() => {
    if (still) {
      setShown(EXPENSE_BUBBLES.length)
      return
    }
    if (!inView) return
    const done = shown >= EXPENSE_BUBBLES.length
    if (done && !loop) return
    const t = window.setTimeout(() => setShown(done ? 0 : shown + 1), (done ? hold : shown === 0 ? 0.4 : step) * 1000)
    return () => window.clearTimeout(t)
  }, [inView, shown, still, step, hold, loop])

  return (
    <div ref={ref} className={cn("relative h-full min-h-[340px]", className)}>
      <div className="absolute -bottom-10 left-[6%] w-[78%] max-w-[420px]">
        <MetalCard orientation="landscape" className="w-full" />
      </div>
      <div className="absolute inset-x-4 top-4 flex flex-col items-start gap-2.5 sm:inset-x-8">
        <AnimatePresence initial={false}>
          {EXPENSE_BUBBLES.slice(0, shown).map((bubble, i) => {
            const Icon = ICON[bubble.kind]
            return (
              <motion.div
                key={bubble.text}
                initial={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className={cn(
                  "flex max-w-[300px] items-start gap-2 rounded-(--radius-card) bg-raised px-3.5 py-2.5 text-[14.5px] leading-snug text-ink shadow-(--shadow-float)",
                  i === 2 && "self-end sm:mr-2",
                  i === 1 && "ml-4 rounded-tl-[4px]",
                )}
              >
                <Icon className={cn("mt-0.5 size-4 shrink-0", bubble.kind === "done" ? "text-signal-green" : "text-ink-3")} strokeWidth={1.8} />
                {bubble.text}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
