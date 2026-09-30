/**
 * What makes a prop editable: React's own DevTools hook.
 *
 * Reading props needs nothing from React — the fiber is hanging off the DOM
 * node, and fiber.ts walks it. Writing one needs React to re-render the
 * component with a value its parent did not pass, and there is exactly one
 * supported-ish way to ask for that: the object React DOM hands to the
 * DevTools hook on startup, which carries `overrideProps` and `scheduleUpdate`
 * in every development build.
 *
 * ## Why this is a separate entry point
 *
 * React DOM injects into `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` while its own
 * module is evaluating. Anything that wants to be handed those internals has
 * to have planted the hook before then — which `<CanvasDesign />` cannot do,
 * because by the time a component renders, react-dom has long since loaded.
 *
 * So a project that wants editing imports this first:
 *
 * ```ts
 * import "@canvas/react/hook";   // before react-dom, so it is the first line
 * import { createRoot } from "react-dom/client";
 * ```
 *
 * One line, and only for projects that want the panel to write. Everything
 * else in this package works without it, and a page that never imports it
 * answers `canSet: false` and gets a read-only panel rather than fields that
 * do nothing.
 *
 * ## It shares the hook rather than owning it
 *
 * Something is usually there first. React DevTools plants one; so does
 * `@vitejs/plugin-react`, whose Fast Refresh preamble runs before the entry
 * module and installs a stub of its own — and that stub's `inject` returns an
 * id without ever putting the renderer in `renderers`, so reading that map
 * finds nothing on the most ordinary React setup there is.
 *
 * So this wraps `inject` instead: whatever was there is called first and its
 * answer is passed back untouched, and the internals React handed over are
 * kept here on the way past. Nobody's bookkeeping is replaced, DevTools keeps
 * working beside it, and what this needs does not depend on somebody else
 * having recorded it.
 */

/** The shape React DOM hands the hook. Everything is optional: it is somebody
 *  else's private object, and a build that stops carrying one of these costs
 *  editing rather than the page. */
export interface RendererInternals {
  version?: string;
  overrideProps?: (fiber: unknown, path: Array<string | number>, value: unknown) => void;
  scheduleUpdate?: (fiber: unknown) => void;
}

interface DevToolsHook {
  supportsFiber?: boolean;
  renderers?: Map<number, RendererInternals>;
  inject?: (internals: RendererInternals) => number;
  onCommitFiberRoot?: (...args: unknown[]) => void;
  onCommitFiberUnmount?: (...args: unknown[]) => void;
  onPostCommitFiberRoot?: (...args: unknown[]) => void;
  checkDCE?: (...args: unknown[]) => void;
  isDisabled?: boolean;
  /** Ours, so a second call does not wrap the wrapper. */
  __canvasWrapped?: boolean;
}

/** Every renderer that has been injected since this was installed, whoever
 *  owns the hook. */
const captured: RendererInternals[] = [];

const HOOK = "__REACT_DEVTOOLS_GLOBAL_HOOK__";

function globalHook(): DevToolsHook | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as Record<string, DevToolsHook | undefined>)[HOOK];
}

/**
 * Plant the hook if nothing has, and either way start listening to it.
 *
 * Safe to call more than once, safe on a server, and safe beside anything else
 * that wants the hook: what is already there is kept and called, and this only
 * adds a hook where there is none.
 *
 * It has to run before React does. React DOM injects while its own module is
 * evaluating, and an injection this did not see is a renderer it cannot use —
 * which is the whole reason `@canvas/react/hook` is a separate import placed
 * above `react-dom`.
 */
export function installCanvasHook(): void {
  if (typeof window === "undefined") return;

  let hook = globalHook();
  if (!hook) {
    const renderers = new Map<number, RendererInternals>();
    let nextId = 1;
    hook = {
      supportsFiber: true,
      renderers,
      inject(internals) {
        const id = nextId++;
        renderers.set(id, internals);
        return id;
      },
      // React calls these on every commit. They have to exist and they have to
      // be cheap: this is the render path of somebody's application.
      onCommitFiberRoot() {},
      onCommitFiberUnmount() {},
      onPostCommitFiberRoot() {},
      // Its presence is how React decides the page has devtools and stays
      // quiet about suggesting them.
      checkDCE() {},
    };
    (window as unknown as Record<string, DevToolsHook>)[HOOK] = hook;
  }

  if (hook.__canvasWrapped) return;
  hook.__canvasWrapped = true;

  const inject = hook.inject;
  let fallbackId = 1000;
  hook.inject = function (internals: RendererInternals): number {
    // Whatever was here goes first and its answer is what React gets back:
    // Fast Refresh reads the id it returns, and DevTools counts on its own.
    const id =
      typeof inject === "function" ? inject.call(hook, internals) : fallbackId++;
    captured.push(internals);
    return id;
  };
}

/**
 * The renderer that can write, or null.
 *
 * Null is the answer for a page that never installed this, for one where React
 * loaded first, and for a production build of React — whose renderer carries
 * none of these functions, because there is nothing in it to override.
 */
export function writableRenderer(): RendererInternals | null {
  const hook = globalHook();
  if (hook?.isDisabled) return null;

  for (const internals of captured) {
    if (typeof internals?.scheduleUpdate === "function") return internals;
  }
  // Somebody else's bookkeeping, in case this was installed after the fact and
  // whoever owns the hook does keep it.
  for (const internals of hook?.renderers?.values() ?? []) {
    if (typeof internals?.scheduleUpdate === "function") return internals;
  }
  return null;
}

/** Forget the renderers this captured. For tests: a global that outlives one
 *  is a global that makes the next one pass for the wrong reason. */
export function resetCanvasHook(): void {
  captured.length = 0;
}

/** Whether this page can be written to at all. What the handshake answers, so
 *  an editor offers fields only where they would do something. */
export function canOverrideProps(): boolean {
  return writableRenderer() !== null;
}
