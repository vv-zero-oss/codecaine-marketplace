/**
 * The SDK's answering half: a peer on the editor's `postMessage` transport.
 *
 * ## What it is, next to the guest agent
 *
 * A live project is already designable without this. The editor injects a
 * guest agent into the page (or the project includes that one script tag
 * itself) and it answers everything by reading the DOM. That agent is
 * framework-agnostic and stays the way every project is supported.
 *
 * This is a second peer in the same document, speaking its own protocol under
 * its own marker, answering the one question the DOM cannot: which component
 * produced this element. The two never talk to each other and neither needs
 * the other to be there. A project can carry the guest alone (the usual case),
 * this alone, or both.
 *
 * That separation is the point. The guest does not grow a message every time
 * this package learns something new, and this package can be upgraded on its
 * own release schedule — it is in somebody's node_modules, and the editor is
 * not.
 *
 * ## It reads; it does not write
 *
 * The answers are keyed by `data-codecaine-id`, the identity the editor
 * already uses for an element across a reload and across the frame boundary.
 * The guest agent puts it there as it walks the tree; this agent only ever
 * reads it. One writer for an identity is the rule the editor's own identity
 * module is built on, and being a second one is how two elements end up
 * answering to the same name.
 *
 * So an element nothing has stamped is simply not named yet. It will be, on
 * the editor's next snapshot — which is also when the editor next asks.
 *
 * ## Inert until somebody drives it
 *
 * Nothing happens in a document that is not framed, nothing happens until a
 * host asks, and nothing is ever sent anywhere but to the host that asked. If
 * `origin` is configured, only that origin can ask at all.
 */

import {
  canvasActions,
  canvasActionsRevision,
  runCanvasAction,
  setCanvasDesignState,
  subscribeToCanvasActions,
} from "./actions";
import { componentChainAt, componentsAt } from "./fiber";
import { canOverrideProps } from "./hook";
import { applyMotion, releaseMotion } from "./motion";
import { serializePropsOf } from "./props";
import { applyOverride, overridesFor, type OverrideValue } from "./overrides";
import {
  CANVAS_REACT_PROTOCOL,
  MAX_COMPONENT_ENTRIES,
  MAX_COMPONENT_NAMES,
  MAX_MOTION_FOUND,
  MAX_PROP_IDS,
  MAX_SET_PROPS,
  REACT_MSG,
  isReactRequest,
  type ComponentMap,
  type MotionResult,
  type PropsMap,
  type SetPropsResult,
} from "./protocol";

export interface CanvasDesignOptions {
  /**
   * The origin, or origins, allowed to drive this page.
   *
   * Left off, any origin can — which is the honest default for a tool pointed
   * at localhost and the wrong one anywhere else. Set it for anything on a
   * real domain. It is the same decision the guest's `data-origin` attribute
   * makes, and it is the author's, not the editor's.
   */
  origin?: string | string[];
  /**
   * The attribute answers are keyed by. Only change it if you changed it in
   * the babel plugin too; the editor reads `data-codecaine-id`.
   */
  attribute?: string;
  /**
   * Whether to answer what each component was handed, as well as its name.
   *
   * On by default, because it is the answer a design tool is really after:
   * `variant="ghost"` exists nowhere in the rendered document — cva compiled
   * it into a class list — so an editor that cannot ask this can only offer
   * somebody the class list back.
   *
   * Props are bounded and reduced before they are sent (see props.ts), and
   * only for the elements an editor asks about. Turn it off for a page whose
   * components are handed something you would rather not describe to whatever
   * is framing it; names keep working either way.
   */
  props?: boolean;
  /**
   * Whether the editor's Motion switch may reach this project's own animation
   * libraries — a Lenis, a GSAP timeline, a carousel's autoplay — by walking
   * the fiber tree for them.
   *
   * On by default. The editor already stops what it can see from outside; this
   * is the half that is only reachable from inside the bundle, and a board
   * full of pages that will not hold still is the thing it is for. See
   * motion.ts, including what it deliberately does not touch.
   *
   * Turn it off for a page where being paused is worse than being busy — a
   * player, a game, anything where the loop *is* the product — and the guest
   * agent's own half still applies, because that is not this package's to
   * switch off.
   */
  motion?: boolean;
}

const DEFAULT_ATTRIBUTE = "data-codecaine-id";

function allowed(origins: string[], origin: string): boolean {
  if (origins.length === 0) return true;
  return origins.includes(origin);
}

/**
 * Where a reply goes.
 *
 * The origin of the message being answered, so a reply reaches the host that
 * asked and nobody else. An opaque origin — a sandboxed frame, a `file://`
 * page — serialises as the string "null", which `postMessage` will not accept
 * as a target, and there the only options are `"*"` or silence. `"*"` is
 * right: the reply carries component names to a host that already has the
 * whole document.
 */
function replyTarget(origin: string): string {
  return origin && origin !== "null" ? origin : "*";
}

