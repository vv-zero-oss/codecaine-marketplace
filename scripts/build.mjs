#!/usr/bin/env node
/**
 * Builds the marketplace's catalog from the item folders.
 *
 *   node scripts/build.mjs              validate, rewrite json/
 *   node scripts/build.mjs --check      validate, fail if json/ is stale
 *   node scripts/build.mjs --out _site  also write the site GitHub Pages serves
 *
 * Every item is a folder with a `marketplace.json` in one of four kinds of
 * folder. What the editor reads is `json/index.json`, which names one catalog
 * per kind; each catalog entry is that item's `marketplace.json` plus what can
 * only be computed — where its archive is, the archive's hash, a design
 * system's palette read out of its DESIGN.md.
 *
 * ## Why the archive is a tarball, and why it is hashed before compression
 *
 * An install has to work on a machine without git, and has to be checkable:
 * the editor downloads one file, verifies it against the hash the catalog
 * gave, and only then writes anything to disk. A tar is thirty lines to read
 * and to write with nothing but Node, which a zip is not.
 *
 * The hash is of the tar, not the gzip. The tar is written deterministically
 * (sorted paths, zero mtimes, fixed modes), so the same folder is the same
 * bytes on every machine — but gzip's output depends on the zlib that made it,
 * and a hash of that would make `json/` differ between a contributor's laptop
 * and CI, and `--check` would fail on a commit that changed nothing.
 *
 * No dependencies, on purpose: this runs in the Pages workflow and on any
 * contributor's machine with `node` and nothing else.
 */

import { createHash } from "node:crypto"
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { gzipSync } from "node:zlib"

const ROOT = path.resolve(import.meta.dirname, "..")
const REPOSITORY = "https://github.com/vv-zero-oss/codecaine-marketplace"
const SITE = "https://vv-zero-oss.github.io/codecaine-marketplace"
const REF = "main"
const REGISTRY_VERSION = 1

/** Folder on disk → the `type` its items declare → the catalog file. */
export const KINDS = [
  { folder: "templates", type: "template", catalog: "templates.json" },
  { folder: "apps", type: "app", catalog: "apps.json" },
  { folder: "design-systems", type: "design-system", catalog: "design-systems.json" },
  { folder: "skills", type: "skill", catalog: "skills.json" },
]

/** Never packed: what `npm install` and a build recreate, and what a
 *  contributor's machine leaves behind. */
const SKIP = new Set(["node_modules", "dist", ".git", ".DS_Store", ".vite", ".next", ".turbo"])

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

// ---------------------------------------------------------------------------
// Front matter
// ---------------------------------------------------------------------------

/**
 * The YAML subset DESIGN.md and SKILL.md front matter is written in: nested
 * maps by two-space indentation, scalar values, optional quotes. Enough to read
 * a palette and a name; not a YAML parser, and it does not pretend to be one.
 */
