#!/usr/bin/env node
/**
 * Looks at the site's pages in a browser and fails (exit 1) on what would
 * make them wrong, writing a screenshot of each to `screenshots/site/`:
 *
 *   - the landing page at 1440, 1280, 768 and 375px: no sideways scroll, the
 *     remix grid three across from 1024px (two on a tablet, one on a phone),
 *     every card one line of description deep, every card linking to a page
 *     that exists;
 *   - search: a word narrows the grid to the cards that carry it, and a
 *     category chip narrows it to that category;
 *   - an item page: "Open in Codecaine" is the `codecaine://remix/<id>`
 *     link the desktop app answers (electron/open-link.ts in the canvas
 *     repository), with the download beside it for anybody without the app.
 *
 *   npm run build
 *   npx -y -p playwright@1 node scripts/check-site.mjs
 *
 * Needs Playwright, as capture-previews.mjs does (`PLAYWRIGHT_MODULE`,
 * `CHROMIUM_PATH`).
 */

import { createReadStream, existsSync } from "node:fs"
import { mkdir, stat } from "node:fs/promises"
import { createServer } from "node:http"
import { createRequire } from "node:module"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT = path.join(ROOT, "screenshots", "site")
const failures = []
const check = (ok, message) => {
  console.log(`${ok ? "✓" : "✗"} ${message}`)
  if (!ok) failures.push(message)
}

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_MODULE) return createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE)
  try {
    return await import("playwright")
  } catch {
    console.error("Playwright is not installed. Try: npx -y -p playwright@1 node scripts/check-site.mjs")
    process.exit(1)
  }
}

// The repository, served the way Pages serves it.
const TYPES = { ".html": "text/html", ".json": "application/json", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".jpg": "image/jpeg" }
const server = createServer(async (req, res) => {
  let file = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!file.startsWith(ROOT)) return res.writeHead(403).end()
  if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html")
  if (!existsSync(file)) return res.writeHead(404).end()
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" })
  createReadStream(file).pipe(res)
})
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
const BASE = `http://127.0.0.1:${server.address().port}`
await mkdir(OUT, { recursive: true })

const { chromium } = await loadPlaywright()
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})

