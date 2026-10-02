import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"
import { Link } from "@/lib/router"

const COLUMNS = [
  { title: "Product", links: [["Features", "#features"], ["Pricing", "#pricing"], ["Security", "#bank"]] },
  { title: "Company", links: [["Manifesto", "#manifesto"], ["FAQ", "#faq"], ["Brand", "/brand"]] },
  { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Data practices", "#"]] },
] as const

export function FooterColumn({ title, links, tone = "light" }: { title: string; links: readonly (readonly [string, string])[]; tone?: "light" | "dark" }) {
  return (
    <div>
      <h3 className={cn("text-xs font-semibold tracking-widest uppercase", tone === "dark" ? "text-white/45" : "text-ink-400")}>{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className={cn("text-sm font-medium transition-colors duration-150", tone === "dark" ? "text-white/70 hover:text-white" : "text-ink-600 hover:text-ink-900")}>
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
    <footer className="bg-night-800 py-16 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark className="text-white" />
          <p className="mt-4 text-sm text-white/65">
            Tally reads your accounts and never moves your money. Made for people who would like to
            stop wondering where it went.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} tone="dark" />
        ))}
      </Container>
      <Container className="mt-12 flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:justify-between">
        <p>© 2026 Tally Labs. All rights reserved.</p>
        <p>Illustrations drawn in-house. Icons by Lucide. Portraits from Pexels.</p>
      </Container>
    </footer>
  )
}
