/**
 * What lies on the hero's infinite canvas, and how each piece is painted.
 *
 * The world is one tile of `COLS × ROWS` cells repeated forever in both
 * directions, so however long the canvas drifts it never runs out and never
 * repeats a seam. Photos come first; then the canvas "builds" behind them —
 * frames with their names above them, live pages, a selection an agent is
 * working on, a prompt, a sheet of components.
 *
 * Measurements are design pixels at a 1440px-wide screen; the renderer scales
 * them by `unit`. Every colour is read from the tokens in `index.css`.
 */

import { mockups, pexels, photos, type Photo } from "@/content"

export const CELL = 240
export const COLS = 12
export const ROWS = 8
export const WORLD_W = CELL * COLS
export const WORLD_H = CELL * ROWS
/** Height of a frame's name above it. */
const LABEL = 22

export type FrameKind =
  | "page-desktop"
  | "page-mobile"
  | "page-pricing"
  | "mockup-light"
  | "mockup-dark"
  | "selection"
  | "prompt"
  | "components"

export interface SceneItem {
  kind: "photo" | FrameKind
  x: number
  y: number
  w: number
  h: number
  /** Seconds into the intro this piece arrives. */
  delay: number
  /** Corner radius the shader clips to, in design px. */
  radius: number
  photo?: Photo
}

/** The frames, each at a cell and spanning `cols × rows` of them; photos
 *  fill every other cell but a few left empty to breathe. */
const FRAMES: { kind: FrameKind; col: number; row: number; cols: number; rows: number; w: number; h: number }[] = [
  { kind: "page-desktop", col: 0, row: 1, cols: 2, rows: 1, w: 320, h: 222 },
  { kind: "mockup-light", col: 5, row: 0, cols: 2, rows: 1, w: 340, h: 218 },
  { kind: "mockup-dark", col: 3, row: 5, cols: 2, rows: 1, w: 340, h: 218 },
  { kind: "selection", col: 8, row: 3, cols: 2, rows: 1, w: 230, h: 200 },
  { kind: "page-pricing", col: 9, row: 6, cols: 2, rows: 1, w: 300, h: 212 },
  { kind: "page-mobile", col: 11, row: 1, cols: 1, rows: 2, w: 132, h: 262 },
  { kind: "components", col: 1, row: 6, cols: 2, rows: 1, w: 250, h: 150 },
  { kind: "prompt", col: 6, row: 4, cols: 2, rows: 1, w: 236, h: 118 },
]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildScene(): SceneItem[] {
  const rand = mulberry32(11)
  const items: SceneItem[] = []
  const taken = new Set<string>()
  const pad = 12

  for (const frame of FRAMES) {
    for (let c = 0; c < frame.cols; c++) for (let r = 0; r < frame.rows; r++) taken.add(`${frame.col + c},${frame.row + r}`)
    const spanW = frame.cols * CELL
    const spanH = frame.rows * CELL
    items.push({
      kind: frame.kind,
      w: frame.w,
      h: frame.h,
      x: frame.col * CELL + pad + rand() * Math.max(0, spanW - frame.w - pad * 2),
      y: frame.row * CELL + pad + rand() * Math.max(0, spanH - frame.h - pad * 2),
      // The canvas builds after the images have arrived.
      delay: 0.85 + rand() * 0.7,
      radius: 0,
    })
  }

  let next = 0
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (taken.has(`${col},${row}`) || rand() < 0.12) continue
      const aspect = [1, 0.78, 1.28, 0.84, 1.12][Math.floor(rand() * 5)]
      const w = aspect >= 1 ? 124 + rand() * 72 : 104 + rand() * 50
      const h = w / aspect
      items.push({
        kind: "photo",
        w,
        h,
        x: col * CELL + pad + rand() * Math.max(0, CELL - w - pad * 2),
        y: row * CELL + pad + rand() * Math.max(0, CELL - h - pad * 2),
        delay: rand() * 0.8,
        radius: 3,
        photo: photos[next++ % photos.length],
      })
    }
  }
  return items
}

/* ── Painting ─────────────────────────────────────────────────────────── */

const SCALE = 2

function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000"
}

