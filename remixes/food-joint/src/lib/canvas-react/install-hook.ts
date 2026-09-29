/**
 * `import "@canvas/react/hook"` — the one line a project adds to make the
 * editor's panel able to write.
 *
 * A side effect on purpose, and its own module on purpose. React DOM hands its
 * internals to whatever hook exists at the moment it loads, so this has to run
 * first — before `react-dom/client` is imported — and a module whose only job
 * is one call is the plainest way to be sure of the order:
 *
 * ```ts
 * import "@canvas/react/hook";
 * import { createRoot } from "react-dom/client";
 * ```
 *
 * Leaving it out is a fine choice and the default: the editor reads props
 * either way, and its panel is read-only for a page that answers
 * `canSet: false`.
 */

import { installCanvasHook } from "./hook";

installCanvasHook();
