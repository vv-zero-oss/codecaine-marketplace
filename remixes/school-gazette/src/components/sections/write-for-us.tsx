import { useCanvasAction } from "@canvas/react"
import { Send } from "lucide-react"
import { useId, useState } from "react"

import { DomeButton, Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const YEARS = ["7", "8", "9", "10", "11", "12"]
const field =
  "w-full border-2 border-ink bg-paper-bright px-3 py-3 font-type text-[0.95rem] text-ink shadow-[inset_2px_2px_0_rgb(28_27_24/0.12)] placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust min-h-11"

/** A label that sits above its control, typed. */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="kicker text-ink-soft">{label}</span>
      {children}
      {error ? <span role="alert" className="font-type text-[0.74rem] text-rust-deep">{error}</span> : null}
    </div>
  )
}

/**
 * The submissions desk: a typewritten form on index tabs. Year is a row of
 * punch cards, urgency a switch, length a fader, and Send is the big dome key —
 * which slams a RECEIVED stamp onto the card when it works.
 */
export function WriteForUs() {
  const id = useId()
  const [kind, setKind] = useState("story")
  const [year, setYear] = useState("9")
  const [rush, setRush] = useState(false)
  const [words, setWords] = useState([400])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})
  const [sent, setSent] = useState(false)

  useCanvasAction("Submission received", (next) => setSent(next ?? !sent), { group: "Write for us", on: sent })
  useCanvasAction("Show form errors", () => setErrors({ name: "Tell us who you are, so we can credit you.", message: "A pitch needs at least a sentence." }), { group: "Write for us" })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const next = {
      name: name.trim() ? undefined : "Tell us who you are, so we can credit you.",
      message: message.trim().length > 9 ? undefined : "A pitch needs at least a sentence.",
    }
    setErrors(next)
    if (!next.name && !next.message) setSent(true)
  }
  const reset = () => {
    setSent(false)
    setName("")
    setMessage("")
    setErrors({})
  }

  return (
    <section id="write" aria-labelledby="write-title" className="scroll-mt-4 border-t-4 border-double border-ink">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-6" id="write-title">
          <SectionHeading kicker="Submissions" title="Write for the Gazette" deck="A story, a photo or a letter. No experience, no byline fee, no cap on opinions — only a deadline." />
          <ol className="flex max-w-md flex-col gap-3 font-serif text-[1.05rem] leading-snug">
            {["Pitch it on the card. One paragraph is plenty.", "An editor answers within a week, usually with questions.", "Revise, proof, print. You get a copy and your name in the credits."].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-brass font-display text-lg shadow-[0_2px_0_var(--ink)]">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative">
          <Tabs value={kind} onValueChange={setKind}>
            <TabsList aria-label="What are you sending?">
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="photo">Photo</TabsTrigger>
              <TabsTrigger value="letter">Letter</TabsTrigger>
            </TabsList>
            <TabsContent value={kind} forceMount>
              <form
                onSubmit={submit}
                noValidate
                className="paper-card relative flex flex-col gap-5 border-2 border-ink p-5 shadow-card sm:p-7"
              >
                <Field label="Your name" error={errors.name}>
                  <input id={`${id}-name`} aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="e.g. Priya Raman" />
                </Field>
                <Field label="Year">
                  <div role="radiogroup" aria-label="Year" className="flex flex-wrap gap-2">
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        type="button"
                        role="radio"
                        aria-checked={year === y}
                        onClick={() => setYear(y)}
                        className={cn(
                          "grid size-11 touch-manipulation place-items-center border-2 border-ink font-display text-lg transition-[transform,background-color,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-press)] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
                          year === y ? "bg-ink text-paper-light" : "bg-paper-bright hover:bg-paper-light active:scale-95",
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label={kind === "photo" ? "Describe the photo" : kind === "letter" ? "Your letter" : "Your pitch"} error={errors.message}>
                  <textarea
                    aria-label="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(field, "resize-y")}
                    placeholder={kind === "photo" ? "Who, where, when — and what happened just outside the frame?" : kind === "letter" ? "Dear Editor…" : "What happened, why it matters, and who we should talk to."}
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={`Length — ${words[0]} words`}>
                    <Slider value={words} onValueChange={setWords} min={100} max={1000} step={50} aria-label="Length in words" />
                  </Field>
                  <Field label="In a rush?">
                    <label className="flex items-center gap-3 font-type text-[0.8rem]">
                      <Switch checked={rush} onCheckedChange={setRush} aria-label="In a rush" />
                      {rush ? "Next issue, please" : "Whenever suits"}
                    </label>
                  </Field>
                </div>
                <div className="flex items-center justify-between gap-4 border-t-2 border-dashed border-ink pt-5">
                  <p className="font-type text-[0.7rem] text-ink-faint">Desk no. 3 · Room 9 · Wednesdays</p>
                  <div className="flex items-center gap-3">
                    <span className="kicker">Send</span>
                    <DomeButton type="submit" aria-label="Send submission" tone="rust" size="md"><Send /></DomeButton>
                  </div>
                </div>

                {sent ? (
                  <div role="status" className="absolute inset-0 z-10 grid place-items-center bg-paper-light/85 p-6 text-center backdrop-blur-[1px]">
                    <div className="flex flex-col items-center gap-5">
                      <p className="animate-slam border-[6px] border-double border-rust px-6 py-2 font-display text-[clamp(2.4rem,7vw,3.6rem)] leading-none tracking-wide text-rust [text-shadow:0_0_1px_var(--rust)]">Received</p>
                      <p className="max-w-xs text-[1.02rem] leading-snug">Thank you{name ? `, ${name.split(" ")[0]}` : ""}. An editor will write back within a week.</p>
                      <Button variant="paper" onClick={reset}>Send another</Button>
                    </div>
                  </div>
                ) : null}
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  )
}
