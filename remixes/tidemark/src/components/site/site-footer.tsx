import { Wordmark } from "@/components/ui/wordmark"
import { Container } from "@/components/ui/container"
import { FOOTER } from "@/content"
import { Link } from "@/lib/router"

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

/** The footer: the wordmark, four columns of links, and the disclosures a bank page owes its reader. */
export function SiteFooter() {
  return (
    <footer className="bg-night-deep pt-16 pb-10 text-night-fg">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <Wordmark className="text-pink" />
            <p className="max-w-[280px] text-[14px] leading-[1.55] text-night-muted">Business banking for companies that would rather be building.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <p className="type-eyebrow text-night-muted">{col.title}</p>
                <ul className="mt-4 flex flex-col">
                  {col.links.map((link) => (
                    <li key={link}>
                      {link === "Brand guidelines" ? (
                        // The one real page behind the footer: the style guide.
                        <Link href="/brand" className="inline-flex min-h-9 items-center text-[14.5px] text-night-fg/85 transition-colors duration-(--duration-hover) hover:text-pink">
                          {link}
                        </Link>
                      ) : (
                        <a href={slug(link)} className="inline-flex min-h-9 items-center text-[14.5px] text-night-fg/85 transition-colors duration-(--duration-hover) hover:text-pink">
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-14 border-t border-night-line pt-8 text-[12px] leading-[1.6] text-night-muted">{FOOTER.disclosure}</p>
        <p className="mt-4 text-[12px] text-night-muted">© 2026 Tidemark · {FOOTER.credit}</p>
      </Container>
    </footer>
  )
}
