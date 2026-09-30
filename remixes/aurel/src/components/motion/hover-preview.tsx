import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { useRef, useState, type MouseEvent } from "react"

import { MixedTitle } from "@/components/ui/mixed-title"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

type Row = { href: string; title: string; meta: string; aside: string; image: string; alt: string }

/**
 * An index of rows with the picture of the hovered one trailing the cursor.
 *
 * The picture follows on a soft spring (it lags, then catches up) and
 * crossfades between rows rather than jumping. On touch screens there is
 * no cursor, so each row carries its own thumbnail instead.
 */
export function HoverPreview({ rows, stiffness = 260, damping = 30, className }: { rows: Row[]; stiffness?: number; damping?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness, damping })
  const y = useSpring(my, { stiffness, damping })

  const move = (event: MouseEvent) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    mx.set(event.clientX - box.left)
    my.set(event.clientY - box.top)
  }

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setActive(null)} className={cn("relative border-t border-ink/15", className)}>
      {rows.map((row, index) => (
        <Link
          key={row.href}
          href={row.href}
          onMouseEnter={() => setActive(index)}
          className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-ink/15 py-4 transition-colors duration-(--duration-hover) hover:text-ink sm:grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_auto] md:py-7"
        >
          <img src={row.image} alt="" loading="lazy" className="aspect-[4/5] w-16 object-cover sm:hidden" />
          <MixedTitle
            as="span"
            text={row.title}
            className="text-[clamp(28px,4vw,64px)] leading-none tracking-[-0.01em] text-ink transition-[transform,color] duration-500 ease-(--ease-out-soft) group-hover:translate-x-3 [@media(hover:hover)]:group-hover:text-ember-deep"
          />
          <span className="hidden font-serif text-[17px] text-ink-muted md:block">{row.meta}</span>
          <span className="justify-self-end font-sans text-[14px] tabular-nums text-ink sm:text-[15px]">{row.aside}</span>
        </Link>
      ))}
      {!reduced && (
        <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)]:md:block" aria-hidden>
          <AnimatePresence>
            {active !== null && (
              <motion.img
                key={rows[active].image}
                src={rows[active].image}
                alt=""
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-[110px] -top-[140px] h-[280px] w-[220px] object-cover shadow-frame"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
