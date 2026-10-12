import { useEffect, useRef } from "react"
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { CLOTH, CoverArt, WEAVE } from "@/components/mock/cover-art"
import type { Cloth } from "@/content/shop"
import { cn } from "@/lib/utils"

/**
 * A volume as a real object: front board, spine, page block and back board,
 * built in CSS 3D. Turns a few degrees toward the pointer on hover, and —
 * with `draggable` — spins under a drag and springs back to its resting
 * angle when let go (a spring, so a flick carries its velocity).
 *
 * Every knob is a scalar prop: the cloth, the number and title on the
 * cover, the resting angle, the thickness. Still while designing and for
 * reduced motion.
 */
export function BookObject({
  volume = 3,
  title = "Salt & Timber",
  subtitle = "On making at the water's edge",
  cloth = "moss",
  angle = -22,
  thickness = 7,
  draggable = false,
  hoverTilt = true,
  variant = "volume",
  className,
}: {
  variant?: "volume" | "notebook"
  volume?: number
  title?: string
  subtitle?: string
  cloth?: Cloth
  /** Resting rotation around the vertical axis, in degrees. */
  angle?: number
  /** Spine depth, as a percentage of the cover's width. */
  thickness?: number
  draggable?: boolean
  hoverTilt?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing

  const rotY = useMotionValue(angle)
  const rotX = useMotionValue(0)
  const springY = useSpring(rotY, { stiffness: 140, damping: 18, mass: 0.9 })
  const springX = useSpring(rotX, { stiffness: 160, damping: 20 })
  const transform = useTransform([springX, springY], ([x, y]) => `rotateX(${x}deg) rotateY(${y}deg)`)
  // The shadow on the table shifts as the book turns, so it stays grounded.
  const shadowX = useTransform(springY, (y) => `${(-y / 90) * 18}%`)

  // A new resting angle from the editor retargets the spring.
  useEffect(() => {
    rotY.set(angle)
  }, [angle, rotY])

  const drag = useRef<{ x: number; start: number } | null>(null)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still) return
    if (drag.current) {
      rotY.set(drag.current.start + (e.clientX - drag.current.x) * 0.6)
      return
    }
    if (!hoverTilt || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(angle + px * 16)
    rotX.set(-py * 8)
  }
  const rest = () => {
    drag.current = null
    rotX.set(0)
    rotY.set(angle)
  }
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || still) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, start: rotY.get() }
  }
  const onPointerUp = () => {
    if (!drag.current) return
    // Settle at the nearest of: the resting angle, or showing the back.
    const y = rotY.get()
    const turns = Math.round((y - angle) / 360)
    drag.current = null
    animate(rotY, angle + turns * 360, { type: "spring", stiffness: 120, damping: 16 })
  }

  const c = CLOTH[cloth]
  const depth = `${thickness}cqw`

  return (
    <div
      className={cn("@container relative w-full [perspective:1600px]", variant === "notebook" ? "aspect-[7/10]" : "aspect-[4/5]", "", draggable && "cursor-grab touch-pan-y active:cursor-grabbing", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={() => !drag.current && rest()}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* the soft shadow it casts on the table */}
      <motion.span
        aria-hidden
        className="absolute inset-x-[6%] bottom-[-4%] h-[10%] rounded-[50%] bg-black/30 blur-xl"
        style={still ? undefined : { x: shadowX }}
      />
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ transform: still ? `rotateY(${angle}deg)` : transform }}
      >
        {/* front board */}
        <div
          className="absolute inset-0 overflow-hidden rounded-r-[1.2cqw] rounded-l-[0.4cqw] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] [backface-visibility:hidden]"
          style={{ transform: `translateZ(calc(${depth} / 2))` }}
        >
          <CoverArt volume={volume} title={title} subtitle={subtitle} cloth={cloth} variant={variant} />
          {/* a sheen that moves with the turn */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgb(255_255_255/0.1),transparent_38%,transparent_70%,rgb(0_0_0/0.12))]" />
        </div>
        {/* spine */}
        <div
          className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden"
          style={{
            width: depth,
            background: c.bg,
            backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / 0.28), rgb(255 255 255 / 0.06) 45%, rgb(0 0 0 / 0.22)), ${WEAVE}`,
            color: c.fg,
            transform: "rotateY(-90deg)",
            transformOrigin: "center",
            translate: `calc(${depth} / -2) 0`,
          }}
        >
          <span className="font-serif text-[3.4cqw] whitespace-nowrap [writing-mode:vertical-rl]">
            Ordinary Matter · {volume}
          </span>
        </div>
        {/* page block, fore-edge */}
        <div
          className="absolute inset-y-[1.4%] right-0"
          style={{
            width: depth,
            background: "repeating-linear-gradient(90deg, #f3ecdc 0 1px, #e4dac4 1px 2px)",
            transform: "rotateY(90deg)",
            translate: `calc(${depth} / 2) 0`,
          }}
        />
        {/* top edge of the pages */}
        <div
          className="absolute inset-x-[1%] top-0"
          style={{
            height: depth,
            background: "repeating-linear-gradient(0deg, #f3ecdc 0 1px, #e4dac4 1px 2px)",
            transform: "rotateX(90deg)",
            translate: `0 calc(${depth} / -2)`,
          }}
        />
        {/* back board */}
        <div
          className="absolute inset-0 rounded-l-[1.2cqw] [backface-visibility:hidden]"
          style={{ background: c.bg, backgroundImage: WEAVE, transform: `rotateY(180deg) translateZ(calc(${depth} / 2))` }}
        >
          <div className="flex h-full flex-col justify-end p-[10cqw]" style={{ color: c.fg }}>
            <p className="max-w-[70cqw] font-serif text-[4cqw] leading-snug italic opacity-85">
              The lives, spaces and stories of people who make things by hand.
            </p>
            <p className="mt-[5cqw] font-sans text-[2.4cqw] tracking-[0.12em] uppercase opacity-70">Ordinary Matter — Volume {volume}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
