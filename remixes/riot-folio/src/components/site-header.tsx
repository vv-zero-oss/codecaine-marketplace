import { Menu } from "lucide-react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { Container } from "@/components/ui/container"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV, PERSON } from "@/content"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

export function NavLink({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative text-[15px] transition-colors duration-[var(--duration-hover)] hover:text-ink",
        active ? "text-ink" : "text-ink-muted",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-0 -bottom-1 h-0.5 origin-left rounded-full bg-lime transition-transform duration-300 ease-[var(--ease-out-soft)]",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  )
}

/** The name, and three places to go. Sticky, frosted over the ground. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <header className="sticky top-0 z-50 bg-ground/80 shadow-[var(--shadow-header)] backdrop-blur-md">
      <Container size="wide" className="flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link href="/" className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {PERSON.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 sm:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="-mr-2.5 flex size-11 items-center justify-center rounded-[var(--radius-button)] text-ink sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="border-line bg-ground-deep">
            <SheetHeader>
              <SheetTitle className="text-ink">{PERSON.name}</SheetTitle>
              <SheetDescription className="text-ink-faint">{PERSON.based}</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col px-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center border-b border-line text-2xl tracking-tight text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