/** One retry after a short wait: a dropped request should not leave a hole
 *  in the canvas for ever. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return fetchImage(src).catch(() => new Promise((r) => setTimeout(r, 900)).then(() => fetchImage(src)))
}

function fetchImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.decoding = "async"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function cover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const sw = w / s
  const sh = h / s
  ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, y, w, h)
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function surface(item: SceneItem) {
  const canvas = document.createElement("canvas")
  canvas.width = Math.ceil(item.w * SCALE)
  canvas.height = Math.ceil(item.h * SCALE)
  const ctx = canvas.getContext("2d")!
  ctx.scale(SCALE, SCALE)
  return { canvas, ctx }
}

/** The frame's name above it, with the little frame glyph a design tool
 *  draws there. Returns the body's rectangle. */
function label(ctx: CanvasRenderingContext2D, item: SceneItem, text: string, live = false) {
  ctx.font = `500 10.5px Inter, sans-serif`
  ctx.textBaseline = "middle"
  let x = 1
  if (live) {
    ctx.fillStyle = token("--live")
    ctx.beginPath()
    ctx.arc(x + 3, 9, 3, 0, Math.PI * 2)
    ctx.fill()
    x += 10
  } else {
    ctx.strokeStyle = token("--mist")
    ctx.lineWidth = 1
    ctx.beginPath()
    for (const d of [2.5, 6.5]) {
      ctx.moveTo(x + d, 4)
      ctx.lineTo(x + d, 14)
      ctx.moveTo(x, 4 + d + 0.5)
      ctx.lineTo(x + 9, 4 + d + 0.5)
    }
    ctx.stroke()
    x += 14
  }
  ctx.fillStyle = token("--mist")
  ctx.fillText(text, x, 9.5)
  return { x: 0, y: LABEL, w: item.w, h: item.h - LABEL }
}

function bars(ctx: CanvasRenderingContext2D, x: number, y: number, widths: number[], h: number, gap: number, color: string) {
  ctx.fillStyle = color
  let cy = y
  for (const w of widths) {
    rr(ctx, x, cy, w, h, h / 2)
    ctx.fill()
    cy += h + gap
  }
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, fill: string, ink: string, size = 8, stroke?: string) {
  ctx.font = `500 ${size}px Inter, sans-serif`
  const w = ctx.measureText(text).width + size * 2.2
  const h = size * 2.4
  rr(ctx, x, y, w, h, h / 2)
  ctx.fillStyle = fill
  ctx.fill()
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = 0.75
    ctx.stroke()
  }
  ctx.fillStyle = ink
  ctx.textBaseline = "middle"
  ctx.fillText(text, x + size * 1.1, y + h / 2 + 0.5)
  return w
}

/** An arrow cursor with its name beside it. */
function cursor(ctx: CanvasRenderingContext2D, x: number, y: number, name: string, color: string) {
  ctx.fillStyle = color
  ctx.strokeStyle = token("--paper")
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 10, y + 4)
  ctx.lineTo(x + 5, y + 5.5)
  ctx.lineTo(x + 3.5, y + 10.5)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  pill(ctx, x + 9, y + 9, name, color, token("--paper"), 7.5)
}

async function paintPhoto(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const img = await loadImage(pexels(item.photo!, Math.min(480, item.w * SCALE * 1.4)))
  cover(ctx, img, 0, 0, item.w, item.h)
  return canvas
}

async function paintMockup(item: SceneItem, which: "light" | "dark") {
  const { canvas, ctx } = surface(item)
  const body = label(ctx, item, which === "light" ? "Canvas — Layers" : "Canvas — Agent")
  const img = await loadImage(mockups[which].src)
  ctx.save()
  rr(ctx, body.x, body.y, body.w, body.h, 5)
  ctx.clip()
  cover(ctx, img, body.x, body.y, body.w, body.h)
  ctx.restore()
  return canvas
}

