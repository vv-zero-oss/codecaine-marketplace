import { useLayoutEffect, useRef, useState } from "react"

/**
 * The style guide reads every value it prints off the element it draws, after
 * the stylesheet has applied — so a token changed in `index.css` shows up
 * here with its new value, and the page cannot drift from the product.
 */
export function useComputed<T extends HTMLElement>(properties: string[]) {
  const ref = useRef<T>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const key = properties.join(",")
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const read = () => {
      const style = getComputedStyle(element)
      setValues(Object.fromEntries(key.split(",").map((name) => [name, style.getPropertyValue(name).trim()])))
    }
    read()
    document.fonts?.ready.then(read)
  }, [key])
  return [ref, values] as const
}

/** Reads a custom property off :root, as the browser resolves it. */
export function useToken(name: string): string {
  const [value, setValue] = useState("")
  useLayoutEffect(() => setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim()), [name])
  return value
}

let context: CanvasRenderingContext2D | null = null

/** Any CSS colour to sRGB, by painting a pixel with it. */
export function toRgb(color: string): [number, number, number] | null {
  if (!color) return null
  context ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  if (!context) return null
  context.clearRect(0, 0, 1, 1)
  context.fillStyle = "#000"
  context.fillStyle = color
  context.fillRect(0, 0, 1, 1)
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data
  return [r, g, b]
}

export function toHex(color: string): string {
  const rgb = toRgb(color)
  return rgb ? `#${rgb.map((n) => n.toString(16).padStart(2, "0")).join("")}` : "—"
}

function luminance([r, g, b]: [number, number, number]) {
  const [R, G, B] = [r, g, b].map((n) => {
    const c = n / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/** WCAG 2 contrast ratio between two CSS colours. */
export function contrast(a: string, b: string): number | null {
  const x = toRgb(a)
  const y = toRgb(b)
  if (!x || !y) return null
  const [hi, lo] = [luminance(x), luminance(y)].sort((m, n) => n - m)
  return (hi + 0.05) / (lo + 0.05)
}
