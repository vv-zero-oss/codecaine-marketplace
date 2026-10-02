import { Landmark } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Switch } from "@/components/ui/switch"
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
          <span className="relative grid size-10 place-items-center rounded-full bg-brand-50 text-brand-600">
            <span key={String(linked)} className={cn("pointer-events-none absolute inset-0 rounded-full ring-2 ring-leaf-500", linked ? "animate-[ping-once_700ms_var(--ease-out)_both]" : "hidden")} />
            <Landmark className="size-5" />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-bold">Harbor National Bank</p>
            <p className="relative h-4 overflow-hidden text-xs text-ink-400">
              <span className={cn("absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out)]", linked ? "-translate-y-full opacity-0" : "")}>Checking · ••4821</span>
              <span className={cn("absolute inset-0 font-semibold text-leaf-500 transition-[opacity,transform] duration-300 ease-[var(--ease-out)]", linked ? "" : "translate-y-full opacity-0")}>Connected · read-only</span>
            </p>
          </div>
          <Switch checked={linked} onCheckedChange={setLinked} label="Link Harbor National Bank" />
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
