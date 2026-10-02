import { Lock, MonitorSmartphone, Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { CountUp } from "@/components/motion/count-up"

const PAYMENTS = [
  { name: "Rent", note: "Due in 3 days", amount: "$1,360", warn: true },
  { name: "Phone plan", note: "Due in 9 days", amount: "$45", warn: false },
  { name: "Video premium", note: "Due in 14 days", amount: "$14", warn: false },
]

/** The dark band: why you will not need your bank's website again. */
export function BankSite() {
  return (
    <section className="bg-night-800 py-16 text-white sm:py-24">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <AppIcon icon={MonitorSmartphone} className="size-11 from-brand-500 to-leaf-500" />
            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl bg-white px-3 text-sm text-ink-900 sm:max-w-lg">
              <Lock className="size-4 shrink-0" />
              <span className="truncate font-medium">
                <span className="text-ink-400">https://</span>app.tally.money
              </span>
              <span className="ml-auto shrink-0 rounded-full border border-ink-200 px-2.5 py-0.5 text-xs font-semibold">Early access</span>
            </div>
          </div>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">
            Never open your bank’s website again.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-white/70 lg:ml-auto lg:text-right">
              As good as your bank’s infrastructure is, it still hasn’t caught up with the rest of
              the industry, software wise. Good software shows you what is due, what just left and
              what is coming, without a login screen in between.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid overflow-hidden rounded-2xl bg-white text-ink-900 shadow-device sm:grid-cols-[1.1fr_1fr]">
              <div className="p-5">
                <p className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Recurring payments</p>
                <div className="mt-4 flex h-10 items-center gap-2 rounded-lg border-2 border-ink-200 px-3 text-sm text-ink-400">
                  <Search className="size-4" /> E.g. streaming…
                </div>
                <ul className="mt-4 divide-y divide-ink-100">
                  {PAYMENTS.map((p) => (
                    <li key={p.name} className="flex items-center justify-between py-3 text-sm">
                      <span>
                        <span className="block font-semibold">{p.name}</span>
                        <span className={p.warn ? "rounded bg-coral-100 px-1.5 text-[11px] font-medium text-coral-500" : "text-[11px] text-ink-400"}>{p.note}</span>
                      </span>
                      <span className="tabular font-bold">{p.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-ink-50 p-5">
                <p className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Good morning</p>
                <p className="mt-1 text-xs font-semibold text-ink-600">It’s the 15th of January, a Sunday</p>
                <p className="mt-6 text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Cumulative balance</p>
                <CountUp value={71034} className="tabular mt-1 block text-4xl font-extrabold tracking-tight" />
                <p className="mt-1 text-xs font-medium text-leaf-500">↑ 12% compared to last month</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
