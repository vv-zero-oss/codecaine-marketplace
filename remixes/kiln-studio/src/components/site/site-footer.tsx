import { useState } from "react"
import { ArrowUp, ArrowUpRight, Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { scrollToY } from "@/components/motion/smooth-scroll"
import { Wordmark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CAREERS_EMAIL, EMAIL, STUDIOS } from "@/data/studio"
import { useClock } from "@/lib/clock"
import { Link } from "@/lib/router"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

function FooterStudio({ city, country, address, timeZone }: { city: string; country: string; address: string; timeZone: string }) {
  const { time } = useClock(timeZone)
  return (
    <div>
      <p className="flex items-baseline justify-between gap-4 text-[17px] font-medium tracking-[-0.02em] text-ink">
        {city}, {country}
        <span className="type-label text-ink-3 tabular-nums">{time}</span>
      </p>
      <p className="mt-1 text-[15px] text-ink-3">{address}</p>
    </div>
  )
}

/** The newsletter: one field, checked as you type, and a real "you're in". */
function Dispatch() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [done, setDone] = useState(false)
  useCanvasAction("Newsletter: subscribed", (next) => setDone(next ?? !done), { on: done, group: "Footer" })
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const error = touched && !valid ? "That doesn't look like an email yet." : ""

  if (done)
    return (
      <p className="flex items-center gap-3 text-[16px] text-ink" role="status">
        <span className="grid size-7 place-items-center rounded-full bg-ember text-bone-ink">
          <Check className="size-4" strokeWidth={2.5} />
        </span>
        You're on the list. One letter a month, from the kiln.
      </p>
    )

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
        if (!valid) return
        play("press")
        setDone(true)
      }}
    >
      <label htmlFor="dispatch" className="text-[15px] text-ink-2">
        The Dispatch — what we're making, monthly.
      </label>
      <div className="mt-3 flex gap-2">
        <Input
          id="dispatch"
          type="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          aria-invalid={!!error}
          aria-describedby={error ? "dispatch-error" : undefined}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => email && setTouched(true)}
          className="rounded-full"
        />
        <Button type="submit" className="h-12 shrink-0">
          Subscribe
        </Button>
      </div>
      {error && (
        <p id="dispatch-error" className="mt-2 text-[13px] text-error">
          {error}
        </p>
      )}
    </form>
  )
}

const ELSEWHERE = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Vimeo", href: "https://vimeo.com/" },
  { label: "Are.na", href: "https://www.are.na/" },
]

/**
 * The footer: the two studios with their clocks, how to reach us, the
 * newsletter, and the name set as large as the window allows.
 */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("relative overflow-hidden border-t border-line px-(--spacing-gutter) pt-20 pb-36 sm:pb-32", className)}>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_1.4fr]">
        <div className="flex flex-col gap-6">
          <p className="type-label text-ink-4">Studios</p>
          {STUDIOS.map((s) => (
            <FooterStudio key={s.city} {...s} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="type-label mb-3 text-ink-4">Say hello</p>
          {[
            ["New work", EMAIL],
            ["Join us", CAREERS_EMAIL],
          ].map(([label, mail]) => (
            <a key={mail} href={`mailto:${mail}`} className="group/mail w-fit">
              <span className="block text-[14px] text-ink-3">{label}</span>
              <span className="text-[17px] tracking-[-0.02em] text-ink underline decoration-line-3 underline-offset-4 transition-[text-decoration-color] duration-(--duration-hover) group-hover/mail:decoration-ember">
                {mail}
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="type-label mb-3 text-ink-4">Elsewhere</p>
          {ELSEWHERE.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group/out flex w-fit items-center gap-1 text-[17px] tracking-[-0.02em] text-ink-2 transition-colors duration-(--duration-hover) hover:text-ink">
              {l.label}
              <ArrowUpRight className="size-4 text-ink-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/out:translate-x-0.5 group-hover/out:-translate-y-0.5 group-hover/out:text-ember" />
            </a>
          ))}
        </div>
        <Dispatch />
      </div>

      <Wordmark className="mt-24 block text-giga leading-[0.78] text-ink select-none md:mt-32" />

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-[14px] text-ink-3 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Kiln Studio Lda. Made in two cities.</p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/brand" className="transition-colors duration-(--duration-hover) hover:text-ink">
            Brand guidelines
          </Link>
          <span>
            Photography from{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline decoration-line-3 underline-offset-4 hover:text-ink">
              Pexels
            </a>
          </span>
          <button
            type="button"
            onClick={() => scrollToY(0)}
            className="group/top inline-flex items-center gap-1.5 transition-colors duration-(--duration-hover) hover:text-ink"
          >
            Back to top <ArrowUp className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/top:-translate-y-0.5" />
          </button>
        </p>
      </div>
    </footer>
  )
}
