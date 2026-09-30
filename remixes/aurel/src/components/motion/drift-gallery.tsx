import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type Picture = { src: string; alt: string }

/**
 * A loose wall of small pictures whose columns drift at different speeds.
 *
 * The middle column carries whatever is passed as `children` (a button),
 * pinned at the centre while the wall slides past it. Odd columns rise,
 * even ones fall, so the wall seems to breathe rather than scroll.
 */
export function DriftGallery({
  images,
  columns = 5,
  drift = 120,
  children,
  className,
}: {
  images: Picture[]
  columns?: number
  /** How far the fastest column travels against the scroll, in px. */
  drift?: number
  children?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const count = Math.max(2, Math.min(6, Math.round(columns)))
  const cols: Picture[][] = Array.from({ length: count }, () => [])
  images.forEach((image, index) => cols[index % count].push(image))

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="grid gap-x-[6vw] gap-y-0" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
        {cols.map((column, index) => (
          <DriftColumn key={index} images={column} progress={scrollYProgress} distance={(index % 2 === 0 ? -1 : 1) * drift * (0.5 + (index % 3) * 0.35)} offset={index % 2 === 0 ? 0 : 60} />
        ))}
      </div>
      {children && (
        <div className="pointer-events-none absolute inset-0 flex justify-center" data-canvas-ignore>
          <div className="pointer-events-auto sticky top-[calc(50svh-24px)] mt-[40%] h-fit">{children}</div>
        </div>
      )}
    </div>
  )
}

function DriftColumn({ images, progress, distance, offset }: { images: Picture[]; progress: MotionValue<number>; distance: number; offset: number }) {
  const reduced = useReducedMotion()
  const y = useTransform(progress, [0, 1], reduced ? [0, 0] : [-distance / 2, distance / 2])
  return (
    <motion.div style={{ y, paddingTop: offset }} className="flex flex-col gap-[clamp(40px,6vw,110px)]">
      {images.map((image) => (
        <figure key={image.src} className="group aspect-[4/5] overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="size-full bg-paper-deep object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.06]"
          />
        </figure>
      ))}
    </motion.div>
  )
}
