import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const LEFT = [
  { label: "iOS app", href: "#download" },
  { label: "Android app", href: "#download" },
]
const RIGHT = [
  { label: "Features", href: "#features" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Brand", href: "/brand" },
]

export function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="text-sm font-medium text-ink-600 transition-colors duration-150 hover:text-ink-900">
      {children}
    </Link>
  )
}

/** Wordmark and a few quiet links; below `md` they fold into a menu panel. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <header id="nav" className="relative z-40 bg-ink-100">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <div className="flex items-center gap-8">
          <Wordmark href="#top" />
          <nav className="hidden items-center gap-6 md:flex">
            {LEFT.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {RIGHT.map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="grid size-11 place-items-center rounded-full text-ink-900 transition-transform duration-150 active:scale-95 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>
      {open ? (
        <div className="absolute inset-x-0 top-full border-t border-ink-200 bg-white shadow-lift md:hidden">
          <Container className="flex flex-col py-3">
            {[...LEFT, ...RIGHT].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-base font-semibold text-ink-900"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
