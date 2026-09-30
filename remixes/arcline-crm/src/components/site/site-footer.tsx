import { BrandLogo } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content/site"
import { Link } from "@/lib/router"
import { PHOTOGRAPHERS } from "@/photos"

/**
 * The footer: the wordmark and status on the left, four columns of links,
 * then the legal row and the credits. Links draw an underline on hover.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line-strong bg-void">
      <Container className="grid min-h-[40svh] gap-12 py-16 lg:grid-cols-[1fr_repeat(4,200px)] lg:gap-8">
        <div className="flex flex-col gap-4">
          <Wordmark />
          <p className="flex items-center gap-2 text-sm text-ink-2">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-green" />
            </span>
            All systems normal
          </p>
        </div>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-medium text-ink-soft">{col.title}</p>
            <ul className="mt-3 flex flex-col">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="group/link inline-flex h-7 items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
                    <span className="link-draw">{label}</span>
                    {FOOTER.fresh.includes(label) && (
                      <span className="rounded-[10px] bg-accent-tint px-1.5 text-[10px] leading-4 font-medium text-accent-ink">New</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line-strong py-6 text-[13px] text-ink-3 md:flex-row md:items-center">
        <span>{FOOTER.copyright}</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {FOOTER.legal.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="link-draw transition-colors hover:text-ink">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-1 md:ml-auto">
          {(["linkedin", "x"] as const).map((brand) => (
            <a
              key={brand}
              href={`#${brand}`}
              aria-label={brand === "x" ? "Arcline on X" : "Arcline on LinkedIn"}
              className="flex size-9 items-center justify-center rounded-control text-ink-2 transition-colors duration-300 hover:bg-hover-2 hover:text-ink hover:duration-[50ms]"
            >
              <BrandLogo brand={brand} scale={0.8} aria-hidden />
            </a>
          ))}
        </div>
      </Container>
      <Container className="pb-8 text-caption text-ink-faint">
        Photography from{" "}
        <a href="https://www.pexels.com" className="underline underline-offset-2 hover:text-ink-3">
          Pexels
        </a>{" "}
        by {PHOTOGRAPHERS.join(", ")}. Isometric icons from{" "}
        <a href="https://isocons.app" className="underline underline-offset-2 hover:text-ink-3">
          Isocons
        </a>{" "}
        (
        <a href="https://creativecommons.org/licenses/by/4.0/" className="underline underline-offset-2 hover:text-ink-3">
          CC BY 4.0
        </a>
        , recoloured). Agent UI primitives from Beautiful UI (MIT). Logos from SVGL.
      </Container>
    </footer>
  )
}
