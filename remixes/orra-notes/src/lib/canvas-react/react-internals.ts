/**
 * The parts of a React fiber this SDK reads.
 *
 * A description of somebody else's private data structure, not a declaration
 * of one — which is why every field is optional and `unknown` where it can
 * be. Nothing here is constructed, and the shapes are checked at runtime in
 * fiber.ts rather than trusted from these types.
 */

/** What a fiber says it is: a tag name, a component, a `memo`/`forwardRef`
 *  wrapper object, or one of React's own symbols. */
export type FiberType = string | symbol | ((...args: never[]) => unknown) | object | null;

export interface Fiber {
  type?: FiberType;
  /** The fiber above this one. React's own name for it, kept as it is. */
  return?: Fiber | null;
  /** The props this fiber last rendered with — React's own name for it, and
   *  `unknown` because it is whatever somebody wrote at the call site.
   *
   *  Only what was *passed*. A default applied inside the component
   *  (`function Button({ variant = "default" })`, or cva's `defaultVariants`)
   *  is applied after this and never appears here, so a prop nobody set is
   *  absent rather than present with its default. */
  memoizedProps?: unknown;
  /** What React will render this fiber with next. Writing it is how an
   *  override reaches a component whose parent is not passing anything new —
   *  see overrides.ts, and React's own `overrideProps`, which makes the same
   *  two assignments. */
  pendingProps?: unknown;
  /** The other copy of this fiber. React keeps two per component and works on
   *  whichever is not current, so anything written to one has to be written to
   *  both or it lands a render late. */
  alternate?: Fiber | null;

  // Downward, for the motion crawl. `componentsAt` walks *up* from one element
  // and needs nothing below; finding the objects a page holds its own
  // animation libraries in means walking over the whole tree. See motion.ts.

  /** First child, and the next sibling: React's own links, kept as they are. */
  child?: Fiber | null;
  sibling?: Fiber | null;
  /** The head of the hook chain for a function component — and something else
   *  entirely for every other kind of fiber, which is why the crawl checks
   *  the shape of what it finds rather than trusting this name. */
  memoizedState?: unknown;
  /** The DOM node for a host fiber, the instance for a class component, the
   *  container for a root. Only the second is worth anything here. */
  stateNode?: unknown;
}

/** One link in React's hook chain, as the crawl reads it. */
export interface HookNode {
  memoizedState?: unknown;
  next?: HookNode | null;
}
