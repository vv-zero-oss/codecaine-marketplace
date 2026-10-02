import { Menu } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { AppleIcon } from "@/components/ui/apple-icon"
import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#intelligence", label: "Intelligence" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/brand", label: "Brand" },
] as const

/** A pill that floats at the top of the page: logo, two links, the download button — and a sheet for small screens. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <header data-canvas-ignore className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3">
      <nav
        aria-label="Main"
        className="pointer-events-auto flex h-12 items-center gap-1 rounded-pill bg-paper/75 p-1 pl-4 shadow-pill backdrop-blur-xl"
      >
        <Link href="/" aria-label="Meridian home" className="mr-2 sm:mr-4">
          <Wordmark />
        </Link>
        <Link href="/#about" className="hidden h-10 items-center rounded-pill px-3 text-sm text-ink-2 transition-colors hover:text-ink sm:inline-flex">About</Link>
        <Link href="/brand" className="hidden h-10 items-center rounded-pill px-3 text-sm text-ink-2 transition-colors hover:text-ink sm:inline-flex">Log in</Link>
        <ButtonLink href="#download" size="sm" className="h-10">
          <AppleIcon /> <span>Download app</span>
        </ButtonLink>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-pill text-ink-2 transition-colors hover:bg-tint sm:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="px-1 pt-2 pb-1"><Wordmark /></SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <ul className="mt-6 space-y-1">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <SheetClose asChild>
                    <Link href={l.href} className="flex h-12 items-center rounded-xl px-3 text-lg font-medium tracking-tight hover:bg-tint">{l.label}</Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
