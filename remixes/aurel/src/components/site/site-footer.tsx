import { ArrowRight, Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState, type FormEvent } from "react"

import { useCanvasAction } from "@canvas/react"
import { Wordmark } from "@/components/ui/wordmark"
import { brand, legal, nav, social } from "@/content"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

/**
 * The footer, which the page lifts off like a curtain.
 *
 * On a large screen tall enough to hold all of it, it sits pinned under the content (`sticky bottom-0`,
 * behind the paper), so the last section slides up and uncovers it rather
 * than the footer scrolling in. The wordmark runs the full width.
 */
export function SiteFooter() {
  const [joined, setJoined] = useState(false)
  // The curtain only works when the whole footer fits on the screen; a
  // taller one scrolls in the ordinary way.
  const ref = useRef<HTMLElement>(null)
  const [curtain, setCurtain] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const check = () => setCurtain(window.innerWidth >= 1024 && element.offsetHeight <= window.innerHeight)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(element)
    window.addEventListener("resize", check)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", check)
    }
  }, [])
  useCanvasAction("Newsletter joined", (next) => setJoined(next ?? !joined), { on: joined, group: "Site" })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setJoined(true)
  }

  return (
    <footer ref={ref} className={cn("relative z-0 border-t border-ink/15 bg-paper px-gutter pt-10 pb-6 lg:pt-12", curtain && "sticky bottom-0")}>
      <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
        <nav aria-label="Footer" className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit py-1 font-sans text-[16px] tracking-[0.01em] text-ink hover:text-ink-muted">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 md:items-end md:justify-end">
          {social.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="w-fit py-1 font-sans text-[16px] text-ink-muted hover:text-ink">
              {item.label} ↗
            </a>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="mt-10 max-w-[360px]">
        <label htmlFor="footer-email" className="font-sans text-[13px] uppercase tracking-[0.06em] text-ink">
          Letters from the house
        </label>
        <div className="relative mt-3 flex items-center border-b border-ink">
          <AnimatePresence mode="wait" initial={false}>
            {joined ? (
              <motion.p key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex h-11 items-center gap-2 font-sans text-[16px] text-ink">
                <Check className="size-4" /> You are on the list.
              </motion.p>
            ) : (
              <motion.div key="field" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -6 }} className="flex w-full items-center">
                <input id="footer-email" type="email" required placeholder="Email address" className="h-11 w-full bg-transparent font-sans text-[16px] text-ink placeholder:text-ink-muted focus:outline-none" />
                <button type="submit" aria-label="Subscribe" className="grid size-11 place-items-center text-ink transition-transform duration-(--duration-hover) hover:translate-x-1">
                  <ArrowRight className="size-5" strokeWidth={1.25} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
      <Link href="/" aria-label="Aurel, home" className="mt-10 block overflow-hidden lg:mt-14">
        <Wordmark className="block text-center text-[35vw] leading-[0.74] tracking-[0.01em]" />
      </Link>
      <div className="mt-8 flex flex-col gap-4 font-sans text-[14px] text-ink-muted md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {legal.map((item) => (
            <Link key={item.label} href={item.href} className="py-1 hover:text-ink">
              {item.label} ↗
            </Link>
          ))}
        </div>
        <p>
          © 2026 {brand.name}, {brand.city} · Photographs from{" "}
          <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink">
            Pexels
          </a>
        </p>
      </div>
    </footer>
  )
}
