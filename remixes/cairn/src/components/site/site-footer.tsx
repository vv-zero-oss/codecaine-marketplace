import { CairnMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

const COLUMNS = [
  {
    title: "Make",
    links: [
      { href: "/studio", label: "Map studio" },
      { href: "/templates", label: "Map templates" },
      { href: "/#embed", label: "Embed a map" },
      { href: "/#own-data", label: "Spreadsheet to map" },
      { href: "/#how", label: "Ask Cairn" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { href: "/templates?kind=Community", label: "Communities" },
      { href: "/templates?kind=Directories", label: "Directories" },
      { href: "/templates?kind=Property", label: "Real estate" },
      { href: "/templates?kind=Travel", label: "Travel guides" },
      { href: "/templates?kind=Events", label: "Event maps" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/pricing#faq", label: "Help & FAQ" },
      { href: "/brand", label: "Brand guidelines" },
      { href: "/#voices", label: "Customers" },
    ],
  },
]

/** Cream, like the reference's: the mark, four short columns, and the
 *  credits for what the site is made of. */
export function SiteFooter() {
  return (
    <footer className="bg-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-[1fr_auto] md:py-20">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Cairn home" className="w-fit">
            <CairnMark className="size-11 text-ink" />
          </Link>
          <p className="type-serif max-w-[18ch] text-h4 text-ink">Put your world on the map.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[14px] font-medium text-ink">{column.title}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-8 items-center text-[14px] text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-cream-deep py-6 text-[13px] text-ink-3 sm:flex-row sm:justify-between">
        <p>© 2026 Cairn Maps. Halden Bay is a made-up city.</p>
        <p>
          Photography from{" "}
          <a href="https://www.pexels.com" className="underline decoration-ink-4 underline-offset-2 hover:text-ink" target="_blank" rel="noreferrer">
            Pexels
          </a>
          {" · "}Google logo from{" "}
          <a href="https://svgl.app" className="underline decoration-ink-4 underline-offset-2 hover:text-ink" target="_blank" rel="noreferrer">
            SVGL
          </a>
        </p>
      </Container>
    </footer>
  )
}
