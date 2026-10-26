/**
 * The marketplace's pages for people who open the site in a browser: the
 * landing page (`index.html`) and one page per item
 * (`items/<kind>/<id>/index.html`). The editor never reads any of it; it reads
 * `json/index.json`.
 *
 * They are set in the codecainehq.com site's design (site/site.css holds its
 * tokens), so the marketplace reads as part of that site rather than a file
 * listing. A remix's tile is the same 1440×900 screenshot that site uses for
 * its templates (`site/templates/<id>.webp|avif`); one without falls back to
 * its own `preview.png`.
 *
 * Pure: catalog in, `{ path: html }` out. build.mjs writes the files and
 * `--check` compares them, so a page can never drift from its item.
 */

export const SITE = "https://vv-zero-oss.github.io/codecaine-marketplace"
export const REPOSITORY = "https://github.com/vv-zero-oss/codecaine-marketplace"
export const REF = "main"

/** The catalog's `type` → its folder, catalog file and the words for it. */
export const KINDS_META = {
  remix: { folder: "remixes", catalog: "remixes.json", singular: "Remix", plural: "Remixes", blurb: "Whole projects you open, run and change: sites, landing pages and portfolios, each with a brand guide." },
  "design-system": { folder: "design-systems", catalog: "design-systems.json", singular: "Design system", plural: "Design systems", blurb: "A DESIGN.md of tokens and rules the assistant restyles a project from." },
  app: { folder: "apps", catalog: "apps.json", singular: "App", plural: "Apps", blurb: "Panels that run inside the editor, with the permissions they ask for." },
  skill: { folder: "skills", catalog: "skills.json", singular: "Skill", plural: "Skills", blurb: "Instructions the assistant loads when the work calls for them." },
}

const APP_SITE = "https://codecainehq.com"
const INSTALL_URL = `${APP_SITE}/install`

export function escape(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
}

/**
 * One line for a card. Descriptions run to a paragraph — the item page shows
 * all of it — so a card takes the opening clause: up to the first colon, dash
 * or sentence end that leaves at least a few words, cut at a word under 140
 * characters.
 */
export function tagline(description) {
  const text = String(description).trim()
  const stops = [": ", " — ", "; ", ". "]
  let end = text.length
  for (const stop of stops) {
    let at = text.indexOf(stop)
    while (at !== -1 && at < 24) at = text.indexOf(stop, at + 1)
    if (at !== -1 && at < end) end = at
  }
  let line = text.slice(0, end).replace(/[.,;:]$/, "")
  if (line.length > 140) line = line.slice(0, line.lastIndexOf(" ", 137)).replace(/[,;:—–-]\s*$/, "") + "…"
  return line
}

/** The deep link the desktop app answers (electron/open-link.ts in the canvas
 *  repository): a remix is cloned into a new project, anything else opens
 *  on its page in the app's Marketplace. */
export function openLink(item) {
  return item.type === "remix" ? `codecaine://remix/${item.id}` : `codecaine://marketplace/${item.type}/${item.id}`
}

const pagePath = (item) => `items/${KINDS_META[item.type].folder}/${item.id}/`

const ICONS = {
  arrow: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  github:
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
}
const icon = (name, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`

const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : "—"
const formatSize = (bytes) => (bytes >= 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`)

