import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, money, type Coffee } from "@/content/products"
import { cart } from "@/lib/cart"
import { quickView } from "@/lib/quick-view"

type Brew = "filter" | "espresso" | "press"
type Milk = "black" | "milk"
type Mood = "comfort" | "adventure"

const QUESTIONS = [
  { key: "brew", q: "How do you brew?", options: [["filter", "Pour-over"], ["espresso", "Espresso"], ["press", "French press"]] },
  { key: "milk", q: "Milk, or black?", options: [["black", "Black"], ["milk", "With milk"]] },
  { key: "mood", q: "Today you want…", options: [["comfort", "Something familiar"], ["adventure", "Something new"]] },
] as const

/** Scores every coffee against the three answers and returns the best. */
function recommend(brew: Brew, milk: Milk, mood: Mood): Coffee {
  const score = (c: Coffee) => {
    let s = 0
    if (brew === "espresso") s += c.roastLevel > 0.5 ? 3 : c.roastLevel > 0.4 ? 1 : -2
    if (brew === "filter") s += c.roastLevel < 0.45 ? 3 : c.roastLevel < 0.6 ? 1 : -1
    if (brew === "press") s += c.roastLevel >= 0.5 ? 2 : 0
    if (milk === "milk") s += c.sweetness + (4 - c.acidity)
    else s += c.acidity + (c.complexity - 2)
    if (mood === "adventure") s += c.complexity * 1.5 + (c.badge === "new" || c.badge === "limited" ? 2 : 0)
    else s += c.badge === "house" ? 4 : 4 - c.complexity
    if (c.process.startsWith("Decaf")) s -= 3
    return s
  }
  return [...COFFEES].sort((a, b) => score(b) - score(a))[0]
}

/**
 * "Find your coffee": three questions as segmented choices, answered in any
 * order; once all three are in, the shelf answers with one bag — which
 * slides in from the right (320ms ease-out) and swaps the same way when an
 * answer changes. Add it to the cart from here, or open it in quick view.
 */
export function CoffeeQuiz() {
  const [answers, setAnswers] = useState<{ brew?: Brew; milk?: Milk; mood?: Mood }>({})
  const [added, setAdded] = useState(false)
  const reduced = useReducedMotion()
  const done = answers.brew && answers.milk && answers.mood
  const pick = useMemo(() => (done ? recommend(answers.brew!, answers.milk!, answers.mood!) : null), [answers, done])

  useCanvasAction(
    "Quiz answered",
    (next) => setAnswers((next ?? !done) ? { brew: "filter", milk: "black", mood: "adventure" } : {}),
    { on: !!done, group: "Find your coffee" },
  )

  const answered = Object.values(answers).filter(Boolean).length

  return (
    <section className="border-b border-line bg-panel py-(--spacing-section)">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="space-y-10">
          <SectionHeading kicker="Not sure where to start?" before="Find" highlight="your coffee." tone="rust" doodle="cup" />
          <ol className="space-y-8">
            {QUESTIONS.map((question, i) => (
              <li key={question.key} className="space-y-3">
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-[12.5px] text-ember-ink tabular">{String(i + 1).padStart(2, "0")}</span>
                  <span className="type-display text-h4">{question.q}</span>
                </p>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  spacing={1}
                  value={answers[question.key] ?? ""}
                  onValueChange={(v) => v && setAnswers((a) => ({ ...a, [question.key]: v }))}
                  className="flex w-full flex-wrap"
                  aria-label={question.q}
                >
                  {question.options.map(([value, label]) => (
                    <ToggleGroupItem key={value} value={value} className="h-11 rounded-(--radius-button) px-4 normal-case">
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-3">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-panel-deep">
              <div className="h-full origin-left rounded-full bg-ember transition-transform duration-(--duration-swap) ease-(--ease-out-strong)" style={{ transform: `scaleX(${answered / 3})` }} />
            </div>
            <span className="font-mono text-[12px] text-ink-3 tabular">{answered} / 3</span>
            {answered > 0 && (
              <button onClick={() => setAnswers({})} className="type-label ml-2 inline-flex items-center gap-1.5 text-[11px] text-ink-3 hover:text-rust">
                <RotateCcw className="size-3" /> Start over
              </button>
            )}
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-(--radius-panel) bg-page shadow-(--shadow-float)">
          <AnimatePresence mode="wait" initial={false}>
            {pick ? (
              <motion.div
                key={pick.id}
                className="flex h-full flex-col items-center gap-5 p-6 text-center sm:p-10"
                initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateX(24px)" }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateX(-16px)" }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="type-label text-[11px] text-ink-3">Your coffee is</p>
                <div className="w-36 sm:w-40">
                  <CoffeeBag name={pick.name} notes={pick.notes.join(" · ")} origin={pick.origin} roast={pick.roast} label={pick.label} artwork={pick.badge === "house" ? "honey" : "cream"} />
                </div>
                <div className="space-y-2">
                  <h3 className="type-display text-h2">{pick.name}</h3>
                  <p className="text-[15px] text-ink-2">
                    {pick.origin} · {pick.roast} roast · {pick.notes.join(", ")}
                  </p>
                  <p className="mx-auto max-w-[40ch] text-[14.5px] text-ink-3">{pick.story}</p>
                </div>
                <div className="mt-auto flex flex-wrap justify-center gap-2">
                  <Button
                    variant={added ? "ink" : "rust"}
                    onClick={() => {
                      cart.add({ id: pick.id, name: pick.name, detail: `12 oz · ${answers.brew === "espresso" ? "Espresso" : answers.brew === "press" ? "French press" : "Pour-over"}`, price: pick.price, kind: "coffee" }, { open: false })
                      setAdded(true)
                      window.setTimeout(() => setAdded(false), 1400)
                    }}
                  >
                    {added ? <><Check /> Added</> : <>Add to cart · {money(pick.price)}</>}
                  </Button>
                  <Button variant="outline" onClick={() => quickView.open(pick.id)}>
                    Quick view
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" className="flex h-full min-h-[460px] flex-col items-center justify-center gap-4 p-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="w-28 opacity-40 grayscale">
                  <CoffeeBag name="?" notes="Answer three questions" origin="Somewhere good" />
                </div>
                <p className="type-display text-h4">Three questions, one bag.</p>
                <p className="max-w-[32ch] text-[14.5px] text-ink-3">Answer on the left and the shelf will pick for you — change an answer and it picks again.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
