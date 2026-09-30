import { ArrowLeft, Menu, X } from "lucide-react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { useHeaderTone } from "@/components/layout/use-header-tone"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV, STUDIO } from "@/content"
import { isActive, Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The header floats over every page: the name on the left (ink over
 * light sections, cream over dark), the three-link pill in the middle, and
 * “Start a project” on the right — or a way back, on a case study.
 */
export function SiteHeader({ pathname }: { pathname: string }) {
  const tone = useHeaderTone(pathname)
  const onCase = pathname.startsWith("/work/")
  return (
    <header data-site-header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div data-canvas-ignore className="flex items-start justify-between gap-3 px-gutter pt-4 md:pt-5">
        <Link href="/" aria-label={`${STUDIO.name} home`} className="pointer-events-auto mt-1.5 transition-transform duration-(--duration-base) ease-(--ease-pop) hover:-rotate-3">
          <Wordmark tone={tone === "dark" ? "snow" : "ink"} className="text-[1.6rem] md:text-[2rem]" />
        </Link>
        <NavPill pathname={pathname} />
        <div className="pointer-events-auto flex items-center gap-2">
          {onCase ? <BackButton /> : <ContactPill active={pathname === "/contact"} />}
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  )
}

export function NavPill({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 md:block">
      <ul className="flex items-center gap-1 rounded-pill bg-ink p-1.5 shadow-lift">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-9 items-center gap-2 rounded-pill px-4 label text-xs leading-none transition-colors duration-(--duration-fast)",
                  active ? "bg-lime text-ink" : "text-snow hover:bg-night-raised",
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function ContactPill({ active = false }: { active?: boolean }) {
  return (
    <Link
      href="/contact"
      aria-current={active ? "page" : undefined}
      className="group/contact hidden h-12 items-center gap-2 rounded-pill bg-flame px-5 label text-xs text-snow shadow-lift transition-colors duration-(--duration-fast) hover:bg-flame-deep sm:inline-flex"
    >
      Start a project
      <span className="size-1.5 rounded-full bg-lime transition-transform duration-(--duration-base) ease-(--ease-pop) group-hover/contact:scale-[2]" />
    </Link>
  )
}

export function BackButton() {
  return (
    <Link
      href="/work"
      aria-label="Back to all work"
      className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-snow shadow-lift transition-colors duration-(--duration-fast) hover:bg-flame"
    >
      <ArrowLeft className="size-5 transition-transform duration-(--duration-base) ease-out hover:-translate-x-0.5" strokeWidth={2.5} />
    </Link>
  )
}

/** Below `md`, the pill folds into a full-screen green menu. */
export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { group: "Header", on: open })
  const links = [...NAV, { label: "Contact", href: "/contact" }]
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex h-11 items-center gap-2 rounded-pill bg-ink px-4 label text-xs text-snow shadow-lift md:hidden"
      >
        <Menu className="size-4" strokeWidth={2.5} />
        Menu
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="h-svh gap-0 border-0 bg-night p-0 text-snow data-[state=closed]:animate-[sheet-out_380ms_var(--ease-in-out)] data-[state=open]:animate-[sheet-in_520ms_var(--ease-out)]"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages on this site</SheetDescription>
        <div className="flex items-start justify-between px-gutter pt-4">
          <Wordmark tone="snow" className="text-[1.6rem]" />
          <SheetClose aria-label="Close menu" className="inline-flex size-11 items-center justify-center rounded-full bg-lime text-ink">
            <X className="size-5" strokeWidth={2.5} />
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-gutter">
          <ul className="space-y-1">
            {links.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-1 text-[clamp(3rem,15vw,5rem)] leading-[0.9]",
                    i % 2 ? "display-serif" : "display",
                    isActive(pathname, item.href) && "text-lime",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2 px-gutter pb-8 font-serif text-xl">
          <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          <a href={STUDIO.phoneHref}>{STUDIO.phone}</a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
