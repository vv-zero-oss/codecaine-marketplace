import { brand } from "@/content"
import { cn } from "@/lib/utils"

/** The studio's mark: three stacked lowercase words and a raised ©. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" aria-label={brand.studioName} className={cn("relative block text-label leading-[0.92] tracking-tight text-ink", className)}>
      {brand.studio.map((word) => (
        <span key={word} className="block">
          {word}
        </span>
      ))}
      <span aria-hidden className="absolute top-[-3px] left-[46px] text-[9px]">
        ©
      </span>
    </a>
  )
}