export function parseFrontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
  if (!match) return null
  const root = {}
  const stack = [{ indent: -1, node: root }]
  for (const raw of match[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trimStart().startsWith("#")) continue
    const indent = raw.length - raw.trimStart().length
    const line = raw.trim()
    const colon = line.indexOf(":")
    if (colon === -1) continue
    const key = line.slice(0, colon).trim().replace(/^["']|["']$/g, "")
    let value = line.slice(colon + 1).trim()
    while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop()
    const parent = stack.at(-1).node
    if (value === "") {
      const child = {}
      parent[key] = child
      stack.push({ indent, node: child })
      continue
    }
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    parent[key] = value
  }
  return root
}

// ---------------------------------------------------------------------------
// Tar
// ---------------------------------------------------------------------------

function octal(value, width) {
  return value.toString(8).padStart(width - 1, "0") + "\0"
}

function header(name, size) {
  const block = Buffer.alloc(512)
  let prefix = ""
  let base = name
  // ustar splits a long path into a 155-byte prefix and a 100-byte name at a
  // slash. Anything that still does not fit is refused rather than truncated.
  if (Buffer.byteLength(name) > 100) {
    const cut = name.lastIndexOf("/", 155)
    if (cut <= 0 || Buffer.byteLength(name.slice(cut + 1)) > 100) throw new Error(`path too long for tar: ${name}`)
    prefix = name.slice(0, cut)
    base = name.slice(cut + 1)
  }
  block.write(base, 0, 100, "utf8")
  block.write(octal(0o644, 8), 100, 8, "ascii")
  block.write(octal(0, 8), 108, 8, "ascii")
  block.write(octal(0, 8), 116, 8, "ascii")
  block.write(octal(size, 12), 124, 12, "ascii")
  block.write(octal(0, 12), 136, 12, "ascii")
  block.fill(" ", 148, 156)
  block.write("0", 156, 1, "ascii")
  block.write("ustar\0", 257, 6, "ascii")
  block.write("00", 263, 2, "ascii")
  block.write(prefix, 345, 155, "utf8")
  let sum = 0
  for (const byte of block) sum += byte
  block.write(octal(sum, 7) + " ", 148, 8, "ascii")
  return block
}

/** Files at the archive's root, not under a folder named after the item: the
 *  editor extracts into the folder the person chose, and a wrapper directory
 *  would put the project one level down from where they asked for it. */
export function tar(files) {
  const parts = []
  for (const { name, bytes } of files) {
    parts.push(header(name, bytes.length), bytes)
    const pad = (512 - (bytes.length % 512)) % 512
    if (pad) parts.push(Buffer.alloc(pad))
  }
  parts.push(Buffer.alloc(1024))
  return Buffer.concat(parts)
}

async function listFiles(dir, base = dir) {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue
    // Dotfiles stay out (an `.env` in a template folder is the obvious one),
    // except the two a project needs to behave like the original.
    if (entry.name.startsWith(".") && entry.name !== ".gitignore" && entry.name !== ".npmrc") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await listFiles(full, base)))
    else if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join("/"))
  }
  return out.sort()
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

async function exists(file) {
  return stat(file).then(() => true, () => false)
}

function insidePath(value) {
  return typeof value === "string" && value !== "" && !value.startsWith("/") && !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.split(/[\\/]/).includes("..")
}

