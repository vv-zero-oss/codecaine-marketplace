import { brand } from "@/content"
import { cn } from "@/lib/utils"

/** The name, set in the heavy face, with a small flame-coloured dot. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("inline-flex min-h-11 items-center gap-1 font-heavy text-[22px] leading-none tracking-[-0.03em]", className)}>
      {brand.name}
      <span aria-hidden className="mb-3 size-2 rounded-pill bg-orange" />
    </a>
  )
}
