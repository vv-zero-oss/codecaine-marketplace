import { motion, useMotionValue, useSpring } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

import { servicesLine } from "@/components/work/tones"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A case in the work grid: a white card, a tall picture, the client in caps
 * and what we made in serif. Over the picture a “View case” pill follows the
 * pointer; on touch it simply sits in the corner.
 */
export function WorkCard({ item, className }: { item: Case; className?: string }) {
  const [over, setOver] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn("group/card relative block bg-card p-3 shadow-card md:p-4", className)}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return
        const box = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - box.left)
        y.set(event.clientY - box.top)
      }}
      onPointerEnter={(event) => event.pointerType === "mouse" && setOver(true)}
      onPointerLeave={() => setOver(false)}
    >
      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden bg-paper">
          <img
            src={photo(item.image, 800)}
            alt={`${item.client}: ${item.title}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/card:scale-[1.04]"
          />
        </div>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-pill bg-card px-3 py-1.5 label text-xs text-blue md:hidden">
          View case <ArrowRight className="size-3" strokeWidth={3} />
        </span>
      </div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden items-center gap-1 rounded-pill bg-card px-3 py-1.5 label text-xs text-blue shadow-sticker md:inline-flex"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-150%" }}
        initial={false}
        animate={{ opacity: over ? 1 : 0, scale: over ? 1 : 0.6 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        View case <ArrowRight className="size-3" strokeWidth={3} />
      </motion.span>
      <div className="px-2 pt-4 pb-2 text-center">
        <h3 className="display text-[clamp(2rem,3.4vw,3rem)]">{item.client}</h3>
        <p className="mt-1 font-serif text-xl leading-tight tracking-tight md:text-2xl">{servicesLine(item.services)}</p>
      </div>
    </Link>
  )
}
