import { memo, useId } from "react"

import { cn } from "@/lib/utils"

/**
 * Halden Bay, drawn. One SVG in a 1200 × 800 space: water underneath, the
 * mainland and Gull Island over it, a river, parks, a street grid clipped to
 * the land, the arterial roads with their casings, a ferry line and the
 * labels. Every fill reads a `--map-*` variable, so the theme class on the
 * map's root repaints it (and crossfades, from `.map-svg *` in index.css).
 */

export type MapTheme = "paper" | "harbour" | "dusk" | "meadow"

export const MAP_W = 1200
export const MAP_H = 800

export const THEMES: { id: MapTheme; label: string; swatch: [string, string, string] }[] = [
  { id: "paper", label: "Paper", swatch: ["var(--color-paper-land)", "var(--color-paper-water)", "var(--color-paper-park)"] },
  { id: "harbour", label: "Harbour", swatch: ["var(--color-harbour-land)", "var(--color-harbour-water)", "var(--color-harbour-park)"] },
  { id: "meadow", label: "Meadow", swatch: ["var(--color-meadow-land)", "var(--color-meadow-water)", "var(--color-meadow-park)"] },
  { id: "dusk", label: "Dusk", swatch: ["var(--color-dusk-land)", "var(--color-dusk-water)", "var(--color-dusk-park)"] },
]

const MAINLAND =
  "M0 0 H468 C498 42 522 92 562 122 C612 160 642 140 692 172 C736 200 722 252 762 288 C802 322 862 302 902 342 C942 382 932 432 982 458 C1042 488 1112 472 1200 492 V800 H0 Z"
const GULL_ISLAND = "M932 152 C972 120 1042 130 1062 172 C1082 214 1042 252 992 247 C950 242 906 192 932 152 Z"
const ISLET = "M1100 300 C1118 290 1142 296 1144 312 C1146 328 1124 336 1108 330 C1094 324 1090 308 1100 300 Z"
const RIVER = "M-10 642 C150 612 262 662 402 632 C522 606 602 542 702 502 C782 470 852 432 940 396"

const PARKS = [
  // Fernhill Park
  "M118 178 C170 146 262 158 282 220 C302 282 232 322 170 312 C108 302 78 222 118 178 Z",
  // Lantern Green
  "M512 372 C540 360 602 362 612 386 C622 412 586 432 548 428 C512 424 492 386 512 372 Z",
  // South Common
  "M820 620 C880 590 982 600 1002 662 C1017 722 932 752 872 732 C812 712 780 650 820 620 Z",
  // The headland above North Heads
  "M208 40 C250 20 318 30 330 60 C340 88 300 104 256 98 C214 92 180 60 208 40 Z",
  // Gull Island's green
  "M960 168 C986 150 1030 156 1040 182 C1048 206 1018 224 990 220 C962 216 946 184 960 168 Z",
]

const ARTERIALS = [
  // Harbour Road, west to the Old Port
  "M-10 332 C200 300 380 332 520 302 C640 276 700 300 790 336",
  // Long Street, north to south through the Lantern Quarter
  "M300 -10 C318 200 362 400 422 560 C470 690 520 760 560 810",
  // The coast road
  "M478 52 C560 160 680 200 742 300 C800 382 900 402 982 502 C1050 544 1120 532 1210 546",
  // Ridgeway, crossing the river
  "M-10 502 C200 472 420 472 640 432 C720 418 780 430 836 452",
  // Terrace Hill
  "M700 810 C716 700 760 600 830 520",
  // Fernhill Lane
  "M60 800 C90 660 120 560 210 470 C260 420 300 380 330 300",
]

type Label = { x: number; y: number; text: string; size?: number; rotate?: number }

const AREA_LABELS: Label[] = [
  { x: 214, y: 404, text: "FERNHILL" },
  { x: 336, y: 128, text: "NORTH HEADS" },
  { x: 548, y: 262, text: "LANTERN QUARTER" },
  { x: 800, y: 382, text: "OLD PORT", rotate: 28 },
  { x: 300, y: 600, text: "MILLRACE" },
  { x: 652, y: 662, text: "THE TERRACES" },
  { x: 1068, y: 610, text: "SEAGATE" },
]

