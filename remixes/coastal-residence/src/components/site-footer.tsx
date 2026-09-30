import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowUp } from "lucide-react"
import { useRef } from "react"

import { scrollToTarget, useLenis } from "@/components/motion"
import { Emblem } from "@/components/ui/emblem"
import { StretchText } from "@/components/ui/stretch-text"
import { contact } from "@/content"
import { Link } from "@/lib/router"

/** Contact, in deep: the number to call, where to find the office, the small print. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const stripY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-30%", "0%"])

  return (
    <footer ref={ref} id="contact" data-tone="light" className="relative flex min-h-[100svh] flex-col bg-deep px-5 text-shell sm:px-8">
      <div className="mx-auto h-24 w-full max-w-[60rem] overflow-hidden sm:h-32">
        <motion.img src={contact.strip} alt="A table laid under a vine-covered pergola" loading="lazy" style={{ y: stripY }} className="h-[160%] w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <Emblem className="size-16" />
        <a href={`tel:${contact.tel}`} className="group mt-10 font-condensed text-[clamp(3rem,8vw,9.5rem)] font-normal leading-none">
          <StretchText text={contact.phone} />
          <span className="mx-auto mt-2 block h-px w-0 bg-shell transition-[width] duration-700 ease-[var(--ease-out-soft)] group-hover:w-full" />
        </a>
        <p className="mt-8 font-sans text-[0.8rem] uppercase tracking-[0.04em]">{contact.office}</p>
        <address className="label mt-3 not-italic tracking-[0.06em]">
          {contact.address[0]}
          <br />
          {contact.address[1]}
        </address>
      </div>

      <div className="mx-auto flex w-full max-w-[60rem] flex-col gap-8 pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label tracking-[0.04em]">
            {contact.legal[0]}
            <br />
            <span className="font-normal">{contact.legal[1]}</span>
          </p>
          <p className="label mt-6 tracking-[0.04em]">
            {contact.links.map((l, i) => (
              <span key={l}>
                <a href="#top" className="transition-opacity hover:opacity-60">
                  {l}
                </a>
                {", "}
              </span>
            ))}
            <Link href="/brand" className="transition-opacity hover:opacity-60">
              Brand guidelines
            </Link>
          </p>
        </div>
        <div className="flex items-end justify-between gap-8 sm:flex-col sm:items-end">
          <button
            type="button"
            onClick={() => scrollToTarget(lenis, 0)}
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full border border-shell/30 transition-[transform,background-color] duration-300 hover:bg-shell/10 active:scale-90 lg:hidden"
          >
            <ArrowUp className="size-4" strokeWidth={1.5} />
          </button>
          <p className="label text-right tracking-[0.04em]">
            <span className="font-normal">{contact.credit[0]}</span>
            <br />
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-60">
              {contact.credit[1]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
