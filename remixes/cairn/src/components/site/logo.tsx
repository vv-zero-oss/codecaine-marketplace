import { cn } from "@/lib/utils"

/** Three stones, stacked the way walkers mark a path. */
export function CairnMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-8", className)} fill="currentColor">
      <path d="M5 31.2c0-3.4 6.5-5.6 15.4-5.6 8.6 0 14.6 2 14.6 5.2 0 3.3-6.6 5.2-15.2 5.2C11 36 5 34.4 5 31.2Z" />
      <path d="M9.6 21.9c.2-2.9 4.8-4.6 10.6-4.4 5.7.2 9.6 1.9 9.4 4.6-.2 2.6-4.6 4-10.4 3.8-5.9-.2-9.8-1.5-9.6-4Z" />
      <path d="M14 13.6c.3-2.3 3.3-3.6 6.9-3.3 3.7.3 6 1.7 5.8 3.8-.3 2-3.2 3-6.8 2.8-3.7-.3-6.1-1.3-5.9-3.3Z" />
    </svg>
  )
}

/** The mark and the name, set in the headline serif. */
export function CairnLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-ink", className)}>
      <CairnMark className="size-8" />
      <span className="type-serif text-[27px] leading-none font-semibold tracking-[-0.04em]">cairn</span>
    </span>
  )
}

/** Google's G, from SVGL — on the sign-in button only. */
export function GoogleG({ className }: { className?: string }) {
  return <img src={`${import.meta.env.BASE_URL}logos/google.svg`} alt="" aria-hidden className={cn("size-4", className)} />
}
