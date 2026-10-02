import { cn } from "@/lib/utils"

/** The ring mark on its own. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-[18px] rounded-full border-[3.5px] border-current", className)}
    />
  )
}

/** The logo: ring plus the name, set in the display serif. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-[26px] leading-none font-semibold tracking-[-0.03em]", className)}>
      <Mark />
      meadow
    </span>
  )
}
