/**
 * The Canvas React protocol, as the SDK speaks it.
 *
 * Deliberately a copy. The editor holds the same declaration in
 * `src/editor/live/react/protocol.ts` and that copy is the specification;
 * this one exists because a package somebody installs cannot import from the
 * editor's source tree. `src/editor/live/react/__tests__/protocol-parity.test.ts`
 * imports both and fails if they ever disagree, which is the only thing
 * keeping a duplicated protocol honest.
 *
 * See the editor's copy for why this is its own protocol rather than an
 * addition to the frame protocol the guest agent speaks.
 */

/** Marker on every message of this protocol. */
export const REACT_MSG = "__canvasReact";

/** Bumped when an existing message changes meaning. */
export const CANVAS_REACT_PROTOCOL = 1;

export type ReactRequest =
  | { kind: "handshake" }
  | { kind: "components" }
  /** The props of the components a few named elements are the root of. Asked
   *  for a handful of ids — the selection — rather than for the document, the
   *  opposite of `components`: a name is a word and props are somebody's data,
   *  so one is worth sending for every element and the other is not. */
  | { kind: "props"; ids: string[] }
  /** Render one component instance with a prop its parent did not pass.
   *
   *  Live only: it lasts until that component's parent renders it again, and a
   *  reload takes it. Nothing here writes to anybody's source — see
   *  overrides.ts, which is also why the handshake says whether a page can be
   *  written to at all, so an editor offers fields only where they do
   *  something. */
  | {
      kind: "set-props";
      id: string;
      component: string;
      props: Record<string, string | number | boolean | null>;
    }
  /** How much of this page's own motion should run while it is being designed
   *  on, and how wide the editor is framing it.
   *
   *  The same three words the editor's Motion row says, sent to a second peer:
   *  the guest agent gets them too and answers with a stylesheet and the Web
   *  Animations API. This half is for what a bundled library holds and the DOM
   *  does not show — see motion.ts, which also says why the guest cannot do
   *  it. */
  | {
      kind: "design-mode";
      designing: boolean;
      motion: MotionMode;
      viewport?: { width: number; height: number };
    }
  /** What the project has registered for an editor to run. */
  | { kind: "actions" }
  /** Run one of them, by the name it registered under. Never anything else:
   *  there is no message here that carries code. */
  | { kind: "run-action"; name: string; on?: boolean };

/** Which of the editor's three motion settings is on. */
export type MotionMode = "hold" | "reduce" | "play";

export type ReactEvent =
  | { kind: "hello"; version: number; url: string; canSet: boolean }
  /** The project's action list changed — a component that registers one
   *  mounted, or unmounted. Volunteered rather than polled: the editor has no
   *  way to know a page's own state moved, and a panel of buttons that are no
   *  longer there is worse than one that is late. */
  | { kind: "actions"; revision: number };

/** Answer to `handshake`. `canSet` is false unless the project installed the
 *  hook (see hook.ts), which is the usual case and not a fault. */
export interface ReactHello {
  version: number;
  url: string;
  canSet: boolean;
}

/** Answer to `design-mode`: what the SDK's own motion pass found and drove,
 *  so the editor can say which libraries it reached rather than implying it
 *  reached everything. Absent for a `designing: false`, which drives nothing.
 */
export interface MotionResult {
  found: Array<{ library: string; count: number }>;
  /** Libraries the page is plainly using that the SDK could not drive, because
   *  nothing in the project holds an instance of them. Carried so the editor
   *  can name one rather than show a switch that quietly did nothing. */
  seen: string[];
  /** Whether the reduced-motion media query is being answered yes. */
  media: boolean;
}

/** One thing a project has said an editor may do to it.
 *
 *  The function stays in the project. This is the row the editor draws. */
export interface ActionInfo {
  /** What a `run-action` names. Stable across renders, unique in the project. */
  name: string;
  label: string;
  /** A heading to sit under, so a dozen actions are sections rather than a
   *  column of buttons. */
  group?: string;
  /** Whether the thing this action turns on is on now, where the project can
   *  say. Present means the editor draws a switch; absent means a button. */
  on?: boolean;
}

/** Answer to `actions`. */
export type ActionList = ActionInfo[];

/** Answer to `run-action`. A refusal is an answer: the editor is holding a
 *  list that was true when it asked. */
export interface RunActionResult {
  ran: boolean;
  reason?: string;
}

/** Answer to `set-props`. */
export interface SetPropsResult {
  applied: boolean;
  reason?: string;
  props?: Record<string, PropValue>;
}

export interface ReactRequestEnvelope {
  [REACT_MSG]: typeof CANVAS_REACT_PROTOCOL;
  dir: "request";
  id: number;
  req: ReactRequest;
}

