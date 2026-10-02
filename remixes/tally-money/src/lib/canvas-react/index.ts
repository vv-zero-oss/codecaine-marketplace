/**
 * @canvas/react — what a React project tells the Canvas editor about itself.
 *
 * Optional, and additive. The editor can already design a running project
 * without it: a guest agent is injected into the page, or the project includes
 * one script tag itself, and everything after that is read off the DOM (see
 * docs/live-projects.md). That path is not going anywhere and is how every
 * project is supported. Add this package when the project is React and you
 * want the editor to know it.
 *
 * ```tsx
 * // app/layout.tsx  (Next.js — "use client" at the top of the file)
 * import { CanvasDesign } from "@canvas/react";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         {process.env.NODE_ENV === "development" && <CanvasDesign />}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * Or outside React's tree entirely — the component is only a convenience:
 *
 * ```ts
 * import { startCanvasReact } from "@canvas/react";
 * if (import.meta.env.DEV) startCanvasReact({ origin: "http://localhost:5173" });
 * ```
 *
 * ## What it changes
 *
 * The layers panel stops saying `button.inline-flex.items-center` and starts
 * saying `Button`: the editor asks this package which components each element
 * is the root of, and names the tree from the answer.
 *
 * And for a selected element, what those components were handed —
 * `variant="ghost"`, `size="sm"`, `featured={true}` — which is the half of a
 * design that a rendered document cannot give back at all, because cva
 * compiled the word "ghost" into a class list on the way out.
 *
 * ## What it does not do
 *
 * It does not render anything, patch anything, or wrap your components. It
 * reads React's fiber tree when asked and answers over `postMessage`. Nothing
 * is written into your document, nothing is sent anywhere until an editor asks
 * for it, and nothing happens at all in a page that is not being framed.
 *
 * ## Leave it out of production
 *
 * It exposes your component names to whatever is framing the page. On
 * localhost that is the point; on a real domain, set `origin` so only your
 * editor can ask, and guard the call with your bundler's dev flag so it is
 * dropped from the production bundle entirely.
 */

import { useEffect, useSyncExternalStore } from "react";
import { startCanvasReact, type CanvasDesignOptions } from "./agent";
import {
  IDLE_DESIGN_STATE,
  canvasDesignState,
  registerCanvasAction,
  subscribeToCanvasActions,
  type CanvasDesignState,
} from "./actions";

export {
  startCanvasReact,
  componentMap,
  propsFor,
  setPropsFor,
  type CanvasDesignOptions,
} from "./agent";
export { componentsAt, componentChainAt, componentFiberAt, resetFiberKey } from "./fiber";
export { serializeProps, serializeValue } from "./props";
export { installCanvasHook, canOverrideProps, resetCanvasHook } from "./hook";
export { applyOverride, clearOverrides, overridesFor, type OverrideValue } from "./overrides";
export {
  CANVAS_REACT_PROTOCOL,
  REACT_MSG,
  type ActionInfo,
  type ComponentProps,
  type MotionMode,
  type PropValue,
} from "./protocol";
export {
  canvasActions,
  canvasDesignState,
  registerCanvasAction,
  resetCanvasActions,
  runCanvasAction,
  subscribeToCanvasActions,
  type ActionRegistration,
  type CanvasDesignState,
} from "./actions";
export { applyMotion, releaseMotion, type MotionReport } from "./motion";
export { setReducedMedia, reducedMediaInstalled } from "./reduced-media";

/**
 * The same thing, as a component to drop in a layout.
 *
 * Renders nothing. It starts in an effect rather than during render, so it
 * never runs on the server and so StrictMode's double invocation tears down
 * the first copy instead of leaving two listeners behind.
 */
export function CanvasDesign(options: CanvasDesignOptions = {}): null {
  const { origin, attribute, props, motion } = options;
  useEffect(
    () => startCanvasReact({ origin, attribute, props, motion }),
    // Spread rather than passed as an object so a caller writing
    // `<CanvasDesign origin="..." />` inline does not restart the agent on
    // every render of its parent.
    [origin, attribute, props, motion]
  );
  return null;
}

/**
 * Give the editor a button that puts this page into a state worth designing.
 *
 * ```tsx
 * const [open, setOpen] = useState(false);
 * useCanvasAction("Open the cart", () => setOpen(true), { on: open });
 * ```
 *
 * The one thing in this package a project writes down rather than the editor
 * discovering it, and deliberately: which of a page's booleans is worth a
 * button is a fact about the application, and a crawl that guessed would
 * produce a panel full of `isHovered`. See actions.ts.
 *
 * `run` is in the dependency list, so an inline arrow closing over this
 * render's state is right and does not need memoising — which matters, because
 * the whole point is one line beside the `useState` and a line that comes with
 * a `useCallback` is two.
 */
export function useCanvasAction(
  label: string,
  run: (on?: boolean) => void,
  options: { name?: string; group?: string; on?: boolean } = {}
): void {
  const { name, group, on } = options;
  useEffect(
    () => registerCanvasAction({ name: name ?? label, label, group, on, run }),
    [label, name, group, on, run]
  );
}

/**
 * Whether an editor is framing this page right now, and how.
 *
 * ```tsx
 * const { designing, motion } = useCanvasDesignMode();
 * <Carousel autoplay={!designing} />
 * ```
 *
 * Answers `designing: false` everywhere else — which is every page in
 * production — so a component written against it behaves exactly as it always
 * did. Server-safe: the snapshot is a module constant until an editor says
 * otherwise, so it is the same object on both sides of a hydration.
 */
export function useCanvasDesignMode(): CanvasDesignState {
  return useSyncExternalStore(
    subscribeToCanvasActions,
    canvasDesignState,
    () => IDLE_DESIGN_STATE
  );
}
