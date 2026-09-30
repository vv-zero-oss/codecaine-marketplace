import { LogoMark } from "@/components/blocks/logo"
import { brand, footer } from "@/content"
import { Link } from "@/lib/router"

/** The reference's footer: small, quiet, one line — the name and year on the
 *  left, two groups of links on the right. `Link` is a plain anchor for `#`
 *  and outside links, and changes page without a reload for `/brand`. */
export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-col gap-6 px-gutter pt-10 pb-6 text-micro sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-2">
        <LogoMark className="size-5 rounded-[6px]" />
        <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink">{brand.name}</span>
        <span className="text-ink-muted">© {brand.year}</span>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-3">
        {footer.groups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-ink">{group.title}</span>
            {group.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-8 items-center text-ink-muted transition-colors duration-(--duration-hover) hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  )
}
