import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const COLUMNS = [
  { title: "Product", links: [["Features", "#features"], ["Download", "#download"], ["Security", "#bank"]] },
  { title: "Company", links: [["Manifesto", "#manifesto"], ["Brand", "/brand"], ["Careers", "#"]] },
  { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Data practices", "#"]] },
] as const

export function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-ink-400 uppercase">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm font-medium text-ink-600 transition-colors duration-150 hover:text-ink-900">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50 py-14">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm text-ink-600">
            Tally reads your accounts and never moves your money. Made for people who would like to
            stop wondering where it went.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} />
        ))}
      </Container>
      <Container className="mt-12 flex flex-col gap-2 text-xs text-ink-400 sm:flex-row sm:justify-between">
        <p>© 2026 Tally Labs. All rights reserved.</p>
        <p>Illustrations drawn in-house. Icons by Lucide.</p>
      </Container>
    </footer>
  )
}
