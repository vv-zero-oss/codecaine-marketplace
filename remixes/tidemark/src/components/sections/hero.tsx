import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDownLeft, Snowflake } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { GiantWordmark } from "@/components/blocks/giant-wordmark"
import { CountUp } from "@/components/motion/count-up"
import { MetalCard } from "@/components/motion/metal-card"
import { Container } from "@/components/ui/container"
import { ACCOUNT, HERO } from "@/content"
import { money, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The live balance as a flat cream strip under the photograph: the total
 * counting up, the three accounts, and the card's freeze switch.
 */
function BalanceStrip({ frozen, onFreeze }: { frozen: boolean; onFreeze: () => void }) {
  return (
    <div className="grid bg-paper text-ink sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
      <div className="flex flex-col gap-2 border-b border-line p-5 sm:col-span-2 lg:col-span-1 lg:border-r lg:border-b-0">
        <p className="type-eyebrow text-coral">{ACCOUNT.label}</p>
        <p className="font-mono text-[clamp(26px,2.6vw,34px)] leading-none tracking-[-0.03em]">
          <CountUp value={ACCOUNT.balance} />
        </p>
        <p className="text-[13px] text-gain">{ACCOUNT.change}</p>
      </div>
      {ACCOUNT.accounts.map((a) => (
        <div key={a.name} className="flex flex-col justify-between gap-2 border-b border-line p-5 sm:border-r lg:border-b-0">
          <p className="type-eyebrow text-ink-muted">
            {a.name} <span className="font-mono tracking-normal normal-case">{a.number}</span>
          </p>
          <p className="font-mono text-[17px] tabular-nums">{money(a.amount)}</p>
        </div>
      ))}
      <button
        type="button"
        onClick={onFreeze}
        aria-pressed={frozen}
        className={cn(
          "flex min-h-16 items-center justify-between gap-3 p-5 text-left transition-colors duration-(--duration-hover) active:scale-[0.99]",
          frozen ? "bg-ink text-pink" : "hover:bg-paper-deep",
        )}
      >
        <span className="type-caps flex items-center gap-2 text-[12px]">
          <Snowflake className="size-4" />
          {frozen ? "Card frozen" : "Freeze card"}
        </span>
        <span className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors duration-(--duration-hover)", frozen ? "bg-pink" : "bg-line-strong")}>
          <span className={cn("absolute top-0.5 left-0 size-4 rounded-full bg-white transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", frozen ? "translate-x-[18px]" : "translate-x-[2px]")} />
        </span>
      </button>
    </div>
  )
}

/** A payment landing, the way the app announces one: a coral slab. */
function PaymentToast({ show }: { show: boolean }) {
  const reduced = useReducedMotion()
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="flex w-[300px] items-center gap-3 bg-coral p-3 pr-4 text-ink"
        >
          <span className="grid size-9 shrink-0 place-items-center bg-ink text-coral">
            <ArrowDownLeft className="size-4" strokeWidth={2.4} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="type-caps text-[11.5px]">{ACCOUNT.toast.title}</span>
            <span className="truncate text-[12px] text-ink-soft">{ACCOUNT.toast.body}</span>
          </span>
          <span className="font-mono text-[13px] font-medium">{ACCOUNT.toast.amount}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * The hero, framed in oxblood: a photograph with the promise and the account
 * form laid over it, the card and an arriving payment on its right, a flat
 * strip of balances under it, and the name set edge to edge in pink below —
 * running off the foot of the section. The notification and the frozen
 * card are editor actions.
 */
export function Hero({ toastDelay = 1.4 }: { toastDelay?: number }) {
  const { designing } = useCanvasDesignMode()
  const [toast, setToast] = useState(designing)
  const [frozen, setFrozen] = useState(false)
  useCanvasAction("Payment notification", (next) => setToast(next ?? !toast), { on: toast, group: "Hero" })
  useCanvasAction("Card frozen", (next) => setFrozen(next ?? !frozen), { on: frozen, group: "Hero" })

  useEffect(() => {
    if (designing) return
    const id = window.setTimeout(() => setToast(true), toastDelay * 1000)
    return () => window.clearTimeout(id)
  }, [toastDelay, designing])

  return (
    <section id="top" className="bg-night text-night-fg">
      <Container className="max-w-[1320px] pt-2">
        <div className="relative flex flex-col overflow-hidden lg:block lg:aspect-[16/8.4]">
          <img
            src={pexels(HERO.photo, 1800)}
            alt={HERO.photoAlt}
            className="order-2 aspect-[4/5] w-full object-cover object-[60%_30%] sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:size-full"
          />
          {/* Shade under the words, so they hold on the photograph */}
          <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(32_7_4/0.85)_0%,rgb(32_7_4/0.55)_38%,transparent_62%)] lg:block" />

          <div className="relative order-1 flex flex-col items-start pt-10 pb-10 lg:absolute lg:bottom-0 lg:left-0 lg:max-w-[640px] lg:p-10">
            <p className="type-eyebrow text-pink">{HERO.eyebrow}</p>
            <h1 className="type-display mt-5 text-[clamp(46px,6.4vw,96px)] text-night-fg">
              {HERO.titleStart} <span className="text-pink">{HERO.titleAccent}</span> {HERO.titleEnd}
            </h1>
            <p className="mt-5 max-w-[460px] text-[16px] leading-[1.55] text-night-fg/85 md:text-[17px]">{HERO.body}</p>
            <EmailCapture tone="night" className="mt-7" placeholder={HERO.placeholder} cta={HERO.cta} />
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-night-muted">
              {HERO.trust.map((t) => (
                <span key={t}>— {t}</span>
              ))}
            </p>
          </div>

          <div className="pointer-events-none absolute right-6 bottom-8 hidden w-[36%] max-w-[440px] lg:block">
            <div className="pointer-events-auto">
              <MetalCard {...ACCOUNT.card} frozen={frozen} className="-rotate-6" />
            </div>
          </div>
          <div className="absolute top-6 right-6 z-10 hidden sm:block">
            <PaymentToast show={toast} />
          </div>
        </div>
        <BalanceStrip frozen={frozen} onFreeze={() => setFrozen((f) => !f)} />
      </Container>
      <GiantWordmark className="mx-auto mt-8 max-w-[1320px] px-gutter text-pink md:mt-10" />
    </section>
  )
}
