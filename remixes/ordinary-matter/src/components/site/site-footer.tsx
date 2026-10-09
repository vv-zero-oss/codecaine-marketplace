import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { Wordmark } from "@/components/site/logo"
import { SOCIAL } from "@/content/site"
import { Link } from "@/lib/router"

/**
 * The colophon line, on the stone the shop sits on — and under it the name
 * at full width, rising into place as the page runs out.
 */
export function SiteFooter({ year = 2026 }: { year?: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const rise = useTransform(scrollYProgress, [0, 1], ["translateY(28%)", "translateY(0%)"])

  return (
    <footer ref={ref} className="overflow-hidden bg-stone text-ink">
      <div className="flex flex-col gap-6 px-gutter pt-16 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-end gap-8">
          <Wordmark className="text-[19px] leading-[0.92]" />
          <p className="font-serif text-[13px] leading-[1.45] text-ink-2">
            © {year} Ordinary Matter
            <br />
            Stories may not be reused without written permission. Photography via Pexels.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {SOCIAL.map((item, i) => (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="type-label text-ink-3">/</span>}
              <Link href={item.href} className="type-label link-draw inline-flex h-11 items-center text-ink-2 hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden className="px-gutter">
        <motion.p
          style={reduced || designing ? undefined : { transform: rise }}
          className="type-display translate-y-[0.06em] text-center text-masthead whitespace-nowrap text-ink"
        >
          Ordinary Matter
        </motion.p>
      </div>
    </footer>
  )
}
