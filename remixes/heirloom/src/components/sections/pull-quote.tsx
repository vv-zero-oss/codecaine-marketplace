import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/** A sentence worth stopping for, in the italic serif, with who said it. */
export function PullQuote({ quote, name, role, className }: { quote: string; name: string; role: string; className?: string }) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl text-center", className)}>
      <figure>
        <blockquote className="font-serif text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.15] text-balance italic">“{quote}”</blockquote>
        <figcaption className="mt-6 text-[10px] font-medium tracking-[0.16em] text-fg-subtle uppercase">
          <span className="text-fg">{name}</span> · {role}
        </figcaption>
      </figure>
    </Reveal>
  )
}
