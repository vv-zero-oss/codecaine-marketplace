import { AnimatePresence, motion } from "motion/react"
import { Check, Send } from "lucide-react"
import { useState, type FormEvent } from "react"

import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { STUDIO } from "@/content"
import { cn } from "@/lib/utils"

const BUDGETS = ["< €5k", "€5–15k", "€15–40k", "€40k +"]
const KINDS = ["Animation", "Video", "Social", "Not sure yet"]

type Fields = { name: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

function check(fields: Fields): Errors {
  const errors: Errors = {}
  if (!fields.name.trim()) errors.name = "Tell us who we are talking to."
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = "We need an email address we can reply to, like you@studio.com."
  if (fields.message.trim().length < 20) errors.message = "A sentence or two, please — at least 20 characters."
  return errors
}

const EMPTY: Fields = { name: "", email: "", company: "", message: "" }

/**
 * The brief form: who you are, what you need, roughly what it can cost — with
 * inline errors that say how to fix them, and a thank-you that uses your name.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [budget, setBudget] = useState(BUDGETS[1])
  const [kinds, setKinds] = useState<string[]>(["Animation"])
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [shake, setShake] = useState(0)
  const errors = check(fields)
  const shown = (key: keyof Fields) => (touched[key] ? errors[key] : undefined)

  useCanvasAction("Form sent", (on) => setStatus((on ?? status !== "sent") ? "sent" : "idle"), {
    group: "Contact form",
    on: status === "sent",
  })
  useCanvasAction(
    "Show errors",
    (on) => setTouched((on ?? !touched.name) ? { name: true, email: true, message: true } : {}),
    { group: "Contact form", on: !!touched.name && !!errors.name },
  )

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched({ name: true, email: true, company: true, message: true })
    if (Object.keys(errors).length) {
      setShake((n) => n + 1)
      return
    }
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 1100)
  }

  const set = (key: keyof Fields) => (event: { target: { value: string } }) => setFields((f) => ({ ...f, [key]: event.target.value }))
  const blur = (key: keyof Fields) => () => setTouched((t) => ({ ...t, [key]: true }))

  const mail = `mailto:${STUDIO.email}?subject=${encodeURIComponent(`New brief from ${fields.name || "the site"}`)}&body=${encodeURIComponent(
    `${fields.message}\n\n— ${fields.name}${fields.company ? `, ${fields.company}` : ""}\nBudget: ${budget}\nLooking for: ${kinds.join(", ")}`,
  )}`

  return (
    <div className="relative bg-card p-6 shadow-card md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: -6 }}
              transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.1 }}
              className="flex size-20 items-center justify-center border-[5px] border-card bg-green text-snow shadow-sticker"
            >
              <Check className="size-10" strokeWidth={3} />
            </motion.span>
            <h3 className="mt-6 display text-5xl">Thanks{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}!</h3>
            <p className="mt-3 max-w-[32ch] font-serif text-2xl leading-tight">
              Your brief is on its way. Idris or Noor will get back to you within one working day.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Rather send it from your own inbox?{" "}
              <a href={mail} className="text-blue underline underline-offset-2">
                Open it as an email
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle")
                setFields(EMPTY)
                setTouched({})
              }}
              className="mt-8 label text-sm text-blue underline-offset-4 hover:underline"
            >
              Send another brief
            </button>
          </motion.div>
        ) : (
          <motion.form
            key={`form-${shake}`}
            noValidate
            onSubmit={submit}
            initial={shake ? { x: 0 } : { opacity: 0 }}
            animate={shake ? { x: [0, -10, 9, -6, 4, 0] } : { opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: shake ? 0.42 : 0.3 }}
            className="grid gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Your name" error={shown("name")}>
                <Input id="name" autoComplete="name" value={fields.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!shown("name")} placeholder="Sam de Vries" />
              </Field>
              <Field id="email" label="Email" error={shown("email")}>
                <Input id="email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={!!shown("email")} placeholder="sam@brand.com" />
              </Field>
            </div>
            <Field id="company" label="Company (optional)">
              <Input id="company" autoComplete="organization" value={fields.company} onChange={set("company")} placeholder="Where you work" />
            </Field>
            <fieldset>
              <legend className="mb-2 label text-sm">What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {KINDS.map((kind) => (
                  <Chip key={kind} selected={kinds.includes(kind)} onClick={() => setKinds((all) => (all.includes(kind) ? all.filter((k) => k !== kind) : [...all, kind]))} role="checkbox">
                    {kind}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 label text-sm">Rough budget</legend>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} selected={budget === b} onClick={() => setBudget(b)} role="radio">
                    {b}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <Field id="message" label="What should move?" error={shown("message")} hint={`${fields.message.trim().length}/20`}>
              <Textarea id="message" rows={5} value={fields.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={!!shown("message")} placeholder="The product, the problem, the deadline — whatever you have." />
            </Field>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" tone="blue" size="lg" icon={Send} label={status === "sending" ? "Sending…" : "Send your brief"} loading={status === "sending"} />
              <p className="text-sm text-ink-soft">We reply within one working day.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id} className="label text-sm">
          {label}
        </Label>
        {hint ? <span className="font-mono text-[11px] text-ink-mute">{hint}</span> : null}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red"
            role="alert"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Chip({ selected, children, onClick, role }: { selected: boolean; children: React.ReactNode; onClick: () => void; role: "radio" | "checkbox" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 border px-4 label text-sm transition-[background-color,color,border-color,transform] duration-(--duration-fast) active:scale-[0.97]",
        selected ? "border-blue bg-blue text-snow" : "border-line bg-paper text-ink hover:border-ink",
      )}
    >
      {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
      {children}
    </button>
  )
}
