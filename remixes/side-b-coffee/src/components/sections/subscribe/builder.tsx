import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Sparkles } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { GRINDS, SIZES, findCoffee, money, type LabelTone } from "@/content/products"
import { cart } from "@/lib/cart"
import { cn } from "@/lib/utils"

export type Plan = "rotation" | "roasters-pick"

const PLANS: { id: Plan; name: string; kicker: string; body: string; from: number }[] = [
  { id: "rotation", name: "The Rotation", kicker: "Year-round favourites", body: "Pick one of the coffees we always have on, and get it fresh every time.", from: 17 },
  { id: "roasters-pick", name: "Roaster's Pick", kicker: "A new single origin, every time", body: "Whatever we're most excited about that fortnight, with notes and a record to brew to.", from: 22 },
]

/** The coffees that never leave the shelf. */
const YEAR_ROUND = ["side-b-blend", "deep-cut", "needle-drop", "feedback-loop", "b-side-decaf"]
const PICK_PRICE = 22
const SAVING = 0.12
const FREQUENCIES = [
  { id: "1", label: "Every week", weeks: 1 },
  { id: "2", label: "Every 2 weeks", weeks: 2 },
  { id: "4", label: "Every 4 weeks", weeks: 4 },
] as const
const STEPS = ["Plan", "Coffee", "Bags", "Rhythm"] as const

/** Next Tuesday's roast, plus three days in the post. */
function nextDelivery(today = new Date()) {
  const d = new Date(today)
  const add = (2 - d.getDay() + 7) % 7 || 7
  d.setDate(d.getDate() + add + 3)
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
}

function initialPlan(): Plan | null {
  const p = new URLSearchParams(window.location.search).get("plan")
  return p === "rotation" || p === "roasters-pick" ? p : null
}

/**
 * The builder: four short steps — plan, coffee, bags, rhythm — with a
 * progress rail, Back and Next (Next waits for an answer), and a summary
 * that sits beside it and updates as you choose: a stack of bags that fans
 * out one per bag, the price per delivery with the subscriber saving, and
 * the date the first box lands. "Start subscription" puts it in the cart.
 *
 * Steps slide 16px and fade (240ms ease-out) in the direction of travel.
 */
