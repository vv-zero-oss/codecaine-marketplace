import { ThemeToggle } from "@/components/theme-toggle"
import { Mark } from "@/components/ui/mark"
import { FILM, WINDOW } from "@/content/photos"

const LINKS = [
  { label: "Docs", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
]

/**
 * The sign-off: a row of links, the small print with the photo credits, and
 * the mark and name set as large as the page is wide. It shares the closing
 * gradient with the waitlist above it.
 */
export function SiteFooter() {
  const credits = [...new Map([...FILM, ...WINDOW].map((p) => [p.by, p])).values()]
  return (
    <footer data-tone="bare" className="bg-closing relative flex bg-fixed min-h-svh flex-col justify-end px-4 pt-[clamp(140px,30svh,320px)] pb-10 sm:px-[72px] sm:pb-16">
      <nav aria-label="Footer" className="mb-8 sm:mb-14">
        <ul className="flex flex-wrap gap-x-[clamp(28px,6vw,86px)] gap-y-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center text-[clamp(18px,1.7vw,24px)] font-medium tracking-[-0.01em] transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mb-[clamp(48px,7svh,96px)] flex flex-wrap items-center gap-x-10 gap-y-2 text-[15px] font-medium">
        <span>© 2026 Codecaine. All rights reserved.</span>
        <a href="#" className="inline-flex min-h-11 items-center transition-opacity hover:opacity-60 sm:min-h-0">Privacy</a>
        <a href="#" className="inline-flex min-h-11 items-center transition-opacity hover:opacity-60 sm:min-h-0">Terms</a>
        <ThemeToggle className="sm:ml-auto" />
        {credits.length > 0 && (
          <span className="basis-full text-[12px] font-normal text-ink-soft">
            Photography from Pexels by{" "}
            {credits.map((p, i) => (
              <span key={p.by}>
                <a href={p.url} className="underline-offset-2 hover:underline">
                  {p.by}
                </a>
                {i < credits.length - 1 ? ", " : "."}
              </span>
            ))}
          </span>
        )}
      </div>
      <p aria-label="Codecaine" className="flex items-end gap-[3vw] leading-none">
        <Mark className="size-[16.5vw] shrink-0 text-ink" />
        <span aria-hidden className="-mb-[0.2em] text-[13.7vw] font-semibold tracking-[-0.045em] whitespace-nowrap">
          Codecaine
        </span>
      </p>
    </footer>
  )
}
