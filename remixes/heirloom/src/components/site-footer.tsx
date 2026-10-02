import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content"
import { Link } from "@/lib/router"

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink pt-16 pb-10">
      <Container>
        <div className="grid gap-12 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-[13px] leading-relaxed text-fg-muted">
              A private family office for founders, athletes and artists. Heirloom is a fictional firm, made as a template.
            </p>
          </div>
          {FOOTER.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[10px] font-medium tracking-[0.14em] text-fg-subtle uppercase">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-[13px] text-fg-muted transition-colors hover:text-fg">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-[11px] text-fg-subtle sm:flex-row sm:justify-between">
          <p>
            © 2026 Heirloom. Photography from{" "}
            <a href="https://www.pexels.com" className="underline-offset-4 hover:text-fg hover:underline">
              Pexels
            </a>
            .
          </p>
          <p>
            <Link href="/brand" className="underline-offset-4 hover:text-fg hover:underline">
              Brand guidelines
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
