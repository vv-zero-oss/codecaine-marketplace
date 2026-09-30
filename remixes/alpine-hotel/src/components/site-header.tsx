import { useState } from "react"
import { motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react"
import { Menu } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { EASE_OUT, useScrollTo } from "@/components/motion/smooth-scroll"
import { hotel, nav } from "@/content"

/**
 * Two white pills that start overlapped in the middle of the page and part to
 * either edge once the hero headline starts to leave — the wordmark to the
 * left, the booking button to the right. The move is a 220ms ease-out layout
 * transition, the length measured off the recording.
 */
export function SiteHeader({ splitAt = 80, cta = "Book a stay" }: { splitAt?: number; cta?: string }) {
  const { scrollY } = useScroll()
  const [split, setSplit] = useState(false)
  const [menu, setMenu] = useState(false)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()

  useMotionValueEvent(scrollY, "change", (y) => setSplit(y > splitAt))
  useCanvasAction("Header split", (next) => setSplit(next ?? !split), { on: split, group: "Header" })
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  const go = (href: string) => {
    setMenu(false)
    scrollTo(href)
  }
  const transition = reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }

  return (
    <>
      {/* Whatever scrolls up under the pills goes soft, as it does in the recording. */}
      <div aria-hidden className="top-blur pointer-events-none fixed inset-x-0 top-0 z-40 h-20 bg-snow/0" />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Main"
          className={split ? "flex items-center justify-between" : "flex items-center justify-center"}
        >
          <motion.a
            layout
            transition={transition}
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              go("#top")
            }}
            className="relative z-10 flex h-12 items-center rounded-pill bg-snow pr-6 pl-5 text-ink shadow-(--shadow-pill)"
            aria-label={`${hotel.full}, back to top`}
          >
            <Wordmark />
          </motion.a>
          <motion.div
            layout
            transition={transition}
            className={
              "relative z-20 flex h-12 items-center gap-1 rounded-pill bg-snow p-1 shadow-(--shadow-pill) " +
              (split ? "" : "-ml-3")
            }
          >
            <ul className="hidden items-center lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.href)
                    }}
                    className="rounded-pill px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-ice hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Sheet open={menu} onOpenChange={setMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm border-none bg-pine text-snow">
                <SheetHeader>
                  <SheetTitle className="text-snow">
                    <Wordmark />
                  </SheetTitle>
                </SheetHeader>
                <ul className="flex flex-col gap-1 px-4">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          go(item.href)
                        }}
                        className="font-headline flex min-h-12 items-center text-3xl"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 p-4">
                  <Button size="lg" onClick={() => go("#book")}>
                    {cta}
                  </Button>
                  <p className="text-sm text-snow/60">
                    {hotel.phone} · {hotel.email}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" className="h-10 px-5" onClick={() => go("#book")}>
              {cta}
            </Button>
          </motion.div>
        </nav>
      </header>
    </>
  )
}
