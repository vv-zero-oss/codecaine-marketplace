import { useEffect, useState } from "react"
import { ArrowUpRight, Menu as MenuIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Monogram, Wordmark } from "@/components/site/logo"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV } from "@/content/site"
import { useBag } from "@/lib/bag"
import { Link, navigate, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** "/#volume" style links: change page, then find the anchor. */
function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("/") || event.metaKey || event.ctrlKey) return
  event.preventDefault()
  const [path, hash] = href.split("#")
  navigate(path || "/")
  if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 60)
}

/** The bag count, which nudges up when something goes in. */
function BagButton({ light }: { light: boolean }) {
  const { count, pulse, setOpen } = useBag()
  const reduced = useReducedMotion()
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn("type-title inline-flex h-11 items-center gap-1.5 text-[15px] transition-colors duration-(--duration-hover)", light ? "text-page" : "text-ink")}
    >
      Bag
      <motion.span
        key={pulse}
        initial={reduced || pulse === 0 ? false : { transform: "scale(1.35)" }}
        animate={{ transform: "scale(1)" }}
        transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}
        className={cn(
          "grid h-5 min-w-5 place-items-center rounded-full px-1 font-sans text-[11px] font-medium tabular-nums",
          light ? "bg-page text-ink" : "bg-ink text-page",
        )}
      >
        {count}
      </motion.span>
    </button>
  )
}

/**
 * The header. On the home page it starts the way the masthead of a printed
 * issue does — the two-line wordmark on the paper, the links laid over the
 * photograph — and snaps to a monogram on a cream bar the moment the page
 * moves. Everywhere else it is the bar from the start.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const overPhoto = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [pathname])

  const bar = scrolled || !overPhoto
  const light = !bar // links sit on the photograph

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-(--duration-hover)",
        bar ? "bg-page shadow-[0_1px_0_var(--color-line)]" : "bg-transparent",
      )}
    >
      <div className="flex h-16 items-start justify-between px-gutter md:h-[78px]">
        <Link href="/" aria-label="Ordinary Matter, home" className="mt-4 text-ink md:mt-6">
          {bar ? <Monogram className="mt-0.5" /> : <Wordmark className="max-md:text-page max-md:drop-shadow-sm" />}
        </Link>

        <nav aria-label="Main" className="mt-3 hidden items-center gap-7 md:mt-4 md:flex">
          {NAV.map((item) => {
            const on = item.href === pathname
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => go(e, item.href)}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "type-title link-draw py-1 text-[15px] transition-colors duration-(--duration-hover)",
                  light ? "text-page" : on ? "text-ink" : "text-ink-2 hover:text-ink",
                  on && "bg-[length:100%_1px]",
                )}
              >
                {item.label}
              </a>
            )
          })}
          <BagButton light={light} />
        </nav>

        <div className="mt-2.5 flex items-center gap-3 md:hidden">
          <BagButton light={light} />
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn("grid size-11 place-items-center transition-colors", light ? "text-page" : "text-ink")}
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-none p-0 sm:max-w-md">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-5 pt-5 pb-8">
                <Wordmark />
                <AnimatePresence>
                  {menu && (
                    <ul className="mt-14 flex flex-col">
                      {NAV.map((item, i) => (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, transform: "translateY(12px)" }}
                          animate={{ opacity: 1, transform: "translateY(0px)" }}
                          transition={{ delay: 0.12 + i * 0.05, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                          className="border-b border-line"
                        >
                          <a
                            href={item.href}
                            onClick={(e) => {
                              setMenu(false)
                              go(e, item.href)
                            }}
                            className="type-display flex items-baseline justify-between py-3 text-h1 text-ink"
                          >
                            {item.label}
                            <ArrowUpRight className="size-5 text-ink-3" />
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </AnimatePresence>
                <p className="mt-auto max-w-[30ch] font-serif text-ink-2 italic">The lives, spaces and stories of people who make things by hand.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
