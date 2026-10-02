import { Wordmark } from "@/components/pixel/wordmark"
import { Container } from "@/components/ui/container"
import { MORE_PAGES, NAV } from "@/content"
import { Newsletter } from "@/components/newsletter"
import { Link } from "@/lib/router"

export function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-label uppercase text-fg-subtle">{title}</h3>
      <ul className="mt-phi-2 grid gap-2.5 text-base text-fg-muted">{children}</ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-line bg-surface">
      <Container className="grid gap-phi-4 py-phi-5 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-phi-2 text-base text-fg-muted">A secure web gateway that checks on the device and lets traffic go direct.</p>
          <p className="mb-phi-2 mt-phi-3 font-display text-label uppercase text-fg-subtle">Release notes, monthly</p>
          <Newsletter />
        </div>
        <FooterColumn title="Site">
          {[...NAV, ...MORE_PAGES].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-fg">{item.label}</Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Product">
          <li><Link href="/products#tls" className="hover:text-fg">TLS inspection</Link></li>
          <li><Link href="/products#radar" className="hover:text-fg">Shadow AI radar</Link></li>
          <li><Link href="/products#policy" className="hover:text-fg">Policy push</Link></li>
        </FooterColumn>
        <FooterColumn title="Credits">
          <li>
            Photography by{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-fg">
              Pexels
            </a>
            , pixelated.
          </li>
          <li>Type: Pixelify Sans, Press Start 2P, VT323.</li>
        </FooterColumn>
      </Container>
      <Container className="flex flex-col gap-phi-1 border-t-2 border-line py-phi-3 font-mono text-lg text-fg-subtle sm:flex-row sm:justify-between">
        <span>© 2026 Pixelkeep. A fictional product.</span>
        <span>Press START to continue</span>
      </Container>
    </footer>
  )
}
