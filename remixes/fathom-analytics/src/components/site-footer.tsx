import { Container } from "@/components/ui/container"
import { Mark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content"
import { Link } from "@/lib/router"

export function SiteFooter() {
  return (
    <footer className="bg-surface pt-20 pb-10 sm:pt-28">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[1.2fr_repeat(4,1fr)]">
          <Mark className="col-span-2 size-6 sm:col-span-1" />
          {FOOTER.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="mb-3 text-[13px] font-medium text-ink">{group.title}</h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="inline-flex min-h-8 items-center text-[13px] text-ink-2 transition-colors duration-(--duration-fast) hover:text-ink">{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-3">
          <p>© 2026 Fathom Analytics, Inc.</p>
          <p>
            Photography and video by Pexels · <Link href="/brand" className="underline-offset-4 hover:underline">Brand guidelines</Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
