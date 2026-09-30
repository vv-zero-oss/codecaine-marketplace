import { useEffect, useState } from "react"

import type { Colourway } from "@/content"

/**
 * Two things Drape does to a photo, done in the page on a 2D canvas:
 *
 * - `recolour` moves one garment to another colour. Only pixels whose hue sits
 *   near the garment's own hue (and are saturated enough to be fabric rather
 *   than a grey wall) are touched, so skin, hair and the studio stay as they
 *   were — which a CSS `hue-rotate()` cannot do.
 * - `sketch` turns a photo into a pencil drawing: a colour dodge of the image
 *   against its own blur, plus the Sobel edges for the contour.
 *
 * Results are cached by URL and parameters, and each returns a blob URL.
 */

const images = new Map<string, Promise<HTMLImageElement>>()
const results = new Map<string, Promise<string>>()

export function loadImage(src: string) {
  let entry = images.get(src)
  if (!entry) {
    entry = new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = "anonymous"
      image.decoding = "async"
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = src
    })
    images.set(src, entry)
  }
  return entry
}

function pixels(image: HTMLImageElement) {
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext("2d", { willReadFrequently: true })!
  context.drawImage(image, 0, 0)
  return { canvas, context, data: context.getImageData(0, 0, canvas.width, canvas.height) }
}

function toUrl(canvas: HTMLCanvasElement) {
  return new Promise<string>((resolve) =>
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : canvas.toDataURL()), "image/jpeg", 0.9),
  )
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  h *= 60
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0) * 255, f(8) * 255, f(4) * 255]
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

/** A separable box blur of a single channel. */
function boxBlur(src: Float32Array, w: number, h: number, r: number) {
  const tmp = new Float32Array(w * h)
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    let sum = 0
    for (let x = -r; x <= r; x++) sum += src[y * w + Math.min(w - 1, Math.max(0, x))]
    for (let x = 0; x < w; x++) {
      tmp[y * w + x] = sum / (2 * r + 1)
      sum += src[y * w + Math.min(w - 1, x + r + 1)] - src[y * w + Math.max(0, x - r)]
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0
    for (let y = -r; y <= r; y++) sum += tmp[Math.min(h - 1, Math.max(0, y)) * w + x]
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / (2 * r + 1)
      sum += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x]
    }
  }
  return out
}

export function recolour(src: string, garmentHue: number, way: Colourway): Promise<string> {
  const key = `r|${src}|${garmentHue}|${way.hue}|${way.sat}|${way.light}`
  let entry = results.get(key)
  if (!entry) {
    entry = loadImage(src).then((image) => {
      const { canvas, context, data } = pixels(image)
      const px = data.data
      const { width: w, height: h } = canvas
      // First the mask: how much each pixel belongs to the garment. Then a
      // blur, so it follows the fabric smoothly instead of the JPEG's blocks
      // and fills the pale highlights on the folds.
      const hsl = new Float32Array(w * h * 3)
      const mask = new Float32Array(w * h)
      for (let i = 0; i < w * h; i++) {
        const [hh, ss, ll] = rgbToHsl(px[i * 4], px[i * 4 + 1], px[i * 4 + 2])
        hsl[i * 3] = hh
        hsl[i * 3 + 1] = ss
        hsl[i * 3 + 2] = ll
        let distance = Math.abs(hh - garmentHue)
        if (distance > 180) distance = 360 - distance
        mask[i] = clamp((58 - distance) / 22) * clamp((ss - 0.09) / 0.1)
      }
      const soft = boxBlur(boxBlur(mask, w, h, Math.max(2, Math.round(w / 200))), w, h, Math.max(2, Math.round(w / 200)))
      for (let i = 0; i < w * h; i++) {
        const m = clamp((soft[i] - 0.18) / 0.5)
        if (m <= 0) continue
        const [r, g, b] = hslToRgb(way.hue, clamp(Math.max(hsl[i * 3 + 1], 0.12) * way.sat), clamp(hsl[i * 3 + 2] * way.light, 0.04, 0.97))
        const o = i * 4
        px[o] = px[o] + (r - px[o]) * m
        px[o + 1] = px[o + 1] + (g - px[o + 1]) * m
        px[o + 2] = px[o + 2] + (b - px[o + 2]) * m
      }
      context.putImageData(data, 0, 0)
      return toUrl(canvas)
    })
    results.set(key, entry)
  }
  return entry
}

export function sketch(src: string): Promise<string> {
  const key = `s|${src}`
  let entry = results.get(key)
  if (!entry) {
    entry = loadImage(src).then((image) => {
      const { canvas, context, data } = pixels(image)
      const { width: w, height: h } = canvas
      const px = data.data
      const lum = new Float32Array(w * h)
      for (let i = 0; i < w * h; i++) lum[i] = (px[i * 4] * 0.299 + px[i * 4 + 1] * 0.587 + px[i * 4 + 2] * 0.114) / 255
      // Box blur, twice (close enough to a gaussian for a dodge).
      const blur = new Float32Array(lum)
      const tmp = new Float32Array(w * h)
      const r = Math.max(2, Math.round(w / 160))
      for (let pass = 0; pass < 2; pass++) {
        for (let y = 0; y < h; y++)
          for (let x = 0; x < w; x++) {
            let sum = 0
            let n = 0
            for (let k = -r; k <= r; k++) {
              const xx = x + k
              if (xx >= 0 && xx < w) {
                sum += blur[y * w + xx]
                n++
              }
            }
            tmp[y * w + x] = sum / n
          }
        for (let y = 0; y < h; y++)
          for (let x = 0; x < w; x++) {
            let sum = 0
            let n = 0
            for (let k = -r; k <= r; k++) {
              const yy = y + k
              if (yy >= 0 && yy < h) {
                sum += tmp[yy * w + x]
                n++
              }
            }
            blur[y * w + x] = sum / n
          }
      }
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          const i = y * w + x
          const dodge = clamp(lum[i] / Math.max(blur[i], 0.02))
          let edge = 0
          if (x > 0 && y > 0 && x < w - 1 && y < h - 1) {
            const gx = lum[i + 1 - w] + 2 * lum[i + 1] + lum[i + 1 + w] - lum[i - 1 - w] - 2 * lum[i - 1] - lum[i - 1 + w]
            const gy = lum[i - 1 + w] + 2 * lum[i + w] + lum[i + 1 + w] - lum[i - 1 - w] - 2 * lum[i - w] - lum[i + 1 - w]
            edge = Math.hypot(gx, gy)
          }
          const line = Math.max(1 - dodge ** 6, clamp((edge - 0.12) / 0.35) * 0.85)
          const v = 255 * (1 - line * 0.92)
          px[i * 4] = v * 0.99
          px[i * 4 + 1] = v * 0.97
          px[i * 4 + 2] = v * 0.94
        }
      context.putImageData(data, 0, 0)
      return toUrl(canvas)
    })
    results.set(key, entry)
  }
  return entry
}

/** A processed image as state: `undefined` until it is ready. */
export function useProcessed(task: () => Promise<string>, deps: unknown[]) {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    let live = true
    task().then(
      (next) => live && setUrl(next),
      () => undefined,
    )
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return url
}
