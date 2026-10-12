import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { HorizonStripes } from "@/components/motion/horizon-stripes"
import { AerieMark } from "@/components/site/logo"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const COLUMNS = [
  {
    title: "Fly",
    links: [
      { label: "The experience", href: "/experience" },
      { label: "The aircraft", href: "/aircraft" },
      { label: "Routes & cities", href: "/routes" },
      { label: "Book a seat", href: "/experience#book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/routes#story" },
      { label: "Careers", href: "/routes#careers" },
      { label: "Brand guidelines", href: "/brand" },
      { label: "Newsroom", href: "/#news" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Threads", href: "#" },
    ],
  },
]

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** The footer's one form: an underline field that answers in place. */
function UpdatesSignup() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "error" | "done">("idle")
  useCanvasAction("Signup sent", (next) => setState((next ?? state !== "done") ? "done" : "idle"), { on: state === "done", group: "Footer" })
  useCanvasAction("Signup error", (next) => setState((next ?? state !== "error") ? "error" : "idle"), { on: state === "error", group: "Footer" })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setState(EMAIL.test(email.trim()) ? "done" : "error")
  }

  return (
    <div className="w-full max-w-[26rem]">
      <p className="text-lead font-medium">Hear when we land in your city</p>
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="mt-3 flex items-center gap-2 text-body"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-on-sky text-sky">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            You're on the list. One email a launch, never more.
          </motion.p>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="mt-2">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <div
              className={cn(
                "flex items-center border-b transition-colors duration-(--duration-hover)",
                state === "error" ? "border-peach" : "border-on-sky/50 focus-within:border-on-sky",
              )}
            >
              <input
                id="footer-email"
                type="email"
                autoComplete="email"
                value={email}
                aria-invalid={state === "error"}
                aria-describedby="footer-email-hint"
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === "error") setState("idle")
                }}
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 bg-transparent text-body text-on-sky outline-none placeholder:text-on-sky-soft"
              />
              <button
                type="submit"
                aria-label="Sign up"
                className="group flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/12 active:scale-95"
              >
                <ArrowRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5" />
              </button>
            </div>
            <p id="footer-email-hint" className={cn("mt-2 min-h-5 text-micro", state === "error" ? "text-peach" : "text-on-sky-soft")}>
              {state === "error" ? "That address is missing something — check the @ and the domain." : "Launch news only. Unsubscribe in one tap."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * The footer, as the reference closes: the whole sky blue, the small print
 * top left, three short columns, the updates field, the mark set huge — and
 * the horizon stripes sweeping in underneath.
 */
export function SiteFooter() {
  return (
    <footer data-header-tone="light" className="relative overflow-hidden bg-sky text-on-sky">
      <div className="grid gap-12 px-(--spacing-gutter) pt-20 pb-10 md:grid-cols-[1fr_1.4fr] md:pt-24">
        <div className="flex flex-col gap-1 text-micro text-on-sky-soft">
          <p>© {new Date().getFullYear()} Aerie Air Mobility</p>
          <p>Photography from Pexels — see the credits on each page.</p>
          <p>
            Built on the{" "}
            <Link href="/brand" className="link-line text-on-sky">
              Aerie system
            </Link>
            .
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-micro text-on-sky-soft">{column.title}</p>
              <ul className="mt-3 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => link.href === "#" && e.preventDefault()}
                      className="inline-flex min-h-9 items-center text-body transition-opacity duration-(--duration-hover) hover:opacity-70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-12 px-(--spacing-gutter) pb-12 md:flex-row md:items-end">
        <p aria-label="aerie" className="flex items-center gap-[0.12em] text-giga leading-[0.8] font-semibold tracking-[-0.075em]">
          <AerieMark className="size-[0.8em]" />
          aerie
        </p>
        <UpdatesSignup />
      </div>

      <HorizonStripes />
    </footer>
  )
}
