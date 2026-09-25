# Codecaine Marketplace

Templates, apps, design systems and skills for the canvas editor. The editor
reads this repository's catalog from GitHub Pages and installs from it.

```
https://vv-zero-oss.github.io/codecaine-marketplace/json/index.json
```

## What is here

| Folder | What an item is | Installs as |
| --- | --- | --- |
| `templates/` | A runnable project (`package.json`, `npm run dev`) with `@canvas/react` vendored in | A new project folder the editor opens as a live project |
| `apps/` | A canvas app: `canvas-app.json` and its panel | An app folder the editor's Apps directory lists, behind the usual consent screen |
| `design-systems/` | A `DESIGN.md`: tokens in its front matter, rules in its body | `design-systems/<id>/DESIGN.md` inside a project, where the assistant reads it |
| `skills/` | A `SKILL.md` for the assistant | A skill in the assistant's skills folder |

Every item folder carries a **`marketplace.json`** — the same shape for all
four kinds, described by `schemas/marketplace-item.schema.json`:

```jsonc
{
  "$schema": "../../schemas/marketplace-item.schema.json",
  "type": "template",               // template | app | design-system | skill
  "id": "photographer-portfolio",   // kebab-case, equals the folder name
  "name": "Photographer Portfolio",
  "version": "1.0.0",               // semver; bump it and the editor offers an update
  "description": "…",
  "sdkVersion": "0.1.0",            // the @canvas/react it vendors (templates)
  "canvasVersion": ">=0.0.1",       // editor versions it works with
  "authors": [{ "name": "Codecaine", "url": "https://github.com/vv-zero-oss" }],
  "license": "MIT",
  "keywords": ["photography", "portfolio"],
  "categories": ["Portfolio"],
  "created": "2026-09-25",
  "updated": "2026-09-25",
  "thumbnail": "preview.png",
  "meta": { "framework": "vite", "devCommand": "npm run dev", "port": 3110 },
  "pages": [{ "path": "/", "title": "Home" }]
}
```

## How the editor finds things

`npm run build` walks the four folders, validates every `marketplace.json`,
and writes `json/`:

```
json/index.json            the one URL the editor knows: a catalog per kind
json/templates.json        every template: its marketplace.json + archive + source
json/apps.json
json/design-systems.json   + the palette and fonts read out of each DESIGN.md
json/skills.json
```

Each catalog entry adds what only the build can know:

```jsonc
"archive": {
  "url": "archives/templates/photographer-portfolio-1.0.0.tgz",
  "format": "tar+gzip",
  "sha256": "…",   // of the uncompressed tar — see below
  "size": 1234567,
  "files": 42
},
"source": { "repository": "https://github.com/vv-zero-oss/codecaine-marketplace", "ref": "main", "path": "templates/photographer-portfolio" }
```

URLs are relative to `index.json`'s `root` (`"../"`), itself relative to the
index, so the same files work from Pages, from a raw GitHub URL, or from a
folder on disk.

### Why an archive rather than `git clone`

An install has to work on a machine without git, and has to be checkable. The
editor downloads one versioned `.tgz`, checks it against the catalog's
`sha256` before writing anything, and extracts it into the folder the person
picked. `source` is there for anyone who would rather clone
(`git clone --depth 1 --filter=blob:none --sparse` + `git sparse-checkout set <path>`).

The hash is of the tar, not the gzip: the tar is written deterministically
(sorted paths, zeroed times and owners), so the same folder hashes the same
everywhere, while gzip output depends on the zlib that produced it.

## Adding an item

1. Make the folder under the right kind, with a `marketplace.json`.
2. Templates: `npm install && npm run build` must pass inside it. Don't commit
   `node_modules` or `dist` (they are never packed anyway).
3. At the root: `npm run build`, then commit the item **and** `json/`.
   `npm run check` (run in CI) fails when `json/` is stale.
4. Push to `main`; the **Catalog** workflow publishes to Pages.

Templates also carry previews for their page in the editor — the site at
desktop and phone width and a picture of each page. With the template's dev
server running:

```bash
node scripts/capture-previews.mjs <id> http://localhost:<port>
```

It writes `preview.png`, `previews/` and the `previews` field of
`marketplace.json` (Playwright required; see the script's header). Every item
can also list `designedFor` — the "Designed for" bullets on its page — and an
`icon`.

`skills/publish-to-marketplace/SKILL.md` is the same checklist, written for
the assistant.

```bash
npm test          # the builder's own tests
npm run build     # validate + regenerate json/
npm run check     # validate + fail if json/ is stale
npm run site      # also write _site/, what Pages serves (archives, landing page)
```

## GitHub Pages

One-time: **Settings → Pages → Build and deployment → Source: GitHub
Actions**. `.github/workflows/pages.yml` then checks every push and pull
request (tests, stale `json/`, every template builds) and deploys `_site/` on
`main`.

## Design systems

The `DESIGN.md` files describe the public marketing surfaces of the companies
they are named for, as extracted references. They are **unofficial and
unaffiliated**; the names and marks belong to their owners, and several of the
typefaces they name are proprietary — each file's *Note on Font Substitutes*
says what to use instead.

The photographer template's photographs are Picsum placeholders keyed by seed
(`src/content.ts`). Its previews were captured with `--stub-images` on a
machine that could not reach Picsum, so they show tonal placeholders where the
running template shows photographs; re-capture without the flag to replace
them.
