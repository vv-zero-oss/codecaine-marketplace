import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content"
import { Link } from "@/lib/router"
import xLogo from "@/assets/logos/x.svg"
import linkedinLogo from "@/assets/logos/linkedin.svg"

function Glyph({ src, label, href = "#top" }: { src: string; label: string; href?: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-11 items-center justify-center text-text transition-opacity hover:opacity-70"
    >
      <span
        className="size-4 bg-current"
        style={{
          WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`,
          WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
          WebkitMaskPosition: "center", maskPosition: "center",
          WebkitMaskSize: "contain", maskSize: "contain",
        }}
      />
    </a>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bar py-12 sm:py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,270px)_1fr]">
          <div>
            <Link href="/" aria-label="Halo home"><Wordmark className="text-[20px]" /></Link>
            <p className="mt-5 flex items-center gap-2 font-mono text-[9px] tracking-wider text-muted uppercase">
              <span className="size-1.5 rounded-full bg-warn" />{FOOTER.status}
            </p>
            <ul className="mt-4 flex gap-2">
              {FOOTER.badges.map((b) => (
                <li key={b} title={b} className="flex size-8 items-center justify-center rounded-full border border-line-strong bg-white/5 text-center font-mono text-[7px] leading-[8px] text-muted">
                  {b.split(" ").map((w) => <span key={w} className="block">{w}</span>)}
                </li>
              ))}
            </ul>
            <div className="mt-5 -ml-3 flex">
              <Glyph src={xLogo} label="Halo on X" />
              <Glyph src={linkedinLogo} label="Halo on LinkedIn" />
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER.columns.map((col, i) => (
              <div key={i}>
                <p className="mb-4 h-3 font-mono text-[9px] tracking-wider text-faint uppercase">{col.title}</p>
                <ul className="space-y-1">
                  {col.links.map((l) => (
                    <li key={l}><a href="#top" className="inline-flex min-h-8 items-center text-[13px] text-text transition-colors hover:text-muted">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[11px] text-faint lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-text">
            {FOOTER.legal.map((l) => <li key={l}><a href="#top" className="hover:text-muted">{l}</a></li>)}
          </ul>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© 2026 Halo Systems, Inc.</span>
            <Link href="/brand" className="hover:text-muted">Brand guidelines</Link>
            <span>Photography: <a className="underline underline-offset-2 hover:text-muted" href="https://www.pexels.com">Pexels</a></span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
