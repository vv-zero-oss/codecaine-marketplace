import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mark } from "@/components/ui/mark"
import { EASE_SWAP } from "@/lib/motion"

/**
 * After the film: the one ask, on the same ruled paper, and the small print.
 */
export function Access() {
  const [sent, setSent] = useState(false)
  return (
    <section id="access" aria-labelledby="access-title" className="bg-ruled relative flex min-h-svh flex-col items-center justify-center px-4 pt-24 pb-10">
      <h2 id="access-title" className="caption text-center text-[clamp(30px,4.4vw,72px)] text-ink">
        get early access
      </h2>
      <p className="mt-4 max-w-[44ch] text-center text-[clamp(15px,1.2vw,18px)] leading-snug text-ink-muted">
        Codecaine is a desktop app for macOS. Bring your running project, your own AI, and start designing on the real thing.
      </p>
      <form
        className="mt-10 flex h-[54px] w-[min(440px,100%)] items-center rounded-pill bg-surface p-1 shadow-window"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
      >
        <label htmlFor="access-email" className="sr-only">
          Work email
        </label>
        <Input
          id="access-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-full flex-1 border-0 bg-transparent pl-4 text-base shadow-none placeholder:text-ink-faint focus-visible:ring-0 md:text-base"
        />
        <Button type="submit" className="h-[46px] min-w-[150px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={sent ? "sent" : "ask"}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: EASE_SWAP }}
            >
              {sent ? (
                <>
                  <Check className="size-4" /> You're on the list
                </>
              ) : (
                <>
                  Request access <ArrowRight className="size-4" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </form>
      <footer className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-[13px] text-ink-muted sm:px-10">
        <span className="flex items-center gap-2">
          <Mark className="size-4 text-ink" /> © 2026 Codecaine
        </span>
        <nav aria-label="Footer" className="flex items-center gap-6">
          {["Docs", "Changelog", "GitHub"].map((l) => (
            <a key={l} href="#" className="inline-flex min-h-11 items-center transition-colors hover:text-ink sm:min-h-0">
              {l}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </footer>
    </section>
  )
}
