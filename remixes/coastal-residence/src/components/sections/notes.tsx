import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Plus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { EASE_OUT } from "@/components/motion"
import { CircleLink } from "@/components/ui/circle-link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { notes } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The gardens at dusk, with a few things worth knowing pinned to the picture:
 * each pulsing point opens a note card beside it.
 */
export function Notes() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<string | null>(null)
  // Beside the point on a wide screen; below it on a phone, where there is no room at the side.
  const [side, setSide] = useState<"right" | "bottom">("right")
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const update = () => setSide(query.matches ? "right" : "bottom")
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1.12, 1])

  return (
    <section ref={ref} id="gardens" data-tone="light" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink">
      <motion.img
        src={notes.image}
        alt="The pool and terraces lit at dusk"
        loading="lazy"
        style={{ scale }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/10" />

      {notes.points.map((point) => (
        <Popover key={point.id} open={open === point.id} onOpenChange={(o) => setOpen(o ? point.id : null)}>
          <PopoverTrigger
            aria-label={point.title}
            className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <span className="absolute inset-1 rounded-full border border-paper/70 animate-pulse-ring" />
            <span
              className={cn(
                "relative grid size-7 place-items-center rounded-full border border-paper/80 text-paper transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-active:scale-95",
                open === point.id ? "bg-paper text-ink" : "bg-paper/10 backdrop-blur-[2px]",
              )}
            >
              {open === point.id ? <X className="size-3.5" strokeWidth={1.5} /> : <Plus className="size-3.5" strokeWidth={1.5} />}
            </span>
          </PopoverTrigger>
          <PopoverContent
            side={side}
            align="center"
            sideOffset={20}
            collisionPadding={16}
            className="w-[min(20.5rem,calc(100vw-2rem))] rounded-[var(--radius-card)] border-0 bg-shell p-0 text-ink shadow-[var(--shadow-card)] outline-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="m-1.5 flex min-h-[22rem] flex-col justify-between border border-ink/10 p-6"
            >
              <h3 className="font-condensed text-[2.4rem]">{point.title}</h3>
              <p className="text-body">{point.body}</p>
            </motion.div>
          </PopoverContent>
        </Popover>
      ))}

      <div className="absolute inset-x-0 bottom-6 flex justify-center sm:bottom-10">
        <CircleLink href="#residences" tone="light" className="size-32 sm:size-40">
          {notes.cta}
        </CircleLink>
      </div>
    </section>
  )
}
