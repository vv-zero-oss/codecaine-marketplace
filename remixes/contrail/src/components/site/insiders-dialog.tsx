import { useState, type FormEvent, type ReactNode } from "react"
import { Check, Loader2 } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { avatar, PEOPLE } from "@/lib/photos"
import { cn } from "@/lib/utils"

const ROLES = ["Frequent flyer", "Cabin crew", "Pilot", "Travel pro", "Avgeek"] as const
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * "Contrail Insiders": the newsletter, in a dialog. The address is checked as
 * you leave the field, the role is a row of chips, and joining ends on a
 * thank-you that uses what you picked.
 */
export function InsidersDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<string>(ROLES[0])
  const [touched, setTouched] = useState(false)
  const [state, setState] = useState<"idle" | "sending" | "done">("idle")
  const reduced = useReducedMotion()
  useCanvasAction("Insiders dialog", (next) => setOpen(next ?? !open), { on: open, group: "Footer" })
  useCanvasAction("Insiders — joined", (next) => setState((next ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Footer" })

  const valid = EMAIL.test(email.trim())
  const error = touched && !valid ? (email ? "That address is missing something — check the part after the @." : "Your email, so we know where to send it.") : ""

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (!valid) return
    setState("sending")
    window.setTimeout(() => setState("done"), 900)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) window.setTimeout(() => (setState("idle"), setTouched(false)), 200)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[420px] gap-0 overflow-hidden rounded-(--radius-panel) border-0 bg-page p-0 shadow-(--shadow-lift)">
        <div className="relative h-28 overflow-hidden bg-[linear-gradient(120deg,var(--color-violet-deep),var(--color-violet)_60%,var(--color-amber))]">
          <svg viewBox="0 0 420 112" className="absolute inset-0 size-full" aria-hidden>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M-20 ${100 - i * 14} Q 180 ${20 - i * 6} 440 ${48 + i * 10}`} fill="none" stroke="#fff" strokeOpacity={0.35 - i * 0.08} strokeWidth={1.2} strokeDasharray="2 6" />
            ))}
          </svg>
          <p className="absolute bottom-4 left-6 type-eyebrow text-white/80">Newsletter · monthly</p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {state === "done" ? (
            <motion.div
              key="done"
              initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              className="p-6"
            >
              <span className="grid size-11 place-items-center rounded-full bg-green text-white">
                <Check className="size-5" strokeWidth={2.6} />
              </span>
              <DialogTitle className="mt-4 text-h4 font-bold tracking-[-0.03em]">You're on the list.</DialogTitle>
              <DialogDescription className="mt-2 text-ink-2">
                The first letter lands on the first Tuesday of the month — with a section written for {role.toLowerCase()}s.
              </DialogDescription>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-6">
              <DialogTitle className="text-h4 font-bold tracking-[-0.03em]">Contrail Insiders</DialogTitle>
              <DialogDescription className="mt-2 text-ink-2">
                One letter a month from the people who build Contrail: what's changing at airports, what's shipping, and what we're flying.
              </DialogDescription>
              <label className="mt-5 block text-[14px] font-medium" htmlFor="insider-email">Email</label>
              <Input
                id="insider-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={Boolean(error)}
                aria-describedby="insider-email-error"
                className="mt-1.5 h-11 rounded-(--radius-field)"
              />
              <p id="insider-email-error" className="mt-1.5 min-h-5 text-[13px] text-red">{error}</p>
              <p className="mt-2 text-[14px] font-medium">You are mostly a…</p>
              <div className="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Your role">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={role === r}
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "h-9 rounded-full px-3.5 text-[14px] transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.96]",
                      role === r ? "bg-ink text-white" : "bg-panel text-ink-2 hover:bg-panel-2",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15.5px] font-medium text-white transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-ink-2 active:scale-[0.98] disabled:opacity-80"
              >
                {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
                {state === "sending" ? "Joining…" : "Join Contrail Insiders"}
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-ink-3">
                <span className="flex -space-x-2">
                  {PEOPLE.slice(2, 5).map((id) => (
                    <img key={id} src={avatar(id, 56)} alt="" className="size-6 rounded-full object-cover ring-2 ring-page" />
                  ))}
                </span>
                Read by 18,000 people who fly a lot
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
