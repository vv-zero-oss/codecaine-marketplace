# Canvas landing page

The landing page for the Canvas editor, built section by section from a
reference. Typeset in Timeless Grotesk (`public/fonts/`, licensed — see
`LICENSE.pdf` beside it).

**Not a marketplace item.** It lives in `projects/`, which `scripts/build.mjs`
does not walk, so it never reaches `json/` or `archives/` and nobody can
install it from the editor. It is published only as the repository's files.

Started from `remixes/sdk-scaffold` (the `@canvas/react` plumbing is vendored in
`src/lib/canvas-react/`; do not edit it in place).

```bash
npm install
npm run dev      # http://localhost:3540
npm run build
```

Product footage and mockups come from `canvas/demos/` (the directed pieces
carry the camera moves); logo files are in `public/brand/`.
