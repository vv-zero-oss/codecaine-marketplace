import { Check, CreditCard, House, Landmark, RefreshCw } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { LogoMark } from "@/components/ui/logo"
import { cn } from "@/lib/utils"

/** The white square every highlight card holds up. */
function WidgetTile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid size-48 place-items-center rounded-widget bg-surface shadow-widget", className)}>{children}</div>
  )
}

/** A small tag with a tick — champagne for "included", sage for "safe". */
export function TickTag({ label, tone = "accent" }: { label: string; tone?: "accent" | "positive" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-[5px] px-1.5 text-[0.6875rem] font-medium",
        tone === "accent" ? "bg-accent/12 text-accent-soft" : "bg-positive-soft text-positive",
      )}
    >
      <Check className="size-3" strokeWidth={2.5} />
      {label}
    </span>
  )
}

/** "Monthly fee — $0 — ✓ Unlimited cards". */
export function FeeWidget({ label = "Monthly fee", price = "$0", tag = "Unlimited cards" }: { label?: string; price?: string; tag?: string }) {
  return (
    <WidgetTile>
      <div className="flex flex-col items-center">
        <p className="text-[0.75rem] font-medium text-ink">{label}</p>
        <p className="mt-1 text-[4rem] leading-none font-light tracking-[-0.03em] text-ink">{price}</p>
        <div className="mt-3">
          <TickTag label={tag} />
        </div>
      </div>
    </WidgetTile>
  )
}

const randomLast4 = () => String(Math.floor(1000 + Math.random() * 9000))

/**
 * A tiny card whose number re-rolls when you ask for a new one — each digit
 * slides up out of the way as the next arrives, blurred in motion. Feedback
 * for the tap, and a demonstration of what "instant" means.
 */
export function NumberWidget({ initial = "7302", button = "New number" }: { initial?: string; button?: string }) {
  const [last4, setLast4] = useState(initial)
  const reduce = useReducedMotion()
  const roll = () => setLast4(randomLast4())
  useCanvasAction("New card number", roll, { group: "Highlights" })

  return (
    <WidgetTile>
      <div className="flex w-full flex-col items-center gap-3 px-5">
        <div className="metal metal-chrome grain relative aspect-[1.586] w-full overflow-hidden rounded-[10px] p-2.5 [--grain-opacity:0.35]">
          <LogoMark className="engraved relative z-2 size-4" />
          <p className="engraved absolute bottom-2.5 left-2.5 z-2 flex font-mono text-[0.8125rem] font-medium tabular-nums">
            <span className="mr-1.5">••••</span>
            {last4.split("").map((digit, i) => (
              <span key={i} className="relative inline-block h-[1.2em] w-[0.62em] overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={digit + last4}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { transform: "translateY(100%)", filter: "blur(2px)", opacity: 0 }}
                    animate={{ transform: "translateY(0%)", filter: "blur(0px)", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { transform: "translateY(-100%)", filter: "blur(2px)", opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: i * 0.03 }}
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </span>
            ))}
          </p>
        </div>
        <button
          type="button"
          onClick={roll}
          className="inline-flex h-7 items-center gap-1.5 rounded-chip bg-canvas px-3 text-[0.6875rem] font-medium text-ink-soft transition-[background-color,transform] duration-(--duration-hover) ease-out hover:bg-hairline active:scale-[0.96] [&:active>svg]:rotate-90"
        >
          <RefreshCw className="size-3 transition-transform duration-(--duration-hover) ease-out" />
          {button}
        </button>
      </div>
    </WidgetTile>
  )
}

/** One of the faded cards behind the front one. */
function GhostTile({ icon: Icon, label, className }: { icon: typeof House; label: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute top-1/2 flex h-36 w-[46%] -translate-y-1/2 flex-col justify-center gap-2 rounded-widget bg-surface/55 px-4",
        className,
      )}
    >
      <Icon className="size-4 text-subtle" />
      <p className="max-w-[4.5rem] font-serif text-[0.8125rem] leading-tight text-subtle">{label}</p>
      <span className="text-[0.625rem] text-subtle">✓ Hidden</span>
    </div>
  )
}

/** "Your real card number — ✓ Never shared", with the other private details hidden behind it. */
export function PrivacyWidget({ label = "Your real card number", tag = "Never shared" }: { label?: string; tag?: string }) {
  return (
    <div className="relative flex h-48 w-full items-center justify-center">
      <GhostTile icon={House} label="Home address" className="left-0 items-start text-left" />
      <GhostTile icon={Landmark} label="Bank details" className="right-0 items-end text-right" />
      <WidgetTile className="relative">
        <div className="flex flex-col items-center px-4 text-center">
          <span className="metal metal-graphite grid size-8 place-items-center rounded-md text-ink">
            <CreditCard className="size-4" />
          </span>
          <p className="mt-3 font-serif text-[1.0625rem] leading-tight text-ink">{label}</p>
          <div className="mt-2.5">
            <TickTag label={tag} tone="positive" />
          </div>
        </div>
      </WidgetTile>
    </div>
  )
}
