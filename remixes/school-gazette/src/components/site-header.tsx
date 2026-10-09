import { useCanvasAction } from "@canvas/react"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

export const NAV = [
  { href: "#top", label: "Front page" },
  { href: "#radio", label: "Radio" },
  { href: "#scoreboard", label: "Scoreboard" },
  { href: "#inside", label: "Inside" },
  { href: "#clubs", label: "Clubs" },
  { href: "#write", label: "Write for us" },
]

/** Place and edition on the left, the nameplate in the middle, the menu on the right. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { group: "Header", on: open })

  return (
    <header className="border-b border-ink">
      <Container className="flex min-h-14 items-center justify-between gap-4 py-2">
        <p className="kicker hidden flex-1 text-ink-soft sm:block">Marlowe Academy · Est. 1961</p>
        <Link href="/" className="font-display text-xl tracking-tight whitespace-nowrap sm:text-center sm:text-2xl">
          The Marlowe Gazette
        </Link>
        <nav aria-label="Sections" className="hidden flex-1 items-center justify-end gap-5 md:flex">
          {NAV.slice(1, 5).map((item) => (
            <a key={item.href} href={item.href} className="kicker underline-offset-4 decoration-rust decoration-2 hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open menu" className="group grid size-11 place-items-center rounded-key border-2 border-ink bg-paper-bright shadow-[0_3px_0_var(--ink)] transition-[transform,box-shadow] duration-[var(--duration-press)] active:translate-y-0.5 active:shadow-[0_1px_0_var(--ink)] md:ml-2">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="display text-4xl">Contents</SheetTitle>
            <SheetDescription className="kicker text-ink-faint">Autumn term issue · pages 1–24</SheetDescription>
            <nav className="flex flex-col">
              {NAV.map((item, i) => (
                <SheetClose asChild key={item.href}>
                  <a href={item.href} className="flex min-h-14 items-baseline gap-3 border-b-2 border-ink font-condensed text-3xl uppercase transition-colors hover:text-rust">
                    <span className="kicker w-8 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <Link href="/brand" className="kicker mt-auto underline decoration-rust decoration-2 underline-offset-4">Brand guidelines →</Link>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
