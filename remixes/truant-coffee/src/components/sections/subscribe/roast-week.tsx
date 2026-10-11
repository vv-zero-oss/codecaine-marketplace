import { useRef } from "react"
import { Flame, Package, Truck } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const DAYS = [
  { day: "Tuesday", title: "We roast it", body: "Your coffee goes in the drum with everyone else's. Rested overnight, cupped first thing.", Icon: Flame },
  { day: "Wednesday", title: "We pack it", body: "Weighed, sealed with a one-way valve, labelled with the roast date and the curve.", Icon: Package },
  { day: "Friday", title: "You open it", body: "Three days off the drum, which is exactly when it starts tasting like itself.", Icon: Truck },
]

/**
 * The week a bag lives through before it reaches you, told as a line that
 * draws itself across the three days as you scroll past.
 */
export function RoastWeek({ title = "From the drum to your door in three days" }: { title?: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] })
  const fill = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0, 1])

  return (
    <section ref={ref} className="bg-night px-[var(--spacing-gutter)] py-[var(--spacing-section)] text-night-fg">
      <h2 className="type-display max-w-[16ch] text-d4">{title}</h2>
      <div className="relative mt-14">
        <div className="absolute top-5 right-0 left-0 hidden h-px bg-night-line md:block" />
        <motion.div style={{ scaleX: fill }} className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-recess md:block" />
        <ol className="grid gap-10 md:grid-cols-3">
          {DAYS.map(({ day, title, body, Icon }, i) => (
            <motion.li key={day} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ delay: i * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <span className="relative grid size-10 place-items-center rounded-full bg-night-fg text-night">
                <Icon className="size-4.5 stroke-[1.6]" />
              </span>
              <p className="type-eyebrow mt-6 text-night-muted">{day}</p>
              <p className="type-display mt-2 text-d2">{title}</p>
              <p className="mt-2 max-w-[34ch] text-night-muted">{body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
