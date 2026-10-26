import { CreditCard, Gift } from "lucide-react"

import type { PaymentMark } from "@/components/brand-marks"
import { cn } from "@/lib/utils"

/** Tiles whose colour is light carry a dark mark. */
const DARK_MARK = new Set(["klarna", "googlepay"])

/** A payment method as an app-icon tile: its brand colour, its mark in the middle. */
export function PaymentTile({ mark, className }: { mark: PaymentMark; className?: string }) {
  return (
    <div
      title={mark.name}
      className={cn(
        "flex aspect-[6/5] w-[120px] shrink-0 items-center justify-center rounded-[22px] shadow-[inset_0_-6px_12px_rgb(0_0_0/0.12),0_6px_14px_-6px_rgb(0_0_0/0.35)] sm:w-[132px]",
        DARK_MARK.has(mark.id) ? "text-ink" : "text-ink-inverse",
        className,
      )}
      style={{ background: `var(--pm-${mark.id})` }}
    >
      <svg viewBox="0 0 24 24" className="size-[46%]" aria-label={mark.name} role="img" dangerouslySetInnerHTML={{ __html: mark.body }} />
    </div>
  )
}

/** The two methods that are not brands: any card, and gift cards. */
export function GenericTile({ kind }: { kind: "card" | "gift" }) {
  const Icon = kind === "card" ? CreditCard : Gift
  return (
    <div
      className={cn(
        "flex aspect-[6/5] w-[120px] shrink-0 items-center justify-center rounded-[22px] shadow-[inset_0_-6px_12px_rgb(0_0_0/0.12),0_6px_14px_-6px_rgb(0_0_0/0.35)] sm:w-[132px]",
        kind === "card" ? "bg-espresso text-ember" : "bg-ember text-ink-inverse",
      )}
    >
      <Icon className="size-[44%]" strokeWidth={1.4} />
    </div>
  )
}
