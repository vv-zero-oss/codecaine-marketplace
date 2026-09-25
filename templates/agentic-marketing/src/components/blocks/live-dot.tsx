import { cn } from "@/lib/utils"

/** A status dot with a slow ring — "this is running right now". */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-1.5", className)} aria-hidden>
      <span className="absolute inset-0 animate-live rounded-full bg-mint-strong motion-reduce:hidden" />
      <span className="relative size-1.5 rounded-full bg-mint-strong" />
    </span>
  )
}
