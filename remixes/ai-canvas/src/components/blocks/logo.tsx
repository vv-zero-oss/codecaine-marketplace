import { brand } from "@/content"
import { cn } from "@/lib/utils"

/** The mark: the product's mascot, a bear in LED shades. */
export function LogoMark({ className }: { className?: string }) {
  return <img src="logo.png" alt="" width={24} height={24} className={cn("size-6 rounded-[7px]", className)} />
}

/** Mark and name, as the header and footer show them. */
export function Logo({ showName = true, className }: { showName?: boolean; className?: string }) {
  return (
    <a href="#top" className={cn("inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em]", className)}>
      <LogoMark />
      {showName && <span>{brand.name}</span>}
      <span className="sr-only">{brand.name}, home</span>
    </a>
  )
}
