import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDownLeft, Check, Snowflake } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { CountUp } from "@/components/motion/count-up"
import { MetalCard } from "@/components/motion/metal-card"
import { Sparkline } from "@/components/motion/sparkline"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ACCOUNT, HERO } from "@/content"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** The live balance: total, the month's change, a sparkline, the three accounts, and the card's freeze switch. */
function BalancePanel({ frozen, onFreeze }: { frozen: boolean; onFreeze: () => void }) {
  return (
    <div className="rounded-[var(--radius-panel)] bg-card p-5 pt-24 shadow-(--shadow-card) sm:p-6 sm:pt-28">
      <p className="type-eyebrow text-ink-muted">{ACCOUNT.label}</p>
      <p className="mt-2 font-mono text-[clamp(28px,3vw,38px)] leading-none tracking-[-0.03em] text-ink">
        <CountUp value={ACCOUNT.balance} />
      </p>
      <p className="mt-2 text-[13.5px] text-gain">{ACCOUNT.change}</p>
      <Sparkline className="mt-4" points="41,42,40,44,47,46,49,52,51,55,58,57,61,64" />
      <ul className="mt-4 divide-y divide-line border-t border-line">
        {ACCOUNT.accounts.map((a) => (
          <li key={a.name} className="flex items-center justify-between py-3 text-[14px]">
            <span className="flex flex-col">
              <span className="text-ink">{a.name}</span>
              <span className="font-mono text-[11.5px] text-ink-subtle">{a.number}</span>
            </span>
            <span className="font-mono tabular-nums text-ink">{money(a.amount)}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onFreeze}
        aria-pressed={frozen}
        className={cn(
          "mt-2 flex h-11 w-full items-center justify-between rounded-[var(--radius-field)] px-3 text-[14px] transition-colors duration-(--duration-hover) active:scale-[0.98]",
          frozen ? "bg-forest text-forest-fg" : "bg-paper text-ink hover:bg-paper-deep",
        )}
      >
        <span className="flex items-center gap-2">
          <Snowflake className="size-4" />
          {frozen ? "Card frozen" : "Freeze card •• 4821"}
        </span>
        <span className={cn("relative h-5 w-9 rounded-full transition-colors duration-(--duration-hover)", frozen ? "bg-lime" : "bg-line-strong")}>
          <span className={cn("absolute top-0.5 left-0 size-4 rounded-full bg-white shadow transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", frozen ? "translate-x-[18px]" : "translate-x-[2px]")} />
        </span>
      </button>
    </div>
  )
}

/** A payment landing, the way the app announces one. */
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
          className="flex w-[290px] items-center gap-3 rounded-[var(--radius-card)] bg-forest p-3 pr-4 text-forest-fg shadow-(--shadow-float)"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-forest-deep">
            <ArrowDownLeft className="size-4" strokeWidth={2.4} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[13.5px] font-medium">{ACCOUNT.toast.title}</span>
            <span className="truncate text-[12px] text-forest-muted">{ACCOUNT.toast.body}</span>
          </span>
          <span className="font-mono text-[13px] text-lime">{ACCOUNT.toast.amount}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * The hero: the promise and the account form on the left; on the right the
 * card, the live balance under it, and a payment notification that arrives
 * a moment after the page does. The notification and the frozen card are
 * editor actions.
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
    <section id="top" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start">
          <p className="type-eyebrow flex items-center gap-2 text-ink-muted">
            <span className="size-1.5 rounded-full bg-brass" />
            {HERO.eyebrow}
          </p>
          <h1 className="type-display mt-6 text-[clamp(52px,7.4vw,104px)] leading-[0.95] text-balance text-ink">
            {HERO.titleStart} <em className="italic">{HERO.titleAccent}</em> {HERO.titleEnd}
          </h1>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.55] text-ink-muted md:text-[18px]">{HERO.body}</p>
          <EmailCapture className="mt-9" placeholder={HERO.placeholder} cta={HERO.cta} />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {HERO.trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[13px] text-ink-muted">
                <Check className="size-3.5 text-gain" strokeWidth={2.5} />
                {t}
              </span>
            ))}
            <ButtonLink href="#contact" variant="link" className="h-auto px-0 text-[13px] text-ink-soft sm:hidden">
              {HERO.secondary} →
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] sm:pt-12 lg:mx-0 lg:ml-auto">
          <MetalCard
            {...ACCOUNT.card}
            frozen={frozen}
            className="relative z-10 mx-auto w-[82%] -rotate-3 sm:w-[74%]"
          />
          <div className="relative -mt-16 sm:-mt-20 sm:ml-12">
            <BalancePanel frozen={frozen} onFreeze={() => setFrozen((f) => !f)} />
          </div>
          <div className="absolute -top-10 right-0 z-20 hidden sm:block lg:-right-6">
            <PaymentToast show={toast} />
          </div>
        </div>
      </Container>
    </section>
  )
}
