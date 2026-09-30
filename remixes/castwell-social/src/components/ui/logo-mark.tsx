import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Castwell's mark: a block "C" with one pixel broadcasting from its mouth. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} fill="currentColor" aria-hidden>
      <path d="M3 2h15v6H10v8h8v6H3z" />
      <rect x="19" y="10" width="4" height="4" />
    </svg>
  )
}

/** Mark and name, linking home. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 text-ink", className)} aria-label="Castwell home">
      <LogoMark className="size-[26px]" />
      <span className="text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]">Castwell</span>
    </Link>
  )
}
