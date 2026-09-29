/**
 * What a project can tell the editor to do, and what the editor tells it back.
 *
 * ## The problem this is for
 *
 * Everything else in this package reads. The editor asks which component an
 * element came from, and what it was handed, and the answers are facts about a
 * render. None of that helps with the state a page is *in*.
 *
 * A design tool spends most of its time on things that are one interaction
 * deep and invisible until somebody does the interaction: the cart drawer with
 * three items in it, the toast, the error state of a form, the second step of
 * a wizard, the menu open. Today the only way to reach those on the board is
 * Interact mode — go in, click through the app as a visitor, come back out —
 * and a page that needs four clicks to reach the screen you are styling is a
 * page you style four clicks at a time.
 *
 * The editor cannot find these by itself, and it should not try. Where a
 * cart's open state lives is a fact about somebody's application: a `useState`
 * three components up, a Zustand store, a URL parameter, a server action. No
 * crawl over a fiber tree tells you which of a page's booleans is the one
 * worth a button, and guessing produces a panel full of `isHovered`.
 *
 * So the project says. One call, beside the state it is about:
 *
 * ```tsx
 * const [open, setOpen] = useState(false);
 * useCanvasAction("Open the cart", () => setOpen(true));
 * ```
 *
 * and the editor draws a button that runs it. This is the one thing in this
 * package that is registered rather than discovered, and it is registered
 * because the alternative is not "discover it" — it is "do not have it".
 *
 * ## And the other direction
 *
 * `useCanvasDesignMode()` is the same fact from the page's side: whether an
 * editor is framing it right now, which of the three motion settings is on,
 * and how wide the frame thinks it is. A component that knows this can put
 * itself into a state worth designing — hold a dropdown open, stop a carousel
 * advancing under the cursor, skip the intro it plays once per session —
 * which is the general version of everything motion.ts does by force.
 *
 * It answers `designing: false` in a page nobody is framing, which is every
 * page in production, so a component written against it behaves exactly as it
 * always did.
 *
 * ## It runs nothing it was not handed
 *
 * The editor sends a name, and a name only ever selects something the project
 * itself registered. There is no "evaluate this" message here and there is not
 * going to be one: the editor frames pages from a proxy on a port somebody
 * else's process chose, and a channel that runs arbitrary code in them is a
 * different piece of software with a different threat model. A project that
 * wants an editor to be able to do something writes the something down.
 */

import {
  MAX_ACTIONS,
  MAX_ACTION_LABEL,
  type ActionInfo,
  type MotionMode,
  type RunActionResult,
} from "./protocol";

export type { ActionInfo, RunActionResult };

/** What a project hands `registerCanvasAction`: the row the editor draws, plus
 *  the function that stays here. `name` falls back to the label, because one
 *  string is the whole point of the call. */
export interface ActionRegistration extends Omit<ActionInfo, "name" | "label"> {
  name?: string;
  label?: string;
  run: (on?: boolean) => void;
}

/** What the page is being looked at with. */
export interface CanvasDesignState {
  /** Whether an editor is framing this page at all. False everywhere else,
   *  which is where most of this page's life is spent. */
  designing: boolean;
  /** Which of the editor's three motion settings is on. `play` when nobody is
   *  framing, because that is what an unframed page does. */
  motion: MotionMode;
  /** The size the editor is framing this at, when it has said. */
  viewport?: { width: number; height: number };
}

const IDLE: CanvasDesignState = { designing: false, motion: "play" };

/** One in the registry: what was handed in, with the name resolved. */
type Registered = ActionRegistration & { name: string };

let state: CanvasDesignState = IDLE;
const registry = new Map<string, Registered>();
const listeners = new Set<() => void>();
/** Bumped whenever the list changes, so `useSyncExternalStore` and the editor
 *  both have something cheap to compare. */
let revision = 0;

function announce(): void {
  revision += 1;
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch {
      // Somebody else's subscriber. Not this module's failure to have.
    }
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function cut(text: string): string {
  return text.length > MAX_ACTION_LABEL ? `${text.slice(0, MAX_ACTION_LABEL - 1)}…` : text;
}

/**
 * Register an action, outside React's tree.
 *
 * Returns its unregister, which is what the hook below hangs on an effect. A
 * second registration under the same name replaces the first rather than
 * adding a duplicate: a component that remounts is the ordinary case, and two
 * rows called "Open the cart" is the ordinary bug.
 */
export function registerCanvasAction(action: ActionRegistration): () => void {
  const name = (action.name || action.label || "").trim();
  if (!name || typeof action.run !== "function") return () => {};
  if (!registry.has(name) && registry.size >= MAX_ACTIONS) return () => {};

  registry.set(name, { ...action, name });
  announce();

  return () => {
    // Only if it is still ours. Under StrictMode the second mount registers
    // before the first one's cleanup runs, and a blind delete there would
    // leave the panel empty on exactly the setup the fixture uses.
    if (registry.get(name)?.run === action.run) {
      registry.delete(name);
      announce();
    }
  };
}

/** Everything registered, as the editor is told it. Bounded here as well as at
 *  registration: the editor re-applies the same bounds on the way in, and two
 *  sides agreeing is how a duplicated protocol stays honest. */
export function canvasActions(): ActionInfo[] {
  const out: ActionInfo[] = [];
  for (const action of registry.values()) {
    if (out.length >= MAX_ACTIONS) break;
    out.push({
      name: action.name,
      label: cut(action.label || action.name),
      ...(action.group ? { group: cut(action.group) } : {}),
      ...(typeof action.on === "boolean" ? { on: action.on } : {}),
    });
  }
  return out;
}

/**
 * Run one, by name.
 *
 * A name nobody registered is an answer rather than an error — the editor is
 * holding a list that was true when it asked, and a component that unmounted
 * in between is ordinary. A throw inside somebody's handler is theirs, and is
 * reported rather than swallowed: a button that silently does nothing is the
 * thing this is meant to replace.
 */
export function runCanvasAction(name: unknown, on?: unknown): RunActionResult {
  if (typeof name !== "string") return { ran: false, reason: "malformed request" };
  const action = registry.get(name.trim());
  if (!action) return { ran: false, reason: `nothing here registered ${name}` };
  try {
    action.run(typeof on === "boolean" ? on : undefined);
  } catch (error) {
    return { ran: false, reason: error instanceof Error ? error.message : "the action threw" };
  }
  return { ran: true };
}

/** What the page is being looked at with, for anything outside React. */
export function canvasDesignState(): CanvasDesignState {
  return state;
}

/** Told by the agent when the editor says so, and reset when it stops
 *  listening. Ignored when nothing changed, so a handshake that repeats itself
 *  does not re-render somebody's tree. */
export function setCanvasDesignState(next: CanvasDesignState): void {
  if (
    next.designing === state.designing &&
    next.motion === state.motion &&
    next.viewport?.width === state.viewport?.width &&
    next.viewport?.height === state.viewport?.height
  ) {
    return;
  }
  state = next;
  announce();
}

/** For tests, and for a page that tore the agent down. */
export function resetCanvasActions(): void {
  registry.clear();
  state = IDLE;
  announce();
}

/** A version to compare, so the agent can tell the editor the list moved
 *  without sending the list. */
export function canvasActionsRevision(): number {
  return revision;
}

/** Subscribe to both — the list and the design state change together often
 *  enough that two channels would be two renders. */
export { subscribe as subscribeToCanvasActions };

/** The state a page that nobody is framing is in. Exported so the React hooks
 *  in index.ts can hand it back as a server snapshot — the same object every
 *  time, because a new one per call is a hydration warning. */
export const IDLE_DESIGN_STATE = IDLE;
