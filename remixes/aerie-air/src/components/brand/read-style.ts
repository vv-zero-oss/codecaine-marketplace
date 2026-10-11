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
    // Web fonts land after first paint and change what a type sample measures.
    document.fonts?.ready.then(read)
  }, [key])
  return [ref, values] as const
}

let context: CanvasRenderingContext2D | null = null

/** Any CSS colour — `oklch()`, `color-mix()`, a name — to sRGB, by painting a
 *  pixel with it. The browser does the conversion the page itself relies on. */
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

/** A computed box-shadow without the transparent, zero-size layers Tailwind
 *  stacks in front of every shadow utility — only the layers that draw. */
export function cleanShadow(value = ""): string {
  const layers = value.split(/,(?![^(]*\))/).map((layer) => layer.trim())
  const drawn = layers.filter((layer) => !/^rgba\(0, 0, 0, 0\) 0px 0px 0px 0px$/.test(layer))
  return drawn.join(", ") || value
}

/** A computed length in px as a number, or null. */
export function px(value = ""): number | null {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : null
}

/** letter-spacing in em, from the computed px value and the font size. */
export function trackingEm(letterSpacing = "", fontSize = ""): string {
  if (!letterSpacing || letterSpacing === "normal") return "0em"
  const ls = px(letterSpacing)
  const fs = px(fontSize)
  if (ls == null || !fs) return letterSpacing
  return `${(ls / fs).toFixed(3)}em`
}

/** Every `--color-*` custom property the stylesheet defines on `:root` (or
 *  Tailwind's `:host`), read from the live CSSOM — so a token added to
 *  `index.css` shows up on the style guide without touching it. */
export function useColorTokens() {
  const [names, setNames] = useState<string[]>([])
  useLayoutEffect(() => {
    const found = new Set<string>()
    const walk = (rules: CSSRuleList) => {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule && /:root|:host/.test(rule.selectorText)) {
          for (const prop of Array.from(rule.style)) if (prop.startsWith("--color-")) found.add(prop)
        }
        if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) walk((rule as CSSGroupingRule).cssRules)
      }
    }
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        walk(sheet.cssRules)
      } catch {
        /* a cross-origin sheet (fonts) cannot be read */
      }
    }
    setNames([...found])
  }, [])
  return names
}
