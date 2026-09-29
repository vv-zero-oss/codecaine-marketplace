/**
 * The page's clip shapes, as SVG paths in `objectBoundingBox` units (0–1), so
 * one path clips a box of any size. `ClipShape` turns them into a
 * `<clipPath>`. Each is built from numbers rather than typed out, so the
 * morphing ones (`pillow`, `blob`) can be interpolated point for point.
 */

const f = (n: number) => n.toFixed(4)

/** The hero's soft, slightly lopsided cushion. `t` runs 0 → 1 from a crisp
 *  pillow to a fuller, rounder one; every command is the same in both, so
 *  the path can be tweened by scroll. */
export function pillow(t = 0) {
  const lerp = (a: number, b: number) => a + (b - a) * t
  return [
    `M ${f(lerp(0.015, 0.03))},0.5`,
    `C ${f(lerp(0.015, 0.03))},${f(lerp(0.2, 0.14))} ${f(lerp(0.05, 0.1))},${f(lerp(0.07, 0.03))} ${f(lerp(0.2, 0.26))},${f(lerp(0.045, 0.02))}`,
    `C 0.42,${f(lerp(0.0, 0.0))} 0.62,${f(lerp(0.01, 0.0))} ${f(lerp(0.82, 0.76))},${f(lerp(0.06, 0.02))}`,
    `C ${f(lerp(0.955, 0.9))},${f(lerp(0.1, 0.04))} ${f(lerp(0.985, 0.97))},${f(lerp(0.22, 0.16))} ${f(lerp(0.985, 0.97))},0.5`,
    `C ${f(lerp(0.985, 0.97))},${f(lerp(0.8, 0.86))} ${f(lerp(0.95, 0.9))},${f(lerp(0.955, 0.98))} ${f(lerp(0.8, 0.74))},${f(lerp(0.965, 0.985))}`,
    `C 0.6,${f(lerp(0.985, 1))} 0.4,${f(lerp(0.985, 1))} ${f(lerp(0.2, 0.26))},${f(lerp(0.965, 0.985))}`,
    `C ${f(lerp(0.05, 0.1))},${f(lerp(0.955, 0.98))} ${f(lerp(0.015, 0.03))},${f(lerp(0.8, 0.86))} ${f(lerp(0.015, 0.03))},0.5 Z`,
  ].join(" ")
}

/** A smooth closed curve through points around the centre (Catmull-Rom,
 *  written as cubic Béziers). */
function smoothLoop(radii: number[], cx = 0.5, cy = 0.5) {
  const pts = radii.map((r, i) => {
    const a = (i / radii.length) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const
  })
  const n = pts.length
  let d = `M ${f(pts[0][0])},${f(pts[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`
  }
  return d + " Z"
}

/** Organic blobs, all eight points, so any one can morph into any other. */
export const BLOBS = [
  [0.47, 0.44, 0.5, 0.42, 0.48, 0.45, 0.5, 0.43],
  [0.5, 0.46, 0.41, 0.49, 0.44, 0.5, 0.42, 0.47],
  [0.43, 0.5, 0.46, 0.44, 0.5, 0.41, 0.48, 0.5],
  [0.49, 0.42, 0.48, 0.5, 0.43, 0.47, 0.5, 0.44],
].map((radii) => smoothLoop(radii))

/** A scalloped plate edge: `n` soft bumps. */
function scallop(n: number, inner = 0.44, outer = 0.5) {
  let d = ""
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const am = ((i + 0.5) / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    const p0 = [0.5 + Math.cos(a0) * inner, 0.5 + Math.sin(a0) * inner]
    const c = [0.5 + Math.cos(am) * (outer + (outer - inner) * 0.9), 0.5 + Math.sin(am) * (outer + (outer - inner) * 0.9)]
    const p1 = [0.5 + Math.cos(a1) * inner, 0.5 + Math.sin(a1) * inner]
    if (i === 0) d += `M ${f(p0[0])},${f(p0[1])}`
    d += ` Q ${f(c[0])},${f(c[1])} ${f(p1[0])},${f(p1[1])}`
  }
  return d + " Z"
}

/** A starburst sticker: `n` points. */
function burst(n: number, inner = 0.4, outer = 0.5) {
  let d = ""
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2
    d += `${i === 0 ? "M" : " L"} ${f(0.5 + Math.cos(a) * r)},${f(0.5 + Math.sin(a) * r)}`
  }
  return d + " Z"
}

export const SHAPES = {
  pillow: pillow(0),
  arch: "M 0,1 L 0,0.5 C 0,0.2239 0.2239,0 0.5,0 C 0.7761,0 1,0.2239 1,0.5 L 1,1 Z",
  blob: BLOBS[0],
  scallop: scallop(12),
  burst: burst(16, 0.42, 0.5),
  /** A ticket stub: a box with a bite out of each side. */
  ticket:
    "M 0.04,0 L 0.96,0 C 0.96,0.03 0.98,0.05 1,0.05 L 1,0.42 C 0.95,0.42 0.95,0.58 1,0.58 L 1,0.95 C 0.98,0.95 0.96,0.97 0.96,1 L 0.04,1 C 0.04,0.97 0.02,0.95 0,0.95 L 0,0.58 C 0.05,0.58 0.05,0.42 0,0.42 L 0,0.05 C 0.02,0.05 0.04,0.03 0.04,0 Z",
} as const

export type ShapeName = keyof typeof SHAPES | "circle" | "pill"
