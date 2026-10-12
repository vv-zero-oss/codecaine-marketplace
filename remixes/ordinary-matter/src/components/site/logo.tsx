import { cn } from "@/lib/utils"

/** The wordmark: two lines of the serif, set tight, the way it sits on the cover. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("block font-serif text-[23px] leading-[0.92] tracking-[-0.025em]", className)}>
      Ordinary
      <br />
      Matter
    </span>
  )
}

/** The monogram the header collapses to once the page moves. */
export function Monogram({ className }: { className?: string }) {
  return <span className={cn("block font-serif text-[25px] leading-none tracking-[-0.03em]", className)}>O</span>
}