/**
 * Every element this document can name.
 *
 * One pass over the elements that carry an id, which is the set the editor is
 * joining against anyway. Elements the walk cannot name are left out rather
 * than sent as empty arrays — most of a page is not the root of anything.
 */
export function componentMap(doc: Document, attribute: string): ComponentMap {
  const map: ComponentMap = {};
  let count = 0;

  for (const element of Array.from(doc.querySelectorAll(`[${attribute}]`))) {
    if (count >= MAX_COMPONENT_ENTRIES) break;
    const id = element.getAttribute(attribute)?.trim();
    if (!id) continue;

    let names: string[];
    try {
      names = componentsAt(element);
    } catch {
      // React's internals are not ours, and a shape we do not recognise costs
      // this element its name and nothing else.
      continue;
    }
    if (!names.length) continue;

    map[id] = names.slice(0, MAX_COMPONENT_NAMES);
    count += 1;
  }

  return map;
}

/**
 * What a handful of named elements were handed.
 *
 * By id rather than by walking the document: this answers a selection, and an
 * id the page does not have is simply absent from the answer — an element that
 * has been removed since the editor last looked is not an error, it is the
 * usual way a stale id ends up here.
 */
/** The element an id names, escaped: the id is minted by the editor, but this
 *  is somebody else's document and it arrived over postMessage. */
function elementFor(doc: Document, attribute: string, id: string): Element | null {
  return doc.querySelector(`[${attribute}="${CSS.escape(id)}"]`);
}

export function propsFor(doc: Document, attribute: string, ids: unknown): PropsMap {
  const map: PropsMap = {};
  if (!Array.isArray(ids)) return map;

  for (const id of ids.slice(0, MAX_PROP_IDS)) {
    if (typeof id !== "string" || !id.trim()) continue;
    const element = elementFor(doc, attribute, id);
    if (!element) continue;

    let chain;
    try {
      chain = componentChainAt(element);
    } catch {
      // React's internals are not ours, and a shape we do not recognise costs
      // this element its props and nothing else.
      continue;
    }
    if (!chain.length) continue;

    // What the panel set wins over what the fiber says. The fiber reachable
    // from a DOM node is not always the one that rendered (see overrides.ts),
    // so a freshly overridden prop can still read as its old value here — and
    // a field that snaps back to the old value after you type in it is worse
    // than no field.
    map[id] = chain.slice(0, MAX_COMPONENT_NAMES).map((entry) => {
      const held = overridesFor(id, entry.component);
      if (!held?.size) return entry;
      const props = {
        ...entry.props,
        ...serializePropsOf(entry.component, Object.fromEntries(held)),
      };
      return { component: entry.component, props };
    });
  }

  return map;
}

/**
 * Render one component instance with props its parent did not pass.
 *
 * Bounded like everything else here, and every refusal is an answer rather
 * than an error: a page that cannot be written to is the ordinary case, and
 * the editor asks the handshake about that rather than finding out from a
 * rejected promise.
 */
export function setPropsFor(
  doc: Document,
  attribute: string,
  request: { id: unknown; component: unknown; props: unknown }
): SetPropsResult {
  const { id, component, props } = request;
  if (typeof id !== "string" || typeof component !== "string") {
    return { applied: false, reason: "malformed request" };
  }
  if (typeof props !== "object" || props === null) {
    return { applied: false, reason: "malformed request" };
  }

  const patch: Record<string, OverrideValue> = {};
  let count = 0;
  for (const [name, value] of Object.entries(props as Record<string, unknown>)) {
    if (count >= MAX_SET_PROPS) break;
    if (!name) continue;
    if (
      value !== null &&
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      continue;
    }
    patch[name] = value as OverrideValue;
    count += 1;
  }
  if (count === 0) return { applied: false, reason: "nothing to set" };

  const element = elementFor(doc, attribute, id);
  if (!element) return { applied: false, reason: "that element is no longer here" };

  return applyOverride(element, id, component, patch);
}

/**
 * Take the editor's design mode, and answer what the motion pass reached.
 *
 * Two things at once because they arrive together and a project cares about
 * both: the page is told it is being designed on (actions.ts, for a component
 * that wants to hold itself open), and its own animation libraries are driven
 * to match (motion.ts).
 */
export function designModeFor(
  request: { designing: boolean; motion: "hold" | "reduce" | "play"; viewport?: unknown },
  drivesMotion: boolean
): MotionResult {
  const viewport = request.viewport as { width?: unknown; height?: unknown } | undefined;
  setCanvasDesignState({
    designing: request.designing,
    motion: request.motion,
    ...(typeof viewport?.width === "number" && typeof viewport?.height === "number"
      ? { viewport: { width: viewport.width, height: viewport.height } }
      : {}),
  });

  // A project that is no longer being designed on gets everything back,
  // whatever the motion setting said — the setting describes a board this page
  // is no longer on.
  if (!drivesMotion) return { found: [], seen: [], media: false };
  const report = applyMotion(request.designing ? request.motion : "play");
  return {
    found: report.found.slice(0, MAX_MOTION_FOUND),
    seen: report.seen.slice(0, MAX_MOTION_FOUND),
    media: report.media,
  };
}

