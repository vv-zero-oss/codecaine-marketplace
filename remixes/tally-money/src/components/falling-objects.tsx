import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { useFinePointer } from "@/components/motion/use-fine-pointer"
import { Coin, Cup, Mango, Notebook, Pizza, PlayTile, Popcorn, Scissors, Sneaker, Ticket } from "@/components/illustrations/objects"
import { cn } from "@/lib/utils"

/** Where each thing comes to rest in a 5:4 stage, as percentages of it. */
const PILE = [
  { Art: Notebook, x: 6, y: 6, w: 38, rotate: -9, z: 1 },
  { Art: Scissors, x: 44, y: -4, w: 11, rotate: -16, z: 2 },
  { Art: Pizza, x: 54, y: -1, w: 20, rotate: 14, z: 3 },
  { Art: PlayTile, x: 72, y: 8, w: 19, rotate: 9, z: 4 },
  { Art: Popcorn, x: 1, y: 32, w: 22, rotate: -7, z: 6 },
  { Art: Cup, x: 41, y: 20, w: 17, rotate: 22, z: 7 },
  { Art: Sneaker, x: 60, y: 40, w: 31, rotate: -14, z: 5 },
  { Art: Mango, x: 17, y: 58, w: 23, rotate: -5, z: 8 },
  { Art: Ticket, x: 38, y: 64, w: 28, rotate: -7, z: 9 },
  { Art: Coin, x: 68, y: 68, w: 17, rotate: 10, z: 10 },
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
  stagger = 0.08,
  distance = 620,
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
    <div className={cn("relative mx-auto aspect-[5/4] w-full max-w-[42rem]", className)} aria-hidden="true">
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
          <Art className="h-auto w-full drop-shadow-[0_10px_8px_rgb(27_31_72/0.14)]" />
        </motion.div>
      ))}
    </div>
  )
}
