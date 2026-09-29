import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { canvasPropOptions } from "./src/lib/canvas-react/vite"

/**
 * The SDK scaffold, as a marketplace template.
 *
 * The same page as `scaffold-sdk/` in the canvas repository. The one change is
 * where `@canvas/react` comes from: the package is not published yet, so a
 * project made from this template cannot install it, and a path into the
 * canvas repository would not exist on the machine the project lands on. It is
 * vendored instead, into `src/lib/canvas-react/`, from `sdk/src` at the SDK
 * version `marketplace.json` names — the same thing the editor's own
 * `electron/scaffold.ts` does for a new project.
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
