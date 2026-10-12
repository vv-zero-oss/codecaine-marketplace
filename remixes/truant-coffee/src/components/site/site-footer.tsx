import { useEffect, useState } from "react"
import { ArrowRight, ArrowUp, Check } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Marquee } from "@/components/motion/marquee"
import { scrollToY } from "@/components/motion/smooth-scroll"
import { TruantMark } from "@/components/site/logo"
import { SocialIcon } from "@/components/site/social-icon"
import { Container } from "@/components/ui/container"
import { PLACES, SERIES } from "@/content/coffees"
import { photo, type PHOTO } from "@/lib/photos"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const SITE = [
  { label: "Shop", href: "/shop" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Field notes", href: "/field-notes" },
  { label: "Producers", href: "/field-notes#producers" },
  { label: "Brand guidelines", href: "/brand" },
  { label: "Contact", href: "mailto:hello@truant.coffee" },
]

const FRAMES: { key: keyof typeof PHOTO; alt: string }[] = [
  { key: "boat", alt: "Two friends in sun hats paddling a small boat" },
  { key: "doorway", alt: "Two skaters sharing a coffee in a concrete doorway" },
  { key: "moka", alt: "A moka pot and two mugs on a camp table by a lake" },
]

/** The footer's photograph: three moments, crossfading every 3.2s. Held on
 *  the first while the page is being designed. */
function FooterReel({ interval = 3.2, className }: { interval?: number; className?: string }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  useEffect(() => {
    if (reduced || designing) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % FRAMES.length), interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, reduced, designing])
  return (
    <div className={cn("relative aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-[var(--radius-tag)] bg-night-2", className)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={photo(FRAMES[index].key, 520, 390)}
          alt={FRAMES[index].alt}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

/** The newsletter line: validates as you go and says thanks in place. */
function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "error" | "done">("idle")
  useCanvasAction("Newsletter: subscribed", (next) => setState((next ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Footer" })
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "done" : "error")
      }}
      className="w-full max-w-[300px]"
    >
      <label htmlFor="footer-email" className="text-[13px] text-night-fg">
        Roast-day emails, twice a month
      </label>
      <div className={cn("mt-3 flex items-center border-b transition-colors", state === "error" ? "border-tomato shake" : "border-night-fg/40 focus-within:border-night-fg")}>
        {state === "done" ? (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex h-11 items-center gap-2 text-[13px] text-night-fg">
            <Check className="size-4 text-recess" /> You're on the list. See you Tuesday.
          </motion.p>
        ) : (
          <>
            <input
              id="footer-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (state === "error") setState("idle")
              }}
              className="h-11 min-w-0 flex-1 bg-transparent text-[13px] text-night-fg outline-none placeholder:text-night-muted"
            />
            <button type="submit" aria-label="Subscribe" className="grid size-11 place-items-center text-night-fg transition-transform hover:translate-x-1">
              <ArrowRight className="size-4" />
            </button>
          </>
        )}
      </div>
    </form>
  )
}

/**
 * The footer, at night: the site, the series, the roastery, the newsletter,
 * a photograph that keeps changing, and the closing question set huge —
 * then a bar with the way back to the top.
 */
export function SiteFooter() {
  const toTop = () => scrollToY(0)
  return (
    <footer className="relative bg-night text-night-fg lg:pr-[var(--spacing-rail)]">
      <Container className="pt-16 pb-6 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-10">
            <TruantMark className="h-7" />
            <NewsletterForm />
            <FooterReel />
          </div>
          <div className="grid grid-cols-2 gap-8 text-[13px] leading-[1.75]">
            <ul>
              {SITE.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-night-fg/90 transition-colors hover:text-recess">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="type-eyebrow text-night-muted">Our series</p>
              <ul className="mt-2">
                {SERIES.map((s) => (
                  <li key={s.id}>
                    <Link href={`/shop?series=${s.id}`} className="text-night-fg/90 transition-colors hover:text-recess">
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-[13px] leading-[1.6]">
            <p className="type-eyebrow text-night-muted">Roastery bar</p>
            <p className="mt-2">
              {PLACES[0].address}
              <br />
              {PLACES[0].hours}
            </p>
            <p className="mt-6 max-w-[34ch] text-night-muted">
              Photography from{" "}
              <a href="https://www.pexels.com" className="underline decoration-night-line underline-offset-4 hover:text-night-fg">
                Pexels
              </a>
              . Truant is a fictional roaster in a template — the coffee, sadly, is too.
            </p>
          </div>
        </div>

        <div className="mt-16 grid items-end gap-10 md:grid-cols-2">
          <div className="flex items-center gap-5">
            <p className="type-display text-d3">Follow along</p>
            <div className="flex gap-2">
              {(["instagram", "spotify", "strava"] as const).map((n) => (
                <a key={n} href={`https://www.${n}.com`} target="_blank" rel="noreferrer" aria-label={n} className="grid size-11 place-items-center rounded-full bg-night-fg text-night transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white">
                  <SocialIcon name={n} />
                </a>
              ))}
            </div>
          </div>
          <p className="type-display text-d3 md:text-right">And you? Where do you skip to?</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-[var(--radius-card)] px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-night-line)] md:flex-row md:justify-between">
          <p className="text-[12px] text-night-muted">© 2026 Truant Coffee Co.</p>
          <button type="button" onClick={toTop} className="group order-first w-full max-w-[420px] md:order-none" aria-label="Back to the top">
            <Marquee speed={18} className="type-display text-[16px] text-night-fg">
              {[0, 1, 2].map((i) => (
                <span key={i} className="flex items-center gap-3 px-3 pt-0.5">
                  <ArrowUp className="size-3.5 motion-safe:animate-nudge-up" /> <ArrowUp className="size-3.5 motion-safe:animate-nudge-up" />
                  <span className="transition-colors group-hover:text-recess">Skip back to the top</span>
                  <ArrowUp className="size-3.5 motion-safe:animate-nudge-up" /> <ArrowUp className="size-3.5 motion-safe:animate-nudge-up" />
                </span>
              ))}
            </Marquee>
          </button>
          <Link href="/brand" className="text-[12px] text-night-muted underline-offset-4 hover:text-night-fg hover:underline">
            Brand guidelines
          </Link>
        </div>
      </Container>
    </footer>
  )
}
