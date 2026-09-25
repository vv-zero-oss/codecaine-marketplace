import { cn } from "@/lib/utils"

/** A platform's mark from SVGL (https://svgl.app), shipped in `public/logos`. */
export function BrandLogo({ name, className }: { name: string; className?: string }) {
  return <img src={`/logos/${name}.svg`} alt="" aria-hidden className={cn("size-4 shrink-0 object-contain", className)} />
}

/** A mark in a small tile — the reference's chip for a connected platform. */
export function BrandChip({ name, label, className }: { name: string; label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-surface px-1.5 py-0.5 text-[12px] font-medium text-ink shadow-hairline",
        className,
      )}
    >
      <BrandLogo name={name} className="size-3" />
      {label}
    </span>
  )
}
