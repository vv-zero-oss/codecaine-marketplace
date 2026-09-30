import { useLayoutEffect, useRef, useState } from "react"

/**
 * The style guide reads every value it prints off the element it draws, after
 * the stylesheet has applied — so a token changed in `index.css` shows up
 * here with its new value, and the page cannot drift from the product.
 */
export function useComputed<T extends HTMLElement>(properties: string[], target: "self" | "child" | (string & {}) = "self") {
  const ref = useRef<T>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const key = properties.join(",")
  useLayoutEffect(() => {
    // "child" reads the first element inside, and any other string is a
    // selector inside — a component that does not forward its ref, measured
    // as it renders itself.
    const element =
      target === "self" ? ref.current : target === "child" ? ref.current?.firstElementChild : ref.current?.querySelector(target)
    if (!element) return
    const read = () => {
      const style = getComputedStyle(element)
      setValues(Object.fromEntries(key.split(",").map((name) => [name, style.getPropertyValue(name).trim()])))
    }
    read()
    // Web fonts land after first paint and change what a type sample measures.
    document.fonts?.ready.then(read)
  }, [key, target])
  return [ref, values] as const
}

/** A custom property's value on `:root`, as the stylesheet has it now. */
export function rootToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

let context: CanvasRenderingContext2D | null = null

/**
 * Any CSS colours — `oklch()`, `color-mix()`, a translucent tint — painted in
 * order onto one pixel and read back as sRGB. The browser does the
 * conversion the page itself relies on, and a translucent colour is judged
 * over what it actually sits on.
 */
export function toRgb(...layers: string[]): [number, number, number] | null {
  const colors = layers.filter(Boolean)
  if (!colors.length) return null
  context ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  if (!context) return null
  context.clearRect(0, 0, 1, 1)
  for (const color of colors) {
    context.fillStyle = "#000"
    context.fillStyle = color
    context.fillRect(0, 0, 1, 1)
  }
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data
  return [r, g, b]
}

export function toHex(...layers: string[]): string {
  const rgb = toRgb(...layers)
  return rgb ? `#${rgb.map((n) => n.toString(16).padStart(2, "0")).join("")}` : "—"
}

function luminance([r, g, b]: [number, number, number]) {
  const [R, G, B] = [r, g, b].map((n) => {
    const c = n / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/** WCAG 2 contrast ratio between a text colour and a stack of backgrounds
 *  (bottom first), each composited the way the page paints them. */
export function contrast(text: string, ...backgrounds: string[]): number | null {
  const bg = toRgb(...backgrounds)
  if (!bg) return null
  const fg = toRgb(`rgb(${bg.join(" ")})`, text)
  if (!fg) return null
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((m, n) => n - m)
  return (hi + 0.05) / (lo + 0.05)
}

export function grade(ratio: number | null) {
  return ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
}
