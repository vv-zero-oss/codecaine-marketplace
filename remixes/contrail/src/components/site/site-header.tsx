import { useEffect, useState } from "react"
import { Menu, Smartphone } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ContrailMark, Logo } from "@/components/site/logo"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV } from "@/content/site"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Which theme the page has under the header: the nearest `[data-theme]`
 *  behind its middle. The header turns dark over the night chapters. */
function useThemeUnder(y = 36) {
  const [theme, setTheme] = useState<"day" | "night">("day")
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const hits = document.elementsFromPoint(window.innerWidth / 2, y)
      for (const el of hits) {
        if (el.closest("[data-site-header]")) continue
        const owner = el.closest<HTMLElement>("[data-theme]")
        if (owner) {
          setTheme(owner.dataset.theme === "night" ? "night" : "day")
          return
        }
      }
      setTheme("day")
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    // A section can change theme while the page stands still (the hero turns
    // to night as its last phase plays), so look again now and then.
    const tick = window.setInterval(schedule, 400)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      window.clearInterval(tick)
      cancelAnimationFrame(frame)
    }
  }, [y])
  return theme
}

function GetTheApp({ night, className }: { night: boolean; className?: string }) {
  return (
    <Link
      href="/pricing"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[14.5px] font-medium whitespace-nowrap transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
        night ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:bg-ink-2",
        className,
      )}
    >
      Get the app <Smartphone className="size-4" strokeWidth={2} />
    </Link>
  )
}

function MobileMenu({ night }: { night: boolean }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn("grid size-11 place-items-center rounded-full transition-colors md:hidden", night ? "text-white hover:bg-white/10" : "text-ink hover:bg-panel")}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 border-l-0 bg-page p-0">
        <SheetTitle className="flex h-16 items-center px-5">
          <Logo />
        </SheetTitle>
        <nav className="flex flex-col px-5">
          {[{ label: "Home", href: "/" }, ...NAV].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center border-b border-line text-h4 font-semibold tracking-[-0.03em]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-5">
          <Link href="/pricing" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[16px] font-medium text-white">
            Get the app <Smartphone className="size-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * The header: a full-width bar at the top of the page that tucks into a
 * floating pill once you scroll, and turns dark over the night chapters.
 */
export function SiteHeader() {
  const [tucked, setTucked] = useState(false)
  const theme = useThemeUnder()
  const pathname = usePathname()
  const night = theme === "night"

  useEffect(() => {
    const onScroll = () => setTucked(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header data-site-header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto flex h-[54px] w-full items-center gap-3 rounded-full pr-1.5 pl-3 transition-[max-width,background-color,box-shadow,color] duration-500 ease-(--ease-out-strong)",
          tucked ? "max-w-[600px]" : "max-w-[1250px]",
          tucked && !night && "bg-page/88 text-ink shadow-(--shadow-pill) backdrop-blur-xl",
          tucked && night && "bg-night-2/80 text-white shadow-[0_0_0_1px_var(--color-night-line)] backdrop-blur-xl",
          !tucked && (night ? "text-white" : "text-ink"),
        )}
      >
        <Link href="/" aria-label="Contrail home" className="flex shrink-0 items-center gap-2">
          <ContrailMark tone={night ? "light" : "ink"} />
          <span className={cn("text-[19px] font-semibold tracking-[-0.03em] transition-opacity duration-300", tucked ? "hidden" : "hidden sm:inline")}>Contrail</span>
        </Link>
        <span aria-hidden className={cn("h-5 w-px", tucked ? "hidden md:block" : "hidden", night ? "bg-white/15" : "bg-line-strong")} />
        <nav className={cn("hidden items-center md:flex", tucked ? "gap-0" : "mx-auto gap-1")}>
          {NAV.map((link) => {
            const on = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[15px] transition-colors duration-(--duration-hover)",
                  night ? "text-white/75 hover:text-white" : "text-ink-2 hover:text-ink",
                  on && (night ? "text-white" : "text-ink"),
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <GetTheApp night={night} />
          <MobileMenu night={night} />
        </div>
      </div>
    </header>
  )
}
