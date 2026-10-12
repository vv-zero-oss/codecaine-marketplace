import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** The pair of square arrow buttons that steps a carousel or a shelf. */
export function Arrows({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  tone = "paper",
  className,
}: {
  onPrev?: () => void
  onNext?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
  tone?: "paper" | "line"
  className?: string
}) {
  const btn = cn(
    "grid h-9 w-11 place-items-center transition-[background-color,color,transform] duration-(--duration-hover) active:scale-95 disabled:opacity-35",
    tone === "paper" ? "bg-raised text-ink hover:bg-page" : "text-ink hover:bg-panel",
  )
  return (
    <div className={cn("flex overflow-hidden rounded-(--radius-button)", tone === "line" ? "shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "shadow-(--shadow-xs)", className)}>
      <button className={btn} onClick={onPrev} disabled={prevDisabled} aria-label="Previous">
        <ChevronLeft className="size-4" strokeWidth={1.6} />
      </button>
      <button className={cn(btn, tone === "line" && "border-l border-line-strong")} onClick={onNext} disabled={nextDisabled} aria-label="Next">
        <ChevronRight className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  )
}