async function paintDesktop(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const body = label(ctx, item, "halden.shop", true)
  const img = await loadImage(pexels(photos[5], 420))
  rr(ctx, body.x, body.y, body.w, body.h, 5)
  ctx.fillStyle = token("--paper")
  ctx.fill()
  const x = body.x + 14
  const y = body.y
  ctx.fillStyle = token("--ink")
  ctx.font = "700 8px Inter, sans-serif"
  ctx.textBaseline = "middle"
  ctx.fillText("HALDEN", x, y + 13)
  ctx.fillStyle = token("--field")
  for (let i = 0; i < 3; i++) {
    rr(ctx, body.w - 130 + i * 30, y + 11, 22, 4, 2)
    ctx.fill()
  }
  pill(ctx, body.w - 44, y + 6, "Shop", token("--button"), token("--paper"), 6)
  ctx.fillStyle = token("--ink")
  ctx.font = "500 20px Inter, sans-serif"
  ctx.fillText("Made slowly.", x, y + 58)
  ctx.fillText("Fired twice.", x, y + 80)
  bars(ctx, x, y + 102, [120, 96], 4, 5, token("--field"))
  pill(ctx, x, y + 130, "Shop the kiln", token("--button"), token("--paper"), 7)
  ctx.save()
  rr(ctx, body.w - 134, y + 32, 120, body.h - 46, 4)
  ctx.clip()
  cover(ctx, img, body.w - 134, y + 32, 120, body.h - 46)
  ctx.restore()
  return canvas
}

async function paintMobile(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const body = label(ctx, item, "Mobile — 390")
  const img = await loadImage(pexels(photos[6], 300))
  rr(ctx, body.x, body.y, body.w, body.h, 12)
  ctx.fillStyle = token("--paper")
  ctx.fill()
  ctx.save()
  rr(ctx, body.x + 6, body.y + 24, body.w - 12, 110, 7)
  ctx.clip()
  cover(ctx, img, body.x + 6, body.y + 24, body.w - 12, 110)
  ctx.restore()
  ctx.fillStyle = token("--ink")
  ctx.font = "700 6.5px Inter, sans-serif"
  ctx.textBaseline = "middle"
  ctx.fillText("HALDEN", body.x + 10, body.y + 12)
  ctx.font = "500 13px Inter, sans-serif"
  ctx.fillText("Made slowly.", body.x + 9, body.y + 152)
  bars(ctx, body.x + 9, body.y + 166, [96, 76, 88], 3.5, 4, token("--field"))
  pill(ctx, body.x + 9, body.y + 200, "Shop the kiln", token("--button"), token("--paper"), 6.5)
  return canvas
}

async function paintPricing(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const body = label(ctx, item, "Pricing — v3")
  rr(ctx, body.x, body.y, body.w, body.h, 5)
  ctx.fillStyle = token("--mauve-50")
  ctx.fill()
  ctx.fillStyle = token("--ink")
  ctx.textBaseline = "middle"
  ctx.font = "500 14px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Simple plans", body.w / 2, body.y + 24)
  ctx.textAlign = "left"
  const plans = [
    { name: "Free", price: "$0" },
    { name: "Pro", price: "$24" },
    { name: "Team", price: "$64" },
  ]
  const cw = (body.w - 16 * 2 - 8 * 2) / 3
  plans.forEach((plan, i) => {
    const cx = 16 + i * (cw + 8)
    const cy = body.y + 44
    const dark = i === 1
    rr(ctx, cx, cy, cw, body.h - 58, 6)
    ctx.fillStyle = dark ? token("--button") : token("--paper")
    ctx.fill()
    ctx.fillStyle = dark ? token("--paper") : token("--ink")
    ctx.font = "500 7px Inter, sans-serif"
    ctx.fillText(plan.name, cx + 8, cy + 12)
    ctx.font = "500 16px Inter, sans-serif"
    ctx.fillText(plan.price, cx + 8, cy + 32)
    bars(ctx, cx + 8, cy + 50, [cw - 24, cw - 34, cw - 28], 3, 5, dark ? token("--night-field-edge") : token("--field"))
    rr(ctx, cx + 8, cy + body.h - 58 - 24, cw - 16, 14, 7)
    ctx.fillStyle = dark ? token("--paper") : token("--button")
    ctx.fill()
  })
  return canvas
}

