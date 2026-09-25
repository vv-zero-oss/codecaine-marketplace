import { useEffect, useState } from "react"
import { Menu } from "lucide-react"

import { NewsletterPill } from "@/components/blocks/newsletter-pill"
import { Wordmark } from "@/components/blocks/wordmark"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { brand, nav } from "@/content"
import { cn } from "@/lib/utils"

/** The line the pill sits on, measured from the top of the window. */
const PILL_LINE = 28

/**
 * Whether the page has scrolled, and whether the pill is over a dark section.
 * Dark sections say so with `data-tone="dark"`; the pill checks which one its
 * own centre line is inside, so it changes exactly when it crosses the edge.
 */
function useHeaderState() {
  const [state, setState] = useState({ compact: false, tone: "light" as "light" | "dark" })
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const compact = window.scrollY > 40
      let tone: "light" | "dark" = "light"
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone=dark]")) {
        const box = el.getBoundingClientRect()
        if (box.top <= PILL_LINE && box.bottom >= PILL_LINE) tone = "dark"
      }
      setState((s) => (s.compact === compact && s.tone === tone ? s : { compact, tone }))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return state
}

export function SiteHeader() {
  const { compact, tone } = useHeaderState()
  // The logo and the links step aside once the page moves; the pill stays.
  const aside = cn(
    "transition-opacity duration-(--duration-pill) ease-out-strong",
    compact && "pointer-events-none opacity-0",
  )
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-start justify-between px-3 pt-1.5 sm:px-3.5">
      <div className={cn("pointer-events-auto pt-0.5", aside)}>
        <Wordmark />
      </div>

      <div className="pointer-events-auto absolute left-1/2 top-1.5 -translate-x-1/2">
        <NewsletterPill compact={compact} tone={tone} />
      </div>

      <nav aria-label="Main" className={cn("pointer-events-auto hidden items-center gap-8 pt-3 pr-1 md:flex", aside)}>
        {nav.map((item) => (
          <a key={item.label} href={item.href} className="text-ui text-ink underline-offset-4 [@media(hover:hover)]:hover:underline">
            {item.label}
          </a>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu" className={cn("pointer-events-auto -mt-0.5 md:hidden", aside)}>
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="pt-14">
          <SheetHeader className="px-6">
            <SheetTitle>{brand.studioName}</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile" className="flex flex-col px-6">
            {nav.map((item) => (
              <SheetClose asChild key={item.label}>
                <a href={item.href} className="flex h-12 items-center border-b border-hairline text-lead text-ink">
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
