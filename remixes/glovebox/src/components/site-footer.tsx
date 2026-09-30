import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { LogoMark } from "@/components/ui/logo-mark"
import { footerColumns } from "@/content"
import { Link } from "@/lib/router"

/** The sign-off: the promise once more, the links, and the small print. */
export function SiteFooter() {
  return (
    <footer className="rounded-b-[2.5rem] bg-surface pt-16 pb-10 sm:pt-24 sm:pb-12">
      <Container className="grid gap-14 lg:grid-cols-[1fr_minmax(0,40rem)]">
        <div>
          <p className="font-display text-[clamp(2.25rem,2.6vw+1rem,4rem)] leading-[1.04] tracking-[-0.025em] text-ink">
            AI that runs your
            <br />
            <em>car insurance</em>
          </p>
          <ButtonLink href="#top" variant="ink" className="mt-8">
            Get started
          </ButtonLink>
        </div>
        <div className="grid gap-12">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[15px] text-muted">{column.title}</p>
                <ul className="mt-3 space-y-1">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="inline-flex min-h-8 items-center text-[15px] text-ink transition-colors duration-(--duration-ui) hover:text-muted"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="lg:mt-16">
            <LogoMark className="size-10 text-ink" />
            <p className="mt-4 font-mono text-[13px] leading-relaxed text-ink">
              © 2026 Glovebox Technologies, Inc. All rights reserved.
              <br />
              Made in Portland, OR.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
              Photography and film from{" "}
              <a href="https://www.pexels.com" className="underline underline-offset-2 hover:text-ink">
                Pexels
              </a>
              . Insurers named on this page are fictional.
            </p>
            <Link
              href="/brand"
              className="mt-3 inline-flex min-h-8 items-center font-mono text-[13px] text-ink underline-offset-2 transition-colors duration-(--duration-ui) hover:text-muted hover:underline"
            >
              Brand guidelines
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
