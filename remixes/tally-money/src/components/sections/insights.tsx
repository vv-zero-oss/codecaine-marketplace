import { ChevronLeft, Maximize2, Sparkles, TriangleAlert } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { AppIcon } from "@/components/ui/app-icon"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { Tilt } from "@/components/motion/tilt"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { CashFlowChart } from "@/components/motion/cash-flow-chart"

const NOTES = ["Drag across the chart to read any month", "Spot slow drifts before they compound", "Balance income against what you invest"]

export function Insights() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
        <Reveal direction="right" distance={20} className="max-w-lg">
          <AppIcon icon={Sparkles} tone="coral" />
          <Display className="mt-6">Inform &amp; delight.</Display>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
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
            <div className="flex h-full flex-col px-4 pb-3">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <ChevronLeft className="size-4 text-white/60" />
                Cash flow
                <Maximize2 className="size-3.5 text-white/60" />
              </div>
              <div className="mt-3 rounded-xl bg-white/5 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-bold"><TriangleAlert className="size-3 text-amber-300" /> Take care</p>
                <p className="mt-1 text-[10px] leading-snug text-white/60">You are getting close to spending beyond your income this month.</p>
              </div>
              <CashFlowChart className="mt-5" />
              <ul className="mt-4 space-y-2 text-[10px]">
                {[["bg-leaf-400", "Income", "Up 9% on April"], ["bg-coral-500", "Spent", "Down 3% on April"], ["bg-brand-500", "Saved", "Your best month yet"]].map(([dot, label, note]) => (
                  <li key={label} className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${dot}`} />
                    <span className="font-bold">{label}</span>
                    <span className="ml-auto text-white/50">{note}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto hidden h-8 items-center justify-center rounded-lg bg-white/10 text-[10px] font-bold sm:flex">Pause spending alerts</span>
            </div>
          </PhoneFrame>
          </Tilt>
        </Parallax>
      </Container>
    </section>
  )
}
