import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { Wordmark } from "@/components/ui/wordmark"

const COLUMNS = [
  { title: "Product", links: ["Mail & messages", "Customers", "Meetings", "Projects", "Assistant"] },
  { title: "Resources", links: ["Guides", "Changelog", "API reference", "Starter kits"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
]

/** The footer: the mark, three columns, and the small print. */
export function SiteFooter() {
  return (
    <footer id="footer" className="bg-page py-14">
      <Container className="grid gap-10 border-t border-ink-200 pt-10 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <Wordmark className="text-ink-900" />
          <p className="max-w-[240px] text-[13px] leading-relaxed text-ink-500">Open space for the work that matters.</p>
          <Link href="/brand" className="mt-1 text-[13px] font-medium text-sky-600 hover:underline">Brand guidelines</Link>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2.5 text-[13px]">
            <h3 className="font-semibold text-ink-900">{col.title}</h3>
            {col.links.map((l) => (<a key={l} href="#top" className="py-0.5 text-ink-500 transition-colors hover:text-ink-900">{l}</a>))}
          </nav>
        ))}
      </Container>
      <Container className="mt-10 flex flex-wrap justify-between gap-2 text-[12px] text-ink-400">
        <span>© 2026 Meadow Labs. Photography from Pexels. All rights reserved.</span>
        <span>Terms · Privacy · Security</span>
      </Container>
    </footer>
  )
}
