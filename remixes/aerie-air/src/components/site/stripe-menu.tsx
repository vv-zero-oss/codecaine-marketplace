import { useEffect, useRef } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { NAV } from "@/components/site/site-header"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** The bands that wipe down before the menu, top colour last. */
const BANDS = ["bg-peach", "bg-ember", "bg-navy", "bg-sky"] as const

const SOCIAL = ["Instagram", "LinkedIn", "YouTube", "Threads"]
const SMALL = ["Privacy", "Terms of carriage", "Accessibility", "Safety reports", "Press kit"]

/**
 * The site menu: four horizon stripes — peach, ember, navy, sky — wipe down
 * one after the other (60ms apart, 520ms each, a strong ease-out), and the
 * links rise in on the last one. Closing runs it backwards. Measured off the
 * reference at 60fps.
 *
 * Not a Radix dialog: the header's toggle stays above it and must stay
 * clickable to close it. Escape closes, focus moves in and back, and the
 * page under it stops scrolling.
 */
export function StripeMenu({
  open,
  onOpenChange,
  stagger = 0.06,
  duration = 0.52,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Seconds between one band and the next. */
  stagger?: number
  duration?: number
}) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const first = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false)
    document.addEventListener("keydown", onKey)
    document.documentElement.style.overflow = "hidden"
    const focus = window.setTimeout(() => first.current?.focus({ preventScroll: true }), still ? 0 : 380)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
      window.clearTimeout(focus)
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, onOpenChange, still])

  const ease = [0.23, 1, 0.32, 1] as const
  const last = BANDS.length - 1

  return (
    <AnimatePresence>
      {open && (
        <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-55">
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-dusk/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: still ? 0 : 0.4 }}
          />
          <div className="absolute inset-x-0 top-0 h-svh md:h-[min(78svh,760px)]">
            {BANDS.map((band, i) => (
              <motion.div
                key={band}
                aria-hidden
                className={cn("absolute inset-0", band)}
                initial={{ y: still ? "0%" : "-100%" }}
                animate={{ y: "0%", transition: { duration: still ? 0 : duration, ease, delay: still ? 0 : i * stagger } }}
                exit={{ y: "-100%", transition: { duration: still ? 0 : duration * 0.85, ease: [0.77, 0, 0.175, 1], delay: still ? 0 : (last - i) * stagger } }}
              />
            ))}
            <motion.nav
              aria-label="Site"
              className="relative grid h-full grid-cols-1 content-between gap-10 px-(--spacing-gutter) pt-24 pb-8 text-on-sky md:grid-cols-[1fr_2fr] md:content-start md:pt-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: still ? 0 : last * stagger + duration * 0.45 } }}
              exit={{ opacity: 0, transition: { duration: still ? 0 : 0.16 } }}
            >
              <ul className="order-2 flex flex-col gap-1 text-micro md:order-1">
                <li className="mb-2 text-on-sky-soft">Follow the flight</li>
                {SOCIAL.map((s) => (
                  <li key={s}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="link-line [background-size:0%_1px] hover:[background-size:100%_1px]">
                      {s}
                    </a>
                  </li>
                ))}
                <li className="mt-6 mb-2 text-on-sky-soft">The small print</li>
                {SMALL.map((s) => (
                  <li key={s}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="opacity-85 hover:opacity-100">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
              <ol className="order-1 flex flex-col md:order-2">
                {NAV.map((item, i) => {
                  const on = pathname === item.href
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: still ? 0 : 18 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: still ? 0 : 0.6, ease, delay: still ? 0 : last * stagger + duration * 0.5 + i * 0.05 } }}
                    >
                      <Link
                        ref={i === 0 ? first : undefined}
                        href={item.href}
                        aria-current={on ? "page" : undefined}
                        onClick={() => onOpenChange(false)}
                        className="group flex items-baseline gap-4 py-1 text-display font-medium tracking-[-0.04em] outline-none md:text-[clamp(41.89px,3.4vw,67.77px)] md:leading-[1.08]"
                      >
                        <span className="w-7 font-mono text-micro tracking-normal text-on-sky-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="relative transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:translate-x-2 group-focus-visible:translate-x-2">
                          {item.label}
                          <span
                            aria-hidden
                            className={cn(
                              "absolute top-1/2 -right-6 size-2 -translate-y-1/2 rounded-full bg-on-sky transition-[opacity,transform] duration-(--duration-swap)",
                              on ? "scale-100 opacity-100" : "scale-0 opacity-0",
                            )}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ol>
            </motion.nav>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
