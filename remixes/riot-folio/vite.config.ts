import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { canvasPropOptions } from "./src/lib/canvas-react/vite"

/**
 * Riot Folio.
 *
 * `@canvas/react` is not published yet, so it is vendored into
 * `src/lib/canvas-react/` from `sdk/src` at the SDK version `marketplace.json`
 * names. The two aliases below point the package names at it (the subpath
 * first, since an alias matches by prefix), and `canvasPropOptions()` turns
 * prop types into the editor's dropdowns.
 *
 * Once the package is published: `npm install @canvas/react`, delete the two
 * aliases and the vendored folder, and import `canvasPropOptions` from
 * `@canvas/react/vite`.
 */
const here = import.meta.dirname

export default defineConfig({
  plugins: [react(), tailwindcss(), canvasPropOptions()],
  resolve: {
    alias: {
      "@": path.resolve(here, "./src"),
      // The subpath first: an alias matches by prefix, so the bare one would
      // otherwise swallow it.
      "@canvas/react/hook": path.resolve(here, "src/lib/canvas-react/install-hook.ts"),
      "@canvas/react": path.resolve(here, "src/lib/canvas-react/index.ts"),
    },
  },
})
