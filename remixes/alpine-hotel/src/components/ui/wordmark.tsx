import { cn } from "@/lib/utils"

/** The house's name as it is painted over the door: serif, with the year set small beside it. */
export function Wordmark({ name = "Arven", since = "1911", className }: { name?: string; since?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-serif text-2xl leading-none tracking-[-0.02em]">{name}</span>
      <span className="label text-[10px] text-ink-faint">Since {since}</span>
    </span>
  )
}
