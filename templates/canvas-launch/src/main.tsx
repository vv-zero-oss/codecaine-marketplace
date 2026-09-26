// First, and before react-dom: React hands its internals to whatever devtools
// hook exists when it loads, and that is what lets the editor's panel write a
// prop back. Leave this line out and everything else still works — the panel
// reads the props and does not offer to change them.
import "@canvas/react/hook"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CanvasDesign } from "@canvas/react"
import App from "./App"
import "@fontsource-variable/inter/opsz.css"
import "@fontsource/roboto-mono/400.css"
import "@fontsource/roboto-mono/500.css"
import "./index.css"

/**
 * Everything a project does to opt in: render `<CanvasDesign />` once.
 *
 * No build configuration, no wrapper around any component, no change to how
 * anything renders. It draws nothing and writes nothing into the document; it
 * listens, and when an editor framing the page asks, it answers with the
 * components each element is the root of.
 *
 * The import at the top of this file is the other half, and optional: it plants
 * the hook React reports itself to, which is what makes the props in the
 * editor's Attributes panel editable rather than only readable.
 *
 * Guarded by the bundler's dev flag, which is how a real project ships it:
 * component names are yours, and a page on a real domain should not hand them
 * to whatever happens to be framing it. On a domain, pass `origin` as well —
 * `<CanvasDesign origin="https://design.example.com" />` — so only your editor
 * can ask. Left off, as it is here, any origin can, which is the honest
 * default for a dev server on localhost and the wrong one anywhere else.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <CanvasDesign />}
  </StrictMode>,
)