async function paintSelection(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const img = await loadImage(pexels(photos[1], 420))
  const box = { x: 14, y: 14, w: item.w - 60, h: item.h - 70 }
  ctx.save()
  rr(ctx, box.x, box.y, box.w, box.h, 3)
  ctx.clip()
  cover(ctx, img, box.x, box.y, box.w, box.h)
  ctx.restore()
  ctx.strokeStyle = token("--paper")
  ctx.lineWidth = 1
  ctx.strokeRect(box.x - 0.5, box.y - 0.5, box.w + 1, box.h + 1)
  for (const [hx, hy] of [
    [box.x, box.y],
    [box.x + box.w, box.y],
    [box.x, box.y + box.h],
    [box.x + box.w, box.y + box.h],
  ]) {
    ctx.fillStyle = token("--paper")
    ctx.fillRect(hx - 3, hy - 3, 6, 6)
    ctx.strokeStyle = token("--mauve-500")
    ctx.strokeRect(hx - 3, hy - 3, 6, 6)
  }
  const size = `${Math.round(box.w)} × ${Math.round(box.h)}`
  ctx.font = "500 7px Inter, sans-serif"
  const sw = ctx.measureText(size).width + 10
  pill(ctx, box.x + box.w / 2 - sw / 2, box.y + box.h + 6, size, token("--mauve-500"), token("--paper"), 7)
  cursor(ctx, box.x + box.w - 18, box.y + box.h - 30, "✦ Layout agent", token("--mauve-900"))
  return canvas
}

async function paintPrompt(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  rr(ctx, 0.5, 0.5, item.w - 1, item.h - 1, 12)
  ctx.fillStyle = token("--night-raised")
  ctx.fill()
  ctx.strokeStyle = token("--hairline-night")
  ctx.stroke()
  ctx.textBaseline = "middle"
  ctx.fillStyle = token("--mauve-300")
  ctx.font = "500 8px Inter, sans-serif"
  ctx.fillText("✦  Agent", 14, 18)
  ctx.fillStyle = token("--on-night")
  ctx.font = "400 11px Inter, sans-serif"
  ctx.fillText("Make the hero warmer and", 14, 42)
  ctx.fillText("add a booking button", 14, 58)
  ctx.fillStyle = token("--mist")
  ctx.font = "400 7.5px Inter, sans-serif"
  ctx.fillText("3 frames · Inter · halden tokens", 14, item.h - 20)
  ctx.beginPath()
  ctx.arc(item.w - 22, item.h - 22, 10, 0, Math.PI * 2)
  ctx.fillStyle = token("--paper")
  ctx.fill()
  ctx.strokeStyle = token("--ink")
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(item.w - 22, item.h - 17)
  ctx.lineTo(item.w - 22, item.h - 27)
  ctx.moveTo(item.w - 26, item.h - 23)
  ctx.lineTo(item.w - 22, item.h - 27)
  ctx.lineTo(item.w - 18, item.h - 23)
  ctx.stroke()
  return canvas
}

async function paintComponents(item: SceneItem) {
  const { canvas, ctx } = surface(item)
  const body = label(ctx, item, "Components — Buttons")
  rr(ctx, body.x, body.y, body.w, body.h, 5)
  ctx.fillStyle = token("--paper")
  ctx.fill()
  let x = 14
  const y = body.y + 16
  x += pill(ctx, x, y, "Get started", token("--button"), token("--paper"), 8) + 8
  x += pill(ctx, x, y, "Learn more", token("--paper"), token("--ink"), 8, token("--hairline-strong")) + 8
  pill(ctx, 14, y + 32, "Book a table", token("--mauve-500"), token("--paper"), 8)
  // A toggle, on and off
  for (const [tx, on] of [
    [14, true],
    [44, false],
  ] as const) {
    rr(ctx, tx, y + 68, 24, 14, 7)
    ctx.fillStyle = on ? token("--button") : token("--field")
    ctx.fill()
    ctx.beginPath()
    ctx.arc(on ? tx + 17 : tx + 7, y + 75, 5, 0, Math.PI * 2)
    ctx.fillStyle = token("--paper")
    ctx.fill()
  }
  bars(ctx, 80, y + 70, [70], 10, 0, token("--field"))
  return canvas
}

/** Paint one item into a canvas the renderer uploads as a texture. */
export async function paint(item: SceneItem): Promise<HTMLCanvasElement> {
  switch (item.kind) {
    case "photo":
      return paintPhoto(item)
    case "mockup-light":
      return paintMockup(item, "light")
    case "mockup-dark":
      return paintMockup(item, "dark")
    case "page-desktop":
      return paintDesktop(item)
    case "page-mobile":
      return paintMobile(item)
    case "page-pricing":
      return paintPricing(item)
    case "selection":
      return paintSelection(item)
    case "prompt":
      return paintPrompt(item)
    case "components":
      return paintComponents(item)
  }
}
