import { ArrowLeft, Menu, X } from "lucide-react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { useHeaderTone } from "@/components/layout/use-header-tone"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Scribble } from "@/components/ui/scribble-link"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV, STUDIO } from "@/content"
import { isActive, Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The header floats over every page: the signature on the left (blue over
 * light sections, white over dark), the three-link pill in the middle, and
 * Contact on the right — or a way back, on a case study.
 */
export function SiteHeader({ pathname }: { pathname: string }) {
  const tone = useHeaderTone(pathname)
  const onCase = pathname.startsWith("/work/")
  return (
    <header data-site-header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div data-canvas-ignore className="flex items-start justify-between gap-3 px-gutter pt-4 md:pt-5">
        <Link href="/" aria-label={`${STUDIO.name} home`} className="pointer-events-auto -mt-1 transition-transform duration-(--duration-base) ease-out hover:-rotate-3">
          <Wordmark tone={tone === "dark" ? "snow" : "blue"} className="text-[2.1rem] md:text-[2.6rem]" />
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
      <ul className="flex items-center gap-5 bg-card px-4 py-3 shadow-card">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group/scribble relative label text-[13px] leading-none text-ink"
              >
                {item.label}
                <Scribble drawn={active} className="-bottom-2.5 h-2.5" />
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
      className="group/contact hidden h-10 items-center gap-2 bg-card px-3.5 label text-[13px] text-ink shadow-card transition-colors duration-(--duration-fast) hover:bg-blue hover:text-snow sm:inline-flex"
    >
      <span className="size-1.5 rounded-full bg-blue transition-colors group-hover/contact:bg-snow" />
      Contact
    </Link>
  )
}

export function BackButton() {
  return (
    <Link
      href="/work"
      aria-label="Back to all work"
      className="inline-flex size-10 items-center justify-center bg-card text-ink shadow-card transition-colors duration-(--duration-fast) hover:bg-blue hover:text-snow"
    >
      <ArrowLeft className="size-5 transition-transform duration-(--duration-base) ease-out hover:-translate-x-0.5" strokeWidth={2.5} />
    </Link>
  )
}

/** Below `md`, the pill folds into a full-screen blue menu. */
export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { group: "Header", on: open })
  const links = [...NAV, { label: "Contact", href: "/contact" }]
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex h-11 items-center gap-2 bg-card px-3.5 label text-[13px] text-ink shadow-card md:hidden"
      >
        <Menu className="size-4" strokeWidth={2.5} />
        Menu
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="h-svh gap-0 border-0 bg-blue p-0 text-snow data-[state=closed]:animate-[sheet-out_380ms_var(--ease-in-out)] data-[state=open]:animate-[sheet-in_520ms_var(--ease-out)]"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages on this site</SheetDescription>
        <div className="flex items-start justify-between px-gutter pt-4">
          <Wordmark tone="snow" className="text-[2.1rem]" />
          <SheetClose aria-label="Close menu" className="inline-flex size-11 items-center justify-center bg-card text-ink">
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
                    isActive(pathname, item.href) && "underline decoration-[3px] underline-offset-8",
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
