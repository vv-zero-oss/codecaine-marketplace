/**
 * A DOM element, and the components it is the root of.
 *
 * ## Reading fibers at all
 *
 * React exposes no public way to ask "what rendered this node", so this walks
 * the fiber attached to the DOM element. That is private, and treating it as
 * private is the point of every guard below: an unrecognised shape is skipped
 * rather than guessed at, and the whole walk is wrapped by the caller. The
 * worst outcome of React changing underneath this is a layer named the way it
 * was named before the SDK existed.
 *
 * Everything is read, nothing is written, and no React API is called — so
 * there is no render to interfere with and nothing to keep in sync.
 *
 * ## Root, not "contains"
 *
 * The walk goes *up* from a host fiber and stops at the first host fiber above
 * it. That single rule is what makes the answer useful:
 *
 *     function Card() { return <div className="card"><span /></div> }
 *     function Hero() { return <section><Card /></section> }
 *
 * The `div` reports `["Card"]` — its parent fiber is Card, whose parent is the
 * host `section`, which ends the walk. The `span` reports nothing: its parent
 * fiber is already a host element, so it is inside Card's output rather than
 * the start of it. The `section` reports `["Hero"]`.
 *
 * Every element inside a Card was rendered by Card, and a layers panel that
 * says "Card" eleven times is worse than one that says nothing. The element a
 * component's output *begins* at is the one that means "here is a Card" —
 * which is what an instance means in a design tool, and what a person points
 * at when they say that word.
 */

import type { Fiber, FiberType } from "./react-internals";
import { serializePropsOf } from "./props";
import type { ComponentProps } from "./protocol";

/**
 * The property React hangs a fiber off a DOM node with, cached once found.
 *
 * The suffix is a per-copy random number, so it is discovered rather than
 * known — but it is the same for every node one copy of React rendered, and
 * scanning an element's own keys on every call is the kind of cost that shows
 * up when it runs a few thousand times per snapshot.
 */
let fiberKey: string | null = null;

const FIBER_PREFIX = "__reactFiber$";

function fiberOf(element: Element): Fiber | null {
  const node = element as unknown as Record<string, unknown>;
  if (fiberKey) {
    const cached = node[fiberKey];
    if (cached) return cached as Fiber;
    // Two copies of React on one page, or the key changed under us. Fall
    // through and look again rather than reporting nothing.
  }
  for (const key of Object.keys(node)) {
    if (!key.startsWith(FIBER_PREFIX)) continue;
    fiberKey = key;
    return node[key] as Fiber;
  }
  return null;
}

/** React's own tags for the two wrappers worth seeing through. Compared by
 *  `Symbol.for`, which is how React writes them, so this holds across realms
 *  — an element rendered inside an iframe included. */
const FORWARD_REF = Symbol.for("react.forward_ref");
const MEMO = Symbol.for("react.memo");

/**
 * The display name of whatever a fiber's `type` is, or null for anything that
 * is not a component somebody wrote.
 *
 * Host elements (`type` is a string) are the caller's business, not a name.
 * Fragments, Suspense and StrictMode are symbols and have no name worth
 * showing. Context providers are objects that React 19 lets you render
 * directly, and "Provider" in a layers tree is noise — so an object is only
 * followed when it is a `memo` or a `forwardRef`, which are wrappers around a
 * component a person did write.
 */
function displayNameOf(type: FiberType, depth = 0): string | null {
  // `memo(forwardRef(...))` is two wrappers; more than that is a shape we do
  // not recognise, and recursion here runs inside somebody's page.
  if (depth > 3 || type == null) return null;

  if (typeof type === "string") return null;

  if (typeof type === "function") {
    const fn = type as { displayName?: unknown; name?: unknown };
    if (typeof fn.displayName === "string" && fn.displayName) return fn.displayName;
    if (typeof fn.name === "string" && fn.name) return fn.name;
    return null;
  }

  if (typeof type === "object") {
    const wrapper = type as {
      $$typeof?: unknown;
      displayName?: unknown;
      render?: FiberType;
      type?: FiberType;
    };
    if (wrapper.$$typeof !== FORWARD_REF && wrapper.$$typeof !== MEMO) return null;
    // A name put on the wrapper wins: it is the one somebody chose.
    if (typeof wrapper.displayName === "string" && wrapper.displayName) return wrapper.displayName;
    if (wrapper.$$typeof === FORWARD_REF) return displayNameOf(wrapper.render ?? null, depth + 1);
    return displayNameOf(wrapper.type ?? null, depth + 1);
  }

  return null;
}

/** How far up one element's walk can go. A component nested more deeply than
 *  this is a wrapper stack nobody is reading anyway, and the bound keeps a
 *  malformed `return` chain from spinning. */
const MAX_WALK = 32;

