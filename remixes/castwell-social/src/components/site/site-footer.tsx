import { LogoMark } from "@/components/ui/logo-mark"
import { Container } from "@/components/ui/container"
import { FOOTER_COLUMNS } from "@/content/site"
import { PHOTOGRAPHERS } from "@/photos"
import { Link } from "@/lib/router"

/** The big mark, six link columns, and the fine print. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-page">
      <Container className="grid gap-12 py-14 md:grid-cols-[minmax(160px,1fr)_3fr] md:py-20">
        <LogoMark className="size-20 text-ink md:size-28" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-[13px] text-muted">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13px] text-ink transition-colors hover:text-muted">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-line py-6 text-[12px] text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© 2026 Castwell, Inc. All rights reserved.</span>
          <Link href="/pricing#faq" className="text-ink hover:text-muted">Privacy</Link>
          <Link href="/pricing#faq" className="text-ink hover:text-muted">Terms</Link>
          <Link href="/brand" className="text-ink hover:text-muted">Brand guidelines</Link>
        </div>
        <p className="max-w-2xl md:text-right">
          Photography from{" "}
          <a href="https://www.pexels.com" className="text-ink underline-offset-2 hover:underline">
            Pexels
          </a>{" "}
          by {PHOTOGRAPHERS.join(", ")}. Channel logos from{" "}
          <a href="https://svgl.app" className="text-ink underline-offset-2 hover:underline">
            SVGL
          </a>
          .
        </p>
      </Container>
    </footer>
  )
}
