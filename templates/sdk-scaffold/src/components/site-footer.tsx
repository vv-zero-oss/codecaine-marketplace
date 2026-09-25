import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER_COLUMNS } from "@/content"

export function FooterColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-medium tracking-tight">{heading}</h3>
      <ul className="mt-3 space-y-2 text-quartz-400">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-quartz-900">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-quartz-200 py-14">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-3 text-sm text-quartz-400">
            The deploy platform that gets out of the way.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.heading} {...column} />
          ))}
        </div>
      </Container>
    </footer>
  )
}
