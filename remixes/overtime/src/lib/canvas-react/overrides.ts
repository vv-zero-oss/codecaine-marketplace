/**
 * Writing a prop back into a running component.
 *
 * ## What this is, and what it is not
 *
 * It is what makes a design panel a panel rather than a readout: set `variant`
 * to `"primary"` and the button in front of you turns indigo, immediately, in
 * the real application. It is React re-rendering that component with a value
 * its parent never passed.
 *
 * It is not a change to anybody's source. The value lives at a call site in a
 * file on disk and nothing here can reach that, so an override lasts until the
 * component's parent renders it again with the props it actually wrote — and a
 * reload takes every one of them. The panel says so, and this file is why it
 * has to.
 *
 * ## Why the overrides are held here
 *
 * React's own `overrideProps` builds the next props from `fiber.memoizedProps`
 * on every call, so two calls do not compose: the second silently drops the
 * first. And the fiber reachable from a DOM node is not always the one that
 * just rendered — React keeps two per component and works on whichever is not
 * current — so `memoizedProps` may not even describe what is on screen.
 *
 * Holding the set here sidesteps both. Whatever React last rendered with, this
 * merges every override for that component on top of it, writes the result to
 * both fibers and asks for one render: what React's own function does, minus
 * the part that does not compose.
 */

import { componentFiberAt } from "./fiber";
import { writableRenderer } from "./hook";
import { serializePropsOf } from "./props";
import type { PropValue } from "./protocol";

/** What a panel may send: the scalars, and `null` to mean "no value". Anything
 *  else would have to be constructed inside somebody else's page, which is not
 *  a thing this protocol does. */
export type OverrideValue = string | number | boolean | null;

/** One instance, named by the element and the component whose output begins
 *  there. Two cards from the same component are two entries, because a design
 *  tool edits the card in front of you rather than every card. */
const overrides = new Map<string, Map<string, OverrideValue>>();

const keyFor = (elementId: string, component: string) => `${elementId} ${component}`;

/** What has been overridden for one instance, so a `props` answer reports what
 *  the panel set rather than what a stale fiber still says. */
export function overridesFor(
  elementId: string,
  component: string
): Map<string, OverrideValue> | undefined {
  return overrides.get(keyFor(elementId, component));
}

/** For tests, and for a page that navigated: an override describes a fiber
 *  that no longer exists. */
export function clearOverrides(): void {
  overrides.clear();
}

export interface OverrideResult {
  applied: boolean;
  /** Why not — for a panel to show, rather than to guess at. */
  reason?: string;
  /** What the component renders with now, so the panel fills itself in without
   *  a second round trip. */
  props?: Record<string, PropValue>;
}

/**
 * Set some props on one component instance, and render it.
 *
 * The props it answers with are the merge this asked React for, not a re-read
 * of the fiber: the fiber written to may not be the one that renders, and the
 * panel should show what was asked for either way.
 */
export function applyOverride(
  element: Element,
  elementId: string,
  component: string,
  patch: Record<string, OverrideValue>
): OverrideResult {
  const renderer = writableRenderer();
  if (!renderer) return { applied: false, reason: "this page cannot be written to" };

  const fiber = componentFiberAt(element, component);
  if (!fiber) return { applied: false, reason: `nothing here renders ${component}` };

  const key = keyFor(elementId, component);
  const held = overrides.get(key) ?? new Map<string, OverrideValue>();
  for (const [name, value] of Object.entries(patch)) held.set(name, value);
  overrides.set(key, held);

  const base = (fiber.memoizedProps ?? {}) as Record<string, unknown>;
  const merged: Record<string, unknown> = { ...base };
  for (const [name, value] of held) merged[name] = value;

  try {
    fiber.pendingProps = merged;
    if (fiber.alternate) fiber.alternate.pendingProps = merged;
    if (typeof renderer.scheduleUpdate === "function") {
      renderer.scheduleUpdate(fiber);
    } else if (typeof renderer.overrideProps === "function") {
      // An older renderer: one path per call, and only the last of them
      // composes. Better than refusing, and the merge above still holds the
      // rest for the next write.
      for (const [name, value] of Object.entries(patch)) {
        renderer.overrideProps(fiber, [name], value);
      }
    } else {
      return { applied: false, reason: "this page cannot be written to" };
    }
  } catch (error) {
    return {
      applied: false,
      reason: error instanceof Error ? error.message : "React refused the change",
    };
  }

  return { applied: true, props: serializePropsOf(component, merged) };
}
