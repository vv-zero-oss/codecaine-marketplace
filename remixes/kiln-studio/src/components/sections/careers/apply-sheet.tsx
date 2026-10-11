import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, FileText, Loader2, Upload, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

const CITIES = ["Lisbon", "Montréal", "Either"] as const

/** A drop zone for a CV: drag a PDF on, or click to choose; shows what you picked and lets you take it back. */
function CvDrop({ file, onFile, error }: { file: File | null; onFile: (f: File | null) => void; error?: string }) {
  const input = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)
  if (file)
    return (
      <div className="flex items-center gap-3 rounded-(--radius-field) bg-panel-2 p-3">
        <span className="grid size-10 place-items-center rounded-[8px] bg-ember/15 text-ember">
          <FileText className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] text-ink">{file.name}</span>
          <span className="type-label text-ink-4">{(file.size / 1024).toFixed(0)} KB</span>
        </span>
        <button type="button" onClick={() => onFile(null)} aria-label="Remove file" className="grid size-10 place-items-center rounded-full text-ink-3 hover:bg-raised hover:text-ink">
          <X className="size-4" />
        </button>
      </div>
    )
  return (
    <>
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          const f = e.dataTransfer.files[0]
          if (f) onFile(f)
        }}
        aria-invalid={!!error}
        className={cn(
          "flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-(--radius-field) border border-dashed p-4 text-center transition-[background-color,border-color] duration-(--duration-hover)",
          over ? "border-ember bg-ember/8" : error ? "border-error" : "border-line-3 hover:bg-panel-2",
        )}
      >
        <Upload className={cn("size-5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", over ? "-translate-y-1 text-ember" : "text-ink-3")} />
        <span className="text-[15px] text-ink-2">Drop your CV here, or choose a file</span>
        <span className="type-label text-ink-4">PDF, up to 10 MB</span>
      </button>
      <input
        ref={input}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </>
  )
}

/**
 * Applying, in a side sheet: who you are, where your work lives, which city,
 * your CV and a note. Checked as you go; a sending state; a thank-you with
 * your name and what happens next.
 */
export function ApplySheet({ role, open, onOpenChange }: { role: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const reduced = useReducedMotion()
  const [form, setForm] = useState({ name: "", email: "", link: "", city: "Either" as (typeof CITIES)[number], note: "" })
  const [file, setFile] = useState<File | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useCanvasAction("Application: sent", (next) => {
    const on = next ?? status !== "sent"
    if (on) onOpenChange(true)
    setStatus(on ? "sent" : "idle")
  }, { on: status === "sent", group: "Careers" })

  const fileError = file && (file.size > 10 * 1024 * 1024 ? "That file is over 10 MB." : !/\.pdf$/i.test(file.name) ? "A PDF, please." : "")
  const errors = {
    name: form.name.trim().length < 2 ? "Your name, please." : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "" : "An email we can reply to.",
    link: /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(form.link.trim()) ? "" : "A link to your work — a site, a reel, a folder.",
    file: !file ? "Attach a CV." : fileError || "",
  }
  const valid = Object.values(errors).every((e) => !e)
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))
  const show = (k: keyof typeof errors) => (touched[k] ? errors[k] : "")

  const submit = () => {
    setTouched({ name: true, email: true, link: true, file: true })
    if (!valid) {
      play("tick")
      return
    }
    setStatus("sending")
    play("press")
    timer.current = window.setTimeout(() => {
      setStatus("sent")
      play("open")
    }, 1200)
  }

  const reset = () => {
    setForm({ name: "", email: "", link: "", city: "Either", note: "" })
    setFile(null)
    setTouched({})
    setStatus("idle")
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next && status === "sent") window.setTimeout(reset, 400)
      }}
    >
      <SheetContent showCloseButton={false} className="w-full gap-0 overflow-y-auto p-0 sm:max-w-[560px]" overlayClassName="bg-page/70 backdrop-blur-[2px]">
        <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
          <p className="type-label text-ink-3">Apply · {role}</p>
          <SheetClose className="grid size-11 place-items-center rounded-full text-ink-2 hover:bg-panel-2 hover:text-ink" aria-label="Close">
            <X className="size-5" />
          </SheetClose>
        </div>
        {status === "sent" ? (
          <motion.div
            className="flex flex-col gap-8 px-6 pt-12 pb-8 sm:px-8"
            initial={reduced ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="grid size-14 place-items-center rounded-full bg-ember text-bone-ink">
              <Check className="size-7" strokeWidth={2.5} />
            </span>
            <SheetTitle className="type-head text-h2 text-ink">Thanks, {form.name.trim().split(/\s+/)[0] || "friend"}.</SheetTitle>
            <SheetDescription className="max-w-[42ch] text-lead text-ink-2">
              Your application for {role} is in. A person — not a filter — reads every one, and you'll hear back within ten working days either way.
            </SheetDescription>
            <ol className="flex flex-col gap-3 border-t border-line-2 pt-6 text-[15px] text-ink-2">
              {["A 30-minute chat", "A walk through your work", "A paid make-day with the team", "An answer within a week"].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="type-label pt-0.5 text-ink-4 tabular-nums">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </motion.div>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            className="flex flex-col gap-5 px-6 pt-8 pb-8 sm:px-8"
          >
            <SheetTitle className="type-head text-h3 text-ink">Show us what you make.</SheetTitle>
            <SheetDescription className="-mt-2 text-[16px] text-ink-3">The work matters more than the CV. Both help.</SheetDescription>
            {(
              [
                ["name", "Name", "text", "name"],
                ["email", "Email", "email", "email"],
                ["link", "Portfolio or reel", "url", "url"],
              ] as const
            ).map(([k, label, type, auto]) => (
              <label key={k} className="flex flex-col gap-2">
                <span className="text-[14px] text-ink-2">{label}</span>
                <Input
                  type={type}
                  autoComplete={auto}
                  value={form[k]}
                  placeholder={k === "link" ? "yoursite.com" : undefined}
                  aria-invalid={!!show(k)}
                  onChange={(e) => set(k)(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
                />
                {show(k) && <span className="text-[13px] text-error">{show(k)}</span>}
              </label>
            ))}
            <fieldset>
              <legend className="mb-2 text-[14px] text-ink-2">Which studio?</legend>
              <div role="radiogroup" className="grid grid-cols-3 gap-1 rounded-full bg-panel-2 p-1">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={form.city === c}
                    onClick={() => {
                      set("city")(c)
                      play("tick")
                    }}
                    className={cn(
                      "h-10 rounded-full text-[15px] transition-[background-color,color] duration-(--duration-hover) ease-(--ease-out-strong)",
                      form.city === c ? "bg-bone text-bone-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] text-ink-2">CV</span>
              <CvDrop
                file={file}
                onFile={(f) => {
                  setFile(f)
                  setTouched((t) => ({ ...t, file: true }))
                }}
                error={show("file")}
              />
              {show("file") && <span className="text-[13px] text-error">{show("file")}</span>}
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[14px] text-ink-2">Anything else? (optional)</span>
              <Textarea value={form.note} onChange={(e) => set("note")(e.target.value)} placeholder="The thing you made that you're proudest of, and why." />
            </label>
            <Button type="submit" variant="ember" size="lg" disabled={status === "sending"} className="mt-2">
              {status === "sending" ? (
                <>
                  <Loader2 className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  Send application <ArrowRight />
                </>
              )}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