export interface ReactResponseEnvelope {
  [REACT_MSG]: typeof CANVAS_REACT_PROTOCOL;
  dir: "response";
  id: number;
  ok: boolean;
  result?: unknown;
  error?: string;
}

export interface ReactEventEnvelope {
  [REACT_MSG]: typeof CANVAS_REACT_PROTOCOL;
  dir: "event";
  event: ReactEvent;
}

/** `data-codecaine-id` → the components whose output begins at that element,
 *  innermost first. */
export type ComponentMap = Record<string, string[]>;

/**
 * One prop, reduced to something that survives a `postMessage` and reads as a
 * line in a panel.
 *
 * `value` is present for the three kinds that have one — which are also the
 * three a design panel can offer to edit, when editing them is a thing this
 * protocol does. Everything else is a `text` somebody reads: `ƒ onClick`,
 * `<Icon />`, `[3 items]`, `{name, price, …}`.
 */
export interface PropValue {
  kind:
    | "string"
    | "number"
    | "boolean"
    | "null"
    | "undefined"
    | "function"
    | "element"
    | "array"
    | "object"
    | "other";
  text: string;
  value?: string | number | boolean;
  /** Every value this prop is allowed to take, where the project's types say
   *  so — `["default", "primary", "outline", "ghost", "link"]` for a cva
   *  variant. Read from the source at dev-server start by
   *  `@canvas/react/vite`, because a closed set is a fact about the types and
   *  the running page has only ever seen the one value it was given. Absent
   *  for a prop that is any string, and for a project without the plugin. */
  options?: string[];
}

/** One component in an element's chain, and what it was handed.
 *
 *  A chain rather than one component because the innermost is often not the
 *  interesting one: shadcn's `<Button asChild>` renders through Radix's `Slot`,
 *  so the element's nearest component holds `{className, children}` and the
 *  `variant` somebody chose is one step out. */
export interface ComponentProps {
  component: string;
  props: Record<string, PropValue>;
}

/** Answer to `props`: `data-codecaine-id` → its component chain, innermost
 *  first, each with its own props. An element the SDK cannot name is absent
 *  rather than empty. */
export type PropsMap = Record<string, ComponentProps[]>;

/** How many elements one answer may name. */
export const MAX_COMPONENT_ENTRIES = 5000;

/** How many names one element may claim. */
export const MAX_COMPONENT_NAMES = 4;

/** How many elements one `props` request may ask about. A selection, not a
 *  document — see the request's own note. */
export const MAX_PROP_IDS = 32;

/** How many props one component may report. Past this it is a data structure
 *  being passed as a prop bag, and the panel is not where it gets read. */
export const MAX_PROP_ENTRIES = 24;

/** Longest reading kept for one value. Long enough for a Tailwind class list
 *  to be recognisable, short enough that a page of copy is not sent as a
 *  prop. */
export const MAX_PROP_TEXT = 120;

/** How many values one prop may offer. Past this a dropdown is a list nobody
 *  scrolls, and the field is better off as a field. */
export const MAX_PROP_OPTIONS = 24;

/** How many props one write may carry. A panel edits a field at a time; the
 *  bound is for the message, not for the panel. */
export const MAX_SET_PROPS = 8;

/** How many actions one project may offer. Past this it is a list nobody
 *  reads, and the panel is not a command palette. */
export const MAX_ACTIONS = 24;

/** Longest label kept for one. A button, not a sentence. */
export const MAX_ACTION_LABEL = 48;

/** How many libraries one motion answer may name. */
export const MAX_MOTION_FOUND = 8;

export function isReactRequest(data: unknown): data is ReactRequestEnvelope {
  if (typeof data !== "object" || data === null) return false;
  const envelope = data as Record<string, unknown>;
  if (envelope[REACT_MSG] !== CANVAS_REACT_PROTOCOL) return false;
  if (envelope.dir !== "request" || typeof envelope.id !== "number") return false;
  const req = envelope.req as { kind?: unknown; ids?: unknown } | undefined;
  if (!req) return false;
  if (req.kind === "handshake" || req.kind === "components" || req.kind === "actions") return true;
  if (req.kind === "props") return Array.isArray(req.ids);
  if (req.kind === "design-mode") {
    const mode = req as { designing?: unknown; motion?: unknown };
    return (
      typeof mode.designing === "boolean" &&
      (mode.motion === "hold" || mode.motion === "reduce" || mode.motion === "play")
    );
  }
  if (req.kind === "run-action") return typeof (req as { name?: unknown }).name === "string";
  if (req.kind !== "set-props") return false;
  const write = req as { id?: unknown; component?: unknown; props?: unknown };
  return (
    typeof write.id === "string" &&
    typeof write.component === "string" &&
    typeof write.props === "object" &&
    write.props !== null
  );
}