export function Builder() {
  const [plan, setPlan] = useState<Plan | null>(initialPlan)
  const [coffeeId, setCoffeeId] = useState<string | null>(null)
  const [bags, setBags] = useState(1)
  const [size, setSize] = useState<string>("12oz")
  const [grind, setGrind] = useState<string>("Whole bean")
  const [freq, setFreq] = useState<string>("2")
  const [step, setStep] = useState(initialPlan() ? 1 : 0)
  const [dir, setDir] = useState(1)
  const [added, setAdded] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (plan === "roasters-pick") setCoffeeId(null)
  }, [plan])

  const canNext = step === 0 ? !!plan : step === 1 ? plan === "roasters-pick" || !!coffeeId : true
  const go = (to: number) => {
    setDir(to > step ? 1 : -1)
    setStep(Math.max(0, Math.min(STEPS.length - 1, to)))
  }

  useCanvasAction(
    "Builder step",
    (next) => {
      if (next === false) return go(0)
      if (!plan) setPlan("rotation")
      if (!coffeeId) setCoffeeId("side-b-blend")
      setDir(1)
      setStep((s) => (s + 1) % STEPS.length)
    },
    { on: step === STEPS.length - 1, group: "Subscribe" },
  )
  useCanvasAction(
    "Subscription added",
    (next) => {
      if (!plan) setPlan("rotation")
      if (!coffeeId) setCoffeeId("side-b-blend")
      setAdded(next ?? !added)
    },
    { on: added, group: "Subscribe" },
  )

  const coffee = coffeeId ? findCoffee(coffeeId) : undefined
  const sizing = SIZES.find((s) => s.id === size) ?? SIZES[0]
  const base = plan === "roasters-pick" ? PICK_PRICE : (coffee?.price ?? 17)
  const shelf = Math.round(base * sizing.multiplier) * bags
  const perDelivery = Math.round(shelf * (1 - SAVING) * 100) / 100
  const frequency = FREQUENCIES.find((f) => f.id === freq) ?? FREQUENCIES[1]
  const planName = PLANS.find((p) => p.id === plan)?.name ?? "Your subscription"
  const bagName = plan === "roasters-pick" ? "Roaster's Pick" : (coffee?.name ?? "Side B Blend")
  const bagLabel: LabelTone = plan === "roasters-pick" ? "lilac" : (coffee?.label ?? "honey")

  const start = () => {
    cart.add({
      id: `subscription-${plan}-${coffeeId ?? "pick"}`,
      name: `${planName}${plan === "rotation" && coffee ? ` · ${coffee.name}` : ""}`,
      detail: `${frequency.label} · ${bags} × ${sizing.label} · ${grind}`,
      price: perDelivery,
      kind: "subscription",
    })
    setAdded(true)
  }

  return (
    <section id="builder" className="scroll-mt-16 border-b border-line bg-panel py-(--spacing-section)">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="type-display text-h1">
            Build it in <span className="text-ember">four tracks.</span>
          </h2>
          <Progress step={step} onJump={(i) => i < step && go(i)} />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <div className="overflow-hidden rounded-(--radius-panel) bg-page p-5 shadow-(--shadow-card) sm:p-8">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                initial={reduced ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * 16}px)` }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * -16}px)` }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="min-h-[360px]"
              >
                {step === 0 && (
                  <StepFrame n={1} title="Which plan?" hint="You can switch plans whenever you like.">
                    <RadioGroup value={plan ?? ""} onValueChange={(v) => setPlan(v as Plan)} className="grid gap-3 sm:grid-cols-2">
                      {PLANS.map((p) => (
                        <ChoiceCard key={p.id} value={p.id} checked={plan === p.id}>
                          <p className="type-label text-[10.5px] text-ink-3">{p.kicker}</p>
                          <p className="type-display mt-1 text-h4">{p.name}</p>
                          <p className="mt-2 text-[14px] text-ink-2">{p.body}</p>
                          <p className="mt-3 font-mono text-[12.5px] text-ember-ink tabular">From {money(p.from * (1 - SAVING))} / bag</p>
                        </ChoiceCard>
                      ))}
                    </RadioGroup>
                  </StepFrame>
                )}

                {step === 1 &&
                  (plan === "roasters-pick" ? (
                    <StepFrame n={2} title="We'll choose." hint="Every delivery is a different single origin, picked at the cupping table.">
                      <div className="flex items-center gap-5 rounded-(--radius-card) bg-panel p-5">
                        <Sparkles className="size-6 shrink-0 text-ember" strokeWidth={1.6} />
                        <p className="text-[15px] text-ink-2">
                          Next up is likely <b className="font-medium text-ink">Liner Notes</b> from Nyeri, then <b className="font-medium text-ink">Slow Fade</b> from Guji. Tell us at any point if you'd rather skip a natural or a dark roast — we keep notes.
                        </p>
                      </div>
                    </StepFrame>
                  ) : (
                    <StepFrame n={2} title="Which coffee?" hint="The year-round ones — always on the shelf.">
                      <RadioGroup value={coffeeId ?? ""} onValueChange={setCoffeeId} className="grid gap-2 sm:grid-cols-2">
                        {YEAR_ROUND.map((id) => {
                          const c = findCoffee(id)!
                          return (
                            <ChoiceCard key={id} value={id} checked={coffeeId === id} compact>
                              <div className="flex items-center gap-3">
                                <div className="w-9 shrink-0">
                                  <CoffeeBag name={c.name} label={c.label} roast={c.roast} artwork={c.badge === "house" ? "honey" : "cream"} />
                                </div>
                                <div className="min-w-0">
                                  <p className="type-display text-[19px] leading-tight">{c.name}</p>
                                  <p className="truncate text-[12.5px] text-ink-3">
                                    {c.roast} · {c.notes.slice(0, 2).join(", ")}
                                  </p>
                                </div>
                              </div>
                            </ChoiceCard>
                          )
                        })}
                      </RadioGroup>
                    </StepFrame>
                  ))}

                {step === 2 && (
                  <StepFrame n={3} title="How much coffee?" hint="One 12 oz bag is about 22 cups.">
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[14px] font-medium">Bags per delivery</span>
                        <div className="flex h-11 items-center rounded-(--radius-button) bg-raised shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                          <button className="grid h-full w-11 place-items-center text-ink-2 hover:text-ink disabled:opacity-40" onClick={() => setBags((b) => Math.max(1, b - 1))} disabled={bags <= 1} aria-label="One fewer bag">
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-[15px] tabular" aria-live="polite">
                            {bags}
                          </span>
                          <button className="grid h-full w-11 place-items-center text-ink-2 hover:text-ink disabled:opacity-40" onClick={() => setBags((b) => Math.min(4, b + 1))} disabled={bags >= 4} aria-label="One more bag">
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <fieldset>
                        <legend className="mb-2 text-[14px] font-medium">Bag size</legend>
                        <ToggleGroup type="single" variant="outline" value={size} onValueChange={(v) => v && setSize(v)} className="w-full">
                          {SIZES.map((s) => (
                            <ToggleGroupItem key={s.id} value={s.id} className="h-11 flex-1">
                              {s.label}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </fieldset>
                      <fieldset>
                        <legend className="mb-2 text-[14px] font-medium">Grind</legend>
                        <ToggleGroup type="single" variant="outline" spacing={1} value={grind} onValueChange={(v) => v && setGrind(v)} className="flex w-full flex-wrap">
                          {GRINDS.map((g) => (
                            <ToggleGroupItem key={g} value={g} className="h-10 rounded-(--radius-button)">
                              {g}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </fieldset>
                    </div>
                  </StepFrame>
                )}

                {step === 3 && (
                  <StepFrame n={4} title="How often?" hint="Most people who brew daily choose every two weeks.">
                    <ToggleGroup type="single" variant="outline" value={freq} onValueChange={(v) => v && setFreq(v)} className="grid w-full grid-cols-1 sm:grid-cols-3">
                      {FREQUENCIES.map((f) => (
                        <ToggleGroupItem key={f.id} value={f.id} className="h-14 flex-1 data-[spacing=0]:rounded-(--radius-button) sm:data-[spacing=0]:rounded-none sm:data-[spacing=0]:first:rounded-l-(--radius-button) sm:data-[spacing=0]:last:rounded-r-(--radius-button)">
                          {f.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                    <p className="mt-5 text-[14px] text-ink-2">
                      That's about <b className="font-mono font-medium tabular">{Math.round((bags * 22 * sizing.multiplier) / (frequency.weeks * 7))}</b> cups a day. Change it from any delivery email.
                    </p>
                  </StepFrame>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
                <ArrowLeft /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button variant="ink" onClick={() => go(step + 1)} disabled={!canNext}>
                  Next <ArrowRight />
                </Button>
              ) : (
                <Button onClick={start} disabled={!plan}>
                  Start subscription
                </Button>
              )}
            </div>
            {!canNext && <p className="mt-2 text-right text-[12.5px] text-ink-3">{step === 0 ? "Choose a plan to carry on." : "Choose a coffee to carry on."}</p>}
          </div>

          <Summary
            bagName={bagName}
            bagLabel={bagLabel}
            bags={bags}
            planName={planName}
            detail={`${bags} × ${sizing.label} · ${grind}`}
            frequency={frequency.label}
            shelf={shelf}
            perDelivery={perDelivery}
            delivery={nextDelivery()}
            ready={!!plan && (plan === "roasters-pick" || !!coffeeId)}
            added={added}
            onStart={start}
            onAgain={() => setAdded(false)}
          />
        </div>
      </Container>
    </section>
  )
}

function Progress({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex w-full max-w-[460px] items-center gap-2" aria-label="Builder progress">
      {STEPS.map((label, i) => (
        <li key={label} className="flex-1">
          <button onClick={() => onJump(i)} disabled={i >= step} className="group w-full text-left disabled:cursor-default" aria-current={i === step ? "step" : undefined}>
            <span className="block h-[3px] overflow-hidden rounded-full bg-line-strong">
              <span className={cn("block h-full origin-left bg-rust transition-transform duration-(--duration-swap) ease-(--ease-out-strong)", i <= step ? "scale-x-100" : "scale-x-0")} />
            </span>
            <span className={cn("type-label mt-2 block text-[10.5px] transition-colors", i <= step ? "text-ink" : "text-ink-3", i < step && "group-hover:text-rust")}>
              {String(i + 1).padStart(2, "0")} {label}
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}

function StepFrame({ n, title, hint, children }: { n: number; title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="type-label text-[11px] text-ember-ink">Track {String(n).padStart(2, "0")}</p>
        <h3 className="type-display mt-1 text-h3">{title}</h3>
        <p className="mt-1 text-[14.5px] text-ink-2">{hint}</p>
      </div>
      {children}
    </div>
  )
}

/** A radio as a card: the whole card is the hit area, a ring and a tick when chosen. */
function ChoiceCard({ value, checked, compact, children }: { value: string; checked: boolean; compact?: boolean; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        "relative block cursor-pointer rounded-(--radius-card) bg-raised shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[box-shadow,background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-page active:scale-[0.99]",
        compact ? "p-3" : "p-5",
        checked && "bg-page shadow-[inset_0_0_0_2px_var(--color-ink)]",
      )}
    >
      <RadioGroupItem value={value} className="sr-only" />
      <span className={cn("absolute top-3 right-3 grid size-5 place-items-center rounded-full transition-[background-color,transform] duration-(--duration-hover)", checked ? "scale-100 bg-ink text-page" : "scale-90 bg-panel-deep text-transparent")}>
        <Check className="size-3" />
      </span>
      {children}
    </label>
  )
}

function Summary(props: {
  bagName: string
  bagLabel: LabelTone
  bags: number
  planName: string
  detail: string
  frequency: string
  shelf: number
  perDelivery: number
  delivery: string
  ready: boolean
  added: boolean
  onStart: () => void
  onAgain: () => void
}) {
  const reduced = useReducedMotion()
  const spread = (i: number) => (i - (props.bags - 1) / 2) * 34
  return (
    <aside className="rounded-(--radius-panel) bg-page p-5 shadow-(--shadow-float) sm:p-6 lg:sticky lg:top-20">
      <div className="relative grid h-56 place-items-center overflow-hidden rounded-(--radius-card) bg-panel">
        <AnimatePresence initial={false}>
          {Array.from({ length: props.bags }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-24"
              initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px) rotate(0deg)" }}
              animate={{ opacity: 1, transform: `translateX(${spread(i)}px) rotate(${spread(i) / 6}deg)` }}
              exit={{ opacity: 0, transform: "translateY(24px) rotate(0deg)" }}
              transition={reduced ? { duration: 0.15 } : { type: "spring", duration: 0.5, bounce: 0.22 }}
              style={{ zIndex: i }}
            >
              <CoffeeBag name={props.bagName} label={props.bagLabel} artwork={props.bagLabel === "honey" ? "honey" : "cream"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-5 space-y-1">
        <p className="type-label text-[10.5px] text-ink-3">{props.frequency}</p>
        <p className="type-display text-h4">{props.planName}</p>
        <p className="text-[14px] text-ink-2">
          {props.bagName} · {props.detail}
        </p>
      </div>

      <dl className="mt-5 space-y-2 border-y border-line py-4 text-[14px]">
        <div className="flex justify-between">
          <dt className="text-ink-3">On the shelf</dt>
          <dd className="font-mono text-ink-3 tabular line-through">{money(props.shelf)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-3">Subscriber saving</dt>
          <dd className="font-mono text-moss tabular">−{money(props.shelf - props.perDelivery)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <dt className="font-medium">Per delivery</dt>
          <dd className="font-mono text-[20px] tabular">{money(props.perDelivery)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-[13.5px] text-ink-2">
        First box lands <b className="font-medium text-ink">{props.delivery}</b>. Shipping is on us.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {props.added ? (
          <motion.div key="done" className="mt-5 space-y-3" initial={{ opacity: 0, transform: "translateY(6px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
            <p className="flex items-center gap-2 rounded-(--radius-field) bg-moss-soft px-3 py-2.5 text-[14px] text-moss">
              <Check className="size-4" /> In your cart — check out whenever you're ready.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => cart.setOpen(true)}>
                Open cart
              </Button>
              <Button variant="outline" onClick={props.onAgain}>
                Build another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="start" exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
            <Button size="lg" className="mt-5 w-full" disabled={!props.ready} onClick={props.onStart}>
              Start subscription · <span className="tabular">{money(props.perDelivery)}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}

