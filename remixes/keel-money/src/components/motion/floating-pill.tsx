import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import { Baby, Dumbbell, Gift, House, Martini, PawPrint, Plane, ShoppingBasket, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const ICONS = {
  house: House,
  basket: ShoppingBasket,
  plane: Plane,
  baby: Baby,
  gift: Gift,
  gym: Dumbbell,
  pets: PawPrint,
  night: Martini,
} satisfies Record<string, LucideIcon>

const COLOURS = {
  green: "bg-candy-green",
  violet: "bg-candy-violet",
  red: "bg-candy-red",
  slate: "bg-candy-slate",
  pink: "bg-candy-pink",
  orange: "bg-candy-orange",
} as const

/**
 * One of the glossy category pills that drift around the hero headline.
 *
 * Three motions, each with a reason. It pops in on a soft spring, staggered,
 * so the headline lands first and its categories gather round it. It bobs
 * and tilts on a long ease-in-out (a CSS keyframe the editor's Motion switch
 * can stop) so the hero is never quite still. And it parallaxes on scroll by
 * its `depth`, the blurred ones further back moving least — which is what
 * makes the blur read as distance rather than as a mistake.
 */
export function FloatingPill({
  label,
  icon = "house",
  colour = "orange",
  x = 0,
  y = 0,
  rotate = -12,
  blur = 0,
  depth = 1,
  distance = 10,
  duration = 6,
  delay = 0,
  className,
}: {
  label: string
  icon?: keyof typeof ICONS
  colour?: keyof typeof COLOURS
  /** Position from the hero's centre, in % of its width. */
  x?: number
  /** Position from the hero's centre, in % of its height. */
  y?: number
  rotate?: number
  /** Depth-of-field blur, in px. */
  blur?: number
  /** Parallax strength: 0 stays put, 1 travels with the page's scroll. */
  depth?: number
  /** How far it bobs, in px. */
  distance?: number
  /** Seconds for one bob. */
  duration?: number
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 800], [0, -160 * depth])
  const Icon = ICONS[icon]
  const still = reduced || designing

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{ left: `${50 + x}%`, top: `${50 + y}%`, y: still ? 0 : parallax }}
      initial={still ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.9, bounce: 0.35, delay: 0.25 + delay }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2"
        style={{
          ["--float-duration" as string]: `${duration}s`,
          ["--float-distance" as string]: `${distance}px`,
        }}
      >
        <div className={cn(!still && "animate-float")} style={{ animationDelay: `${-delay * 3}s` }}>
          <div
            className={cn(
              "flex h-[clamp(38px,5.4vw,64px)] items-center gap-[0.55em] rounded-(--radius-pill) py-[0.4em] pr-[1.1em] pl-[0.45em] text-[clamp(13px,1.7vw,21px)] font-extrabold tracking-[0.04em] text-white uppercase shadow-(--shadow-pill) [text-shadow:0_1px_1px_rgb(0_0_0/0.25)]",
              COLOURS[colour],
            )}
            style={{ transform: `rotate(${rotate}deg)`, filter: blur ? `blur(${blur}px)` : undefined }}
          >
            <span className="grid aspect-square h-full place-items-center rounded-full bg-white/25 shadow-[inset_0_1px_1px_rgb(255_255_255/0.5)]">
              <Icon className="size-[55%]" strokeWidth={2.4} />
            </span>
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