/**
 * Start answering. Returns a function that stops.
 *
 * Safe to call anywhere and more than once: on a server, in a page no editor
 * will ever frame, twice under StrictMode.
 */
export function startCanvasReact(options: CanvasDesignOptions = {}): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  // Not framed: there is no host, and a page being read by a person is not a
  // page being designed on.
  if (window.parent === window) return () => {};

  const origins = options.origin
    ? (Array.isArray(options.origin) ? options.origin : [options.origin]).filter(Boolean)
    : [];
  const attribute = options.attribute || DEFAULT_ATTRIBUTE;
  const answersProps = options.props !== false;
  const drivesMotion = options.motion !== false;

  function onMessage(event: MessageEvent): void {
    if (!isReactRequest(event.data)) return;
    if (!allowed(origins, event.origin)) return;
    const source = event.source as Window | null;
    if (!source) return;

    const { id, req } = event.data;
    let result: unknown;
    try {
      switch (req.kind) {
        case "handshake":
          result = {
            version: CANVAS_REACT_PROTOCOL,
            url: location.href,
            // Whether this page can be written to, asked once rather than
            // discovered from a write that fails: an editor should offer a
            // field only where typing in it does something.
            canSet: answersProps && canOverrideProps(),
          };
          break;
        case "set-props":
          result = answersProps
            ? setPropsFor(document, attribute, req)
            : { applied: false, reason: "this project does not answer about props" };
          break;
        case "props":
          // An empty answer, not an error: a project that has turned props off
          // is answering the question, and the editor's panel says so the same
          // way it does for a component nobody named.
          result = answersProps ? propsFor(document, attribute, req.ids) : {};
          break;
        case "design-mode":
          result = designModeFor(req, drivesMotion);
          break;
        case "actions":
          result = canvasActions();
          break;
        case "run-action":
          result = runCanvasAction(req.name, req.on);
          break;
        default:
          result = componentMap(document, attribute);
      }
    } catch (error) {
      source.postMessage(
        {
          [REACT_MSG]: CANVAS_REACT_PROTOCOL,
          dir: "response",
          id,
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        },
        replyTarget(event.origin)
      );
      return;
    }

    source.postMessage(
      { [REACT_MSG]: CANVAS_REACT_PROTOCOL, dir: "response", id, ok: true, result },
      replyTarget(event.origin)
    );
  }

  window.addEventListener("message", onMessage);

  /**
   * Tell the host when the project's own list of actions moves.
   *
   * Volunteered, because there is nothing for the editor to poll: a component
   * that registers "Open the cart" mounts when somebody's route changes, and a
   * panel of buttons that are no longer there is worse than one that is a beat
   * late. Only the revision goes out — the host asks for the list if it cares,
   * which it does not while its panel is showing something else.
   *
   * Coalesced to a microtask: a route change registers and unregisters a
   * dozen of these in one commit, and that is one change to the list.
   */
  let announcing = false;
  const unsubscribe = subscribeToCanvasActions(() => {
    if (announcing) return;
    announcing = true;
    queueMicrotask(() => {
      announcing = false;
      try {
        window.parent.postMessage(
          {
            [REACT_MSG]: CANVAS_REACT_PROTOCOL,
            dir: "event",
            event: { kind: "actions", revision: canvasActionsRevision() },
          },
          origins[0] ?? "*"
        );
      } catch {
        // A parent that cannot be posted to is one that was not listening.
      }
    });
  });

  // Announce, so an editor that has already given up asking picks this up —
  // which is what a hot update installing the SDK looks like from outside.
  // To the configured origin when there is one, so a page on a real domain
  // does not tell every frame above it what it is built from.
  try {
    window.parent.postMessage(
      {
        [REACT_MSG]: CANVAS_REACT_PROTOCOL,
        dir: "event",
        event: {
          kind: "hello",
          version: CANVAS_REACT_PROTOCOL,
          url: location.href,
          // The same answer the handshake gives. An editor that hears this
          // announcement has no reason to ask again, and one that never hears
          // it learns the same thing from the handshake it sends itself.
          canSet: answersProps && canOverrideProps(),
        },
      },
      origins[0] ?? "*"
    );
  } catch {
    // A parent that cannot be posted to is a parent that was not going to
    // drive this page.
  }

  return () => {
    window.removeEventListener("message", onMessage);
    unsubscribe();
    // A page whose editor went away is a page that runs. Anything this paused
    // is put back, and the reduced-motion answer with it — leaving a project
    // frozen because a tab closed is the kind of bug somebody debugs for an
    // hour before blaming the right thing.
    if (drivesMotion) releaseMotion();
    setCanvasDesignState({ designing: false, motion: "play" });
  };
}
