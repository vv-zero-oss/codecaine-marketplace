import { useId, useRef } from "react"
import { ArrowUp } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { Container } from "@/components/ui/container"
import { brand, footer, pexels, visit } from "@/content"
import { homeHref, Link, usePathname } from "@/lib/router"

/**
 * The name, the full width of the page, with the fried chicken showing
 * through the letters (an SVG `clipPath` made of text). As the footer comes
 * up, the picture slides inside the letters, so the crust seems to move
 * behind a window.
 */
function PhotoWordmark() {
  const id = `wordmark-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [-260, -260] : [-420, -120])
  return (
    <div ref={ref}>
    <svg viewBox="0 0 1000 232" className="block w-full" role="img" aria-label={brand.name}>
      <defs>
        <clipPath id={id}>
          <text
            x="0"
            y="222"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontStretch: "112%", fontSize: 290 }}
          >
            {brand.name.toUpperCase()}
          </text>
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="1000" height="232" className="fill-orange" />
        <motion.image
          href={pexels(footer.wordmarkPhoto.id, 1800)}
          width="1000"
          height="700"
          preserveAspectRatio="xMidYMid slice"
          style={{ y }}
        />
      </g>
    </svg>
    </div>
  )
}

const FOOTER_LINK =
  "inline-flex min-h-11 items-center font-condensed text-label uppercase underline-offset-[6px] decoration-2 [@media(hover:hover)]:hover:underline"

export function SiteFooter() {
  const pathname = usePathname()
  return (
    <footer data-tone="dark" className="bg-forest pt-section text-cream">
      <Container className="grid gap-row pb-row sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="max-w-[16ch] font-heavy text-[clamp(32px,4vw,64px)] leading-[0.9] text-lime">Hungry yet? Come in loud.</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-1">
          {footer.links.map((l) => (
            <a key={l.label} href={homeHref(l.href, pathname)} className={FOOTER_LINK}>
              {l.label}
            </a>
          ))}
          <Link href="/brand" className={FOOTER_LINK}>
            Brand guidelines
          </Link>
        </nav>
        <div className="grid content-start gap-2 text-body text-on-forest">
          <p>{brand.address.join(", ")}</p>
          <p>{brand.phone}</p>
          <p>
            <a href={`mailto:${brand.email}`} className="underline underline-offset-4">
              {brand.email}
            </a>
          </p>
          <ul className="mt-4 grid gap-1 text-ui text-on-forest-muted">
            {visit.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="tabular-nums">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="px-gutter">
        <PhotoWordmark />
      </div>

      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline-forest py-6 text-ui text-on-forest-muted">
        <span>{footer.legal}</span>
        <a href={footer.creditHref} className="underline underline-offset-4">
          {footer.credit}
        </a>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 font-condensed text-label uppercase text-cream">
          Back to top <ArrowUp className="size-4" aria-hidden />
        </a>
      </Container>
    </footer>
  )
}
