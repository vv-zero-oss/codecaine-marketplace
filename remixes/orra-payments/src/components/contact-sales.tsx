/**
 * "Talk to sales": a dialog every sales button on the page opens.
 *
 * Its open state lives in one provider so the header, hero and CTA share it,
 * and both hidden states — the form open, and the form sent — are registered
 * with the editor, so they can be styled without clicking through.
 */
import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useCanvasAction } from "@canvas/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const ContactContext = createContext<() => void>(() => {})

/** Opens the sales dialog from anywhere below the provider. */
export function useContactSales() {
  return useContext(ContactContext)
}

type Status = "idle" | "sending" | "sent"

const VOLUMES = ["Under €50k a month", "€50k – €250k a month", "€250k – €1M a month", "Over €1M a month"]

export function ContactSalesProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>("idle")

  useCanvasAction("Talk to sales", (next) => setOpen(next ?? !open), { on: open, group: "Forms" })
  useCanvasAction(
    "Talk to sales — sent",
    (next) => {
      const sent = next ?? status !== "sent"
      setStatus(sent ? "sent" : "idle")
      if (sent) setOpen(true)
    },
    { on: status === "sent", group: "Forms" },
  )

  const change = (next: boolean) => {
    setOpen(next)
    if (!next) window.setTimeout(() => setStatus("idle"), 200)
  }

  return (
    <ContactContext.Provider value={() => change(true)}>
      {children}
      <Dialog open={open} onOpenChange={change}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border-line p-6 sm:max-w-lg sm:p-8">
          {status === "sent" ? (
            <SentState onClose={() => change(false)} />
          ) : (
            <ContactForm status={status} onSubmit={() => {
              setStatus("sending")
              window.setTimeout(() => {
                setStatus("sent")
                toast.success("Thanks — a specialist will email you within one working day.")
              }, 900)
            }} />
          )}
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  )
}

function ContactForm({ status, onSubmit }: { status: Status; onSubmit: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Record<string, string> = {}
    if (!String(data.get("name") ?? "").trim()) next.name = "Tell us who to ask for."
    const email = String(data.get("email") ?? "")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Use an address like you@company.com."
    if (!String(data.get("company") ?? "").trim()) next.company = "Add your company’s name."
    setErrors(next)
    if (Object.keys(next).length === 0) onSubmit()
  }

  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="text-2xl font-normal tracking-[-0.03em]">Talk to sales</DialogTitle>
        <DialogDescription className="text-ink-2">
          Tell us how you sell and roughly how much. A payments specialist replies within one working day.
        </DialogDescription>
      </DialogHeader>
      <form noValidate onSubmit={submit} className="mt-2 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
          <Field name="company" label="Company" autoComplete="organization" error={errors.company} />
        </div>
        <Field name="email" type="email" label="Work email" autoComplete="email" error={errors.email} />
        <div className="grid gap-2">
          <Label htmlFor="volume">Monthly volume</Label>
          <Select name="volume" defaultValue={VOLUMES[1]}>
            <SelectTrigger id="volume" className="h-11 w-full rounded-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VOLUMES.map((volume) => (
                <SelectItem key={volume} value={volume}>
                  {volume}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">What are you working on?</Label>
          <Textarea id="message" name="message" rows={3} placeholder="Opening two new markets in spring…" />
        </div>
        <Button type="submit" size="lg" disabled={status === "sending"} className="mt-1">
          {status === "sending" ? <Loader2 className="animate-spin" /> : null}
          {status === "sending" ? "Sending" : "Send to sales"}
        </Button>
      </form>
    </>
  )
}

function Field({
  name,
  label,
  error,
  type = "text",
  autoComplete,
}: {
  name: string
  label: string
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="h-11 rounded-md"
      />
      {error ? (
        <p id={`${name}-error`} className="text-[13px] text-rose">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function SentState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 py-2">
      <CheckCircle2 className="size-8 text-mint" strokeWidth={1.5} />
      <DialogTitle className="text-2xl font-normal tracking-[-0.03em]">We’ve got it</DialogTitle>
      <DialogDescription className="text-ink-2">
        A specialist for your market will email you within one working day. In the meantime, you can open a test
        account and take a sandbox payment.
      </DialogDescription>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  )
}
