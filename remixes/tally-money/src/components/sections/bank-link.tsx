import { Check, Landmark, Lock, ShieldCheck, Unplug } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { BankMark, type BankTone } from "@/components/ui/bank-mark"
import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { Switch } from "@/components/ui/switch"
import { AppIcon } from "@/components/ui/app-icon"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const ACCOUNTS: { name: string; kind: string; tone: BankTone }[] = [
  { name: "Harbor National Bank", kind: "Checking ••4821", tone: "harbor" },
  { name: "Citrine Credit Union", kind: "Credit card ••0093", tone: "citrine" },
  { name: "Oakmont Savings", kind: "Savings ••7710", tone: "oakmont" },
]

const NETWORK = ["Harbor", "Citrine", "Northline", "Oakmont", "Meridian Trust", "Bluefin", "Alder & Co", "Kestrel", "Summit Credit", "Lantern", "Copperline", "Juniper"]
const TONES: BankTone[] = ["harbor", "citrine", "northline", "oakmont"]

/**
 * Three bank rows that switch on one after another the first time they are seen.
 * `delay` is the wait before the first (ms) and `gap` the time between them.
 * Each switch is the user's to flip. Purpose: explanation, then feedback.
 */
export function BankLinkCard({ delay = 900, gap = 700, className }: { delay?: number; gap?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [linked, setLinked] = useState<boolean[]>([false, false, false])
  const count = linked.filter(Boolean).length

  useCanvasAction("Banks linked", (next) => setLinked(ACCOUNTS.map(() => next ?? count < ACCOUNTS.length)), { on: count === ACCOUNTS.length, group: "Bank link" })

  useEffect(() => {
    if (!inView || designing) return
    if (reduced) return setLinked(ACCOUNTS.map(() => true))
    const timers = ACCOUNTS.map((_, i) => window.setTimeout(() => setLinked((cur) => cur.map((v, j) => (j === i ? true : v))), delay + i * gap))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [inView, reduced, designing, delay, gap])

  return (
    <div ref={ref} className={cn("w-full rounded-[2rem] bg-ink-100 p-3 sm:p-5", className)}>
      <div className="flex items-center justify-between px-2 pb-3 text-[11px] font-semibold tracking-wider text-ink-600 uppercase">
        <span className="flex items-center gap-1.5"><Landmark className="size-3.5" /> Your accounts</span>
        <span className="tabular">{count} of {ACCOUNTS.length} linked</span>
      </div>
      <ul className="space-y-2.5">
        {ACCOUNTS.map((account, i) => (
          <li key={account.name} className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-card">
            <span className={cn("absolute inset-x-0 top-0 h-1 origin-left bg-leaf-500 transition-transform duration-700 ease-[var(--ease-out)]", linked[i] ? "scale-x-100" : "scale-x-0")} />
            <div className="flex items-center gap-3">
              <span className="relative">
                <BankMark tone={account.tone} className="size-10 text-sm" />
                <span key={String(linked[i])} className={cn("pointer-events-none absolute inset-0 rounded-full ring-2 ring-leaf-500", linked[i] ? "animate-[ping-once_700ms_var(--ease-out)_both]" : "hidden")} />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-bold">{account.name}</p>
                <p className="relative h-4 overflow-hidden text-xs text-ink-400">
                  <span className={cn("absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out)]", linked[i] ? "-translate-y-full opacity-0" : "")}>{account.kind}</span>
                  <span className={cn("absolute inset-0 flex items-center gap-1 font-semibold text-leaf-500 transition-[opacity,transform] duration-300 ease-[var(--ease-out)]", linked[i] ? "" : "translate-y-full opacity-0")}>
                    <Check className="size-3" strokeWidth={3} /> Connected · read-only
                  </span>
                </p>
              </div>
              <Switch checked={linked[i]} onCheckedChange={(v) => setLinked((cur) => cur.map((x, j) => (j === i ? v : x)))} label={`Link ${account.name}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const POINTS = [
  { icon: Lock, title: "Read-only, always", body: "Tally can see balances and payments. It can never move a cent." },
  { icon: ShieldCheck, title: "Regulated connection", body: "Your bank hands over data through its official banking API. We never see your password." },
  { icon: Unplug, title: "Disconnect in one tap", body: "Switch an account off and its history is gone from our servers the same minute." },
]

export function BankLink() {
  return (
    <section id="bank" className="bg-white pt-20 pb-12 sm:pt-28 sm:pb-16">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal direction="right" distance={20}>
          <AppIcon icon={Landmark} />
          <Display className="mt-6">
            Link once. Everything else follows.
          </Display>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
            Pick your banks, approve the connection in your bank’s own screen, and you are done.
            There is nothing to enter, import or reconcile, now or ever.
          </p>
          <ul className="mt-8 space-y-5">
            {POINTS.map(({ icon: Glyph, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-leaf-200 text-night-950">
                  <Glyph className="size-4" />
                </span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="block text-ink-600">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <BankLinkCard />
        </Reveal>
      </Container>
      <Reveal className="mt-16">
        <p className="text-center text-xs font-semibold tracking-wider text-ink-400 uppercase">Works with more than 12,000 banks and credit unions</p>
        <Marquee speed={45} className="mt-5">
          {NETWORK.map((name, i) => (
            <span key={name} className="flex items-center gap-2.5 rounded-full border border-ink-100 bg-white py-2 pr-5 pl-2 text-sm font-semibold text-ink-600">
              <BankMark tone={TONES[i % TONES.length]} letter={name[0]} className="size-7 text-xs" />
              {name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
