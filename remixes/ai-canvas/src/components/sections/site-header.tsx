import { useState } from "react"
import { useMotionValueEvent } from "motion/react"
import { Menu, Sparkles } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Logo } from "@/components/blocks/logo"
import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav } from "@/content"
import { useHeroWash } from "@/hooks/use-hero-wash"
import { cn } from "@/lib/utils"

/**
 * The bar across the top: name and links on the left, the agent's prompt in
 * the middle where a search would be, log in and sign up on the right.
 *
 * It has two faces, as the reference's does — white on the night canvas, ink
 * on paper — and changes face when the hero has washed half way out. The
 * change is a colour transition, never a jump.
 */
export function SiteHeader() {
  const wash = useHeroWash()
  const [night, setNight] = useState(() => wash.get() < 0.5)
  useMotionValueEvent(wash, "change", (v) => setNight(v < 0.5))

  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <header
      data-night={night ? "" : undefined}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-40 h-nav transition-[background-color,color] duration-(--duration-theme) ease-out-strong",
        night ? "text-on-night" : "bg-paper/85 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-gutter lg:grid-cols-[1fr_minmax(0,380px)_1fr]">
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

        <PromptPill className="hidden lg:flex" />

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
              <PromptPill light className="mb-4 w-full" />
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

/** Where a search bar would be: the agent's prompt. On the night face it is
 *  smoked glass fading out to the right, as in the reference; on paper, a
 *  flat grey field. */
function PromptPill({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <a
      href="#system"
      className={cn(
        "h-10 items-center gap-2.5 rounded-pill px-4 text-nav transition-[background-color,color] duration-(--duration-theme) ease-out-strong",
        light
          ? "flex bg-field text-mist"
          : "bg-field text-mist group-data-[night]/header:bg-linear-to-r group-data-[night]/header:from-night-field group-data-[night]/header:via-night-field group-data-[night]/header:to-night-field-edge/0 group-data-[night]/header:text-mist",
        className,
      )}
    >
      <Sparkles className="size-3.5 shrink-0" aria-hidden />
      <span className="truncate">{nav.prompt}</span>
      <kbd className="ml-auto hidden rounded-[5px] border border-current/25 px-1.5 font-sans text-[10px] lg:inline">⌘K</kbd>
    </a>
  )
}
