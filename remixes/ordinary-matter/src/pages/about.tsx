import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { SectionTitle } from "@/components/sections/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MASTHEAD, PRINCIPLES, SITE, TIMELINE } from "@/content/site"
import { STORIES } from "@/content/stories"
import { PHOTOGRAPHERS, photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** The opening: why this exists, in one loud sentence, and the numbers that back it. */
function Manifesto() {
  return (
    <section className="px-gutter pt-28 pb-section md:pt-40">
      <Reveal>
        <p className="type-label text-ink-3">About Ordinary Matter</p>
        <h1 className="type-display mt-6 max-w-[15ch] text-display text-ink">
          We make slow books about people who make things.
        </h1>
      </Reveal>
      <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-rule pt-6 md:mt-24 md:grid-cols-4">
        {[
          { n: 3, label: "Volumes in print" },
          { n: STORIES.length * 3 + 2, label: "People visited" },
          { n: 19, label: "Countries" },
          { n: 2019, label: "Since", plain: true },
        ].map((s) => (
          <div key={s.label}>
            <dt className="type-label text-ink-3">{s.label}</dt>
            <dd className="type-display mt-2 text-h1 text-ink">
              {s.plain ? s.n : <CountUp value={s.n} prefix="" decimals={0} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/**
 * Seven years, pinned: the photographs hold still on the left and change
 * with the year the reader has reached on the right (a 380ms cross-dissolve,
 * the same as the home page's portraits).
 */
function Timeline() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])
  useCanvasAction("Timeline: last year", (next) => setActive((next ?? active !== TIMELINE.length - 1) ? TIMELINE.length - 1 : 0), { on: active === TIMELINE.length - 1, group: "About" })

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.5
      let current = 0
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) current = i
      })
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <section className="border-t border-line px-gutter py-section" aria-label="How we got here">
      <SectionTitle title="How we got here" />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-[3.2vw]">
        <div className="hidden md:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-sheet">
            <AnimatePresence initial={false}>
              <motion.img
                key={TIMELINE[active].year}
                src={photo(TIMELINE[active].photo, 1200)}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.77, 0, 0.175, 1] }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <p className="type-label absolute bottom-4 left-4 text-page drop-shadow-sm">{TIMELINE[active].title}</p>
          </div>
        </div>
        <ol>
          {TIMELINE.map((t, i) => (
            <li
              key={t.year}
              ref={(el) => {
                refs.current[i] = el
              }}
              className="border-b border-line py-10 first:pt-0 md:min-h-[62svh] md:py-14"
            >
              <p className={cn("type-display text-mega transition-colors duration-(--duration-swap)", i === active ? "text-ink" : "text-ink-4")}>{t.year}</p>
              <p className="mt-6 font-serif text-h4 text-ink">{t.title}</p>
              <p className="mt-3 max-w-[44ch] font-serif text-[17px] leading-[1.55] text-ink-2">{t.body}</p>
              <img src={photo(t.photo, 900)} alt="" loading="lazy" className="mt-6 aspect-[4/3] w-full object-cover md:hidden" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="bg-stone px-gutter py-section">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[5vw]">
        <Reveal>
          <h2 className="type-display max-w-[10ch] text-h1 text-ink">What we hold to.</h2>
        </Reveal>
        <ol className="grid gap-x-[3vw] gap-y-12 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} as="li" delay={(i % 2) * 0.06} className="border-t border-ink pt-5">
              <p className="font-serif text-ink-2 tabular-nums">0{i + 1}</p>
              <p className="mt-3 font-serif text-h4 text-ink">{p.title}</p>
              <p className="mt-3 font-serif text-[16px] leading-[1.55] text-ink-2">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** The masthead, set the way a magazine sets it — loud names, quiet roles. */
function Masthead() {
  return (
    <section className="px-gutter py-section">
      <SectionTitle title="Masthead" />
      <ul className="mt-4">
        {MASTHEAD.map((m, i) => (
          <Reveal key={m.name} as="li" delay={i * 0.04} className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="type-display text-h2 text-ink sm:text-h1 md:text-display">{m.name}</span>
            <span className="type-label text-ink-3">{m.role}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/** Write to us: copy the address, or suggest someone we should visit. */
function WriteToUs() {
  const [copied, setCopied] = useState(false)
  const [maker, setMaker] = useState("")
  const [where, setWhere] = useState("")
  const [why, setWhy] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()
  useCanvasAction("Suggestion sent", (next) => setSent(next ?? !sent), { on: sent, group: "About" })

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
    } catch {
      /* clipboard blocked: the address is still on screen to select */
    }
    setCopied(true)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!maker.trim() || !why.trim()) {
      setError(!maker.trim() ? "Tell us their name, or what they make." : "A line on why — what makes their work worth a visit?")
      return
    }
    setError("")
    setSent(true)
  }

  return (
    <section className="bg-night px-gutter py-section text-night-fg">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-[5vw]">
        <div className="min-w-0">
          <h2 className="type-display max-w-[11ch] text-display">Write to us.</h2>
          <p className="mt-6 max-w-[40ch] font-serif text-lead text-night-muted">Every story here started with a letter. Ours are answered by hand, usually within the week.</p>
          <button type="button" onClick={copy} className="group mt-10 flex items-center gap-3 text-left">
            <span className="link-draw min-w-0 font-serif text-lead break-all sm:text-h4">{SITE.email}</span>
            <span className="relative grid size-9 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-night-line)]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.6)" }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={{ opacity: 0, transform: "scale(0.6)" }}
                  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="type-label text-night-muted" aria-live="polite">
              {copied ? "Copied" : ""}
            </span>
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col justify-center border-t border-night-line pt-8" role="status">
            <p className="type-display text-h2">Thank you{maker.trim() ? ` — we'll look into ${maker.trim()}` : ""}.</p>
            <p className="mt-4 max-w-[40ch] font-serif text-night-muted">If we visit, you'll be the first to know, and the first to receive the volume they're in.</p>
            <Button
              variant="night"
              className="mt-8 self-start"
              onClick={() => {
                setSent(false)
                setMaker("")
                setWhere("")
                setWhy("")
              }}
            >
              Suggest someone else
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid min-w-0 gap-7 self-center">
            <p className="type-title text-[19px]">Suggest a maker</p>
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="type-label text-night-muted">Who, or what they make</span>
                <Input value={maker} onChange={(e) => setMaker(e.target.value)} aria-invalid={!!error && !maker.trim()} placeholder="A bookbinder in Porto" className="border-night-line text-night-fg placeholder:text-night-muted/60 focus-visible:border-night-fg" />
              </label>
              <label className="block">
                <span className="type-label text-night-muted">Where</span>
                <Input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Optional" className="border-night-line text-night-fg placeholder:text-night-muted/60 focus-visible:border-night-fg" />
              </label>
            </div>
            <label className="block">
              <span className="type-label text-night-muted">Why we should visit</span>
              <textarea
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                rows={3}
                aria-invalid={!!error && !why.trim()}
                className="mt-1 w-full resize-none border-0 border-b border-night-line bg-transparent py-2 font-serif text-[17px] text-night-fg outline-none placeholder:text-night-muted/60 focus-visible:border-night-fg"
                placeholder="She has rebound every book in her village library…"
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" variant="night" size="lg">
                Send the suggestion <ArrowRight />
              </Button>
              <p role="alert" className="text-[14px] text-clay-soft">{error}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

/** Credits: the photographers whose work stands in for ours. */
function Credits() {
  return (
    <section className="border-t border-line py-12" aria-label="Photography credits">
      <p className="type-label px-gutter text-ink-3">Photography via Pexels — with thanks to</p>
      <Marquee speed={70} className="mt-5">
        {PHOTOGRAPHERS.map((p) => (
          <span key={p} className="px-5 font-serif text-h4 whitespace-nowrap text-ink-2 italic">
            {p}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/**
 * `/about`: why we exist (the manifesto) → how we got here (the pinned
 * years) → what we hold to → who we are → how to reach us → who took the
 * photographs.
 */
export function AboutPage() {
  return (
    <>
      <Manifesto />
      <Timeline />
      <Principles />
      <Masthead />
      <WriteToUs />
      <Credits />
    </>
  )
}
