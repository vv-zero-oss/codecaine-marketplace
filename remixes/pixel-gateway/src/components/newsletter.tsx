import { Check } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

/** The footer's changelog sign-up: an email field that answers with a thank-you. */
export function Newsletter() {
  const [done, setDone] = useState(false)
  return done ? (
    <p className="flex items-center gap-2 text-lg text-good" role="status"><Check className="size-4" strokeWidth={4} /> You are on the list.</p>
  ) : (
    <form className="flex max-w-sm flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
      <label className="sr-only" htmlFor="news-email">Email</label>
      <input id="news-email" type="email" required placeholder="you@company.com" className="h-11 min-w-0 flex-1 bg-bg px-3 text-lg shadow-px-sm [--px-edge:var(--color-line-strong)] outline-none placeholder:text-fg-subtle focus:[--px-edge:var(--color-accent)]" />
      <Button type="submit" variant="outline">Join</Button>
    </form>
  )
}
