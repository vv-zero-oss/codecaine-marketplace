import { cn } from "@/lib/utils"

/** The Drape wordmark: a lowercase grotesk with the script "d" of the headline
 *  as its mark. Takes the current colour. */
export function Wordmark({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1 font-display text-[17px] font-semibold tracking-[-0.03em]", className)}>
      {mark ? <span className="font-script text-[1.15em] leading-none font-normal text-clay">d</span> : null}
      <span>drape</span>
    </span>
  )
}