function byline(item) {
  return item.authors
    .map((a) => (a.url && /^https?:\/\//.test(a.url) ? `<a href="${escape(a.url)}">${escape(a.name)}</a>` : escape(a.name)))
    .join(", ")
}

/** What a tile shows, by kind. */
function face(item, root, shots, { eager = false } = {}) {
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"'
  if (item.type === "remix") {
    if (shots.has(item.id)) {
      return `<picture><source srcset="${root}site/templates/${item.id}.avif" type="image/avif"><img src="${root}site/templates/${item.id}.webp" alt="${escape(item.name)} — home page" width="1440" height="900" ${loading} decoding="async"></picture>`
    }
    if (item.thumbnailUrl) return `<img src="${root}${escape(item.thumbnailUrl)}" alt="${escape(item.name)} — home page" ${loading} decoding="async">`
  }
  if (item.designSystem) {
    const { brand, palette } = item.designSystem
    const surface = brand?.surface ?? "#ffffff"
    const ink = brand?.primary && brand.primary.toLowerCase() !== surface.toLowerCase() ? brand.primary : brand?.ink ?? "#000000"
    return `<div class="palette-tile" style="background:${surface}"><div class="face" style="color:${ink}">${escape(item.name)}</div><div class="strip">${palette
      .slice(0, 10)
      .map((c) => `<span style="background:${c.value}" title="${escape(c.name)} ${c.value}"></span>`)
      .join("")}</div></div>`
  }
  if (item.iconUrl || item.thumbnailUrl) return `<div class="icon-tile"><img src="${root}${escape(item.iconUrl ?? item.thumbnailUrl)}" alt="" ${loading}></div>`
  return `<div class="icon-tile"><span class="glyph">${item.type === "skill" ? "/skill" : "{ }"}</span></div>`
}

/** "Aerie — Electric Air Taxi": the brand in white, what it is in grey. */
function nameMarkup(name) {
  const [brand, ...rest] = String(name).split(" — ")
  return rest.length ? `${escape(brand)} <span>— ${escape(rest.join(" — "))}</span>` : escape(name)
}

function card(item, root, shots) {
  const words = [item.name, item.description, ...item.keywords, ...item.categories, ...item.authors.map((a) => a.name)].join(" ").toLowerCase()
  const icon_ = item.type === "remix" && item.iconUrl ? `<img src="${root}${escape(item.iconUrl)}" alt="" loading="lazy">` : ""
  return `<a class="card" href="${root}${pagePath(item)}" data-card data-search="${escape(words)}" data-categories="${escape(item.categories.join("|"))}">
<div class="shot">${face(item, root, shots)}</div>
<div class="card-title">${icon_}<h3>${nameMarkup(item.name)}</h3>${icon("arrow", "arrow")}</div>
<p>${escape(tagline(item.description))}</p>
<div class="tags">${item.categories.slice(0, 3).map((c) => `<span>${escape(c)}</span>`).join("")}</div>
</a>`
}

function head({ title, description, root, url, image }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${SITE}/${url}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${SITE}/${url}">${
    image ? `<meta property="og:image" content="${SITE}/${image}"><meta name="twitter:card" content="summary_large_image">` : ""
  }
<meta name="theme-color" content="#0a0a0b"><link rel="icon" href="${root}site/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap">
<link rel="stylesheet" href="${root}site/site.css"></head><body><div class="frame">`
}

function nav(root, current) {
  return `<header class="nav"><a class="wordmark" href="${root}"><img src="${root}site/logo.png" alt="" width="28" height="28">Codecaine <small>Community</small></a>
<nav class="nav-links" aria-label="Site"><a class="wide" href="${root}#remixes"${current === "remix" ? ' aria-current="page"' : ""}>Remixes</a><a class="wide" href="${root}#design-systems"${
    current === "design-system" ? ' aria-current="page"' : ""
  }>Design systems</a><a class="wide" href="${APP_SITE}/pricing">Pricing</a><span class="sep wide"></span><a class="btn solid small" href="${INSTALL_URL}">Get Codecaine</a></nav></header>`
}

function footer(root, json) {
  const kinds = Object.values(KINDS_META).filter((k) => json[k.catalog].items.length)
  return `<footer class="footer"><div><a class="wordmark" href="${APP_SITE}"><img src="${root}site/logo.png" alt="" width="28" height="28">Codecaine</a><p class="blurb">A canvas for the code you already have. Start from anything here, design on the running project, and keep every change in your repository.</p></div>
<div><h4>Community</h4><ul>${kinds.map((k) => `<li><a href="${root}#${k.folder}">${k.plural}</a></li>`).join("")}<li><a href="${root}json/index.json">Catalog JSON</a></li></ul></div>
<div><h4>Codecaine</h4><ul><li><a href="${APP_SITE}/#how-it-works">How it works</a></li><li><a href="${APP_SITE}/for/websites">For websites</a></li><li><a href="${APP_SITE}/pricing">Pricing</a></li><li><a href="${INSTALL_URL}">Install</a></li></ul></div>
<div><h4>Contribute</h4><ul><li><a href="${REPOSITORY}">GitHub ↗</a></li><li><a href="${REPOSITORY}#adding-an-item">Publish an item ↗</a></li><li><a href="${APP_SITE}/privacy">Privacy</a></li></ul></div></footer>
<div class="legal"><span>© Codecaine</span><span>macOS · Apple Silicon</span></div></div><script src="${root}site/site.js" type="module"></script></body></html>
`
}

// ---------------------------------------------------------------------------

function landing(json, shots) {
  const root = ""
  const kinds = Object.entries(KINDS_META).filter(([, k]) => json[k.catalog].items.length)
  const counts = kinds.map(([, k]) => `<a href="#${k.folder}"><b>${json[k.catalog].items.length}</b>${k.plural}</a>`).join("")
  const bands = kinds
    .map(([type, k], index) => {
      const items = [...json[k.catalog].items].sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? "") || a.name.localeCompare(b.name))
      // Only the categories that group a few items: a chip that leaves one
      // card is a search, and two dozen of them read as noise over the grid.
      const tally = new Map()
      for (const c of items.flatMap((i) => i.categories)) tally.set(c, (tally.get(c) ?? 0) + 1)
      const categories = [...tally].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([c]) => c)
      const chips =
        categories.length > 1
          ? `<div class="chips" role="group" aria-label="${k.plural} by category"><button class="chip" type="button" data-chip="" aria-pressed="true">All</button>${categories
              .map((c) => `<button class="chip" type="button" data-chip="${escape(c)}" aria-pressed="false">${escape(c)}</button>`)
              .join("")}</div>`
          : ""
      return `${index ? '<div class="hatch thin"></div>' : ""}<section class="band" id="${k.folder}" data-band><div class="band-head"><div><h2>${k.plural}</h2><p>${k.blurb}</p></div>${chips}</div>
<div class="grid">${items.map((item) => card(item, root, shots)).join("")}<p class="empty" data-empty hidden>Nothing here matches.</p></div></section>`
    })
    .join("")

  return `${head({
    title: "Codecaine Community — templates to remix",
    description: "Remixes, design systems, apps and skills for Codecaine. Open any template as a new project on your machine and design on the running code.",
    root,
    url: "",
    image: shots.has("truant-coffee") ? "site/templates/truant-coffee.webp" : null,
  })}${nav(root)}<div class="hatch"></div>
<section class="hero"><p class="eyebrow">Community</p><h1>Start from something<br><em>already good.</em></h1>
<p class="lead">Real projects — React, Tailwind, shadcn, motion — with type, colour and movement already considered. Open one in Codecaine and it lands on your machine as a new project, running.</p>
<div class="hero-actions"><a class="btn solid" href="#remixes">Browse remixes</a><a class="btn" href="${INSTALL_URL}">Get Codecaine ${icon("arrow")}</a></div>
<div class="counts">${counts}</div></section>
<div class="toolbar"><nav class="tabs" aria-label="Kinds">${kinds.map(([, k]) => `<a href="#${k.folder}">${k.plural}<small>${json[k.catalog].items.length}</small></a>`).join("")}</nav>
<label class="search">${icon("search")}<span class="sr-only">Search the marketplace</span><input type="search" placeholder="Search templates, tags, authors…" data-search-input autocomplete="off"></label></div>
${bands}
<div class="hatch"></div><section class="cta"><h2>Open any of them<br><em>in Codecaine.</em></h2><p class="lead">Pick a template, press Open in Codecaine, and choose a folder. It installs, starts its dev server and opens on the canvas.</p><div class="hero-actions"><a class="btn solid" href="${INSTALL_URL}">Get Codecaine — free</a></div></section>
${footer(root, json)}`
}

function facts(item) {
  const rows = [
    ["Version", item.version],
    ["Updated", formatDate(item.updated)],
    item.type === "remix" && item.pages?.length ? ["Pages", String(item.pages.length)] : null,
    item.meta?.framework ? ["Framework", item.meta.framework] : null,
    item.meta?.styling ? ["Styling", item.meta.styling] : null,
    item.meta?.port ? ["Dev port", `<code>${escape(item.meta.port)}</code>`] : null,
    item.designSystem?.fonts?.length ? ["Fonts", item.designSystem.fonts.join(", ")] : null,
    item.skill?.registryId ? ["skills.sh", `<code>${escape(item.skill.registryId)}</code>`] : null,
    item.sdkVersion ? ["SDK", `<code>@canvas/react ${escape(item.sdkVersion)}</code>`] : null,
    ["License", item.license ?? "—"],
    ["Download", `${formatSize(item.archive.size)} · ${item.archive.files} files`],
  ].filter(Boolean)
  return `<dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${String(v).startsWith("<") ? v : escape(v)}</dd>`).join("")}</dl>`
}

function itemPage(item, json, shots) {
  const k = KINDS_META[item.type]
  const root = "../../../"
  const noteId = `open-note-${item.id}`
  const isRemix = item.type === "remix"
  const secondary = [
    item.demoUrl ? `<a class="btn" href="${root}${escape(item.demoUrl)}">${icon("eye")}Live demo</a>` : null,
    item.entryUrl ? `<a class="btn" href="${root}${escape(item.entryUrl)}">${icon("file")}${escape(item.entryUrl.split("/").pop())}</a>` : null,
    `<a class="btn" href="${root}${escape(item.archive.url)}" download>${icon("download")}Download</a>`,
    `<a class="btn" href="${REPOSITORY}/tree/${REF}/${escape(item.path)}">${icon("github")}Source</a>`,
  ].filter(Boolean)
  const actions = `<div class="actions"><a class="btn solid" href="${escape(openLink(item))}" data-open-app="${noteId}"><img src="${root}site/logo.png" alt="" width="18" height="18" style="border-radius:5px">Open in Codecaine</a>
<div class="row">${secondary.join("")}</div>
<p class="hint">${isRemix ? "Clones it into a folder you pick, as a new project. " : ""}No Codecaine yet? <a href="${INSTALL_URL}">Get it free</a></p>
<p class="open-note" id="${noteId}" role="status">Nothing opened? Codecaine has to be installed and opened once for this link to work. <a href="${INSTALL_URL}">Install Codecaine</a>${
    isRemix ? `, or <a href="${root}${escape(item.archive.url)}" download>download the project</a> and open its folder.` : "."
  }</p></div>`

  const shot = isRemix
    ? `<div class="feature"><div class="shot">${face(item, root, shots, { eager: true })}</div></div>`
    : item.designSystem
      ? `<div class="feature"><div class="shot palette-shot">${face(item, root, shots, { eager: true })}</div></div>`
      : ""

  const pages = item.previewUrls?.pages?.length
    ? `<div class="hatch thin"></div><section class="band pages"><div class="band-head"><div><h2>Every page</h2><p>${item.previewUrls.pages.length} page${item.previewUrls.pages.length === 1 ? "" : "s"}, as they open at 1440px.</p></div>${
        item.previewUrls.desktop || item.previewUrls.mobile
          ? `<div class="chips">${item.previewUrls.desktop ? `<a class="btn small" href="${root}${escape(item.previewUrls.desktop)}">Full page, desktop</a>` : ""}${
              item.previewUrls.mobile ? `<a class="btn small" href="${root}${escape(item.previewUrls.mobile)}">Full page, phone</a>` : ""
            }</div>`
          : ""
      }</div><div class="grid">${item.previewUrls.pages
        .map((p, i) => {
          const route = item.pages?.find((page) => page.title === p.title)?.path
          return `<a class="card" href="${root}${escape(p.image)}"><div class="shot"><img src="${root}${escape(p.image)}" alt="${escape(item.name)} — ${escape(p.title)}" loading="lazy" decoding="async"></div><h3>${escape(p.title)}${route ? `<small>${escape(route)}</small>` : ""}</h3></a>`
        })
        .join("")}</div></section>`
    : ""

  const palette = item.designSystem
    ? `<div class="hatch thin"></div><section class="band"><div class="band-head"><div><h2>Palette</h2><p>Every colour token in its DESIGN.md.</p></div></div><div style="padding:0 var(--gutter) var(--gutter)"><div class="swatches">${item.designSystem.palette
        .map((c) => `<div><span style="background:${c.value}"></span><p>${escape(c.name)}<code>${escape(c.value)}</code></p></div>`)
        .join("")}</div></div></section>`
    : ""

  const related = json[k.catalog].items
    .filter((other) => other.id !== item.id)
    .map((other) => ({ other, shared: other.categories.filter((c) => item.categories.includes(c)).length }))
    .sort((a, b) => b.shared - a.shared || (b.other.updated ?? "").localeCompare(a.other.updated ?? ""))
    .slice(0, 3)
    .map(({ other }) => other)
  const more = related.length
    ? `<div class="hatch thin"></div><section class="band"><div class="band-head"><div><h2>More ${k.plural.toLowerCase()}</h2></div><a class="btn small" href="${root}#${k.folder}">See all ${json[k.catalog].items.length}</a></div><div class="grid">${related
        .map((other) => card(other, root, shots))
        .join("")}</div></section>`
    : ""

  const designedFor = item.designedFor?.length ? `<h3>Designed for</h3><ul class="for">${item.designedFor.map((d) => `<li>${escape(d)}</li>`).join("")}</ul>` : ""
  const keywords = item.keywords.length ? `<h3>Keywords</h3><div class="keywords">${item.keywords.map((w) => `<span>${escape(w)}</span>`).join("")}</div>` : ""

  return `${head({
    title: `${item.name} — Codecaine Community`,
    description: tagline(item.description),
    root,
    url: pagePath(item),
    image: isRemix ? (shots.has(item.id) ? `site/templates/${item.id}.webp` : item.thumbnailUrl) : null,
  })}${nav(root, item.type)}
<nav class="crumbs" aria-label="Breadcrumb"><a href="${root}">Community</a><span aria-hidden="true">/</span><a href="${root}#${k.folder}">${k.plural}</a><span aria-hidden="true">/</span><span>${escape(item.name)}</span></nav>
<section class="item-head"><div><p class="eyebrow">${escape([k.singular, ...item.categories.slice(0, 2)].join(" · "))}</p><h1>${escape(item.name)}</h1><p class="lead">${escape(tagline(item.description))}</p><p class="byline">by ${byline(item)} · v${escape(item.version)} · updated ${formatDate(item.updated)}</p></div>${actions}</section>
${shot}<div class="hatch thin"></div>
<section class="split"><div><h3>About</h3><div class="prose"><p>${escape(item.description)}</p></div>${designedFor ? `<div style="margin-top:40px">${designedFor}</div>` : ""}</div><div><h3>Details</h3>${facts(item)}${keywords ? `<div style="margin-top:40px">${keywords}</div>` : ""}</div></section>
${pages}${palette}${more}
<div class="hatch"></div>
${footer(root, json)}`
}

/** Every page of the site, keyed by its path from the repository root. */
export function renderSite(json, { shots = new Set() } = {}) {
  const pages = { "index.html": landing(json, shots) }
  for (const k of Object.values(KINDS_META)) {
    for (const item of json[k.catalog].items) pages[`${pagePath(item)}index.html`] = itemPage(item, json, shots)
  }
  return pages
}
