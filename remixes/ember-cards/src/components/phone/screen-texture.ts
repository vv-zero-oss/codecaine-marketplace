import { CanvasTexture, SRGBColorSpace } from "three"

/**
 * The app screens shown on the 3D phones, drawn with Canvas 2D so they stay
 * sharp at any zoom and can be driven by props (the holder's name, the card's
 * last four, the month's spend) rather than baked into an image.
 */

export type PhoneScreen = "wallet" | "cards"

export type ScreenContent = {
  screen: PhoneScreen
  holder: string
  last4: string
  spent: string
}

const W = 780
const H = 1688
const CORNER = 118

const INK = "#f1efeb"
const MUTED = "#8b8a90"
const PANEL = "rgba(30,30,35,0.94)"
const BG = "#0e0e11"
const SERIF = '"Newsreader", "EB Garamond", Georgia, serif'
const SANS = '"Inter", system-ui, sans-serif'

type Ctx = CanvasRenderingContext2D

function rounded(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}


// Metal finishes for the cards on screen, as [offset, colour] bands — the
// same finishes as the page's MetalCard, so the phone and the page agree.
const METALS: Record<string, Array<[number, string]>> = {
  titanium: [[0, "#36352f"], [0.17, "#9e9a91"], [0.31, "#5a5751"], [0.45, "#d3cfc5"], [0.58, "#75716a"], [0.74, "#413f3b"], [0.9, "#aca79e"], [1, "#4a4843"]],
  chrome: [[0, "#2b2c2f"], [0.16, "#cfd0d2"], [0.29, "#707276"], [0.43, "#f3f3f1"], [0.55, "#8e9094"], [0.7, "#3c3d40"], [0.86, "#c3c4c6"], [1, "#4d4e52"]],
  champagne: [[0, "#3f3526"], [0.17, "#bca77f"], [0.31, "#75643f"], [0.45, "#efe2c3"], [0.58, "#98835c"], [0.74, "#4d412c"], [0.9, "#d2c099"], [1, "#5a4c33"]],
  graphite: [[0, "#0f0f11"], [0.18, "#3a3b3f"], [0.33, "#19191c"], [0.46, "#56575c"], [0.6, "#212225"], [0.76, "#0d0d0f"], [0.92, "#313236"], [1, "#151517"]],
  copper: [[0, "#33221c"], [0.17, "#a57d69"], [0.31, "#573a2f"], [0.45, "#dcbba7"], [0.58, "#7a5445"], [0.74, "#3a261f"], [0.9, "#9b725f"], [1, "#432d25"]],
}
const ENGRAVE: Record<string, string> = { graphite: "rgba(236,233,227,0.85)" }
const engraveFor = (finish: string) => ENGRAVE[finish] ?? "rgba(24,22,18,0.78)"

let noiseTile: HTMLCanvasElement | null = null
function noise(): HTMLCanvasElement {
  if (noiseTile) return noiseTile
  const c = document.createElement("canvas")
  c.width = c.height = 128
  const g = c.getContext("2d")!
  const img = g.createImageData(128, 128)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  g.putImageData(img, 0, 0)
  noiseTile = c
  return c
}

/** Film grain over whatever is in the current clip. */
function grain(ctx: Ctx, x: number, y: number, w: number, h: number, amount = 0.12) {
  const pattern = ctx.createPattern(noise(), "repeat")
  if (!pattern) return
  ctx.save()
  ctx.globalCompositeOperation = "overlay"
  ctx.globalAlpha = amount
  ctx.fillStyle = pattern
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

/** A machined-metal rounded rectangle: banded finish, brushing, a highlight and grain. */
function metal(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, finish: string) {
  ctx.save()
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)"
  ctx.shadowBlur = 40
  ctx.shadowOffsetY = 16
  rounded(ctx, x, y, w, h, r)
  const g = ctx.createLinearGradient(x, y + h, x + w, y)
  for (const [o, c] of METALS[finish] ?? METALS.titanium) g.addColorStop(o, c)
  ctx.fillStyle = g
  ctx.fill()
  ctx.restore()

  ctx.save()
  rounded(ctx, x, y, w, h, r)
  ctx.clip()
  // brushing
  ctx.globalAlpha = 0.06
  for (let i = 0; i < w; i += 3) {
    ctx.fillStyle = i % 6 ? "#000" : "#fff"
    ctx.fillRect(x + i, y, 1, h)
  }
  ctx.globalAlpha = 1
  // specular highlight
  const sheen = ctx.createRadialGradient(x + w * 0.3, y + h * 0.2, 4, x + w * 0.3, y + h * 0.2, w * 0.55)
  sheen.addColorStop(0, "rgba(255,255,255,0.35)")
  sheen.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = sheen
  ctx.fillRect(x, y, w, h)
  grain(ctx, x, y, w, h, 0.22)
  // bevel: light top edge
  ctx.strokeStyle = "rgba(255,255,255,0.35)"
  ctx.lineWidth = 2
  rounded(ctx, x + 1, y + 1, w - 2, h - 2, r)
  ctx.stroke()
  ctx.restore()
}