const PARK_LABELS: Label[] = [
  { x: 196, y: 272, text: "Fernhill Park" },
  { x: 560, y: 402, text: "Lantern Green", size: 12 },
  { x: 908, y: 700, text: "South Common" },
]

const WATER_LABELS: Label[] = [
  { x: 1010, y: 360, text: "Halden Bay", size: 26, rotate: -8 },
  { x: 810, y: 150, text: "The Narrows", size: 17, rotate: -30 },
  { x: 1000, y: 112, text: "Gull Island", size: 14 },
]

export const MapBase = memo(function MapBase({ className, labels = true }: { className?: string; labels?: boolean }) {
  const uid = useId().replace(/:/g, "")
  const land = `land-${uid}`
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("map-svg absolute inset-0 size-full select-none", className)}
    >
      <defs>
        <clipPath id={land}>
          <path d={MAINLAND} />
          <path d={GULL_ISLAND} />
        </clipPath>
        <pattern id={`grid-${uid}`} width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0 H34 M0 0 V34" fill="none" stroke="var(--map-road)" strokeWidth="2.2" />
        </pattern>
        <pattern id={`grid-fine-${uid}`} width="17" height="17" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0 H17 M0 0 V17" fill="none" stroke="var(--map-road)" strokeWidth="0.9" opacity="0.7" />
        </pattern>
      </defs>

      <rect width={MAP_W} height={MAP_H} fill="var(--map-water)" />
      {/* a soft shelf of shallow water along the coast */}
      <path d={MAINLAND} fill="none" stroke="var(--map-water-label)" strokeOpacity="0.16" strokeWidth="26" />
      <path d={MAINLAND} fill="var(--map-land)" />
      <path d={GULL_ISLAND} fill="var(--map-land)" />
      <path d={ISLET} fill="var(--map-land)" />

      <g clipPath={`url(#${land})`}>
        <rect width={MAP_W} height={MAP_H} fill="var(--map-block)" />
        <rect width={MAP_W} height={MAP_H} fill={`url(#grid-fine-${uid})`} />
        <rect width={MAP_W} height={MAP_H} fill={`url(#grid-${uid})`} />
        {PARKS.map((d) => (
          <path key={d} d={d} fill="var(--map-park)" />
        ))}
        {ARTERIALS.map((d) => (
          <path key={`c${d}`} d={d} fill="none" stroke="var(--map-casing)" strokeWidth="10" strokeLinecap="round" />
        ))}
        {ARTERIALS.map((d) => (
          <path key={`r${d}`} d={d} fill="none" stroke="var(--map-road)" strokeWidth="6" strokeLinecap="round" />
        ))}
      </g>

      <path d={RIVER} fill="none" stroke="var(--map-water)" strokeWidth="13" strokeLinecap="round" />
      {/* piers on the Old Port quay */}
      <g fill="var(--map-land)">
        <rect x="868" y="318" width="44" height="7" rx="2" transform="rotate(-35 868 318)" />
        <rect x="842" y="300" width="36" height="6" rx="2" transform="rotate(-35 842 300)" />
        <rect x="893" y="344" width="30" height="6" rx="2" transform="rotate(-35 893 344)" />
      </g>
      {/* the water taxi across the Narrows */}
      <path
        d="M908 328 C930 290 940 262 958 236"
        fill="none"
        stroke="var(--map-water-label)"
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />

      {labels ? (
        <g style={{ fontFamily: "var(--font-sans)" }}>
          {PARK_LABELS.map((l) => (
            <text key={l.text} x={l.x} y={l.y} textAnchor="middle" fontSize={l.size ?? 13} fontStyle="italic" fill="var(--map-label)" opacity="0.9">
              {l.text}
            </text>
          ))}
          {AREA_LABELS.map((l) => (
            <text
              key={l.text}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              fontSize={l.size ?? 12}
              fontWeight={600}
              letterSpacing="2.4"
              fill="var(--map-label)"
              transform={l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined}
            >
              {l.text}
            </text>
          ))}
          {WATER_LABELS.map((l) => (
            <text
              key={l.text}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              fontSize={l.size}
              fontStyle="italic"
              fill="var(--map-water-label)"
              style={{ fontFamily: "var(--font-serif)" }}
              transform={l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined}
            >
              {l.text}
            </text>
          ))}
        </g>
      ) : null}
    </svg>
  )
})
