import { useState } from "react"
import { Check, Minus, Plus, Shuffle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CountUp } from "@/components/motion/count-up"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, GRINDS, SIZES, type Grind, type SizeId } from "@/content/coffees"
import { money } from "@/lib/photos"
import { linePrice, shipDates, useStore, useWeight, type Subscription } from "@/lib/store"
import { cn } from "@/lib/utils"

const EVERY = [
  { every: 1 as const, label: "Every week", save: 0.15 },
  { every: 2 as const, label: "Every 2 weeks", save: 0.12 },
  { every: 4 as const, label: "Every 4 weeks", save: 0.1 },
]

/** The rotation's price: the average 12 oz across the shelf, rounded. */
const ROTATE_PRICE = 20

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink pt-6 pb-12">
      <div className="flex items-baseline gap-4">
        <span className="type-display text-d1 text-ink-3">0{n}</span>
        <h3 className="type-display text-d2">{title}</h3>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

/**
 * The subscription builder. Four steps scroll on the left while the order
 * stays pinned on the right — the bags fan out as you add them, the label
 * changes with the coffee, and the price, the saving, the cost per cup and
 * the next three ship days follow every choice. Starting it saves it to the
 * rail's subscription drawer, where it can be skipped, paused or cancelled.
 */
export function Builder() {
  const { setSubscription, setDrawer, subscription } = useStore()
  const weight = useWeight()
  const [coffeeId, setCoffeeId] = useState<string>("rotate")
  const [size, setSize] = useState<SizeId>("12oz")
  const [bags, setBags] = useState(1)
  const [grind, setGrind] = useState<Grind>("Whole bean")
  const [every, setEvery] = useState<1 | 2 | 4>(2)
  const [state, setState] = useState<"idle" | "saving" | "done">("idle")

  useCanvasAction("Subscription started", (next) => setState((next ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Subscribe" })

  const plan = EVERY.find((e) => e.every === every)!
  const unit = coffeeId === "rotate" ? Math.round(ROTATE_PRICE * (SIZES.find((s) => s.id === size)?.factor ?? 1) * 100) / 100 : linePrice({ coffeeId, size })
  const full = unit * bags
  const price = Math.round(full * (1 - plan.save) * 100) / 100
  const grams = (SIZES.find((s) => s.id === size)?.grams ?? 340) * bags
  const cups = Math.floor(grams / 18)
  const draft: Subscription = { coffeeId, size, grind, every, bags, startedAt: new Date().toISOString() }
  const dates = shipDates(draft)
  const previewId = coffeeId === "rotate" ? ["half-day-4", "the-long-way", "field-trip-10", "last-bell"][dates[0].getDate() % 4] : coffeeId

  const start = () => {
    setState("saving")
    window.setTimeout(() => {
      setSubscription(draft)
      setState("done")
    }, 900)
  }

  return (
    <section id="builder" className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <Step n={1} title="Pick your coffee">
            <RadioGroup value={coffeeId} onValueChange={setCoffeeId} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[{ id: "rotate", name: "Roaster's rotation", sub: "A different series each delivery" }, ...COFFEES.map((c) => ({ id: c.id, name: c.name, sub: `${c.country} · ${c.notes[0]}` }))].map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "relative flex cursor-pointer flex-col rounded-[var(--radius-card)] bg-raised p-3.5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-[box-shadow,background-color] duration-200 hover:shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
                    coffeeId === o.id && "bg-raised shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
                    o.id === "rotate" && "sm:col-span-3 sm:flex-row sm:items-center sm:gap-4",
                  )}
                >
                  <RadioGroupItem value={o.id} className="sr-only" />
                  {o.id === "rotate" && <Shuffle className="mb-2 size-5 stroke-[1.5] sm:mb-0" />}
                  <span className="type-display text-[20px] leading-none">{o.name}</span>
                  <span className="mt-1 text-caption text-ink-3">{o.sub}</span>
                  {coffeeId === o.id && (
                    <motion.span layoutId="pick" className="absolute top-2.5 right-2.5 grid size-5 place-items-center rounded-full bg-ink text-paper" transition={{ type: "spring", stiffness: 500, damping: 34 }}>
                      <Check className="size-3" />
                    </motion.span>
                  )}
                </label>
              ))}
            </RadioGroup>
          </Step>

          <Step n={2} title="How much">
            <div className="flex flex-wrap items-center gap-6">
              <ToggleGroup type="single" value={size} onValueChange={(v) => v && setSize(v as SizeId)} className="flex gap-1.5" spacing={1}>
                {SIZES.map((s) => (
                  <ToggleGroupItem key={s.id} value={s.id} className="type-display h-11 rounded-[var(--radius-button)] px-4 pt-1 text-[20px] shadow-[inset_0_0_0_1.5px_var(--color-ink)] data-[state=on]:bg-ink data-[state=on]:text-paper">
                    {weight(s.id)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <div className="flex items-center gap-3">
                <span className="text-caption text-ink-3">Bags</span>
                <div className="inline-flex h-11 items-center rounded-[var(--radius-button)] shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                  <button type="button" aria-label="One bag fewer" disabled={bags <= 1} onClick={() => setBags(bags - 1)} className="grid size-11 place-items-center disabled:opacity-30 active:scale-90">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center tabular-nums">{bags}</span>
                  <button type="button" aria-label="One bag more" disabled={bags >= 4} onClick={() => setBags(bags + 1)} className="grid size-11 place-items-center disabled:opacity-30 active:scale-90">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-caption text-ink-2">
              About <span className="text-ink tabular-nums">{cups}</span> cups a delivery at 18 g each.
            </p>
          </Step>

          <Step n={3} title="Ground how">
            <ToggleGroup type="single" value={grind} onValueChange={(v) => v && setGrind(v as Grind)} className="grid w-full grid-cols-2 gap-1.5 sm:grid-cols-4" spacing={1}>
              {GRINDS.map((g) => (
                <ToggleGroupItem key={g} value={g} className="h-11 rounded-[var(--radius-button)] text-[13px] shadow-[inset_0_0_0_1px_var(--color-line-strong)] data-[state=on]:bg-ink data-[state=on]:text-paper data-[state=on]:shadow-none">
                  {g}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Step>

          <Step n={4} title="How often">
            <RadioGroup value={String(every)} onValueChange={(v) => setEvery(Number(v) as 1 | 2 | 4)} className="grid gap-2 sm:grid-cols-3">
              {EVERY.map((e) => (
                <label
                  key={e.every}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-[var(--radius-card)] bg-raised p-4 shadow-[inset_0_0_0_1px_var(--color-line)] transition-shadow",
                    every === e.every && "shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
                  )}
                >
                  <RadioGroupItem value={String(e.every)} className="sr-only" />
                  <span className="text-[14px]">{e.label}</span>
                  <span className="type-display rounded-[var(--radius-tag)] bg-tomato-soft px-1.5 pt-1 pb-0.5 text-[15px] leading-none text-tomato-hover">−{e.save * 100}%</span>
                </label>
              ))}
            </RadioGroup>
          </Step>
        </div>

        {/* The order, pinned while the steps scroll */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-[var(--radius-panel)] bg-raised p-6 shadow-float">
            <div className="relative grid h-[260px] place-items-center overflow-hidden rounded-[var(--radius-card)] bg-shelf">
              <AnimatePresence initial={false}>
                {Array.from({ length: bags }, (_, i) => {
                  const offset = i - (bags - 1) / 2
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, rotate: 0 }}
                      animate={{ opacity: 1, y: Math.abs(offset) * 8, x: offset * 58, rotate: offset * 7 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="absolute w-[120px]"
                      style={{ zIndex: 10 - Math.abs(Math.round(offset)) }}
                    >
                      <CoffeeBag coffeeId={previewId} weight={weight(size)} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {coffeeId === "rotate" && <span className="type-eyebrow absolute bottom-3 left-3 text-ink-3">First up: rotation pick</span>}
            </div>

            <dl className="mt-6 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-ink-2">{coffeeId === "rotate" ? "Roaster's rotation" : COFFEES.find((c) => c.id === coffeeId)?.name}</dt>
                <dd className="text-ink-2">
                  {bags} × {weight(size)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">{grind}</dt>
                <dd className="text-ink-2">{plan.label.toLowerCase()}</dd>
              </div>
              <div className="flex justify-between text-ok">
                <dt>Subscriber saving</dt>
                <dd className="tabular-nums">−{money(full - price)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
              <div>
                <p className="type-eyebrow text-ink-3">Per delivery</p>
                <p className="type-display text-d3">
                  <CountUp value={price} decimals={2} prefix="$" duration={0.5} />
                </p>
              </div>
              <p className="pb-1 text-caption text-ink-3 tabular-nums">{money(price / Math.max(1, cups))} a cup · ships free</p>
            </div>

            <p className="type-eyebrow mt-6 text-ink-3">First three deliveries</p>
            <ul className="mt-2 grid grid-cols-3 gap-2">
              {dates.map((d) => (
                <motion.li key={d.toISOString() + every} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-[var(--radius-tag)] bg-paper px-2 py-2 text-center">
                  <span className="block text-[11px] text-ink-3 uppercase">{d.toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="type-display block text-d1">{d.getDate()}</span>
                  <span className="block text-[11px] text-ink-3">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                </motion.li>
              ))}
            </ul>

            {state === "done" ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[var(--radius-card)] bg-ok-soft p-4 text-[14px] text-ok">
                <p className="flex items-center gap-2 font-medium">
                  <Check className="size-4" /> You're subscribed. First bag ships {dates[0].toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}.
                </p>
                <button type="button" onClick={() => setDrawer("account")} className="mt-2 underline underline-offset-4">
                  Manage it from the rail
                </button>
              </motion.div>
            ) : (
              <Button variant="tomato" size="lg" className="mt-6 w-full" onClick={start} disabled={state === "saving"}>
                {state === "saving" ? "Setting it up…" : subscription ? "Replace my subscription" : "Start my subscription"}
              </Button>
            )}
            <p className="mt-3 text-center text-caption text-ink-3">Skip, pause or cancel any time — no emails to anyone.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