function panel(ctx: Ctx, x: number, y: number, w: number, h: number, r = 36) {
  ctx.save()
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)"
  ctx.shadowBlur = 24
  ctx.shadowOffsetY = 6
  rounded(ctx, x, y, w, h, r)
  ctx.fillStyle = PANEL
  ctx.fill()
  ctx.restore()
}

function text(ctx: Ctx, value: string, x: number, y: number, font: string, color = INK, align: CanvasTextAlign = "left") {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = "alphabetic"
  ctx.fillText(value, x, y)
}

function statusBar(ctx: Ctx) {
  text(ctx, "9:41", 96, 92, `600 34px ${SANS}`)
  // signal bars
  ctx.fillStyle = INK
  for (let i = 0; i < 4; i++) {
    rounded(ctx, 560 + i * 12, 82 - i * 6, 8, 10 + i * 6, 2)
    ctx.fill()
  }
  text(ctx, "5G", 628, 91, `600 26px ${SANS}`)
  // battery
  ctx.lineWidth = 3
  ctx.strokeStyle = INK
  rounded(ctx, 670, 70, 50, 24, 7)
  ctx.stroke()
  rounded(ctx, 675, 75, 38, 14, 4)
  ctx.fill()
}

function mark(ctx: Ctx, x: number, y: number, s: number, color = INK) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s / 24, s / 24)
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 1.8
  ctx.save()
  ctx.translate(9, 11)
  ctx.rotate((-12 * Math.PI) / 180)
  rounded(ctx, -5, -7.5, 10, 15, 2.6)
  ctx.stroke()
  ctx.restore()
  ctx.save()
  ctx.translate(14.5, 12.5)
  ctx.rotate((8 * Math.PI) / 180)
  rounded(ctx, -5, -7.5, 10, 15, 2.6)
  ctx.fill()
  ctx.restore()
  ctx.restore()
}

function virtualCard(ctx: Ctx, x: number, y: number, w: number, h: number, holder: string, last4: string, finish = "titanium") {
  metal(ctx, x, y, w, h, 40, finish)
  const ink = engraveFor(finish)
  text(ctx, holder, x + 40, y + h - 96, `400 44px ${SERIF}`, ink)
  text(ctx, `•••• ${last4}`, x + 40, y + h - 46, `500 28px ${SANS}`, ink)
  mark(ctx, x + 36, y + 34, 48, ink)
  text(ctx, "VIRTUAL", x + w - 40, y + 70, `600 20px ${SANS}`, ink, "right")
  // chip
  metal(ctx, x + 40, y + 130, 84, 64, 12, "champagne")
  ctx.strokeStyle = "rgba(0,0,0,0.25)"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(x + 40, y + 162)
  ctx.lineTo(x + 124, y + 162)
  ctx.moveTo(x + 68, y + 130)
  ctx.lineTo(x + 68, y + 194)
  ctx.moveTo(x + 96, y + 130)
  ctx.lineTo(x + 96, y + 194)
  ctx.stroke()
}

function check(ctx: Ctx, x: number, y: number, color = "#72d69c") {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 7, y + 7)
  ctx.lineTo(x + 20, y - 8)
  ctx.stroke()
  ctx.restore()
}

