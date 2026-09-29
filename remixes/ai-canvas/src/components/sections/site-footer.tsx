import { LogoMark } from "@/components/blocks/logo"
import { brand, footer } from "@/content"

/**
 * The foot of the page: the links in one row, the small print under them,
 * and the name set as large as the screen allows — the last thing on the
 * page is who it was from. Spaced on the φ scale.
 */
export function SiteFooter() {
  const links = footer.groups.flatMap((group) => group.links)
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-col gap-phi-4 overflow-hidden px-gutter pt-phi-6 pb-phi-4">
      <nav aria-label="Footer" className="flex flex-wrap gap-x-phi-4 gap-y-phi-1 sm:gap-x-phi-5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink transition-opacity duration-(--duration-hover) hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="text-micro text-mist">
        © {brand.year} {brand.name}. All rights reserved.
      </p>
      <p
        aria-label={brand.name}
        className="mt-phi-5 flex items-center gap-[0.12em] text-[clamp(64px,15.4vw,224px)] leading-[0.8] font-semibold tracking-[-0.055em] text-ink"
      >
        <LogoMark className="size-[0.86em] rounded-[0.2em]" />
        <span aria-hidden>{brand.name}</span>
      </p>
    </footer>
  )
}
