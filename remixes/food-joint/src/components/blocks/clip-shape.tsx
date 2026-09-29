import { useId, type ComponentProps } from "react"
import { motion, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE_IN_OUT } from "@/lib/motion"
import { SHAPES, type ShapeName } from "@/lib/shapes"

/**
 * Clips whatever it holds to one of the page's shapes (`lib/shapes.ts`).
 *
 * The SVG shapes become a `<clipPath clipPathUnits="objectBoundingBox">`, so
 * one path fits a box of any size; `circle` and `pill` are plain border radii,
 * which keep a true round end whatever the box's proportions. Pass `d` (a
 * MotionValue, or a string that changes) to clip to a path that moves — the
 * hero's cushion follows the scroll; a changing string is tweened, as the
 * menu's blob re-forms between dishes. Paths that morph share their commands.
 */
export function ClipShape({
  shape,
  d,
  className,
  children,
  style,
  ...props
}: {
  shape: ShapeName
  d?: string | MotionValue<string>
} & ComponentProps<"div">) {
  const id = `clip-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  if (shape === "circle" || shape === "pill") {
    return (
      <div className={cn("relative overflow-hidden rounded-pill", className)} style={style} {...props}>
        {children}
      </div>
    )
  }
  return (
    <div className={cn("relative", className)} style={{ ...style, clipPath: `url(#${id})` }} {...props}>
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            {typeof d === "string" ? (
              <motion.path initial={false} animate={{ d }} transition={{ duration: 0.45, ease: EASE_IN_OUT }} />
            ) : (
              <motion.path d={d ?? SHAPES[shape]} />
            )}
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  )
}
