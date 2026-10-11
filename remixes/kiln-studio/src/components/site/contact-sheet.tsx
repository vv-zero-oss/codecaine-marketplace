import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, HelpCircle, Loader2, Megaphone, Orbit, Smartphone, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { KilnMark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { EMAIL } from "@/data/studio"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

type ContactState = { open: boolean; setOpen: (open: boolean) => void }
const Context = createContext<ContactState>({ open: false, setOpen: () => {} })
export const useContact = () => useContext(Context)

const KINDS = [
  { id: "Experience", icon: Orbit, line: "Sites, installations, games, XR" },
  { id: "Product", icon: Smartphone, line: "Apps, tools, services people use" },
  { id: "Communication", icon: Megaphone, line: "Campaigns, film, identity" },
  { id: "Not sure yet", icon: HelpCircle, line: "Let's work it out together" },
] as const
const BUDGETS = ["Under €50k", "€50–150k", "€150–400k", "€400k+"]
const TIMINGS = ["This quarter", "Next quarter", "Later this year", "Just exploring"]
const STEPS = ["The work", "Budget and timing", "About you"]

type Form = { kind: string; budget: string; timing: string; name: string; email: string; company: string; message: string }
const BLANK: Form = { kind: "", budget: "", timing: "", name: "", email: "", company: "", message: "" }

function errorsFor(form: Form) {
  return {
    name: form.name.trim().length < 2 ? "Tell us what to call you." : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "" : "An email we can write back to — like name@company.com.",
    message: form.message.trim().length < 20 ? `A sentence or two about it — ${Math.max(0, 20 - form.message.trim().length)} more characters.` : "",
  }
}

/** A chip in a single-choice row: budget, timing. */
function Choice({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => {
        play("tick")
        onSelect()
      }}
      className={cn(
        "h-11 rounded-full px-4 text-[15px] transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
        selected ? "bg-bone text-bone-ink" : "text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-3)] hover:bg-panel-2 hover:text-ink",
      )}
    >
      {label}
    </button>
  )
}

/**
 * "Let's Talk": a three-step brief in a side sheet — what you're making,
 * budget and timing, who you are — with validation as you go, Back and Next,
 * a sending state and a thank-you that uses your name.
 */
