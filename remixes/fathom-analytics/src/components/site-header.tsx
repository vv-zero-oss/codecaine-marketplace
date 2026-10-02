import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV } from "@/content"

/** Not sticky: the page's scenes pin themselves, and a bar over them would only compete. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-[60px]">
        <Wordmark href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="rounded-pill px-3 py-1.5 text-[13px] text-ink transition-colors duration-(--duration-fast) hover:bg-ink/[0.05]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-1 md:flex">
          <ButtonLink href="#cta" variant="ghost" size="sm">Book a demo</ButtonLink>
          <ButtonLink href="#cta" size="sm">Get started</ButtonLink>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5!" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center justify-between">
              <Wordmark />
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu"><X className="size-5!" /></Button>
              </SheetClose>
            </div>
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a href={item.href} className="flex min-h-12 items-center border-b border-line font-serif text-2xl tracking-tight">{item.label}</a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
              <ButtonLink href="#cta" size="lg">Get started</ButtonLink>
              <ButtonLink href="#cta" variant="soft" size="lg">Book a demo</ButtonLink>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
