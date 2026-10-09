import { useState } from "react"
import { ArrowRight, Check, LoaderCircle } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent"
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * The postcard the visitor addresses to themselves: what they type is
 * written onto the card as they type it, and sending it lands a postmark.
 * A working form — validation, a sending state, a sent state.
 */
export function Postcard({ name, email, posted }: { name: string; email: string; posted: boolean }) {
  const reduced = useReducedMotion()
  return (
    <div className="@container relative aspect-[3/2] w-full -rotate-[1.5deg] bg-raised text-ink shadow-(--shadow-float)">
      <div className="absolute inset-[5cqw] grid grid-cols-2 gap-[5cqw]">
        <div className="flex flex-col border-r border-line pr-[5cqw]">
          <p className="font-sans text-[2.2cqw] tracking-[0.14em] text-ink-3 uppercase">Letters from the field</p>
          <p className="mt-[3cqw] font-serif text-[3.8cqw] leading-[1.4] italic">
            Dear {name.trim() || "reader"},
            <br />
            the weaver has finished the blanket, the shaper has a new board, and the fig tree in the courtyard is heavy again.
          </p>
          <p className="mt-auto font-serif text-[3.4cqw] italic">— O.M.</p>
        </div>
        <div className="relative flex flex-col">
          <div className="ml-auto grid size-[16cqw] place-items-center border border-dashed border-ink/30 bg-moss font-serif text-[6cqw] text-page">O</div>
          <div className="mt-auto space-y-[3.4cqw] pb-[2cqw]">
            {[name.trim() || " ", email.trim() || " ", "Anywhere, by post"].map((line, i) => (
              <p key={i} className="truncate border-b border-ink/25 pb-[0.6cqw] font-serif text-[3.6cqw] leading-none italic">
                {line}
              </p>
            ))}
          </div>
          <AnimatePresence>
            {posted && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "rotate(-18deg) scale(1.4)" }}
                animate={{ opacity: 0.9, transform: "rotate(-12deg) scale(1)" }}
                transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}
                className="absolute top-[2cqw] right-[10cqw] grid size-[22cqw] place-items-center rounded-full border-[0.5cqw] border-clay text-center text-clay"
              >
                <span className="font-sans text-[2.4cqw] leading-tight font-medium tracking-[0.1em] uppercase">
                  Posted
                  <br />
                  {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/** "Letters from the field" — the newsletter, as a night band. */
export function LettersSignup({
  id = "letters",
  title = "Letters from the field.",
  body = "Four times a year, a letter from wherever we've just been: what the makers in these pages are working on, and who we're visiting next.",
}: {
  id?: string
  title?: string
  body?: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  useCanvasAction("Letter sent", (next) => setStatus((next ?? status !== "sent") ? "sent" : "idle"), { on: status === "sent", group: "Letters" })
  useCanvasAction("Letter error", (next) => setError((next ?? !error) ? "That address is missing its @." : ""), { on: !!error, group: "Letters" })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) {
      setError(email.trim() ? "That address doesn't look complete — check the part after the @." : "Add an email address so the letter has somewhere to go.")
      return
    }
    setError("")
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 900)
  }

  return (
    <section id={id} className="bg-night px-gutter py-section text-night-fg">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-[5vw]">
        <div>
          <h2 className="type-display max-w-[11ch] text-display">{title}</h2>
          <p className="mt-6 max-w-[44ch] font-serif text-lead text-night-muted">{body}</p>
          {status === "sent" ? (
            <div className="mt-10 flex items-start gap-3 border-t border-night-line pt-6" role="status">
              <Check className="mt-1 size-5 shrink-0" />
              <p className="font-serif text-lead">
                Posted{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}. The next letter leaves on the first of the month.
                <button type="button" onClick={() => setStatus("idle")} className="link-draw ml-2 text-night-muted">
                  Use another address
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-10 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="type-label text-night-muted">Your name</span>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Optional"
                  className="border-night-line text-night-fg placeholder:text-night-muted/60 focus-visible:border-night-fg"
                />
              </label>
              <label className="block">
                <span className="type-label text-night-muted">Email</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!error}
                  aria-describedby="letters-error"
                  placeholder="you@example.com"
                  className="border-night-line text-night-fg placeholder:text-night-muted/60 focus-visible:border-night-fg"
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Button type="submit" variant="night" size="lg" disabled={status === "sending"} className="min-w-[13rem]">
                  {status === "sending" ? <LoaderCircle className="animate-spin" /> : null}
                  {status === "sending" ? "Posting…" : "Send me the letters"}
                  {status === "idle" && <ArrowRight />}
                </Button>
                <p id="letters-error" role="alert" className={cn("text-[14px] text-clay-soft transition-opacity", error ? "opacity-100" : "opacity-0")}>
                  {error || " "}
                </p>
              </div>
            </form>
          )}
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <Postcard name={name} email={email} posted={status === "sent"} />
        </div>
      </div>
    </section>
  )
}
