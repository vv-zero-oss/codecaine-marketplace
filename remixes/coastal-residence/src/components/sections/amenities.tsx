import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useRef, useState } from "react"

import { EASE_OUT, scrollToTarget, useLenis } from "@/components/motion"
import { CircleLink } from "@/components/ui/circle-link"
import { amenities } from "@/content"
import { cn } from "@/lib/utils"

/**
 * What the grounds hold, pinned full-screen: scrolling steps through the list
 * on the right, the photograph and the caption follow. Each name is also a
 * button that jumps straight to it.
 */
export function Amenities() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(amenities.length - 1, Math.max(0, Math.floor(v * amenities.length))))
  })
  const active = amenities[step]

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const room = el.offsetHeight - window.innerHeight
    scrollToTarget(lenis, top + room * ((i + 0.5) / amenities.length))
  }

  return (
    <section ref={ref} id="amenities" data-tone="light" className="relative bg-ink" style={{ height: `${amenities.length * 90}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-paper">
        <AnimatePresence initial={false}>
          <motion.img
            key={active.image}
            src={active.image}
            alt={active.name}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/5 via-45% to-ink/45" />

        <h2 className="sr-only">Amenities</h2>
        <ul className="absolute right-5 top-28 sm:right-[18vw] sm:top-[20vh]">
          {amenities.map((item, i) => (
            <li key={item.name} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute -left-4 top-1 bottom-1 w-px bg-paper"
                initial={false}
                animate={{ opacity: i === step ? 1 : 0, scaleY: i === step ? 1 : 0.3 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={i === step}
                className={cn(
                  "min-h-11 text-left font-condensed text-[clamp(1.6rem,2.4vw,2.6rem)] leading-[1.05] transition-opacity duration-500",
                  i === step ? "opacity-100" : "opacity-35 hover:opacity-70",
                )}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-10 left-5 right-5 sm:bottom-[8vh] sm:left-[12.5vw] sm:right-auto sm:max-w-[40rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <p className="label">{active.name}</p>
              <p className="mt-6 font-condensed text-[clamp(2rem,3vw,3.2rem)] leading-[0.98]">{active.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-[26vh] right-[10vw] hidden lg:block">
          <CircleLink href="#contact" tone="light" className="size-44">
            Book a viewing now
          </CircleLink>
        </div>
      </div>
    </section>
  )
}
