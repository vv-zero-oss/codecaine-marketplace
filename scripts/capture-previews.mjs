#!/usr/bin/env node
/**
 * Captures a template's previews: the pictures its page in the editor's
 * marketplace shows on the left.
 *
 *   cd templates/<id> && npm install && npm run dev      # in one terminal
 *   node scripts/capture-previews.mjs <id> http://localhost:<port>
 *
 * Writes into `templates/<id>/previews/`:
 *
 *   desktop.jpg        the home page, whole, at 1440px wide
 *   mobile.jpg         the home page, whole, at 390px wide
 *   pages/<slug>.jpg   the top of every page `marketplace.json` lists
 *   ../preview.png     the card thumbnail: the home page's first screen
 *
 * and points `marketplace.json`'s `previews` at them. Run `npm run build`
 * afterwards.
 *
 * JPEG rather than PNG for the tall ones: a photographer's home page at full
 * height is a few hundred kilobytes as a JPEG and several megabytes as a PNG,
 * and every one of them is downloaded by whoever opens the item's page.
 *
 * Needs Playwright, which this repository does not install for its own sake
 * (nothing else here wants a browser). `npx -y -p playwright@1 node scripts/…`
 * works; so does `PLAYWRIGHT_MODULE=/path/to/node_modules/playwright`, and
 * `CHROMIUM_PATH` for a browser already on the machine.
 *
 * `--stub-images` stands tonal placeholders in for picsum.photos, for a
 * machine that cannot reach it. Previews captured that way show placeholders
 * where the running template shows photographs — capture without it wherever
 * the network allows.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const [id, base] = process.argv.slice(2).filter((a) => !a.startsWith("--"))
const stub = process.argv.includes("--stub-images")
if (!id || !base) {
  console.error("usage: node scripts/capture-previews.mjs <template-id> <dev-server-url> [--stub-images]")
  process.exit(1)
}

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_MODULE) return createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE)
  try {
    return await import("playwright")
  } catch {
    console.error("Playwright is not installed. Try: npx -y -p playwright@1 node scripts/capture-previews.mjs …")
    process.exit(1)
  }
}

function placeholder(url) {
  const seed = [...url].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
  const hue = 20 + (seed % 50)
  const l1 = 38 + (seed % 25)
  const l2 = l1 + 18
  const [, w, h] = url.match(/\/(\d+)\/(\d+)$/) ?? [0, 1200, 1500]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 18% ${l2}%)"/><stop offset="1" stop-color="hsl(${hue + 10} 22% ${l1}%)"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="${w * 0.62}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.18}" fill="hsl(${hue} 30% ${l2 + 12}%)" opacity=".55"/><rect y="${h * 0.7}" width="100%" height="${h * 0.3}" fill="hsl(${hue} 20% ${l1 - 10}%)" opacity=".5"/></svg>`
}

const slug = (p) => (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase())

const dir = path.join(ROOT, "templates", id)
const metaFile = path.join(dir, "marketplace.json")
const meta = JSON.parse(await readFile(metaFile, "utf8"))
const { chromium } = await loadPlaywright()
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})

async function pageAt(width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  if (stub) await page.route(/picsum\.photos/, (route) => route.fulfill({ contentType: "image/svg+xml", body: placeholder(route.request().url()) }))
  return page
}

async function settle(page, url) {
  await page.goto(url, { waitUntil: "networkidle" })
  // Lazy images below the fold only load once scrolled to; a full-page shot
  // taken without this has grey boxes all the way down.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(500)
}

await mkdir(path.join(dir, "previews", "pages"), { recursive: true })
const root = new URL(base)

const desktop = await pageAt(1440, 900)
await settle(desktop, new URL("/", root).href)
await desktop.screenshot({ path: path.join(dir, "preview.png") })
await desktop.screenshot({ path: path.join(dir, "previews", "desktop.jpg"), fullPage: true, type: "jpeg", quality: 78 })

const pages = []
for (const entry of meta.pages ?? [{ path: "/", title: "Home" }]) {
  await settle(desktop, new URL(entry.path, root).href)
  const image = `previews/pages/${slug(entry.path)}.jpg`
  await desktop.screenshot({ path: path.join(dir, image), type: "jpeg", quality: 80 })
  pages.push({ title: entry.title, image })
}

const mobile = await pageAt(390, 844)
await settle(mobile, new URL("/", root).href)
await mobile.screenshot({ path: path.join(dir, "previews", "mobile.jpg"), fullPage: true, type: "jpeg", quality: 78 })

await browser.close()

meta.previews = { desktop: "previews/desktop.jpg", mobile: "previews/mobile.jpg", pages }
await writeFile(metaFile, JSON.stringify(meta, null, 2) + "\n")
console.log(`Captured ${pages.length + 2} previews for ${id}${stub ? " (images stubbed)" : ""}`)