const load = async (page, url) => {
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("requestfailed", (r) => !r.url().startsWith("https://fonts.") && errors.push(`${r.url()} failed`))
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.url()} ${r.status()}`))
  await page.goto(url, { waitUntil: "networkidle" })
  // Lazy images: scroll through once so every one has loaded for the shot.
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 700) await page.evaluate((y) => window.scrollTo(0, y), y)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForLoadState("networkidle")
  return errors
}

for (const [width, columns] of [[1440, 3], [1280, 3], [768, 2], [375, 1]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width < 800 ? 2 : 1 })
  const errors = await load(page, `${BASE}/`)
  check(errors.length === 0, `${width}px: the landing page loads cleanly${errors.length ? ` (${errors.slice(0, 3).join("; ")})` : ""}`)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(overflow <= 0, `${width}px: no sideways scroll (${overflow}px over)`)
  const clash = await page.evaluate(() => {
    // The wordmark's own box shrinks while its words spill out of it, so
    // measure the words.
    const right = Math.max(...[...document.querySelectorAll(".nav .wordmark > *")].map((el) => el.getBoundingClientRect().right))
    const links = [...document.querySelectorAll(".nav-links > *")].filter((el) => el.getBoundingClientRect().width > 0)
    return links.some((el) => el.getBoundingClientRect().left < right)
  })
  check(!clash, `${width}px: nothing in the header runs into the wordmark`)
  const across = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#remixes [data-card]")]
    const top = cards[0].getBoundingClientRect().top
    return cards.filter((c) => Math.abs(c.getBoundingClientRect().top - top) < 2).length
  })
  check(across === columns, `${width}px: remixes ${columns} across (${across})`)
  const deepest = await page.evaluate(() => Math.max(...[...document.querySelectorAll("#remixes [data-card] p")].map((p) => p.getBoundingClientRect().height)))
  check(deepest <= 44, `${width}px: no card's description runs past two lines (${Math.round(deepest)}px)`)
  await page.screenshot({ path: path.join(OUT, `landing-${width}.png`) })
  await page.screenshot({ path: path.join(OUT, `landing-${width}-full.png`), fullPage: true })
  await page.close()
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await load(page, `${BASE}/`)
  const hrefs = await page.evaluate(() => [...document.querySelectorAll("[data-card]")].map((a) => a.getAttribute("href")))
  const missing = hrefs.filter((href) => !existsSync(path.join(ROOT, href, "index.html")))
  check(hrefs.length > 0 && missing.length === 0, `every card (${hrefs.length}) links to a page that exists${missing.length ? ` — missing ${missing.join(", ")}` : ""}`)

  const visible = () => page.evaluate(() => [...document.querySelectorAll("#remixes [data-card]")].filter((c) => !c.hidden).length)
  const all = await visible()
  await page.getByPlaceholder(/Search templates/).fill("coffee")
  const coffee = await visible()
  const allCoffee = await page.evaluate(() => [...document.querySelectorAll("[data-card]:not([hidden])")].every((c) => c.dataset.search.includes("coffee")))
  check(coffee > 0 && coffee < all && allCoffee, `search "coffee" narrows ${all} remixes to ${coffee}, each one about coffee`)
  await page.screenshot({ path: path.join(OUT, "search-coffee.png") })
  await page.getByPlaceholder(/Search templates/).fill("")
  await page.locator("#remixes [data-chip='SaaS']").click()
  const saas = await page.evaluate(() => [...document.querySelectorAll("#remixes [data-card]:not([hidden])")].map((c) => c.dataset.categories))
  check(saas.length > 0 && saas.length < all && saas.every((c) => c.split("|").includes("SaaS")), `the SaaS chip narrows remixes to ${saas.length}, all SaaS`)
  await page.close()
}

for (const width of [1440, 375]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width < 800 ? 2 : 1 })
  const errors = await load(page, `${BASE}/items/remixes/truant-coffee/`)
  check(errors.length === 0, `${width}px: an item page loads cleanly${errors.length ? ` (${errors.slice(0, 3).join("; ")})` : ""}`)
  const open = await page.getByRole("link", { name: "Open in Codecaine" }).getAttribute("href")
  check(open === "codecaine://remix/truant-coffee", `${width}px: Open in Codecaine is codecaine://remix/truant-coffee (${open})`)
  const download = await page.getByRole("link", { name: "Download", exact: true }).getAttribute("href")
  check(!!download && existsSync(path.join(ROOT, "items/remixes/truant-coffee", download)), `${width}px: the download beside it is a file that exists (${download})`)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(overflow <= 0, `${width}px: item page has no sideways scroll (${overflow}px over)`)
  const pages = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".pages .card")]
    const top = cards[0].getBoundingClientRect().top
    return cards.filter((c) => Math.abs(c.getBoundingClientRect().top - top) < 2).length
  })
  check(pages === (width >= 1024 ? 3 : 1), `${width}px: its pages are shown ${width >= 1024 ? "three across" : "one to a row"} (${pages})`)
  await page.screenshot({ path: path.join(OUT, `item-${width}.png`) })
  await page.screenshot({ path: path.join(OUT, `item-${width}-full.png`), fullPage: true })
  await page.close()
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = await load(page, `${BASE}/items/design-systems/stripe/`)
  check(errors.length === 0, "a design system's page loads cleanly")
  check((await page.getByRole("link", { name: "Open in Codecaine" }).getAttribute("href")) === "codecaine://marketplace/design-system/stripe", "its Open in Codecaine opens its page in the app")
  await page.screenshot({ path: path.join(OUT, "item-design-system.png"), fullPage: true })
  await page.close()
}

await browser.close()
server.close()
console.log(`\n${failures.length ? `${failures.length} failed` : "all passed"} — screenshots in ${path.relative(process.cwd(), OUT)}/`)
process.exit(failures.length ? 1 : 0)
