import { useEffect, useState } from "react"
import { useMotionValueEvent } from "motion/react"
import { Menu } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Logo } from "@/components/blocks/logo"
import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav } from "@/content"
import { useHeroWash } from "@/hooks/use-hero-wash"
import { cn } from "@/lib/utils"

/**
 * The bar across the top: name and links on the left, log in and sign up on
 * the right.
 *
 * It has two faces — white on night, ink on paper. It wears the night one
 * over the hero until the canvas has washed half way out, and over any
 * section marked `data-nav-theme="night"` (the film) while that section is
 * under it. The change is a colour transition, never a jump.
 */
export function SiteHeader() {
  const wash = useHeroWash()
  const [heroNight, setHeroNight] = useState(() => wash.get() < 0.5)
  useMotionValueEvent(wash, "change", (v) => setHeroNight(v < 0.5))

  // Which dark sections are under the bar: a thin band across the top of the
  // viewport, the height of the bar.
  const [darkUnder, setDarkUnder] = useState(false)
  useEffect(() => {
    const targets = document.querySelectorAll("[data-nav-theme='night']")
    if (!targets.length) return
    const under = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) under.add(entry.target)
          else under.delete(entry.target)
        }
        setDarkUnder(under.size > 0)
      },
      { rootMargin: "0px 0px -94% 0px" },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
  const night = heroNight || darkUnder

  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <header
      data-night={night ? "" : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-nav transition-[background-color,color] duration-(--duration-theme) ease-out-strong",
        night ? "text-on-night" : "bg-paper/85 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-gutter">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
            {nav.links.map((link) => (
              <a key={link.label} href={link.href} className="text-nav font-medium transition-opacity duration-(--duration-hover) hover:opacity-60">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <a href={nav.login.href} className="hidden text-nav font-medium whitespace-nowrap transition-opacity duration-(--duration-hover) hover:opacity-60 sm:inline">
            {nav.login.label}
          </a>
          <ButtonLink href={nav.signup.href} size="nav" variant={night ? "paper" : "ink"}>
            {nav.signup.label}
          </ButtonLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="-mr-2 inline-flex size-11 items-center justify-center rounded-pill lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-2 p-6 pt-16">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {nav.links.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="py-3 text-[22px] font-medium tracking-scene">
                  {link.label}
                </a>
              ))}
              <a href={nav.login.href} onClick={() => setOpen(false)} className="py-3 text-[22px] font-medium tracking-scene">
                {nav.login.label}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
