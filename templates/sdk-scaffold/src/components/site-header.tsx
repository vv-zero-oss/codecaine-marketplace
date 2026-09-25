import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="hover:text-quartz-900">
      {children}
    </a>
  )
}

/**
 * `sticky` against the viewport, which a board is not — the editor holds it
 * still while designing, and this is the page that proves it does.
 */
export function SiteHeader() {
  return (
    <header
      id="nav"
      className="sticky top-0 z-50 border-b border-quartz-200/70 bg-white/80 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between">
        <Wordmark href="#top" />
        <nav className="hidden items-center gap-8 text-sm text-quartz-600 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="#signin" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="#start" size="sm">
            Get started
          </ButtonLink>
        </div>
      </Container>
    </header>
  )
}
