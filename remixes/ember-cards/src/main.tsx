// First, and before react-dom: React hands its internals to whatever devtools
// hook exists when it loads, and that is what lets the editor's panel write a
// prop back.
import "@canvas/react/hook"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CanvasDesign } from "@canvas/react"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <CanvasDesign />}
  </StrictMode>,
)
