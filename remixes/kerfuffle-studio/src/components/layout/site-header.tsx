import { ArrowLeft } from "lucide-react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { useHeaderTone } from "@/components/layout/use-header-tone"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV, STUDIO } from "@/content"
import { isActive, Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A thin bar over every page: the name on the left, the pages in the middle
 * of the grid, and a way to get in touch on the right. It takes the colour of
 * the section under it — ink on paper, paper on ink.
 */
export function SiteHeader({ pathname }: { pathname: string }) {
  const tone = useHeaderTone(pathname)
  const onCase = pathname.startsWith("/work/")
  return (
    <header
      data-site-header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-(--duration-base)",
        tone === "dark" ? "bg-night/85 text-snow" : "bg-paper/85 text-ink",
      )}
    >
      <div data-canvas-ignore className="grid grid-cols-2 items-center gap-6 px-gutter py-4 md:grid-cols-12">
        <Link href="/" aria-label={`${STUDIO.name} home`} className="pointer-events-auto md:col-span-3">
          <Wordmark tone={tone === "dark" ? "snow" : "ink"} />
        </Link>
        <NavLinks pathname={pathname} />
        <div className="pointer-events-auto flex items-center justify-end gap-6 md:col-span-3">
          {onCase ? <BackLink /> : <ContactLink active={pathname === "/contact"} />}
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  )
}

export function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main" className="pointer-events-auto hidden md:col-span-6 md:block">
      <ul className="flex items-center gap-7 text-sm">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("transition-opacity duration-(--duration-fast)", active ? "opacity-100" : "opacity-60 hover:opacity-100")}
              >
                {item.label}
                {active ? <span className="ml-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle" /> : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function ContactLink({ active = false }: { active?: boolean }) {
  return (
    <Link
      href="/contact"
      aria-current={active ? "page" : undefined}
      className="hidden text-sm transition-opacity duration-(--duration-fast) hover:opacity-60 sm:inline"
    >
      Start a project →
    </Link>
  )
}

export function BackLink() {
  return (
    <Link href="/work" className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60">
      <ArrowLeft className="size-4" strokeWidth={2} />
      <span className="hidden sm:inline">All work</span>
      <span className="sr-only sm:hidden">Back to all work</span>
    </Link>
  )
}

/** Below `md`, the links fold into a full-screen menu. */
export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { group: "Header", on: open })
  const links = [...NAV, { label: "Contact", href: "/contact" }]
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu" className="h-11 text-sm md:hidden">
        Menu
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="h-svh gap-0 border-0 bg-night p-0 text-snow data-[state=closed]:animate-[sheet-out_300ms_var(--ease-in-out)] data-[state=open]:animate-[sheet-in_420ms_var(--ease-out)]"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages on this site</SheetDescription>
        <div className="flex items-center justify-between px-gutter py-5">
          <Wordmark tone="snow" />
          <SheetClose aria-label="Close menu" className="h-11 text-sm">
            Close
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-end px-gutter pb-10">
          <ul className="border-t border-line-dark">
            {links.map((item, i) => (
              <li key={item.href} className="border-b border-line-dark">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 display text-5xl"
                >
                  {item.label}
                  <span className={cn("label", isActive(pathname, item.href) ? "text-accent" : "text-snow-mute")}>0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-1 text-snow-mute">
            <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
            <a href={STUDIO.phoneHref}>{STUDIO.phone}</a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
