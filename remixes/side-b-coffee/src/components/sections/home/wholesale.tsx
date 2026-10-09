import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Doodle } from "@/components/mock/doodles"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { photo, PHOTOS } from "@/lib/photos"

type Errors = Partial<Record<"name" | "cafe" | "email", string>>

/**
 * Coffee for other people's cafés: a sky-blue frame holding a photo of
 * the roaster at work and a cream card with the pitch. "Get in touch"
 * opens a short form that validates as you go, sends (a 900ms beat), and
 * thanks you by name.
 */
export function Wholesale() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Wholesale form", (next) => setOpen(next ?? !open), { on: open, group: "Wholesale" })

  return (
    <section id="wholesale" className="scroll-mt-16 bg-sky p-2 sm:p-4">
      <div className="grid gap-2 sm:gap-4 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-(--radius-panel) lg:min-h-[520px]">
          <img src={photo(PHOTOS.roasterAtWork, 1400)} alt="Our head roaster checking a batch at the drum" className="absolute inset-0 size-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-between gap-10 rounded-(--radius-panel) bg-raised p-6 shadow-(--shadow-card) sm:p-10">
          <div className="max-w-[460px] space-y-5">
            <p className="type-label text-[11.5px] text-ink-3">Wholesale</p>
            <h2 className="type-display text-h1">
              Got a café?
              <br />
              <span className="text-ember">Pour ours.</span>
            </h2>
            <p className="text-[16px] text-ink-2">
              We roast for forty-odd cafés, bakeries and record shops. You get a roaster on the phone, barista training at the plant, equipment at cost, and coffee that arrives five days off roast — every week, without chasing.
            </p>
            <ul className="grid grid-cols-3 gap-4 border-t border-line pt-5">
              {[
                ["40+", "Partner cafés"],
                ["5 days", "Off roast, on arrival"],
                ["1 call", "To change an order"],
              ].map(([n, l]) => (
                <li key={l}>
                  <p className="type-display text-h3">{n}</p>
                  <p className="text-[12.5px] text-ink-3">{l}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end justify-between gap-4">
            <Button variant="ink" size="sm" onClick={() => setOpen(true)}>
              Get in touch
            </Button>
            <Doodle name="boombox" className="w-28 sm:w-36" />
          </div>
        </div>
      </div>
      <WholesaleForm open={open} onOpenChange={setOpen} />
    </section>
  )
}

function WholesaleForm({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [values, setValues] = useState({ name: "", cafe: "", email: "", volume: "10–25 kg" })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  useCanvasAction("Wholesale sent", (next) => setStatus((next ?? status !== "sent") ? "sent" : "idle"), { on: status === "sent", group: "Wholesale" })

  const errors: Errors = {}
  if (!values.name.trim()) errors.name = "Tell us who we'll be talking to."
  if (!values.cafe.trim()) errors.cafe = "Which café, bakery or shop is it?"
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "An email we can reply to, like you@yourcafe.com."
  const show = (k: keyof Errors) => touched[k] && errors[k]

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, cafe: true, email: true })
    if (Object.keys(errors).length) return
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 900)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (!o) window.setTimeout(() => setStatus("idle"), 200)
      }}
    >
      <DialogContent className="w-[min(520px,calc(100vw-24px))] max-w-none rounded-(--radius-panel) border-0 bg-page p-6 shadow-(--shadow-lift) sm:max-w-none sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div key="sent" className="space-y-4 py-6 text-center" initial={{ opacity: 0, transform: "translateY(8px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-moss text-page">
                <Check className="size-6" />
              </span>
              <DialogTitle className="type-display text-h3 font-semibold">Thanks, {values.name.split(" ")[0] || "friend"}.</DialogTitle>
              <DialogDescription className="text-[15px] text-ink-2">
                Our wholesale lead will email {values.email} within a working day, with samples for {values.cafe} on the next Tuesday roast.
              </DialogDescription>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} noValidate className="space-y-5" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <div className="space-y-2">
                <DialogTitle className="type-display text-h3 font-semibold">Pour Side B at your place</DialogTitle>
                <DialogDescription className="text-[15px] text-ink-2">A few details and we'll send samples with the next roast.</DialogDescription>
              </div>
              {(
                [
                  ["name", "Your name", "text", "Ada Okafor", "name"],
                  ["cafe", "Café or shop", "text", "The Corner Room", "organization"],
                  ["email", "Email", "email", "ada@cornerroom.com", "email"],
                ] as const
              ).map(([key, label, type, placeholder, auto]) => (
                <label key={key} className="block space-y-1.5">
                  <span className="text-[13.5px] font-medium">{label}</span>
                  <Input
                    type={type}
                    autoComplete={auto}
                    placeholder={placeholder}
                    value={values[key]}
                    aria-invalid={!!show(key)}
                    onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
                  />
                  {show(key) && <span className="block text-[12.5px] text-rust">{errors[key]}</span>}
                </label>
              ))}
              <fieldset className="space-y-1.5">
                <legend className="mb-1.5 text-[13.5px] font-medium">Coffee a week</legend>
                <ToggleGroup type="single" variant="outline" value={values.volume} onValueChange={(v) => v && setValues((s) => ({ ...s, volume: v }))} className="w-full">
                  {["Under 10 kg", "10–25 kg", "25 kg +"].map((v) => (
                    <ToggleGroupItem key={v} value={v} className="h-10 flex-1">
                      {v}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>
              <Button type="submit" className="w-full" size="lg" disabled={status === "sending"}>
                {status === "sending" ? <><Loader2 className="size-4 animate-spin" /> Sending</> : "Send it over"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
