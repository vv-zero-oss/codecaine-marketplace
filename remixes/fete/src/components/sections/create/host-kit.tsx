import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const KIT = [
  { title: "A page that looks like the night", body: "Posters, moods and your own words. No template feel, no clutter.", photo: 6760872 },
  { title: "Tickets that pay out in two days", body: "Free, paid, pay-what-you-like or invite-only. 5% when you charge, nothing when you don’t.", photo: 31057721 },
  { title: "A door on every phone", body: "Any co-host can scan. The list syncs live, even on bad venue wifi.", photo: 6521573 },
  { title: "Recaps that bring them back", body: "Photos, a thank-you and the next date, sent the morning after.", photo: 36729891 },
  { title: "A community, not a mailing list", body: "Members, a calendar and a page that grows every time you host.", photo: 3768884 },
]

/**
 * What a host gets, as one oversized list. Point at a line and a photo of
 * that moment follows the cursor; on touch, the line opens instead.
 */
export function HostKit() {
  const [active, setActive] = useState<number | null>(null)
  const ref = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    const r = ref.current!.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="py-section">
      <Container className="max-w-[1180px]">
        <SectionHeading size="loud" eyebrow="What you get" title="Everything a good night needs." continuation="Nothing it doesn’t." />
        <ul ref={ref} onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative border-t border-line">
          {KIT.map((k, i) => (
            <li key={k.title} className="border-b border-line">
              <button
                type="button"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left md:gap-8 md:py-8"
              >
                <span className="font-mono text-[13px] text-ink-4 tabular-nums">0{i + 1}</span>
                <span>
                  <span className={cn("block text-[clamp(25.89px,4vw,53.29px)] leading-[1.02] font-semibold tracking-[-0.04em] transition-colors duration-(--duration-hover)", active === null || active === i ? "text-ink" : "text-ink-4")}>
                    {k.title}
                  </span>
                  <span className={cn("grid transition-[grid-template-rows,opacity] duration-(--duration-swap) ease-(--ease-out-strong)", active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <span className="overflow-hidden">
                      <span className="block max-w-[46ch] pt-3 text-[17px] text-ink-3">{k.body}</span>
                    </span>
                  </span>
                </span>
                <ArrowUpRight className={cn("size-6 text-ink-4 transition-transform duration-(--duration-swap) ease-(--ease-out-strong)", active === i && "rotate-45 text-ink")} />
              </button>
            </li>
          ))}
          <AnimatePresence>
            {active !== null && !reduced && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 z-10 hidden w-56 -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-(--radius-poster) bg-raised p-1.5 shadow-(--shadow-lift) md:block"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={active}
                    src={pexels(KIT[active].photo, 448, 320)}
                    alt=""
                    className="aspect-[7/5] w-full rounded-[10px] object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </motion.span>
            )}
          </AnimatePresence>
        </ul>
      </Container>
    </section>
  )
}
