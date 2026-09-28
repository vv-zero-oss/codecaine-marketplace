#!/usr/bin/env node
/**
 * Builds each template's live demo into `demos/<id>/`.
 *
 *   node scripts/build-demos.mjs              every template
 *   node scripts/build-demos.mjs <id> [<id>]  just these
 *
 * A demo is the template's own `vite build`, with a relative base so the same
 * files run from GitHub Pages (`/codecaine-marketplace/demos/<id>/`), from a
 * local `_site/` and from any other folder they are copied to. It is what the
 * editor's item page frames as the live preview, and what its "Open in
 * browser" opens.
 *
 * Next to the build goes `demo.json`: the version, and the sha256 of the
 * archive the demo was built from. `scripts/build.mjs` lists the demo in the
 * catalog only while that hash is the one it would publish, so a template
 * changed without rebuilding its demo fails `npm run build` / `npm run check`
 * rather than showing a site that is not the one a person would install.
 *
 * Needs the template's dependencies: runs `npm ci` in a template that has no
 * `node_modules` yet.
 */

import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import path from "node:path"

import { DEMOS, packItem } from "./build.mjs"

const ROOT = path.resolve(import.meta.dirname, "..")
const TEMPLATES = path.join(ROOT, "templates")

const exists = (file) => stat(file).then(() => true, () => false)

async function buildDemo(id) {
  const dir = path.join(TEMPLATES, id)
  const meta = JSON.parse(await readFile(path.join(dir, "marketplace.json"), "utf8"))
  const out = path.join(ROOT, DEMOS, id)
  const npm = process.platform === "win32" ? "npm.cmd" : "npm"
  const run = (args) => execFileSync(npm, args, { cwd: dir, stdio: "inherit" })

  // Hashed before anything below writes into the template folder; node_modules
  // and dist are never packed, so installing and building do not change it.
  const { bytes } = await packItem(dir)
  const sha256 = createHash("sha256").update(bytes).digest("hex")

  if (!(await exists(path.join(dir, "node_modules")))) run(["ci", "--no-audit", "--no-fund"])
  await rm(out, { recursive: true, force: true })
  // `npm run build` with the base and folder overridden, so a template's own
  // build script (a typecheck before `vite build`) still runs.
  run(["run", "build", "--", "--base", "./", "--outDir", out, "--emptyOutDir"])
  if (!(await exists(path.join(out, "index.html")))) throw new Error(`${id}: the build wrote no index.html to ${out}`)

  await writeFile(path.join(out, "demo.json"), JSON.stringify({ id, version: meta.version, sha256 }, null, 2) + "\n")
  console.log(`Built ${DEMOS}/${id}/ (v${meta.version})`)
}

const wanted = process.argv.slice(2)
const all = (await readdir(TEMPLATES, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort()
for (const id of wanted.length ? wanted : all) {
  if (!all.includes(id)) throw new Error(`No template named ${id}`)
  await buildDemo(id)
}
