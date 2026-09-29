import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { canvasPropOptions } from "./src/lib/canvas-react/vite"

/**
 * Luna Residence, started from the SDK scaffold.
 *
 * `@canvas/react` is vendored into `src/lib/canvas-react/` (the package is not
 * published yet) from `sdk/src` at the SDK version `marketplace.json` names.
 * Once it is published: `npm install @canvas/react`, delete the two aliases
 * and the vendored folder, and import `canvasPropOptions` from
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
