/**
 * A component's props, as something that can cross a `postMessage`.
 *
 * Props are not JSON. On one page they are `variant: "ghost"` and on the next
 * they are a render callback, a React element, a 5,000-row array, a class
 * instance with a getter that throws, or an object that contains itself. All
 * of those have to come back as *something* — a panel that shows nothing
 * because one prop was a function is worse than one that says `ƒ onClick` and
 * moves on.
 *
 * So every value is reduced to a kind and a line of text a person can read,
 * and scalars additionally carry their own value so the editor can type a
 * field from it rather than parse the text back. It is deliberately lossy:
 * this is a design panel, not a debugger, and the props that matter to it —
 * `variant`, `size`, `featured`, `title` — are exactly the ones that survive
 * whole.
 *
 * ## Why the caps are not about privacy
 *
 * They are about a message. One `rows={[…5000]}` prop would otherwise be
 * serialized in full, sent across a frame boundary, and held in the editor's
 * state for as long as the element is selected. The bounds below are what keep
 * an answer the size of an answer. What a project is willing to tell an editor
 * framing it is a separate decision, and it belongs to the project: see the
 * `props` option in agent.ts.
 */

import {
  MAX_PROP_ENTRIES,
  MAX_PROP_OPTIONS,
  MAX_PROP_TEXT,
  type PropValue,
} from "./protocol";

/** Props that are never worth a row of their own.
 *
 *  `children` is the exception that proves it: an element or an array of them
 *  is the component's whole subtree and says nothing a layers panel does not
 *  already show — but `children: "Sign in"` is the button's label, which is
 *  exactly what somebody looking at a button wants to see. So it is dropped by
 *  what it turns out to be rather than by its name, below. `ref` and `key` are
 *  React's plumbing in every version that puts them here. */
const SKIPPED = new Set(["ref", "key"]);

function cut(text: string): string {
  return text.length > MAX_PROP_TEXT ? `${text.slice(0, MAX_PROP_TEXT - 1)}…` : text;
}

const REACT_ELEMENT = Symbol.for("react.element");
/** React 19 mints elements under a new symbol; both are in the wild. */
const REACT_TRANSITIONAL_ELEMENT = Symbol.for("react.transitional.element");

function isElement(value: object): boolean {
  const marker = (value as { $$typeof?: unknown }).$$typeof;
  return marker === REACT_ELEMENT || marker === REACT_TRANSITIONAL_ELEMENT;
}

/** What an element renders as, for the one line it gets: the component's name
 *  where it has one, else the tag. */
function elementName(value: object): string {
  const type = (value as { type?: unknown }).type;
  if (typeof type === "string") return type;
  if (typeof type === "function") {
    const fn = type as { displayName?: unknown; name?: unknown };
    if (typeof fn.displayName === "string" && fn.displayName) return fn.displayName;
    if (typeof fn.name === "string" && fn.name) return fn.name;
  }
  if (type && typeof type === "object") {
    const wrapper = type as { displayName?: unknown };
    if (typeof wrapper.displayName === "string" && wrapper.displayName) return wrapper.displayName;
  }
  return "…";
}

/** The label for something with no useful reading of its own — a Map, a Date,
 *  somebody's class instance. Its constructor is the most honest thing
 *  available, and it is one word. */
function opaqueLabel(value: object): string {
  const name = value.constructor?.name;
  return typeof name === "string" && name && name !== "Object" ? name : "object";
}

/** A short preview of an object's shape: its first few keys, which is what
 *  tells somebody whether they are looking at the right thing. */
function shapeOf(value: Record<string, unknown>): string {
  const keys = Object.keys(value);
  if (keys.length === 0) return "{}";
  const shown = keys.slice(0, 4).join(", ");
  return keys.length > 4 ? `{${shown}, …}` : `{${shown}}`;
}

/**
 * One prop value.
 *
 * Never throws: a getter that throws, a proxy that refuses, a `toString` that
 * loops — all of them cost this one value its reading and nothing else, which
 * is the same rule the fiber walk is written to.
 */