export function ContactSheet() {
  const { open, setOpen } = useContact()
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState<Form>(BLANK)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const timer = useRef<number | undefined>(undefined)

  useCanvasAction("Contact: sent", (next) => {
    const on = next ?? status !== "sent"
    if (on) {
      setForm((f) => ({ ...f, name: f.name || "Robin Achterberg", kind: f.kind || "Experience" }))
      setOpen(true)
    }
    setStatus(on ? "sent" : "idle")
  }, { on: status === "sent", group: "Let's Talk" })
  useCanvasAction("Contact: step", () => {
    setOpen(true)
    setStatus("idle")
    setStep((s) => (s + 1) % STEPS.length)
  }, { group: "Let's Talk" })

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const errors = useMemo(() => errorsFor(form), [form])
  const set = (key: keyof Form) => (value: string) => setForm((f) => ({ ...f, [key]: value }))
  const canNext = step === 0 ? !!form.kind : step === 1 ? !!form.budget && !!form.timing : !errors.name && !errors.email && !errors.message

  const go = (to: number) => {
    setDir(to > step ? 1 : -1)
    setStep(to)
    play("press")
  }

  const submit = () => {
    setTouched({ name: true, email: true, message: true })
    if (!canNext) return
    setStatus("sending")
    play("press")
    timer.current = window.setTimeout(() => {
      setStatus("sent")
      play("open")
    }, 1100)
  }

  const reset = () => {
    setForm(BLANK)
    setTouched({})
    setStep(0)
    setStatus("idle")
  }

  const firstName = form.name.trim().split(/\s+/)[0]
  const slide = reduced ? 0 : 18

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next && status === "sent") window.setTimeout(reset, 400)
      }}
    >
      <SheetContent showCloseButton={false} className="w-full gap-0 overflow-y-auto p-0 sm:max-w-[560px]" overlayClassName="bg-page/70 backdrop-blur-[2px]">
        <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
          <p className="type-label text-ink-3">Let's Talk</p>
          <SheetClose className="grid size-11 place-items-center rounded-full text-ink-2 transition-[background-color,color,transform] duration-(--duration-hover) hover:bg-panel-2 hover:text-ink active:scale-95" aria-label="Close">
            <X className="size-5" />
          </SheetClose>
        </div>

        {status === "sent" ? (
          <motion.div
            className="flex flex-1 flex-col justify-between gap-10 px-6 pt-10 pb-8 sm:px-8"
            initial={reduced ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div>
              {/* The vessel fills with ember from the foot up: fired. */}
              <div className="relative w-16">
                <KilnMark className="w-16 text-raised" />
                <motion.div
                  className="absolute inset-0 text-ember"
                  initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                >
                  <KilnMark className="w-16" />
                </motion.div>
              </div>
              <SheetTitle className="type-head mt-8 text-h2 text-ink">Fired{firstName ? `, ${firstName}` : ""}.</SheetTitle>
              <SheetDescription className="mt-4 max-w-[40ch] text-lead text-ink-2">
                Your brief is with the studio. Someone who'd work on it writes back within two working days — not a form letter.
              </SheetDescription>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-2 pt-6 text-[15px]">
              {[
                ["Making", form.kind],
                ["Budget", form.budget],
                ["Timing", form.timing],
                ["Reply to", form.email || "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="type-label text-ink-4">{k}</dt>
                  <dd className="mt-1 truncate text-ink">{v || "—"}</dd>
                </div>
              ))}
            </dl>
            <Button variant="soft" onClick={reset} className="self-start">
              Send another
            </Button>
          </motion.div>
        ) : (
          <form
            className="flex flex-1 flex-col px-6 pt-8 pb-6 sm:px-8"
            onSubmit={(e) => {
              e.preventDefault()
              if (step < 2) {
                if (canNext) go(step + 1)
              } else submit()
            }}
            noValidate
          >
            <SheetTitle className="type-head text-h3 text-ink">Tell us what you're making.</SheetTitle>
            <SheetDescription className="mt-3 text-[16px] text-ink-3">
              Three short steps. Or just write to <a className="text-ink underline decoration-line-3 underline-offset-4 hover:decoration-ember" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </SheetDescription>

            {/* Progress: three segments that fill as you go. */}
            <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Progress">
              {STEPS.map((label, i) => (
                <li key={label} aria-current={i === step ? "step" : undefined}>
                  <span className="block h-[3px] overflow-hidden rounded-full bg-raised">
                    <span
                      className="block h-full origin-left rounded-full bg-ember transition-transform duration-(--duration-rise) ease-(--ease-out-strong)"
                      style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                    />
                  </span>
                  <span className={cn("type-label mt-2 block transition-colors duration-(--duration-hover)", i <= step ? "text-ink-2" : "text-ink-4")}>{label}</span>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 min-h-[360px] flex-1">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, transform: `translateX(${dir * slide}px)` }}
                  animate={{ opacity: 1, transform: "translateX(0px)" }}
                  exit={{ opacity: 0, transform: `translateX(${-dir * slide}px)` }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  {step === 0 && (
                    <fieldset>
                      <legend className="text-[15px] text-ink-2">What kind of work is it?</legend>
                      <div role="radiogroup" className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {KINDS.map(({ id, icon: Icon, line }) => {
                          const on = form.kind === id
                          return (
                            <button
                              key={id}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              onClick={() => {
                                set("kind")(id)
                                play("tick")
                              }}
                              className={cn(
                                "group/kind flex min-h-[112px] flex-col justify-between rounded-(--radius-card) p-4 text-left transition-[background-color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.98]",
                                on ? "bg-raised shadow-[inset_0_0_0_1.5px_var(--color-ember)]" : "bg-panel-2 hover:bg-raised",
                              )}
                            >
                              <span className="flex items-center justify-between">
                                <Icon className={cn("size-5 transition-colors duration-(--duration-hover)", on ? "text-ember" : "text-ink-3")} strokeWidth={1.6} />
                                <span className={cn("grid size-5 place-items-center rounded-full transition-[background-color,transform] duration-(--duration-hover)", on ? "scale-100 bg-ember text-bone-ink" : "scale-75 bg-raised")}>
                                  {on && <Check className="size-3" strokeWidth={3} />}
                                </span>
                              </span>
                              <span>
                                <span className="block text-[17px] font-medium tracking-[-0.02em] text-ink">{id}</span>
                                <span className="block text-[14px] text-ink-3">{line}</span>
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>
                  )}
                  {step === 1 && (
                    <div className="flex flex-col gap-8">
                      <fieldset>
                        <legend className="text-[15px] text-ink-2">Roughly what budget?</legend>
                        <div role="radiogroup" className="mt-4 flex flex-wrap gap-2">
                          {BUDGETS.map((b) => (
                            <Choice key={b} label={b} selected={form.budget === b} onSelect={() => set("budget")(b)} />
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="text-[15px] text-ink-2">And when?</legend>
                        <div role="radiogroup" className="mt-4 flex flex-wrap gap-2">
                          {TIMINGS.map((t) => (
                            <Choice key={t} label={t} selected={form.timing === t} onSelect={() => set("timing")(t)} />
                          ))}
                        </div>
                      </fieldset>
                      <p className="text-[14px] text-ink-4">A range is fine. It helps us bring the right people to the first call.</p>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-4">
                      {(
                        [
                          ["name", "Your name", "text", "name"],
                          ["email", "Email", "email", "email"],
                          ["company", "Company (optional)", "text", "organization"],
                        ] as const
                      ).map(([key, label, type, auto]) => {
                        const error = key !== "company" && touched[key] ? errors[key] : ""
                        return (
                          <label key={key} className="flex flex-col gap-2">
                            <span className="text-[14px] text-ink-2">{label}</span>
                            <Input
                              type={type}
                              autoComplete={auto}
                              value={form[key]}
                              aria-invalid={!!error}
                              aria-describedby={error ? `${key}-error` : undefined}
                              onChange={(e) => set(key)(e.target.value)}
                              onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
                            />
                            {error && (
                              <span id={`${key}-error`} className="text-[13px] text-error">
                                {error}
                              </span>
                            )}
                          </label>
                        )
                      })}
                      <label className="flex flex-col gap-2">
                        <span className="flex justify-between text-[14px] text-ink-2">
                          What is it?
                          <span className={cn("type-label tabular-nums", form.message.trim().length >= 20 ? "text-ok" : "text-ink-4")}>{form.message.trim().length}/20+</span>
                        </span>
                        <Textarea
                          value={form.message}
                          aria-invalid={!!(touched.message && errors.message)}
                          onChange={(e) => set("message")(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                          placeholder="We're launching… and we want people to…"
                        />
                        {touched.message && errors.message && <span className="text-[13px] text-error">{errors.message}</span>}
                      </label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-line-2 pt-5">
              <Button type="button" variant="ghost" onClick={() => go(step - 1)} className={cn(step === 0 && "invisible")}>
                <ArrowLeft /> Back
              </Button>
              {step < 2 ? (
                <Button type="submit" disabled={!canNext}>
                  Next <ArrowRight />
                </Button>
              ) : (
                <Button type="submit" variant="ember" disabled={status === "sending"} className="min-w-[148px]">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send the brief <ArrowRight />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Let's Talk", (next) => setOpen(next ?? !open), { on: open, group: "Let's Talk" })
  return (
    <Context.Provider value={{ open, setOpen }}>
      {children}
      <ContactSheet />
    </Context.Provider>
  )
}
