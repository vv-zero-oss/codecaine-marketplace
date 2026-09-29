import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Container } from "@/components/ui/container"
import { navigation, studio } from "@/content"
import { cn } from "@/lib/utils"
import { Link, usePathname } from "@/router"

export function Wordmark() {
  return (
    <Link href="/" className="leading-none">
      <span className="block font-display text-2xl tracking-tight">{studio.name}</span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-ink-400">{studio.tagline}</span>
    </Link>
  )
}

export function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-xs uppercase tracking-[0.2em] transition-colors hover:text-ink",
        active ? "text-ink" : "text-ink-400",
      )}
    >
      {label}
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Wordmark />
        <nav className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <NavLink key={item.href} {...item} active={pathname.startsWith(item.href)} />
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>
      {open && (
        <nav className="border-t border-ink/10 md:hidden" onClick={() => setOpen(false)}>
          <Container className="flex flex-col gap-5 py-6">
            {navigation.map((item) => (
              <NavLink key={item.href} {...item} active={pathname.startsWith(item.href)} />
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}
