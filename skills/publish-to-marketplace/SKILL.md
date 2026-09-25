---
name: publish-to-marketplace
description: Add or update a template, app, design system or skill in the Codecaine marketplace repository (vv-zero-oss/codecaine-marketplace) — folder layout, the marketplace.json every item carries, and the index build that GitHub Pages serves to the canvas editor. Use when asked to publish, list, add or release something to the marketplace.
---

# Publish to the Codecaine marketplace

The canvas editor reads `https://vv-zero-oss.github.io/codecaine-marketplace/json/index.json`.
That file and the per-kind catalogs beside it are **generated** from the item
folders by `npm run build`; never edit `json/*.json` by hand.

## Where things go

| Kind | Folder | Required files |
| --- | --- | --- |
| Template | `templates/<id>/` | `marketplace.json`, `package.json`, the project |
| App | `apps/<id>/` | `marketplace.json`, `canvas-app.json`, its panel |
| Design system | `design-systems/<id>/` | `marketplace.json`, `DESIGN.md` |
| Skill | `skills/<id>/` | `marketplace.json`, `SKILL.md` |

`<id>` is kebab-case and must equal `marketplace.json`'s `id`.

## marketplace.json

See `schemas/marketplace-item.schema.json` for the full shape. Every item has
`type`, `id`, `name`, `version` (semver), `description`, `authors`,
`keywords`, `categories`, `created`, `updated`, `license`. Templates add
`sdkVersion` (the `@canvas/react` version they vendor), `meta.devCommand`,
`meta.port` and `pages`. Apps name their manifest in `entry` and the
manifest's `id` goes in `meta.appId`.

## Steps

1. Create or edit the folder.
2. Bump `version` and set `updated` to today whenever the contents change —
   the editor offers an update when the version moves.
3. Templates: `npm install && npm run build` inside the template must pass, and
   `node_modules`/`dist` must not be committed.
   Mark the template's structural wrappers — `#root`, the page wrapper,
   `<main>`, a centring `Container` — with `data-canvas-ignore`, so the
   editor's pointer looks through them to the content (see `CLAUDE.md`).
4. From the repository root: `npm run build`, then `npm run check`. The build
   validates every item and rewrites `json/`; the check fails if `json/` is
   stale. Commit both the item and the regenerated `json/`.
5. Push to `main`. The Pages workflow publishes the catalog and the archives.
