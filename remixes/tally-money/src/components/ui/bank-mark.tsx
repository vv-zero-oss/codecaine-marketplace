import { cn } from "@/lib/utils"

const TONES = {
  harbor: "bg-brand-600 text-white",
  citrine: "bg-amber-300 text-ink-900",
  northline: "bg-coral-500 text-white",
  oakmont: "bg-leaf-500 text-white",
} as const

export type BankTone = keyof typeof TONES

/** A round monogram standing in for a bank's logo. */
export function BankMark({ tone, letter, className }: { tone: BankTone; letter?: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[9px] font-extrabold uppercase", TONES[tone], className)}>
      {letter ?? tone[0]}
    </span>
  )
}
