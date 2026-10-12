import { useState, type FormEvent } from "react"
import { Check, Gift as GiftIcon, Loader2 } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CopyButton } from "@/components/brand/specimen"
import { ContrailMark } from "@/components/site/logo"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { id: "year", label: "A year of Pro", price: 49.99, skin: "bg-[linear-gradient(135deg,var(--color-night),var(--color-violet-deep))] text-white" },
  { id: "family", label: "A year of Family", price: 79.99, skin: "bg-[linear-gradient(135deg,#0b6e4f,var(--color-forest))] text-white" },
  { id: "lifetime", label: "Pro for life", price: 249, skin: "bg-[linear-gradient(135deg,var(--color-amber),#ff8a3d)] text-amber-ink" },
] as const

/** A gift code, the way it would be printed: four groups of four. */
function makeCode(seed: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let h = [...seed].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381)
  const out = Array.from({ length: 12 }, () => {
    h = (h * 1103515245 + 12345) >>> 0
    return chars[h % chars.length]
  }).join("")
  return `CTRL-${out.slice(0, 4)}-${out.slice(4, 8)}-${out.slice(8)}`
}

/**
 * Give Contrail: pick a gift, write who it's for and a line, and watch the
 * card update as you type. Buying it ends on the code, ready to copy.
 */
export function Gift() {
  const [option, setOption] = useState<(typeof OPTIONS)[number]["id"]>("year")
  const [to, setTo] = useState("")
  const [note, setNote] = useState("For the next time the board says “delayed”.")
  const [state, setState] = useState<"idle" | "buying" | "done">("idle")
  const [error, setError] = useState("")
  const reduced = useReducedMotion()
  useCanvasAction("Gift — bought", (next) => setState((next ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Pricing" })
  const chosen = OPTIONS.find((o) => o.id === option)!

  const buy = (event: FormEvent) => {
    event.preventDefault()
    if (!to.trim()) {
      setError("Who's it for? Their first name is enough.")
      return
    }
    setError("")
    setState("buying")
    window.setTimeout(() => setState("done"), 1000)
  }

  return (
    <section id="gift" data-theme="day" className="bg-page pb-section">
      <Container>
        <div className="grid items-center gap-12 rounded-(--radius-panel) bg-panel p-7 md:p-12 lg:grid-cols-2">
          <Reveal>
            <p className="type-eyebrow text-violet">Gift cards</p>
            <h2 className="type-display mt-4 max-w-[14ch] text-h2 text-balance">For the person who always asks you to track their flight.</h2>
            <AnimatePresence mode="wait" initial={false}>
              {state === "done" ? (
                <motion.div key="done" initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="mt-8">
                  <p className="flex items-center gap-2 font-semibold text-green"><Check className="size-5" strokeWidth={2.6} /> Bought. Here's {to.trim() || "their"}'s code:</p>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-(--radius-field) bg-night py-2 pr-2 pl-4">
                    <code className="font-mono text-[15px] tracking-[0.06em] text-night-fg">{makeCode(to + option)}</code>
                    <CopyButton text={makeCode(to + option)} />
                  </div>
                  <button type="button" onClick={() => setState("idle")} className="mt-4 text-[14px] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">Send another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={buy} noValidate exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-8 flex flex-col gap-5">
                  <fieldset>
                    <legend className="text-[14px] font-medium">Gift</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3" role="radiogroup">
                      {OPTIONS.map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          role="radio"
                          aria-checked={option === o.id}
                          onClick={() => setOption(o.id)}
                          className={cn(
                            "flex min-h-16 flex-col items-start justify-center rounded-(--radius-field) bg-raised px-4 py-3 text-left transition-[box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.98]",
                            option === o.id ? "shadow-[0_0_0_2px_var(--color-ink)]" : "shadow-(--shadow-field) hover:shadow-[0_0_0_1px_var(--color-ink-4)]",
                          )}
                        >
                          <span className="text-[14.5px] font-medium">{o.label}</span>
                          <span className="text-[13.5px] text-ink-3 tabular-nums">${o.price}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="gift-to" className="text-[14px] font-medium">For</label>
                    <Input id="gift-to" value={to} onChange={(e) => (setTo(e.target.value), setError(""))} placeholder="Their name" maxLength={24} aria-invalid={Boolean(error)} className="mt-1.5 h-11 bg-raised" />
                    <p className="mt-1.5 min-h-5 text-[13px] text-red" role="alert">{error}</p>
                  </div>
                  <div>
                    <label htmlFor="gift-note" className="flex justify-between text-[14px] font-medium">Note <span className="font-normal text-ink-3 tabular-nums">{note.length}/80</span></label>
                    <textarea id="gift-note" value={note} onChange={(e) => setNote(e.target.value.slice(0, 80))} rows={2} className="mt-1.5 w-full resize-none rounded-(--radius-field) bg-raised px-3 py-2.5 text-[15px] shadow-(--shadow-field) outline-none focus-visible:shadow-[0_0_0_2px_var(--color-violet-bright)]" />
                  </div>
                  <button type="submit" disabled={state === "buying"} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15.5px] font-medium text-white transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-ink-2 active:scale-[0.98] disabled:opacity-80 sm:w-fit">
                    {state === "buying" ? <Loader2 className="size-4 animate-spin" /> : <GiftIcon className="size-4" />}
                    {state === "buying" ? "Wrapping it…" : `Buy for $${chosen.price}`}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={cn("relative mx-auto aspect-[1.6] w-full max-w-[440px] overflow-hidden rounded-[24px] p-7 shadow-(--shadow-lift) transition-[background] duration-(--duration-swap) [transform:rotate(-3deg)]", chosen.skin)}>
              <svg viewBox="0 0 400 250" className="absolute inset-0 size-full opacity-25" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <path key={i} d={`M-20 ${230 - i * 16} Q 200 ${40 - i * 10} 420 ${120 + i * 12}`} fill="none" stroke="currentColor" strokeWidth={1.2} strokeDasharray="2 7" />
                ))}
              </svg>
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <ContrailMark tone={option === "lifetime" ? "ink" : "light"} className="size-9" />
                  <span className="font-data text-[14px] font-semibold tracking-[0.14em] opacity-80">GIFT</span>
                </div>
                <p className="mt-auto text-[14px] opacity-75">For {to.trim() || "someone who flies a lot"}</p>
                <p className="mt-1 text-[26px] leading-tight font-bold tracking-[-0.03em]">{chosen.label}</p>
                <p className="mt-2 line-clamp-2 text-[14px] opacity-85">{note}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