async function validate(kind, folderName, dir, meta) {
  const errors = []
  const need = (key, test, message) => {
    if (!test(meta[key])) errors.push(`"${key}" ${message}`)
  }
  const text = (v) => typeof v === "string" && v.trim() !== ""
  const list = (v) => Array.isArray(v) && v.every(text)

  need("type", (v) => v === kind.type, `must be "${kind.type}" in ${kind.folder}/`)
  need("id", (v) => typeof v === "string" && ID.test(v), "must be kebab-case")
  if (meta.id !== folderName) errors.push(`"id" must equal the folder name "${folderName}"`)
  need("name", text, "must be a non-empty string")
  need("version", (v) => typeof v === "string" && SEMVER.test(v), "must be semver, like 1.0.0")
  need("description", text, "must be a non-empty string")
  need("authors", (v) => Array.isArray(v) && v.length > 0 && v.every((a) => a && text(a.name)), "must list at least one { name }")
  need("license", text, "must name a license")
  need("keywords", list, "must be a list of strings")
  need("categories", list, "must be a list of strings")
  need("created", (v) => typeof v === "string" && DATE.test(v), "must be YYYY-MM-DD")
  need("updated", (v) => typeof v === "string" && DATE.test(v), "must be YYYY-MM-DD")
  if (meta.updated < meta.created) errors.push(`"updated" is before "created"`)
  if (meta.canvasVersion !== undefined && !text(meta.canvasVersion)) errors.push(`"canvasVersion" must be a range like ">=0.0.1"`)
  if (meta.meta !== undefined && (typeof meta.meta !== "object" || Array.isArray(meta.meta))) errors.push(`"meta" must be an object`)
  for (const key of ["thumbnail", "entry"]) {
    if (meta[key] === undefined) continue
    if (!insidePath(meta[key])) errors.push(`"${key}" must be a path inside the item`)
    else if (!(await exists(path.join(dir, meta[key])))) errors.push(`"${key}" names ${meta[key]}, which is not there`)
  }

  const extra = {}
  if (kind.type === "template") {
    need("sdkVersion", (v) => typeof v === "string" && SEMVER.test(v), "must be the @canvas/react version the template vendors")
    need("pages", (v) => Array.isArray(v) && v.length > 0 && v.every((p) => p && typeof p.path === "string" && p.path.startsWith("/") && text(p.title)), "must list { path, title } with paths starting at /")
    if (!(await exists(path.join(dir, "package.json")))) errors.push("a template needs a package.json")
    if (!meta.meta?.devCommand) errors.push(`"meta.devCommand" must say how to run it`)
  }
  if (kind.type === "app") {
    const manifestFile = path.join(dir, meta.entry ?? "canvas-app.json")
    const manifest = await readFile(manifestFile, "utf8").then(JSON.parse, () => null)
    if (!manifest) errors.push("an app needs a canvas-app.json that is valid JSON")
    else {
      if (manifest.manifestVersion !== 1) errors.push(`canvas-app.json "manifestVersion" must be 1`)
      if (manifest.version !== meta.version) errors.push(`canvas-app.json version ${manifest.version} differs from marketplace.json ${meta.version}`)
      if (meta.meta?.appId !== manifest.id) errors.push(`"meta.appId" must be the manifest's id "${manifest.id}"`)
      extra.app = { id: manifest.id, permissions: manifest.permissions ?? [], icon: manifest.icon ?? null }
    }
  }
  if (kind.type === "design-system") {
    const file = path.join(dir, meta.entry ?? "DESIGN.md")
    const front = parseFrontMatter(await readFile(file, "utf8").catch(() => ""))
    if (!front) errors.push("DESIGN.md needs YAML front matter")
    else {
      if (front.name !== meta.name) errors.push(`DESIGN.md is named "${front.name}", marketplace.json "${meta.name}"`)
      const colors = front.colors && typeof front.colors === "object" ? front.colors : {}
      const fonts = new Set()
      for (const style of Object.values(front.typography ?? {})) if (style?.fontFamily) fonts.add(style.fontFamily)
      extra.designSystem = {
        // The swatches a card shows: every colour token, in the order the
        // file lists them, which is the order its author ranked them.
        palette: Object.entries(colors)
          .filter(([, value]) => typeof value === "string" && /^#[0-9a-f]{3,8}$/i.test(value))
          .map(([name, value]) => ({ name, value: value.toUpperCase() })),
        fonts: [...fonts],
        dark: Boolean(front.dark),
        formatVersion: front.version ?? null,
      }
      if (extra.designSystem.palette.length === 0) errors.push("DESIGN.md lists no hex colors")
    }
  }
  if (kind.type === "skill") {
    const front = parseFrontMatter(await readFile(path.join(dir, meta.entry ?? "SKILL.md"), "utf8").catch(() => ""))
    if (!front) errors.push("SKILL.md needs YAML front matter")
    else if (front.name !== meta.id) errors.push(`SKILL.md is named "${front.name}", marketplace.json id is "${meta.id}"`)
    // skills.sh indexes a GitHub repository's `skills/<name>/SKILL.md` as
    // `<owner>/<repo>/<name>`, and that identity is what bb installs by — so
    // the desktop editor installs a marketplace skill the way its Skills
    // screen installs any other.
    else extra.skill = { name: front.name, registryId: `${REPOSITORY.replace("https://github.com/", "")}/${front.name}` }
  }
  return { errors, extra }
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build() {
  const catalogs = {}
  const archives = []
  const problems = []
  for (const kind of KINDS) {
    const base = path.join(ROOT, kind.folder)
    const folders = (await readdir(base, { withFileTypes: true }).catch(() => []))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
    const items = []
    for (const name of folders) {
      const dir = path.join(base, name)
      const where = `${kind.folder}/${name}`
      let meta
      try {
        meta = JSON.parse(await readFile(path.join(dir, "marketplace.json"), "utf8"))
      } catch (error) {
        problems.push(`${where}: marketplace.json — ${error.message}`)
        continue
      }
      const { errors, extra } = await validate(kind, name, dir, meta)
      if (errors.length) {
        problems.push(...errors.map((e) => `${where}: ${e}`))
        continue
      }
      const names = await listFiles(dir)
      const files = await Promise.all(names.map(async (n) => ({ name: n, bytes: await readFile(path.join(dir, n)) })))
      const bytes = tar(files)
      const archivePath = `archives/${kind.folder}/${meta.id}-${meta.version}.tgz`
      archives.push({ path: archivePath, bytes })
      const { $schema: _schema, ...fields } = meta
      items.push({
        ...fields,
        path: where,
        ...(meta.thumbnail ? { thumbnailUrl: `${where}/${meta.thumbnail}` } : {}),
        ...(meta.entry ? { entryUrl: `${where}/${meta.entry}` } : {}),
        archive: {
          url: archivePath,
          format: "tar+gzip",
          sha256: createHash("sha256").update(bytes).digest("hex"),
          size: bytes.length,
          files: files.length,
        },
        source: { repository: REPOSITORY, ref: REF, path: where },
        ...extra,
      })
    }
    catalogs[kind.type] = { kind, items }
  }

  const all = Object.values(catalogs).flatMap((c) => c.items)
  const updated = all.map((item) => item.updated).sort().at(-1) ?? null
  const json = {
    "index.json": {
      $schema: "../schemas/marketplace-index.schema.json",
      registryVersion: REGISTRY_VERSION,
      name: "Codecaine Marketplace",
      description: "Templates, apps, design systems and skills for the canvas editor.",
      // Every URL in the catalogs is relative to this, and this is relative to
      // the index — so the same files work from Pages, from a raw GitHub URL
      // and from a folder on disk, which is how the editor's tests read them.
      root: "../",
      site: SITE,
      repository: REPOSITORY,
      updated,
      catalogs: Object.fromEntries(
        Object.entries(catalogs).map(([type, { kind, items }]) => [type, { url: `json/${kind.catalog}`, count: items.length }])
      ),
    },
  }
  for (const [type, { kind, items }] of Object.entries(catalogs)) {
    json[kind.catalog] = {
      $schema: "../schemas/marketplace-catalog.schema.json",
      registryVersion: REGISTRY_VERSION,
      type,
      items,
    }
  }
  return { json, archives, problems }
}

const serialise = (value) => JSON.stringify(value, null, 2) + "\n"

async function writeSite(out, json, archives) {
  await rm(out, { recursive: true, force: true })
  await mkdir(path.join(out, "json"), { recursive: true })
  for (const [name, value] of Object.entries(json)) await writeFile(path.join(out, "json", name), serialise(value))
  for (const archive of archives) {
    await mkdir(path.dirname(path.join(out, archive.path)), { recursive: true })
    await writeFile(path.join(out, archive.path), gzipSync(archive.bytes, { level: 9 }))
  }
  // The item folders themselves, minus what installs recreate, so a
  // thumbnail, a DESIGN.md or a manifest can be linked to directly.
  for (const kind of KINDS) {
    await cp(path.join(ROOT, kind.folder), path.join(out, kind.folder), {
      recursive: true,
      filter: (source) => !source.split(path.sep).some((part) => SKIP.has(part)),
    })
  }
  await cp(path.join(ROOT, "schemas"), path.join(out, "schemas"), { recursive: true })
  await writeFile(path.join(out, "index.html"), landing(json))
  // Pages runs Jekyll over the site unless told not to, and Jekyll drops
  // anything starting with an underscore.
  await writeFile(path.join(out, ".nojekyll"), "")
}

function escape(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
}

/** A page for people who open the site in a browser. The editor never reads
 *  it; it reads `json/index.json`. */
function landing(json) {
  const sections = KINDS.map((kind) => {
    const items = json[kind.catalog].items
    const cards = items
      .map((item) => {
        const swatches = item.designSystem
          ? `<div class="swatches">${item.designSystem.palette.slice(0, 8).map((c) => `<span style="background:${c.value}" title="${escape(c.name)} ${c.value}"></span>`).join("")}</div>`
          : ""
        const thumb = item.thumbnailUrl ? `<img src="${escape(item.thumbnailUrl)}" alt="" loading="lazy">` : ""
        return `<article>${thumb}${swatches}<h3>${escape(item.name)} <small>v${escape(item.version)}</small></h3><p>${escape(item.description)}</p><p class="links"><a href="${escape(item.archive.url)}">Download</a> · <a href="${REPOSITORY}/tree/${REF}/${escape(item.path)}">Source</a></p></article>`
      })
      .join("")
    return `<section><h2>${escape(kind.folder.replace("-", " "))} <small>${items.length}</small></h2><div class="grid">${cards}</div></section>`
  }).join("")
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Codecaine Marketplace</title><style>
:root{--bg:#fafafa;--fg:#171717;--muted:#666;--card:#fff;--line:#e5e5e5}
@media (prefers-color-scheme:dark){:root{--bg:#0a0a0a;--fg:#ededed;--muted:#a1a1a1;--card:#141414;--line:#262626}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif}
main{max-width:1100px;margin:0 auto;padding:48px 16px}
h1{margin:0 0 4px;font-size:28px}h2{text-transform:capitalize;margin:48px 0 16px;font-size:18px}small{color:var(--muted);font-weight:400}
code{font-size:13px}.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
article{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;overflow:hidden}
article img{width:calc(100% + 32px);margin:-16px -16px 12px;aspect-ratio:16/10;object-fit:cover;border-bottom:1px solid var(--line);display:block}
article h3{margin:0;font-size:15px}article p{margin:6px 0 0;color:var(--muted);font-size:13px}.links a{color:inherit}
.swatches{display:flex;height:40px;border-radius:8px;overflow:hidden;margin-bottom:12px;border:1px solid var(--line)}.swatches span{flex:1}
</style></head><body><main><h1>Codecaine Marketplace</h1><p><small>Templates, apps, design systems and skills for the canvas editor. The editor reads <a href="json/index.json"><code>json/index.json</code></a>.</small></p>${sections}</main></body></html>\n`
}

async function main() {
  const args = process.argv.slice(2)
  const check = args.includes("--check")
  const outIndex = args.indexOf("--out")
  const out = outIndex === -1 ? null : path.resolve(ROOT, args[outIndex + 1] ?? "_site")

  const { json, archives, problems } = await build()
  if (problems.length) {
    console.error(`${problems.length} problem${problems.length === 1 ? "" : "s"}:\n` + problems.map((p) => `  ${p}`).join("\n"))
    process.exit(1)
  }

  const dir = path.join(ROOT, "json")
  if (check) {
    const stale = []
    for (const [name, value] of Object.entries(json)) {
      const onDisk = await readFile(path.join(dir, name), "utf8").catch(() => null)
      if (onDisk !== serialise(value)) stale.push(name)
    }
    if (stale.length) {
      console.error(`json/ is out of date (${stale.join(", ")}). Run \`npm run build\` and commit the result.`)
      process.exit(1)
    }
  } else {
    await mkdir(dir, { recursive: true })
    for (const [name, value] of Object.entries(json)) await writeFile(path.join(dir, name), serialise(value))
  }
  if (out) await writeSite(out, json, archives)

  const counts = KINDS.map((k) => `${json[k.catalog].items.length} ${k.folder}`).join(", ")
  console.log(`${check ? "Checked" : "Built"} ${counts}${out ? ` → ${path.relative(ROOT, out)}/` : ""}`)
}

if (import.meta.url === `file://${process.argv[1]}`) await main()
