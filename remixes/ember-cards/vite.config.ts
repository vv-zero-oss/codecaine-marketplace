import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { canvasPropOptions } from "./src/lib/canvas-react/vite"

/**
 * `@canvas/react` is vendored into `src/lib/canvas-react/` (the package is
 * not published yet); the two aliases below point at it, the subpath first.
 * `canvasPropOptions()` turns prop unions into the editor's dropdowns.
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
