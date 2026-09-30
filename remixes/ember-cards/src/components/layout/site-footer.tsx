import { Container } from "@/components/ui/container"
import { LogoMark } from "@/components/ui/logo"
import { BRAND, FOOTER } from "@/content"
import { Link } from "@/lib/router"

/** One column of footer links under a small white heading. */
export function FooterColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-medium text-ink">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#top"
              className="inline-flex min-h-8 items-center text-[0.8125rem] text-footer-muted transition-colors duration-(--duration-hover) ease-out hover:text-ink sm:min-h-0"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The dark footer the page sheet lifts off: mark, three link columns, and the name set huge. */
export function SiteFooter({ wordmark = BRAND, note = FOOTER.legal }: { wordmark?: string; note?: string }) {
  return (
    <footer className="-mt-[var(--radius-panel)] overflow-hidden bg-footer pt-[calc(var(--radius-panel)+3.5rem)] text-ink">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-[1fr_1.1fr_1.1fr_1.1fr]">
          <LogoMark className="col-span-2 size-9 text-ink sm:col-span-1" />
          {FOOTER.columns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
        <div className="relative z-10 mt-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <p className="max-w-md text-[0.6875rem] leading-relaxed text-footer-muted/80">{note}</p>
          <Link
            href="/brand"
            className="inline-flex min-h-8 items-center text-[0.8125rem] text-footer-muted transition-colors duration-(--duration-hover) ease-out hover:text-ink sm:min-h-0"
          >
            Brand guidelines
          </Link>
        </div>
      </Container>
      <p
        aria-hidden
        className="mt-6 text-center text-[clamp(7rem,33vw,30rem)] leading-[0.8] font-medium tracking-[-0.055em] text-ink select-none"
        style={{ marginBottom: "-0.12em" }}
      >
        {wordmark}
      </p>
    </footer>
  )
}
