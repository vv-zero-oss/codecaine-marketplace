import { useEffect, useState } from "react"

/** Reads a token off <html> as it is right now, and again whenever it changes
 *  (the generator rewrites tokens through the style attribute). */
export function useToken(name: string): string {
  const read = () => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [value, setValue] = useState(read)
  useEffect(() => {
    setValue(read())
    const mo = new MutationObserver(() => setValue(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] })
    return () => mo.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return value
}

let canvas: CanvasRenderingContext2D | null = null

/** Any CSS colour — hex, rgb(), color-mix() — to [r, g, b] 0–255. */
export function toRgb(css: string): [number, number, number] {
  canvas ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  const probe = document.createElement("span")
  probe.style.color = css
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()
  if (!canvas) return [0, 0, 0]
  canvas.clearRect(0, 0, 1, 1)
  canvas.fillStyle = "#000"
  canvas.fillStyle = resolved
  canvas.fillRect(0, 0, 1, 1)
  const d = canvas.getImageData(0, 0, 1, 1).data
  return [d[0], d[1], d[2]]
}

export const toHex = (rgb: [number, number, number]) => `#${rgb.map((n) => n.toString(16).padStart(2, "0")).join("")}`

function luminance([r, g, b]: [number, number, number]) {
  const f = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export function contrast(a: [number, number, number], b: [number, number, number]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
