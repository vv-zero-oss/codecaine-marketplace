import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/** A chapter's headline: centred, two lines, balanced. */
export function SectionHeading({ title, className }: { title: string; className?: string }) {
  return (
    <Reveal>
      <h2 className={cn("mx-auto max-w-[15ch] text-center type-display text-h2 text-balance", className)}>{title}</h2>
    </Reveal>
  )
}
