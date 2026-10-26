import { Nfc } from "lucide-react"

import { OrraMark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/**
 * A card terminal drawn in HTML: a body, a screen asking for the amount, and a
 * contactless symbol. Three finishes and two shapes cover the hardware range.
 */
export function Terminal({
  amount = "€25.00",
  finish = "graphite",
  shape = "handheld",
  className,
}: {
  amount?: string
  finish?: "graphite" | "silver"
  shape?: "handheld" | "tower" | "phone"
  className?: string
}) {
  const silver = finish === "silver"
  return (
    <div
      className={cn(
        "relative flex flex-col p-[7%] shadow-device",
        shape === "tower" ? "rounded-[28px] pb-[34%]" : "rounded-[22px]",
        shape === "phone" && "rounded-[26px] p-[4%]",
        silver
          ? "bg-gradient-to-b from-surface to-ink-4 ring-1 ring-white/60 ring-inset"
          : "bg-gradient-to-b from-graphite to-graphite-deep ring-1 ring-white/10 ring-inset",
        className,
      )}
    >
      {shape === "tower" ? <span className="mx-auto mb-[6%] size-2 rounded-full bg-ink/70" /> : null}
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-screen to-night px-3 py-6 text-ink-inverse",
          shape === "phone" && "rounded-[20px]",
        )}
      >
        <Nfc className="size-7 opacity-80" strokeWidth={1.4} />
        <span className="text-[10px] text-ink-inverse/60">Pay</span>
        <span className="text-xl font-medium tracking-[-0.03em] tabular-nums sm:text-2xl">{amount}</span>
        <span className="mt-3 flex items-center gap-1 text-[8px] text-ink-inverse/50">
          <OrraMark className="size-2.5" /> secured by orra
        </span>
      </div>
    </div>
  )
}
