import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/** A numbered row of what happens next — the founders' path and the members'
 *  application share it. */
export function Steps({ steps, className }: { steps: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-x-6 gap-y-10 sm:grid-cols-2", steps.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {steps.map((step, i) => (
        <li key={step.title}>
          <Reveal delay={i * 0.08} className="flex flex-col gap-3 border-t border-line pt-5">
            <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-medium tracking-[-0.02em]">{step.title}</h3>
            <p className="text-sm leading-relaxed text-fg-muted">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
