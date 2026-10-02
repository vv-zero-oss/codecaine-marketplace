import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { SPRITES, type Sprite, type SpriteName } from "./sprites"

/**
 * A sprite as one SVG: a `<path>` per colour, each made of horizontal runs, so
 * a 14x8 plane is a handful of rectangles and stays sharp at any `scale`.
 */
export function PixelSprite({
  name = "shield",
  scale = 4,
  className,
  title,
}: {
  name?: SpriteName
  /** Rendered pixels per sprite pixel. */
  scale?: number
  className?: string
  title?: string
}) {
  const sprite: Sprite = SPRITES[name]
  const paths = useMemo(() => {
    const byColour = new Map<string, string>()
    sprite.rows.forEach((row, y) => {
      let x = 0
      while (x < row.length) {
        const ch = row[x]
        if (ch === ".") {
          x++
          continue
        }
        let end = x
        while (end < row.length && row[end] === ch) end++
        byColour.set(ch, `${byColour.get(ch) ?? ""}M${x} ${y}h${end - x}v1h-${end - x}z`)
        x = end
      }
    })
    return [...byColour.entries()]
  }, [sprite])

  const width = Math.max(...sprite.rows.map((row) => row.length))
  const height = sprite.rows.length
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      {paths.map(([ch, d]) => (
        <path key={ch} d={d} fill={sprite.palette[ch]} />
      ))}
    </svg>
  )
}
