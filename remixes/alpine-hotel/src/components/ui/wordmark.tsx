import { cn } from "@/lib/utils"

/** The hotel's name, set as its logotype: lowercase, light, with the full stop. */
export function Wordmark({ text = "arven.", className }: { text?: string; className?: string }) {
  return (
    <span className={cn("font-sans text-[1.625rem] leading-none font-light tracking-[-0.03em]", className)}>
      {text}
    </span>
  )
}
