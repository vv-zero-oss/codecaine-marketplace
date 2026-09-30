import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { cta, footer, hotel } from "@/content"

/**
 * The last ask and the small print: an ice card with the closing line, and
 * the wordmark set enormous in a deeper ice, rising into place as the page
 * runs out.
 */
export function SiteFooter({ title = cta.title, subtitle = cta.subtitle, button = "Book a stay" }: { title?: string; subtitle?: string; button?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, 0])

  return (
    <footer className="bg-snow px-3 pt-3 sm:px-4 sm:pt-4">
      <div ref={ref} className="relative overflow-hidden rounded-band bg-ice px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-headline max-w-[16ch] text-4xl tracking-tighter sm:text-5xl">{title}</p>
            <p className="mt-3 max-w-[40ch] text-ink-soft">{subtitle}</p>
            <Button className="mt-6" size="lg" onClick={() => scrollTo("#book")}>
              {button}
            </Button>
          </div>
          <address className="text-sm leading-relaxed text-ink-soft not-italic sm:text-right">
            {hotel.full}
            <br />
            {hotel.address}
            <br />
            {hotel.phone}
            <br />
            <a className="underline-offset-4 hover:underline" href={`mailto:${hotel.email}`}>
              {hotel.email}
            </a>
          </address>
        </div>
        <motion.p
          aria-hidden
          style={{ y }}
          className="mt-6 -mb-[0.2em] text-center text-[34vw] leading-[0.9] font-light tracking-[-0.06em] text-ice-deep select-none"
        >
          {hotel.name}
        </motion.p>
      </div>
      <div className="flex flex-col gap-3 px-2 py-6 text-[13px] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© 2026 {hotel.full}</span>
          {footer.links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
        <p>
          Photography and film from{" "}
          <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">
            Pexels
          </a>
        </p>
      </div>
    </footer>
  )
}
