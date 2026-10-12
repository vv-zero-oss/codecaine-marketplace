import { useEffect, useMemo, useRef, useState } from "react"
import { geoEqualEarth, geoInterpolate, geoMercator, geoPath, type GeoProjection } from "d3-geo"
import { feature, mesh } from "topojson-client"
import type { GeometryCollection, Topology } from "topojson-specification"
import { animate, motion, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import countries from "world-atlas/countries-110m.json"

import { AIRPORTS } from "@/lib/flights"
import { cn } from "@/lib/utils"

const topo = countries as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>
const LAND = feature(topo, topo.objects.land)
const BORDERS = mesh(topo, topo.objects.countries, (a, b) => a !== b)

/** The windows each map can open onto: [west, south, east, north]. */
const REGIONS = {
  "north-america": [-128, 14, -62, 56],
  usa: [-128, 23, -64, 50],
  atlantic: [-95, 18, 25, 62],
  europe: [-14, 34, 32, 64],
  world: [-180, -58, 180, 80],
} as const

export type MapRegion = keyof typeof REGIONS
export type MapPalette = "day" | "violet" | "night"

const PALETTES: Record<MapPalette, { sea: string; land: string; border: string; route: string; plane: string; dot: string; label: string }> = {
  day: { sea: "var(--color-map-sea)", land: "var(--color-map-land)", border: "var(--color-map-border)", route: "var(--color-map-route)", plane: "var(--color-ink)", dot: "var(--color-ink)", label: "var(--color-ink)" },
  violet: { sea: "var(--color-violet-deep)", land: "var(--color-violet)", border: "rgb(255 255 255 / 0.18)", route: "#ffffff", plane: "#ffffff", dot: "#ffffff", label: "#ffffff" },
  night: { sea: "var(--color-night-2)", land: "var(--color-night-3)", border: "var(--color-night-line)", route: "var(--color-violet-glow)", plane: "var(--color-amber)", dot: "var(--color-violet-glow)", label: "var(--color-night-2fg)" },
}

function project(region: MapRegion, width: number, height: number): GeoProjection {
  const [w, s, e, n] = REGIONS[region]
  // The corners (and the middle of each edge) as points: a polygon would be
  // read by its winding on the sphere and could mean "everything but this".
  const frame = { type: "MultiPoint", coordinates: [[w, s], [e, s], [e, n], [w, n], [(w + e) / 2, s], [(w + e) / 2, n]] } as const
  const projection = region === "world" ? geoEqualEarth() : geoMercator()
  // `fitExtent` with a margin of zero: the window fills the frame, and the
  // SVG's `slice` crops what spills over on a narrower box.
  return projection.fitExtent([[0, 0], [width, height]], frame as never)
}

/** "SFO-JFK,AUS-JFK" → [["SFO","JFK"],["AUS","JFK"]], skipping unknown codes. */
function parseRoutes(routes: string) {
  return routes
    .split(",")
    .map((r) => r.trim().toUpperCase().split("-") as [string, string])
    .filter(([a, b]) => AIRPORTS[a] && AIRPORTS[b])
}

/**
 * A real map, drawn from Natural Earth's 110m countries, with great-circle
 * routes between real airports and a plane that flies the first one.
 *
 * Every knob is a scalar so the editor can drive it: the region, the palette,
 * the routes as "SFO-JFK,AUS-JFK", where the plane is (0–1) or whether it
 * flies on its own, and how long one crossing takes.
 */
export function FlightMap({
  region = "north-america",
  palette = "day",
  routes = "SFO-JFK",
  progress = 0.55,
  fly = true,
  duration = 14,
  drawRoutes = false,
  labels = true,
  paused = false,
  width = 400,
  height = 520,
  className,
}: {
  region?: MapRegion
  palette?: MapPalette
  routes?: string
  /** Where the plane sits on the first route, 0–1, when it isn't flying. */
  progress?: number
  /** Fly the first route on a loop. */
  fly?: boolean
  /** Seconds for one crossing. */
  duration?: number
  /** Draw each route in when the map scrolls into view. */
  drawRoutes?: boolean
  labels?: boolean
  paused?: boolean
  width?: number
  height?: number
  className?: string
}) {
  const colours = PALETTES[palette]
  const list = useMemo(() => parseRoutes(routes), [routes])
  const { land, borders, arcs, toXY } = useMemo(() => {
    const projection = project(region, width, height)
    const path = geoPath(projection)
    return {
      land: path(LAND) ?? "",
      borders: path(BORDERS) ?? "",
      arcs: list.map(([a, b]) => path({ type: "LineString", coordinates: [[AIRPORTS[a].lon, AIRPORTS[a].lat], [AIRPORTS[b].lon, AIRPORTS[b].lat]] }) ?? ""),
      toXY: (lon: number, lat: number) => projection([lon, lat]) ?? [0, 0],
    }
  }, [region, width, height, list])

  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing || paused || !fly
  const [t, setT] = useState(progress)
  // The plane's flight, held for the component's lifetime so the editor's
  // Motion switch can find it and stop it.
  const flight = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    if (still || !inView || !list.length) {
      setT(progress)
      return
    }
    flight.current = animate(0.08, 0.94, { duration, ease: "linear", repeat: Infinity, onUpdate: setT })
    return () => {
      flight.current?.stop()
      flight.current = null
    }
  }, [still, inView, duration, progress, list.length])

  const plane = useMemo(() => {
    if (!list.length) return null
    const [a, b] = list[0]
    const along = geoInterpolate([AIRPORTS[a].lon, AIRPORTS[a].lat], [AIRPORTS[b].lon, AIRPORTS[b].lat])
    const here = along(t)
    const next = along(Math.min(t + 0.01, 1))
    const [x, y] = toXY(here[0], here[1])
    const [nx, ny] = toXY(next[0], next[1])
    return { x, y, angle: (Math.atan2(ny - y, nx - x) * 180) / Math.PI }
  }, [list, t, toXY])

  const codes = [...new Set(list.flat())]
  const drawn = drawRoutes && !reduced && !designing

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={cn("block size-full", className)} role="img" aria-label={`Map of ${list.map(([a, b]) => `${a} to ${b}`).join(", ") || region}`}>
      <rect width={width} height={height} fill={colours.sea} />
      <path d={land} fill={colours.land} />
      <path d={borders} fill="none" stroke={colours.border} strokeWidth={0.8} strokeLinejoin="round" />
      {arcs.map((d, i) =>
        drawn ? (
          <motion.path
            key={list[i].join("-")}
            d={d}
            fill="none"
            stroke={i === 0 && fly ? "var(--color-amber)" : colours.route}
            strokeWidth={i === 0 && fly ? 2.4 : 1.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.9 } : undefined}
            transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.23, 1, 0.32, 1] }}
          />
        ) : (
          <path key={i} d={d} fill="none" stroke={colours.route} strokeWidth={1.6} strokeLinecap="round" opacity={0.75} strokeDasharray={i === 0 ? undefined : "3 4"} />
        ),
      )}
      {codes.map((code) => {
        const [x, y] = toXY(AIRPORTS[code].lon, AIRPORTS[code].lat)
        return (
          <g key={code} transform={`translate(${x} ${y})`}>
            <circle r={3.2} fill={colours.dot} stroke={colours.sea} strokeWidth={1.4} />
            {labels ? (
              <text y={-8} textAnchor="middle" fontSize={10} fontWeight={600} letterSpacing="0.06em" fill={colours.label} style={{ fontFamily: "var(--font-sans)" }}>
                {code}
              </text>
            ) : null}
          </g>
        )
      })}
      {plane ? (
        <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`}>
          <circle r={11} fill={colours.plane} opacity={0.14} />
          <path d="M9 0 L-3 -2 L-7 -9 L-9.5 -9 L-7 -2 L-12 -1.6 L-14 -4.5 L-15.5 -4.5 L-14.5 0 L-15.5 4.5 L-14 4.5 L-12 1.6 L-7 2 L-9.5 9 L-7 9 L-3 2 Z" fill={colours.plane} transform="translate(3 0)" />
        </g>
      ) : null}
    </svg>
  )
}