export function serializeValue(value: unknown, seen: WeakSet<object>): PropValue {
  try {
    if (value === null) return { kind: "null", text: "null" };
    if (value === undefined) return { kind: "undefined", text: "undefined" };

    switch (typeof value) {
      case "string":
        return { kind: "string", text: cut(value), value: cut(value) };
      case "number":
        return { kind: "number", text: String(value), value };
      case "boolean":
        return { kind: "boolean", text: String(value), value };
      case "bigint":
        return { kind: "other", text: cut(`${value}n`) };
      case "symbol":
        return { kind: "other", text: cut(String(value)) };
      case "function": {
        const name = (value as { name?: unknown }).name;
        return { kind: "function", text: `ƒ ${typeof name === "string" && name ? name : "anonymous"}` };
      }
    }

    const object = value as object;
    // A prop that contains itself, or two props that are the same object: the
    // second sighting is a cycle as far as one line of text is concerned.
    if (seen.has(object)) return { kind: "other", text: "↺ circular" };
    seen.add(object);

    if (isElement(object)) return { kind: "element", text: `<${elementName(object)} />` };
    if (Array.isArray(object)) {
      return {
        kind: "array",
        text: object.length === 1 ? "[1 item]" : `[${object.length} items]`,
      };
    }
    if (Object.getPrototypeOf(object) === Object.prototype || Object.getPrototypeOf(object) === null) {
      return { kind: "object", text: cut(shapeOf(object as Record<string, unknown>)) };
    }
    return { kind: "other", text: opaqueLabel(object) };
  } catch {
    return { kind: "other", text: "unreadable" };
  }
}

/**
 * A component's props, bounded.
 *
 * Key order is React's, which is the order they were written in the JSX — so
 * the panel reads the way the call site does, and the cap takes the last few
 * rather than an arbitrary few.
 */
export function serializeProps(props: unknown): Record<string, PropValue> {
  if (typeof props !== "object" || props === null) return {};
  const seen = new WeakSet<object>();
  const out: Record<string, PropValue> = {};
  let count = 0;

  for (const key of Object.keys(props as Record<string, unknown>)) {
    if (count >= MAX_PROP_ENTRIES) break;
    if (SKIPPED.has(key)) continue;

    let value: unknown;
    try {
      value = (props as Record<string, unknown>)[key];
    } catch {
      // A getter that throws is a prop nobody can read, this side included.
      continue;
    }

    const serialized = serializeValue(value, seen);
    // `children` earns its row only when it is the component's own words. An
    // element, or a list of them, is the subtree — which the layers panel is
    // already showing, one row per element.
    if (key === "children" && serialized.kind !== "string") continue;

    out[key] = serialized;
    count += 1;
  }

  return out;
}

/**
 * The values a prop is allowed to take, where the project's types said so.
 *
 * Put in the page by `@canvas/react/vite` at dev-server start, because a
 * closed set is a fact about the source and the running page has only ever
 * seen the one value it was given. Absent for a project without the plugin,
 * which is the ordinary case and means a text field rather than a dropdown.
 */
export function optionsFor(component: string, prop: string): string[] | undefined {
  if (typeof window === "undefined") return undefined;
  const all = (window as unknown as { __canvasPropOptions?: unknown }).__canvasPropOptions;
  if (typeof all !== "object" || all === null) return undefined;

  const forComponent = (all as Record<string, unknown>)[component];
  if (typeof forComponent !== "object" || forComponent === null) return undefined;

  const values = (forComponent as Record<string, unknown>)[prop];
  if (!Array.isArray(values)) return undefined;

  const usable = values.filter((value): value is string => typeof value === "string");
  return usable.length ? usable.slice(0, MAX_PROP_OPTIONS) : undefined;
}

/**
 * A component's props, with the sets its types allow.
 *
 * Separate from `serializeProps` because the options belong to the component
 * rather than to the value: two components can both take a `variant` and mean
 * different words by it, and the props alone do not say whose they are.
 */
export function serializePropsOf(
  component: string,
  props: unknown
): Record<string, PropValue> {
  const serialized = serializeProps(props);
  for (const [name, value] of Object.entries(serialized)) {
    // A dropdown is only honest for something a dropdown can express. A
    // function that happens to share a name with an enum prop is still a
    // function.
    if (value.kind !== "string" && value.kind !== "undefined") continue;
    const options = optionsFor(component, name);
    if (options) value.options = options;
  }
  return serialized;
}
