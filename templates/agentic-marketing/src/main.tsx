// First, and before react-dom: React hands its internals to whatever devtools
// hook exists when it loads, and that is what lets the editor's panel write a
// prop back. Without it the panel still reads props, it just cannot edit them.
import "@canvas/react/hook"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CanvasDesign } from "@canvas/react"
import App from "./App"
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "@fontsource-variable/eb-garamond"
import "./index.css"

// Dev only: component names are the project's own, and a site on a real
// domain should not hand them to whatever happens to be framing it.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <CanvasDesign />}
  </StrictMode>,
)
