import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { useFinePointer } from "@/components/motion/use-fine-pointer"

import { Cup, Mango, Notebook, Pizza, Popcorn, PlayTile, Scissors, Ticket } from "@/components/illustrations/objects"
import { cn } from "@/lib/utils"

/** Where each thing comes to rest in a 480 x 360 stage, as percentages of it. */
const PILE = [
  { Art: Notebook, x: 4, y: 8, w: 40, rotate: -8, z: 1 },
  { Art: Scissors, x: 40, y: -2, w: 13, rotate: -14, z: 2 },
  { Art: Pizza, x: 52, y: 0, w: 22, rotate: 12, z: 3 },
  { Art: PlayTile, x: 66, y: 12, w: 22, rotate: 8, z: 4 },
  { Art: Popcorn, x: 2, y: 34, w: 24, rotate: -6, z: 5 },
  { Art: Cup, x: 40, y: 22, w: 20, rotate: 24, z: 6 },
  { Art: Ticket, x: 40, y: 62, w: 28, rotate: -6, z: 7 },
  { Art: Mango, x: 18, y: 58, w: 25, rotate: -4, z: 8 },
] as const

/**
 * The hero's pile of everyday spending, dropped in one by one.
 *
 * `stagger` is the gap between objects in seconds, `distance` how far above the
 * stage they start in px, `bounce` how springy the landing is (0 to 1).
 * Reduced motion and design mode both leave the pile already landed.
 * With a mouse, every object can be picked up and flung; it springs home when
 * let go (`drag` on, `elastic` is how far it follows the pointer, 0 to 1).
 * On touch, a tap makes it hop. Purpose: delight, at the very top of the page.
 */
export function FallingObjects({
  stagger = 0.09,
  distance = 520,
  bounce = 0.28,
  elastic = 0.6,
  drag = true,
  className,
}: {
  stagger?: number
  distance?: number
  bounce?: number
  elastic?: number
  drag?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const fine = useFinePointer()
  const canDrag = drag && fine && !reduced
  return (
    <div className={cn("relative mx-auto aspect-[4/3] w-full max-w-[30rem]", className)} aria-hidden="true">
      {PILE.map(({ Art, x, y, w, rotate, z }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, zIndex: z, cursor: canDrag ? "grab" : undefined }}
          drag={canDrag}
          dragSnapToOrigin
          dragElastic={elastic}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
          whileDrag={{ scale: 1.1, zIndex: 20, cursor: "grabbing" }}
          whileHover={canDrag ? { rotate: [rotate, rotate + 5, rotate - 4, rotate + 2, rotate], transition: { duration: 0.5 } } : undefined}
          whileTap={canDrag || reduced ? undefined : { scale: 1.08, rotate: rotate + 6 }}
          initial={still ? false : { y: -distance, rotate: rotate - 40, opacity: 0 }}
          animate={{ y: 0, rotate, opacity: 1 }}
          transition={{
            type: "spring",
            bounce,
            duration: 1.1,
            delay: 0.15 + index * stagger,
            opacity: { duration: 0.2, delay: 0.15 + index * stagger },
          }}
        >
          <Art className="h-auto w-full drop-shadow-[0_8px_8px_rgb(27_31_72/0.12)]" />
        </motion.div>
      ))}
    </div>
  )
}
