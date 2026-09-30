import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { TornEdge } from "@/components/ui/torn-edge"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { footer, hotel } from "@/content"
import { Link } from "@/lib/router"

/**
 * The back cover: torn off in pine, the address set as it would be on the
 * letterhead, and the house's name very large in a tone barely off the sheet.
 */
export function SiteFooter({ closing = "The ski room opens at 7:15.", cta = "Reserve a room" }: { closing?: string; cta?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0])

  return (
    <footer className="relative">
      <TornEdge tone="pine" seed={29} className="-mb-px" />
      <div ref={ref} className="overflow-hidden bg-pine text-pine-ink">
        <div className="mx-auto max-w-[84rem] px-5 pt-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 border-b border-pine-ink/25 pb-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-serif text-4xl leading-tight sm:text-5xl">{closing}</p>
              <Button variant="signal" size="lg" className="mt-8" onClick={() => scrollTo("#reserve")}>
                {cta}
              </Button>
            </div>
            <address className="text-[15px] leading-relaxed not-italic md:col-span-3 md:col-start-8">
              <p className="label text-pine-ink/55">Write</p>
              <p className="mt-2">
                {hotel.full}
                <br />
                {hotel.address}
              </p>
            </address>
            <div className="text-[15px] leading-relaxed md:col-span-2">
              <p className="label text-pine-ink/55">Call</p>
              <p className="mt-2">
                {hotel.phone}
                <br />
                <a href={`mailto:${hotel.email}`} className="underline decoration-pine-ink/30 underline-offset-4 hover:decoration-pine-ink">
                  {hotel.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-6 text-[13px] text-pine-ink/60 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>© 2026 {hotel.full}</span>
              {footer.links.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-pine-ink">
                  {l.label}
                </Link>
              ))}
            </div>
            <p>
              Photographs and film from{" "}
              <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-pine-ink">
                Pexels
              </a>
            </p>
          </div>
        </div>
        <motion.p
          aria-hidden
          style={{ y }}
          className="pointer-events-none -mb-[0.22em] text-center font-serif text-[36vw] leading-[0.8] tracking-[-0.05em] text-pine-ink/[0.07] italic select-none"
        >
          {hotel.name}
        </motion.p>
      </div>
    </footer>
  )
}
