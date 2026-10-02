import { Lock, MonitorSmartphone, Search } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { Switch } from "@/components/ui/switch"
import { CountUp } from "@/components/motion/count-up"

const BASE = 71034
const PAYMENTS = [
  { id: "rent", name: "Rent", note: "Due in 3 days", amount: 1360, warn: true, fixed: true },
  { id: "phone", name: "Phone plan", note: "Due in 9 days", amount: 45, warn: false, fixed: false },
  { id: "video", name: "Video premium", note: "Due in 14 days", amount: 14, warn: false, fixed: false },
  { id: "gym", name: "Gym membership", note: "Due in 18 days", amount: 30, warn: false, fixed: false },
  { id: "music", name: "Music plan", note: "Due in 21 days", amount: 12, warn: false, fixed: false },
]

/** The dark band: why you will not need your bank's website again. */
export function BankSite() {
  const [paused, setPaused] = useState<string[]>([])
  useCanvasAction("Pause two subscriptions", (next) => setPaused(next === false ? [] : ["video", "gym"]), { on: paused.length > 0, group: "Recurring payments" })
  const monthly = PAYMENTS.filter((p) => paused.includes(p.id)).reduce((sum, p) => sum + p.amount, 0)
  const toggle = (id: string) => setPaused((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
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
                  {PAYMENTS.map((p) => {
                    const off = paused.includes(p.id)
                    return (
                      <li key={p.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                        <span className={`min-w-0 transition-opacity duration-200 ${off ? "opacity-40" : ""}`}>
                          <span className="block truncate font-semibold">{p.name}</span>
                          <span className={p.warn ? "rounded bg-coral-100 px-1.5 text-[11px] font-medium text-coral-500" : "text-[11px] text-ink-400"}>{p.note}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span data-off={off} className="tabular relative font-bold transition-opacity duration-200 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:origin-left after:scale-x-0 after:bg-ink-900 after:transition-transform after:duration-200 after:ease-[var(--ease-out)] data-[off=true]:opacity-40 data-[off=true]:after:scale-x-100">
                            ${p.amount.toLocaleString("en-US")}
                          </span>
                          {p.fixed ? <span className="w-14 text-center text-[10px] font-semibold tracking-wide text-ink-400 uppercase">Fixed</span> : <Switch checked={!off} onCheckedChange={() => toggle(p.id)} label={`Keep ${p.name}`} />}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="bg-ink-50 p-5">
                <p className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Good morning</p>
                <p className="mt-1 text-xs font-semibold text-ink-600">It’s the 15th of January, a Sunday</p>
                <p className="mt-6 text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Balance in 12 months</p>
                <CountUp value={BASE + monthly * 12} className="tabular mt-1 block text-4xl font-extrabold tracking-tight" />
                <p className="mt-1 min-h-8 text-xs font-medium text-leaf-500">{monthly ? `Pausing ${paused.length} saves $${(monthly * 12).toLocaleString("en-US")} a year.` : "Switch a plan off to see what a year of it adds."}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
