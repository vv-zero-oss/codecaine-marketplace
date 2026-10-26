import { useCanvasAction } from "@canvas/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"
import { useState, type FormEvent } from "react"

import { CanvasSwitch } from "@/components/canvas-switch"
import { LayoutItem } from "@/components/motion/layout-item"
import { Reveal } from "@/components/motion/reveal"
import { BlurWords } from "@/components/motion/blur-words"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FieldError, Input } from "@/components/ui/input"
import { Tag } from "@/components/ui/tag"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ARTICLES, JOURNAL_TOPICS } from "@/content"

type Article = (typeof ARTICLES)[number]

function Byline({ author, date, read }: Pick<Article, "author" | "date" | "read">) {
  return (
    <p className="text-[11px] text-fg-subtle">
      <span className="text-fg-muted">{author}</span> · {date} · {read}
    </p>
  )
}

export function ArticleCard({ title, dek, topic, author, date, read, image, alt }: Article) {
  return (
    <a href="#journal" className="group flex flex-col gap-4 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg">
      <div className="relative isolate aspect-[4/3] overflow-hidden rounded-card bg-surface-raised shadow-card">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-ink/50 to-transparent" />
        <Tag className="absolute top-3 left-3">{topic}</Tag>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-snug font-medium tracking-[-0.02em] underline-offset-4 group-hover:underline group-hover:decoration-fg/40">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-fg-muted">{dek}</p>
        <Byline author={author} date={date} read={read} />
      </div>
    </a>
  )
}

/** The newest essay, given the width of the page. */
export function FeaturedArticle({ title, dek, topic, author, date, read, image, alt }: Article) {
  return (
    <Reveal>
      <a
        href="#journal"
        className="group grid overflow-hidden rounded-card border border-line bg-surface shadow-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg md:grid-cols-[1.25fr_1fr]"
      >
        <div className="relative isolate aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[420px]">
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Tag>{topic}</Tag>
              <Tag>Latest</Tag>
            </div>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.035em]">{title}</h2>
            <p className="text-[15px] leading-relaxed text-fg-muted">{dek}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Byline author={author} date={date} read={read} />
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium">
              Read
              <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 ease-soft group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

/** Every other piece, filtered by topic. Each topic is an editor switch. */
export function JournalGrid() {
  const [topic, setTopic] = useState<(typeof JOURNAL_TOPICS)[number]>("All")
  const [featured, ...rest] = ARTICLES
  const shown = rest.filter((a) => topic === "All" || a.topic === topic)

  return (
    <section id="journal" className="bg-ink pt-16 pb-20 sm:pt-[10vh] sm:pb-[14vh]">
      <Container>
        <FeaturedArticle {...featured} />
        <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-medium tracking-[-0.03em]">More from the Journal</h2>
          <ToggleGroup type="single" value={topic} onValueChange={(v) => v && setTopic(v as typeof topic)} aria-label="Filter by topic">
            {JOURNAL_TOPICS.map((t) => (
              <ToggleGroupItem key={t} value={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {JOURNAL_TOPICS.map((t) => (
            <CanvasSwitch key={t} label={`Show ${t}`} group="Journal" on={topic === t} set={(on) => setTopic(on ? t : "All")} />
          ))}
        </div>
        <div className="mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((article) => (
              <LayoutItem key={article.title}>
                <ArticleCard {...article} />
              </LayoutItem>
            ))}
          </AnimatePresence>
          {shown.length === 0 && (
            <p className="col-span-full rounded-card border border-dashed border-line py-16 text-center text-sm text-fg-muted">
              Nothing under {topic} yet. The next letter goes out in December.
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

/** The letter, by email. Validates, pretends to send for a beat, then thanks
 *  the reader by the address they gave. */
export function Newsletter() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done">("idle")
  const reduce = useReducedMotion()
  useCanvasAction("Newsletter subscribed", (on) => setState((on ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Journal" })
  useCanvasAction("Newsletter error", (on) => setError((on ?? !error) ? "Enter an email address, like you@studio.com." : ""), { on: !!error, group: "Journal" })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter an email address, like you@studio.com.")
    setError("")
    setState("sending")
    window.setTimeout(() => setState("done"), 900)
  }

  return (
    <section className="border-t border-line bg-ink py-24 sm:py-[16vh]">
      <Container className="flex flex-col items-center gap-6 text-center">
        <BlurWords
          before="One letter a"
          accent="season."
          className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]"
        />
        <Reveal delay={0.2}>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
            What we backed, what we passed on and why, written by the partners. Four times a year, never sold, never shared.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="w-full max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            {state === "done" ? (
              <motion.p
                key="done"
                role="status"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-12 items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 text-sm"
              >
                <Check aria-hidden className="size-4 text-success" />
                You're on the list{email ? `, ${email.split("@")[0]}` : ""}. The next letter is due in December.
              </motion.p>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="rounded-pill sm:h-11"
                  />
                  <Button type="submit" size="lg" disabled={state === "sending"} className="shrink-0 sm:h-11">
                    {state === "sending" ? "Subscribing…" : "Subscribe"}
                  </Button>
                </div>
                <FieldError id="newsletter-error">{error}</FieldError>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  )
}
