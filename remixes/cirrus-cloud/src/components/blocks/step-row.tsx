import { StepBadge } from "@/components/marks/pixel-marks"
import { cn } from "@/lib/utils"

/** Four numbered steps in a row, under a diagram. */
export function StepRow({ steps, className }: { steps: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step, i) => (
        <StepItem key={step.title} n={i + 1} title={step.title} body={step.body} />
      ))}
    </ol>
  )
}

export function StepItem({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li>
      <div className="flex items-center gap-2.5">
        <StepBadge n={n} />
        <h3 className="text-base text-ink">{title}</h3>
      </div>
      <p className="mt-3.5 max-w-[18rem] text-[0.875rem] leading-[1.6] text-ink-soft">{body}</p>
    </li>
  )
}
