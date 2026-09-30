import { TetrisSkyline } from "@/components/motion/tetris-skyline"
import { PixelMark } from "@/components/marks/pixel-marks"
import { Container } from "@/components/ui/container"
import { brand, closing, footer } from "@/content"
import { Link } from "@/lib/router"
import { CITIES, CityLine, type City } from "./city-line"

/**
 * The page's foot: the site's links, then an edge region's skyline in line
 * art — a different city on every page — with a playable skyline of pixels
 * stacked along its base.
 */
export function SiteFooter({ city = "london" }: { city?: City }) {
  const c = CITIES[city]
  return (
    <footer className="mt-10 border-t border-hairline">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Cirrus home">
            <PixelMark />
            <span className="label !tracking-[0.24em] text-ink">Cirrus</span>
          </Link>
          <p className="mt-4 max-w-[18rem] text-small text-ink-soft">{footer.blurb}</p>
          <a href={`mailto:${brand.email}`} className="mt-4 inline-block text-small text-ink underline-offset-4 hover:underline">
            {brand.email}
          </a>
        </div>
        {footer.columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="label text-faint">{column.title}</p>
            <ul className="mt-4 space-y-1">
              {column.links.map((link) => (
                <li key={link.title}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="inline-flex min-h-9 items-center text-small text-ink-soft transition-colors duration-(--duration-hover) hover:text-ink">
                      {link.title}
                    </Link>
                  ) : (
                    <a href={link.href} className="inline-flex min-h-9 items-center text-small text-ink-soft transition-colors duration-(--duration-hover) hover:text-ink">
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="relative">
        <Container className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between">
          <p className="label text-mute">
            Edge · {c.code} — {c.name}
          </p>
          <p className="label hidden text-faint sm:block">© 2026 Cirrus</p>
        </Container>
        <CityLine city={city} className="mt-6 opacity-90" />
        <TetrisSkyline rows={14} className="md:-mt-[calc(var(--spacing-pixel)*14)]" />
      </div>
      <p className="label bg-paper px-gutter py-5 text-center text-faint">{closing.credits}</p>
    </footer>
  )
}
