import { useCanvasAction } from "@canvas/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, LoaderCircle } from "lucide-react"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { FieldError, Input, Label, Textarea } from "@/components/ui/input"
import { RadioCard, RadioGroup } from "@/components/ui/radio-group"
import { ENQUIRIES } from "@/content"

type Kind = (typeof ENQUIRIES)[number]["value"]
type Errors = Partial<Record<"name" | "email" | "message", string>>

const PROMPTS: Record<Kind, { company: string; message: string }> = {
  founder: { company: "Company", message: "What are you building, and why now?" },
  member: { company: "What you've built", message: "Tell us a little about yourself and who introduced you." },
  press: { company: "Publication or organisation", message: "How can we help?" },
}

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = "Tell us your name so a partner can reply to you."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter an email address, like you@studio.com."
  if (values.message.trim().length < 20) errors.message = "A sentence or two, at least 20 characters, helps us route this."
  return errors
}

/** One form for every enquiry; the questions change with who is asking. */
export function ContactForm() {
  const [kind, setKind] = useState<Kind>("founder")
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle")
  const reduce = useReducedMotion()

  useCanvasAction("Form errors", (on) => setErrors((on ?? !errors.email) ? validate({ name: "", email: "", message: "" }) : {}), {
    on: !!errors.email,
    group: "Contact",
  })
  useCanvasAction("Form sent", (on) => setState((on ?? state !== "sent") ? "sent" : "idle"), { on: state === "sent", group: "Contact" })

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key as keyof Errors]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setState("sending")
    window.setTimeout(() => setState("sent"), 1100)
  }

  const prompts = PROMPTS[kind]
  const first = values.name.trim().split(" ")[0]

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-5 rounded-card border border-line bg-surface p-8 shadow-card"
        >
          <span className="flex size-10 items-center justify-center rounded-pill bg-paper text-on-paper">
            <Check aria-hidden className="size-4" />
          </span>
          <h3 className="text-2xl font-medium tracking-[-0.03em]">Thank you{first ? `, ${first}` : ""}.</h3>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
            A partner reads every note we receive. Expect a reply from a person, not a system, within three working days.
          </p>
          <Button variant="glass" size="sm" onClick={() => setState("idle")}>
            Send another
          </Button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-7">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase">You are writing as</legend>
            <RadioGroup value={kind} onValueChange={(v) => setKind(v as Kind)} className="sm:grid-cols-3">
              {ENQUIRIES.map((e) => (
                <RadioCard key={e.value} value={e.value} label={e.label} hint={e.hint} />
              ))}
            </RadioGroup>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby="c-name-error" />
              <FieldError id="c-name-error">{errors.name}</FieldError>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="c-email">Email</Label>
              <Input
                id="c-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set("email")}
                aria-invalid={!!errors.email}
                aria-describedby="c-email-error"
              />
              <FieldError id="c-email-error">{errors.email}</FieldError>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-company">
              {prompts.company} <span className="tracking-normal text-fg-subtle normal-case">(optional)</span>
            </Label>
            <Input id="c-company" autoComplete="organization" value={values.company} onChange={set("company")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea
              id="c-message"
              placeholder={prompts.message}
              value={values.message}
              onChange={set("message")}
              aria-invalid={!!errors.message}
              aria-describedby="c-message-error"
            />
            <FieldError id="c-message-error">{errors.message}</FieldError>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-fg-subtle">We reply within three working days. Nothing you send is shared.</p>
            <Button type="submit" size="lg" disabled={state === "sending"}>
              {state === "sending" ? (
                <>
                  <LoaderCircle aria-hidden className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  Send to a partner <ArrowRight aria-hidden className="arrow" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