/**
 * The walk itself: every named component `element` is the root of, innermost
 * first, optionally with what each one was handed.
 *
 * Names repeated back to back are collapsed, because a single component can
 * occupy two fibers — `memo(forwardRef(Button))` is a memo fiber and a
 * forwardRef fiber, both of which answer "Button", and a layer called
 * "Button" twice is a leak of React's internals into somebody's layers panel.
 * The two fibers of one component carry the same props, so the innermost is
 * kept and the second sighting dropped whole.
 */
function walk(element: Element, withProps: boolean): ComponentProps[] {
  const own = fiberOf(element);
  if (!own) return [];

  const chain: ComponentProps[] = [];
  let fiber: Fiber | null | undefined = own.return;

  for (let step = 0; step < MAX_WALK && fiber; step += 1) {
    // A host element above us: this element is inside somebody's output
    // rather than the start of it, so there is nothing further to claim.
    if (typeof fiber.type === "string") break;

    const name = displayNameOf(fiber.type ?? null);
    if (name && name !== chain[chain.length - 1]?.component) {
      chain.push({
        component: name,
        props: withProps ? serializePropsOf(name, fiber.memoizedProps) : {},
      });
    }

    fiber = fiber.return;
  }

  return chain;
}

/**
 * The components `element` is the root of, innermost first.
 *
 * Names only. This one runs for every element in the document on every
 * snapshot, so it does not read props — see `componentChainAt`, which is asked
 * about a selection.
 */
export function componentsAt(element: Element): string[] {
  return walk(element, false).map((entry) => entry.component);
}

/**
 * The fiber of one named component in an element's chain.
 *
 * By name rather than by position because that is what an editor has: it
 * showed somebody a section headed `Button`, and the write that comes back
 * says which of the components it named is being edited. Resolved fresh on
 * every write — a fiber held across a render is the alternate, and stale.
 */
export function componentFiberAt(element: Element, component: string): Fiber | null {
  const own = fiberOf(element);
  if (!own) return null;

  let fiber: Fiber | null | undefined = own.return;
  let last: string | null = null;
  for (let step = 0; step < MAX_WALK && fiber; step += 1) {
    if (typeof fiber.type === "string") break;
    const name = displayNameOf(fiber.type ?? null);
    if (name && name !== last) {
      if (name === component) return fiber;
      last = name;
    }
    fiber = fiber.return;
  }
  return null;
}

/**
 * The same chain, with each component's props.
 *
 * The whole chain rather than the innermost component alone, because the
 * innermost is frequently a library's: `<Button asChild><a/></Button>` renders
 * through Radix's `Slot`, which holds `{className, children}`, and the
 * `variant` somebody actually chose is on the `Button` one step further out.
 */
export function componentChainAt(element: Element): ComponentProps[] {
  return walk(element, true);
}

/** Drops the cached fiber key. For tests, and for a page that swapped its
 *  React out from under us. */
export function resetFiberKey(): void {
  fiberKey = null;
}

/**
 * Where React's trees start in this document.
 *
 * `componentsAt` is handed an element and walks up from it; the motion crawl
 * (motion.ts) has no element in mind and needs somewhere to begin. React hangs
 * the root off the *container* under `__reactContainer$`, so the containers
 * are what this looks for — and climbs from an ordinary fiber where it finds
 * one instead, because `hydrateRoot(document)` (the App Router) puts the
 * container on `document` itself, where a property scan is not something to
 * do casually.
 *
 * More than one, because portals are containers too: a dialog rendered into
 * `document.body` is its own tree, and a page's motion is as likely to be in
 * the dialog as in the page.
 */
const CONTAINER_PREFIX = "__reactContainer$";

/** How far a climb from one fiber may go. A tree deeper than this is one where
 *  the root is not what is wrong. */
const MAX_CLIMB = 2000;

function rootFrom(fiber: Fiber): Fiber {
  let root = fiber;
  for (let step = 0; step < MAX_CLIMB && root.return; step += 1) root = root.return;
  return root;
}

export function fiberRoots(doc: Document = document): Fiber[] {
  const roots: Fiber[] = [];
  const seen = new Set<Fiber>();

  const consider = (node: unknown): void => {
    if (!node || typeof node !== "object") return;
    const bag = node as Record<string, unknown>;
    let found: Fiber | null = null;
    for (const key of Object.keys(bag)) {
      if (key.startsWith(CONTAINER_PREFIX) || key.startsWith(FIBER_PREFIX)) {
        found = bag[key] as Fiber;
        break;
      }
    }
    if (!found || typeof found !== "object") return;
    const root = rootFrom(found);
    if (seen.has(root)) return;
    seen.add(root);
    roots.push(root);
  };

  // The containers a root is ever mounted on, and the two layers of children
  // under `<body>` that hold a portal. Not a document-wide scan: this runs
  // every time an editor asks about motion, and the answer is the same three
  // elements on every page that has one.
  consider(doc);
  consider(doc.documentElement);
  consider(doc.body);
  for (const child of Array.from(doc.body?.children ?? [])) {
    consider(child);
    for (const grandchild of Array.from(child.children)) consider(grandchild);
  }

  return roots;
}
