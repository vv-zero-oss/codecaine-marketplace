import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { PhotoCredits } from "@/components/blocks/photo"
import type { PhotoName } from "@/lib/photos"
import { VERTIPORTS, vertiport } from "@/content/network"

/** A stable place in the queue for an address: the same email always gets the same number. */
function position(email: string, pad: string) {
  let h = 7
  for (const c of `${email.trim().toLowerCase()}|${pad}`) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return 1200 + (h % 3800)
}

/**
 * The page closes where it opened, on the sky: choose your nearest pad, leave
 * an email, and see your place in that pad's queue.
 */
export function Waitlist({
  title = "Be on the first flight from your roof.",
  credits = [],
}: {
  title?: string
  /** The page's photographs, credited at the foot of the band. */
  credits?: PhotoName[]
}) {
  const [pad, setPad] = useState("harbour")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [joined, setJoined] = useState<number | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Add an email we can reach you at, like you@domain.com.")
    setError(null)
    setJoined(position(email, pad))
  }

  useCanvasAction(
    "Waitlist joined",
    (next) => {
      if (next ?? joined === null) {
        if (!email) setEmail("you@example.com")
        setJoined(position(email || "you@example.com", pad))
      } else setJoined(null)
    },
    { on: joined !== null, group: "Waitlist" },
  )
  useCanvasAction("Waitlist error", (next) => setError((next ?? !error) ? "Add an email we can reach you at, like you@domain.com." : null), {
    on: !!error,
    group: "Waitlist",
  })

  const where = vertiport(pad)
  return (
    <section id="waitlist" data-header-tone="light" className="relative scroll-mt-24 bg-sky py-(--spacing-section) text-on-sky">
      <Container>
        <CornerLabels left="Waitlist — 07" right="No payment, no spam" className="mb-12 text-on-sky-soft" />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <h2 className="type-head text-mega text-balance text-page">{title}</h2>
            <p className="mt-6 max-w-[40ch] text-lead text-on-sky-soft">
              Each pad opens to its own queue first. Tell us which one is yours and we will write when the first seats go on sale.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <AnimatePresence mode="wait" initial={false}>
              {joined === null ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col gap-6"
                >
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 text-micro text-on-sky-soft">Your nearest pad</legend>
                    <ToggleGroup
                      type="single"
                      value={pad}
                      onValueChange={(v) => v && setPad(v)}
                      spacing={2}
                      className="grid w-full grid-cols-2 sm:grid-cols-3"
                    >
                      {VERTIPORTS.map((v) => (
                        <ToggleGroupItem
                          key={v.id}
                          value={v.id}
                          aria-label={v.name}
                          className="flex h-auto min-h-16 w-full flex-col items-start justify-center gap-0.5 rounded-(--radius-card) px-4 py-3 text-left text-page shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)] transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) hover:bg-white/12 hover:text-page active:scale-[0.97] data-[state=on]:bg-page data-[state=on]:text-ink data-[state=on]:shadow-(--shadow-float)"
                        >
                          <span className="font-mono text-[13px]">{v.code}</span>
                          <span className="w-full truncate text-[13px] font-medium opacity-80">{v.name}</span>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </fieldset>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="waitlist-email" className="text-micro text-on-sky-soft">
                      Email
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        id="waitlist-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(null)
                        }}
                        aria-invalid={!!error}
                        aria-describedby="waitlist-error"
                      />
                      <Button type="submit" variant="cream" size="lg" className="shrink-0 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5">
                        Join <ArrowRight />
                      </Button>
                    </div>
                    <p id="waitlist-error" aria-live="polite" className="min-h-[1lh] text-micro text-page">
                      {error}
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-start gap-5 rounded-(--radius-photo) bg-page p-7 text-ink shadow-(--shadow-float) sm:p-9"
                  aria-live="polite"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-sky text-on-sky">
                    <Check className="size-5" />
                  </span>
                  <p className="text-micro text-ink-3">You are on the list for {where.name}</p>
                  <p className="type-head text-display whitespace-nowrap tabular-nums">No. {joined.toLocaleString("en-US")}</p>
                  <p className="max-w-[38ch] text-body text-ink-2">
                    {where.name} opens {where.opens.startsWith("20") ? `in ${where.opens}` : `in ${where.opens.toLowerCase()}`}. We will write to{" "}
                    <span className="font-medium">{email.trim()}</span> before the first seats go on sale — once, not weekly.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setJoined(null)}>
                    Change pad or email
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
        {credits.length > 0 && <PhotoCredits names={credits} className="mt-24 text-on-sky-soft [&_a]:text-page" />}
      </Container>
    </section>
  )
}
