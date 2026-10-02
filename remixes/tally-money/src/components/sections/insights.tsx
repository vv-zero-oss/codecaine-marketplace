import { Sparkles } from "lucide-react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { Tilt } from "@/components/motion/tilt"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { CashFlowChart } from "@/components/motion/cash-flow-chart"

const NOTES = ["Drag across the chart to read any month", "Spot slow drifts before they compound", "Balance income against what you invest"]

export function Insights() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
        <Reveal direction="right" distance={20} className="max-w-md">
          <AppIcon icon={Sparkles} />
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
            Inform &amp; delight.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            Understand your financial health without drowning in numbers. Each month, Tally turns
            swooping highs and calm plateaus into real, actionable insights. Make decisions backed
            by your own data.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-600">
            {NOTES.map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand-500" />
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
        <Parallax distance={24} className="mx-auto w-56 sm:w-64">
          <Tilt max={9} lift={1.03}>
          <PhoneFrame tone="dark">
            <div className="flex h-full flex-col px-4 pb-5 text-white">
              <p className="text-center text-xs font-bold">Cash flow</p>
              <div className="mt-4 rounded-xl bg-white/5 p-3">
                <p className="text-[11px] font-bold">Take care</p>
                <p className="mt-1 text-[10px] leading-snug text-white/60">You are getting close to spending beyond your income this month.</p>
              </div>
              <CashFlowChart className="mt-8" />
            </div>
          </PhoneFrame>
          </Tilt>
        </Parallax>
      </Container>
    </section>
  )
}