function tabBar(ctx: Ctx, active: number) {
  ctx.save()
  ctx.fillStyle = "rgba(20,20,24,0.96)"
  ctx.fillRect(0, H - 170, W, 170)
  ctx.fillStyle = "rgba(255,255,255,0.06)"
  ctx.fillRect(0, H - 170, W, 2)
  const xs = [200, 390, 580]
  xs.forEach((cx, i) => {
    ctx.strokeStyle = i === active ? INK : "#5e5d64"
    ctx.fillStyle = i === active ? INK : "#5e5d64"
    ctx.lineWidth = 4
    if (i === 0) {
      rounded(ctx, cx - 26, H - 132, 52, 38, 8)
      i === active ? ctx.fill() : ctx.stroke()
    } else if (i === 1) {
      rounded(ctx, cx - 24, H - 136, 40, 50, 8)
      ctx.stroke()
      rounded(ctx, cx - 12, H - 130, 40, 50, 8)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.arc(cx, H - 112, 24, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, H - 118, 8, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  // home indicator
  rounded(ctx, W / 2 - 110, H - 34, 220, 10, 5)
  ctx.fillStyle = INK
  ctx.fill()
  ctx.restore()
}

function background(ctx: Ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, "#17141d")
  g.addColorStop(0.5, BG)
  g.addColorStop(1, BG)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(W * 0.9, 200, 20, W * 0.9, 200, 520)
  glow.addColorStop(0, "rgba(205, 184, 146, 0.16)")
  glow.addColorStop(1, "rgba(205, 184, 146, 0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)
}

function drawWallet(ctx: Ctx, c: ScreenContent) {
  background(ctx)
  statusBar(ctx)
  text(ctx, "Wallet", 60, 260, `400 72px ${SERIF}`)
  ctx.beginPath()
  ctx.arc(W - 96, 238, 36, 0, Math.PI * 2)
  ctx.fillStyle = INK
  ctx.fill()
  ctx.fillStyle = BG
  ctx.fillRect(W - 110, 235, 28, 6)
  ctx.fillRect(W - 99, 224, 6, 28)

  virtualCard(ctx, 48, 316, W - 96, 420, c.holder, c.last4)

  // spend panel
  panel(ctx, 48, 776, W - 96, 330)
  text(ctx, "This month", 88, 842, `600 28px ${SANS}`)
  text(ctx, c.spent, 88, 942, `400 76px ${SERIF}`)
  text(ctx, "Across 6 cards", 88, 992, `500 24px ${SANS}`, MUTED)
  const bars = [0.35, 0.6, 0.45, 0.8, 0.55, 0.9, 0.65]
  bars.forEach((b, i) => {
    const bh = 170 * b
    rounded(ctx, 440 + i * 34, 1060 - bh, 20, bh, 8)
    ctx.fillStyle = i === 5 ? "#cdb892" : "#2e2e33"
    ctx.fill()
  })

  // card rows
  panel(ctx, 48, 1140, W - 96, 340)
  const rows = [
    ["Streaming", "Locked to one merchant"],
    ["Groceries", "$400 monthly limit"],
    ["Checkout, once", "Burns after use"],
  ]
  rows.forEach(([title, sub], i) => {
    const y = 1210 + i * 100
    metal(ctx, 84, y - 38, 64, 44, 8, ["titanium", "chrome", "champagne"][i])
    text(ctx, title, 172, y - 10, `600 28px ${SANS}`)
    text(ctx, sub, 172, y + 24, `500 22px ${SANS}`, MUTED)
    check(ctx, W - 130, y - 12)
  })

  tabBar(ctx, 0)
}

function drawCards(ctx: Ctx, c: ScreenContent) {
  background(ctx)
  statusBar(ctx)
  text(ctx, "Cards", 60, 260, `400 72px ${SERIF}`)
  ctx.beginPath()
  ctx.arc(W - 96, 238, 36, 0, Math.PI * 2)
  ctx.strokeStyle = "#45444b"
  ctx.lineWidth = 3
  ctx.stroke()
  text(ctx, "⌕", W - 96, 252, `500 40px ${SANS}`, "#777", "center")

  const chips = ["Active", "Burned", "All"]
  let cx = 60
  chips.forEach((chip, i) => {
    ctx.font = `600 26px ${SANS}`
    const w = ctx.measureText(chip).width + 48
    rounded(ctx, cx, 308, w, 56, 28)
    ctx.fillStyle = i === 0 ? INK : "rgba(255,255,255,0.08)"
    ctx.fill()
    text(ctx, chip, cx + w / 2, 345, `600 26px ${SANS}`, i === 0 ? BG : INK, "center")
    cx += w + 14
  })

  const cards: Array<[string, string, string]> = [
    ["Streaming", "4821", "titanium"],
    ["Groceries", "1907", "chrome"],
    ["Travel", "6630", "champagne"],
    ["Coffee", "3148", "graphite"],
  ]
  cards.forEach(([name, last, finish], i) => {
    const y = 410 + i * 250
    metal(ctx, 48, y, W - 96, 220, 34, finish)
    const ink = engraveFor(finish)
    text(ctx, name, 88, y + 72, `400 40px ${SERIF}`, ink)
    text(ctx, `•••• ${i === 0 ? c.last4 : last}`, 88, y + 116, `500 24px ${SANS}`, ink)
    mark(ctx, 84, y + 146, 40, ink)
    rounded(ctx, W - 230, y + 150, 150, 44, 22)
    ctx.fillStyle = "rgba(0,0,0,0.35)"
    ctx.fill()
    text(ctx, i === 3 ? "Paused" : "Active", W - 155, y + 180, `600 22px ${SANS}`, i === 3 ? "#bcb9b2" : "#c9e0c3", "center")
  })

  tabBar(ctx, 1)
}

/** Draws `content` into a canvas and returns it as a texture ready for a screen. */
export function createScreenTexture(content: ScreenContent): CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8

  const paint = () => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    ctx.save()
    // The display's rounded corners, so the overlay sits inside the bezel.
    rounded(ctx, 0, 0, W, H, CORNER)
    ctx.clip()
    if (content.screen === "cards") drawCards(ctx, content)
    else drawWallet(ctx, content)
    grain(ctx, 0, 0, W, H, 0.08)
    // The camera cut-out.
    rounded(ctx, W / 2 - 120, 34, 240, 70, 35)
    ctx.fillStyle = "#050505"
    ctx.fill()
    ctx.restore()
    texture.needsUpdate = true
  }

  paint()
  // Paint again once the page's Google Fonts are in, so the serif is right.
  if (typeof document !== "undefined" && document.fonts) {
    Promise.all([
      document.fonts.load(`400 72px ${SERIF}`),
      document.fonts.load(`600 28px ${SANS}`),
    ])
      .then(paint)
      .catch(() => {})
  }
  return texture
}

export const SCREEN_ASPECT = W / H
