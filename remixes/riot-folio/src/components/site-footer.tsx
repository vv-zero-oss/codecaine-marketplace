import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { FOOTER_LINKS, PERSON, SOCIAL } from "@/content"
import { Link } from "@/lib/router"

export function FooterLink({ href, children }: { href: string; children: string }) {
  const external = !href.startsWith("/")
  const className =
    "group inline-flex items-center gap-1 text-[15px] leading-7 text-ink-muted transition-colors duration-[var(--duration-hover)] hover:text-ink"
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/** Where she is, where to go, where else to find her — on a halftone. */
export function SiteFooter() {
  return (
    <footer className="relative mt-[var(--spacing-section)] border-t border-line">
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_85%)]" />
      <Container size="wide" className="relative grid gap-10 py-14 sm:grid-cols-[2fr_1fr_1fr] sm:gap-x-8">
        <div className="flex flex-col justify-between gap-10">
          <p className="text-[15px] leading-7 text-ink-muted">
            {PERSON.based.split(". ").map((line, i, all) => (
              <span key={line} className="block">
                {i < all.length - 1 ? `${line}.` : line}
              </span>
            ))}
          </p>
          <p className="text-[13px] text-ink-faint">©2026 {PERSON.name}</p>
        </div>
        <nav aria-label="Site" className="flex flex-col">
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </nav>
        <nav aria-label="Elsewhere" className="flex flex-col">
          {SOCIAL.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
