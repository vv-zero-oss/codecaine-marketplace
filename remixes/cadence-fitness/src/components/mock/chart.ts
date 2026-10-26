/**
 * Turns a run of values into an SVG path in a `w`×`h` box, smoothed with a
 * light Catmull-Rom so the line reads as a trend rather than a zig-zag.
 * Returns the path, the area under it, and where it ends (for the dot).
 */
export function linePath(values: number[], w: number, h: number, pad = 4, smooth = 0.18) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const points = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    pad + (1 - (v - min) / span) * (h - pad * 2),
  ] as const)
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) * smooth, p1[1] + (p2[1] - p0[1]) * smooth]
    const c2 = [p2[0] - (p3[0] - p1[0]) * smooth, p2[1] - (p3[1] - p1[1]) * smooth]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  const last = points[points.length - 1]
  return { d, area: `${d} L${w} ${h} L0 ${h} Z`, end: { x: last[0], y: last[1] } }
}

/** A deterministic wobble, so the mocks look the same on every load. */
export function series(seed: number, length: number, drift = 0.4, noise = 1) {
  let x = seed
  const rand = () => {
    x = (x * 9301 + 49297) % 233280
    return x / 233280
  }
  const out: number[] = []
  let v = 10
  for (let i = 0; i < length; i++) {
    v += drift + (rand() - 0.5) * 2 * noise
    out.push(v)
  }
  return out
}
