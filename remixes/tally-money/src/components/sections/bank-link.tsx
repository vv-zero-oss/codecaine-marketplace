import { Check, Landmark } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/** The bank row and its switch. The switch flips by itself once, on first view. */
export function BankLinkCard({ delay = 900, className }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [linked, setLinked] = useState(false)

  useCanvasAction("Bank linked", (next) => setLinked(next ?? !linked), { on: linked, group: "Bank link" })

  useEffect(() => {
    if (!inView || designing) return
    if (reduced) return setLinked(true)
    const timer = window.setTimeout(() => setLinked(true), delay)
    return () => window.clearTimeout(timer)
  }, [inView, reduced, designing, delay])

  return (
    <div ref={ref} className={cn("mx-auto w-full max-w-sm", className)}>
      <div className="mx-auto h-3 w-3/4 rounded-t-3xl bg-ink-200" />
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-lift">
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-1 origin-left bg-leaf-500 transition-transform duration-700 ease-[var(--ease-out)]",
            linked ? "scale-x-100" : "scale-x-0",
          )}
        />
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand-50 text-brand-600">
            <Landmark className="size-5" />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-bold">Harbor National Bank</p>
            <p className="text-xs text-ink-400">Checking · ••4821</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={linked}
            aria-label="Link Harbor National Bank"
            onClick={() => setLinked(!linked)}
            className={cn(
              "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ease-[var(--ease-out)] active:scale-95",
              linked ? "bg-leaf-500" : "bg-ink-200",
            )}
          >
            <span
              className={cn(
                "absolute top-1 left-1 grid size-6 place-items-center rounded-full bg-white shadow-card transition-transform duration-300 ease-[var(--ease-out)]",
                linked && "translate-x-6",
              )}
            >
              <Check className={cn("size-3.5 text-leaf-500 transition-opacity duration-200", linked ? "opacity-100" : "opacity-0")} strokeWidth={3} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function BankLink() {
  return (
    <section id="bank" className="bg-white py-16 sm:py-24">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <BankLinkCard />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-sm text-ink-600 sm:text-base">
            Tally connects to your bank through a regulated, read-only banking API. We can see
            balances and transactions. We can never move a cent.{" "}
            <a href="#features" className="font-medium text-brand-600 underline-offset-4 hover:underline">
              See how we keep it safe
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
