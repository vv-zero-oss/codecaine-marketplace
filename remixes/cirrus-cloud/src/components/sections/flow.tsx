import { useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { SplitHeading } from "@/components/blocks/split-section"
import { StepBadge } from "@/components/marks/pixel-marks"
import { LifeCycle } from "@/components/motion/life-cycle"
import { Container } from "@/components/ui/container"
import { flow } from "@/content"
import { cn } from "@/lib/utils"

/**
 * How it works, as a life cycle: the repository's code is the DNA (clone),
 * it becomes a living machine (boot), grows into the whole system (build)
 * and sends its seeds out into the world (ship). The step row follows the
 * diagram; pick a step to jump it there.
 */
export function Flow() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | undefined>(undefined)
  const [jump, setJump] = useState(0)
  const { designing } = useCanvasDesignMode()

  const pick = (i: number) => {
    setPicked(i)
    setJump((n) => n + 1)
    setStep(i)
  }
  useCanvasAction("Next life-cycle step", () => pick((step + 1) % flow.steps.length), { group: "How it works" })

  return (
    <section id="how" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={flow.heading.join(" ")} className="max-w-[24rem]" />
        <p className="mt-10 max-w-[32.5rem] text-body text-ink-soft">{flow.body}</p>
        <LifeCycle className="mt-12 mb-10" step={picked} jump={jump} onStepChange={setStep} autoplay={!designing} />
        <LifeSteps steps={flow.steps} active={step} onPick={pick} />
      </Container>
    </section>
  )
}

/** The four steps, as tabs the diagram follows. */
export function LifeSteps({
  steps,
  active,
  onPick,
}: {
  steps: { title: string; stage: string; body: string }[]
  active: number
  onPick: (step: number) => void
}) {
  return (
    <ol className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item, i) => (
        <li key={item.title}>
          <button
            type="button"
            aria-pressed={active === i}
            onClick={() => onPick(i)}
            className="group w-full text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          >
            <span className="flex items-center gap-2.5">
              <StepBadge n={i + 1} className={cn("transition-colors duration-(--duration-hover)", active === i && "bg-lime text-ink")} />
              <span className={cn("text-base transition-colors duration-(--duration-hover)", active === i ? "text-ink" : "text-mute group-hover:text-ink")}>
                {item.title}
              </span>
              <span className="label ml-auto text-faint">{item.stage}</span>
            </span>
            <span
              aria-hidden
              className={cn(
                "mt-3 block h-px origin-left bg-ink transition-transform duration-(--duration-ghost) ease-(--ease-out)",
                active === i ? "scale-x-100" : "scale-x-0",
              )}
            />
            <span className="mt-3.5 block max-w-[18rem] text-[0.875rem] leading-[1.6] text-ink-soft">{item.body}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
