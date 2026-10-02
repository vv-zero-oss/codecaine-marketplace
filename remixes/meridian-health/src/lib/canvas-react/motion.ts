/**
 * Stopping a page that moves, from inside its own bundle.
 *
 * ## The gap this fills
 *
 * The editor already has a motion switch, and it is the guest agent's:
 * `live/guest/reduce-motion.ts` zeroes transitions with a stylesheet, finishes
 * the finite animations and pauses the endless ones through the Web Animations
 * API. That covers CSS keyframes, CSS transitions, and everything Framer
 * Motion drives through WAAPI — which on a modern page is most of it.
 *
 * What it says it cannot reach is written down in that file, measured against
 * a real application: **a render loop on `requestAnimationFrame`**. GSAP's
 * ticker, Lenis, anime.js, a Three.js loop, a carousel's autoplay timer. The
 * reason is not that nobody thought of it — it is that the guest has nothing
 * to reach *with*:
 *
 *     window.gsap / anime / lenis / THREE / Motion    none present
 *
 * A bundled library is a module. `gsap.globalTimeline.pause()` and
 * `lenis.stop()` are real switches attached to nothing a script appended to
 * the document can see, so the guest's only generic handle would be patching
 * `requestAnimationFrame` itself — a frame React's scheduler, every
 * ResizeObserver polyfill and the guest's own work all ride, which is why that
 * was correctly refused.
 *
 * This package is a module in the same graph. It still cannot import gsap —
 * a package that is not installed is a build error, and this one has no
 * dependencies — but it does not have to: **the instances are in the fiber
 * tree**. A `useRef` holding a Lenis, a `useState` holding Embla's API, a
 * class component holding a player. So the crawl below walks React's tree for
 * objects that quack like an animation library and drives them through their
 * own public methods.
 *
 * Measured on the standard target (`scripts/real-template.sh` — Next 15,
 * React 19, 900 elements, nothing on `window`): 2,936 fibers walked, one
 * instance recognised — Embla's carousel API, off a hook — and **nothing
 * driven**, because that carousel has no autoplay plugin and so never moves by
 * itself. `e2e/live-sdk-motion.mjs` re-takes that measurement.
 *
 * That is the honest size of it on that page, and it is worth writing down
 * rather than implying more: what this is for is a page with GSAP or a scroll
 * smoother in it, which is a great deal of marketing work and is not what the
 * template is.
 *
 * ## What it reaches is what the project holds
 *
 * That is the limit, and it is worth stating plainly because it is not
 * obvious. An instance nothing keeps is not in the tree: `useEffect(() => {
 * gsap.to(el, { repeat: -1 }) })` leaves a tween in a closure and nothing
 * anywhere that leads to it, and this crawl finds exactly nothing. That is not
 * a bug here — it was measured, in `scaffold-sdk`, whose first draft did
 * precisely that — and no amount of looking fixes it.
 *
 * What makes it a narrow limit rather than a fatal one is that something has
 * to survive a re-render and be torn down on unmount, so real integrations
 * hold their instance anyway: `react-lenis` for `useLenis` to read,
 * `@gsap/react`'s `useGSAP` for the context it reverts, Embla, Lottie and R3F
 * for the API they hand back. A ref is where these live.
 *
 * Where it does not reach, it says so. `seenLibraries` reads the marks GSAP
 * and Lenis leave on the DOM — presence, never a handle — and those go back as
 * `seen`, so the editor's ⓘ can name a library it could not stop instead of
 * showing a switch that quietly did nothing.
 *
 * ## The rules it keeps are the guest's rules
 *
 * Not a second opinion about motion, the same opinion applied to what the
 * guest cannot see. So:
 *
 *  - **Stop** halts what never ends and leaves what finishes alone. An
 *    entrance animation frozen half way is a page of half-faded elements,
 *    which is a worse thing to design against than either end of it.
 *  - **Reduced** is a superset: the endless ones stopped, the finite ones put
 *    where they were going, and the reduced-motion media query answered yes
 *    (see reduced-media.ts, which is the other thing the guest says it cannot
 *    do).
 *  - **Playing** releases exactly what was held, and nothing else. Resuming
 *    everything a page *has* would start animations that had already finished
 *    — on a page whose entrances are over, that replays the whole arrival.
 *
 * ## Nothing is patched and nothing is guessed
 *
 * Every driver below calls a method the library documents. Nothing here wraps
 * `requestAnimationFrame`, replaces a prototype, or writes into an instance;
 * an object whose shape is not recognised is left alone, and a method that
 * throws costs that one instance. The worst outcome of a library changing
 * underneath this is a page that moves the way it did before this file
 * existed.
 */

import { fiberRoots } from "./fiber";
import type { Fiber, HookNode } from "./react-internals";
import { setReducedMedia } from "./reduced-media";

export type MotionMode = "hold" | "reduce" | "play";

/** One library the crawl found and drove, and how many instances of it. */
export interface MotionFound {
  library: string;
  count: number;
}

export interface MotionReport {
  /** What was driven, so the editor can say which page it is looking at
   *  rather than claiming the switch reached everything. */
  found: MotionFound[];
  /** Libraries this page is plainly using that nothing here could drive,
   *  because the project is not holding an instance of them anywhere the crawl
   *  can see — see `seenLibraries`. Reported so that the editor's Motion ⓘ can
   *  say "GSAP is driving this page and could not be stopped from here", which
   *  is a much better thing for somebody to read than a switch that quietly
   *  did nothing. */
  seen: string[];
  /** Whether the reduced-motion media query is being answered yes. False on
   *  an engine that would not take the getter — see reduced-media.ts. */
  media: boolean;
  /** Fibers the crawl looked at. Diagnostics: a page that answers `0` has no
   *  React the SDK can see, which is a different problem from one with no
   *  motion in it. */
  visited: number;
  /**
   * Objects a driver recognised, whether or not there turned out to be
   * anything to do with them.
   *
   * Not the same number as `found`, and the difference is the interesting one:
   * the standard target holds an Embla carousel this knows exactly how to
   * stop, and stops nothing, because that carousel has no autoplay plugin and
   * therefore never moves on its own. `recognised: 1, found: []` is the honest
   * reading of that page, and `found: []` on its own reads as "this crawl
   * knows nothing about this application", which is not true.
   *
   * Diagnostics only — it never goes over the wire, because "I recognised
   * something and left it alone" is not a sentence a panel should show
   * somebody.
   */
  recognised: number;
}

/**
 * What one library can be asked to do.
 *
 * `match` is duck typing and has to stay that way: `instanceof Lenis` needs
 * the class, which needs the import this file cannot have. So each driver
 * names a shape precise enough that nothing else in a page wears it — which
 * is why the checks below are longer than they look like they need to be. A
 * pair of `play`/`pause` methods describes half the objects on a page; a
 * `play`, a `pause`, a `totalProgress` and a `timeScale` together describe a
 * GSAP timeline and nothing else.
 */
interface Driver {
  library: string;
  match(value: Record<string, unknown>): boolean;
  /**
   * Drive it. `wasHeld` is whether a previous pass stopped this exact object,
   * which is what makes Playing release rather than start: a Lenis the page
   * itself had stopped is not one to call `start()` on.
   *
   * Returns false when there turned out to be nothing to do, so an object is
   * not reported as held when it was not — an Embla with no autoplay plugin is
   * a carousel that does not move by itself.
   */
  apply(value: Record<string, unknown>, mode: MotionMode, wasHeld: boolean): boolean;
}

const fn = (value: Record<string, unknown>, key: string): boolean =>
  typeof value[key] === "function";

const call = <T>(value: Record<string, unknown>, key: string, ...args: unknown[]): T | undefined => {
  const method = value[key];
  if (typeof method !== "function") return undefined;
  try {
    return (method as (...rest: unknown[]) => T).call(value, ...args);
  } catch {
    // Somebody else's object, in a state we did not ask about. One instance,
    // not the switch.
    return undefined;
  }
};

/**
 * GSAP, reached through any tween on the page.
 *
 * Every tween and timeline has a `parent`, and the chain ends at the global
 * timeline — so one `gsap.to()` anywhere in the tree is a handle on all of
 * GSAP, without the import. Which is the whole trick, and why this driver
 * matches a tween rather than looking for the library.
 *
 * Per animation rather than on the global timeline, because pausing the root
 * would freeze the finite ones half way. `repeat() === -1` is GSAP's own way
 * of saying forever, and it is the same distinction the guest draws with
 * `iterations === Infinity`.
 */
const gsapDriver: Driver = {
  library: "gsap",
  match: (value) =>
    fn(value, "pause") &&
    fn(value, "play") &&
    fn(value, "progress") &&
    fn(value, "totalProgress") &&
    fn(value, "timeScale"),
  apply(value, mode) {
    // GSAP alone ignores `wasHeld`: what it drives is not the object that
    // matched but the animations under the global timeline that one tween
    // leads to, so what was held is tracked per animation below.
    let root = value;
    for (let step = 0; step < 16; step += 1) {
      const parent = root.parent as Record<string, unknown> | undefined;
      if (!parent || typeof parent !== "object") break;
      root = parent;
    }
    const children = call<unknown[]>(root, "getChildren", true, true, true) ?? [root];
    let touched = false;
    for (const child of children) {
      if (!child || typeof child !== "object") continue;
      const animation = child as Record<string, unknown>;

      if (mode === "play") {
        // Exactly what was held. Playing every child would start the entrance
        // animations this finished on the way into Reduced.
        if (held.has(animation)) {
          call(animation, "play");
          held.delete(animation);
          touched = true;
        }
        continue;
      }

      const endless = call<number>(animation, "repeat") === -1;
      if (endless) {
        call(animation, "pause");
      } else if (mode === "reduce") {
        // Where it was going, not where it is. The same call the guest's
        // `finish()` makes, in GSAP's vocabulary.
        call(animation, "progress", 1);
      } else {
        continue;
      }
      held.set(animation, gsapDriver);
      touched = true;
    }
    return touched;
  },
};

/**
 * Lenis, and the smooth-scroll libraries shaped like it.
 *
 * A permanent `requestAnimationFrame` loop that also takes the wheel away from
 * whatever is above it — so it is both a page that never settles and a page
 * the editor cannot scroll. Stopped under Stop as well as Reduced: a loop that
 * runs forever is exactly what Stop is for.
 */
const lenisDriver: Driver = {
  library: "lenis",
  match: (value) =>
    fn(value, "stop") && fn(value, "start") && fn(value, "raf") && fn(value, "scrollTo"),
  apply(value, mode, wasHeld) {
    if (mode === "play") {
      if (!wasHeld) return false;
      call(value, "start");
      return true;
    }
    call(value, "stop");
    return true;
  },
};

/**
 * Lottie, through the player object `lottie-web` and `lottie-react` both hand
 * back.
 *
 * A looping Lottie is a marquee that happens to be vector art. A one-shot one
 * is an entrance, so it is finished rather than frozen under Reduced, the same
 * way everything else here is.
 */
const lottieDriver: Driver = {
  library: "lottie",
  match: (value) =>
    fn(value, "goToAndStop") && fn(value, "play") && fn(value, "pause") && "totalFrames" in value,
  apply(value, mode, wasHeld) {
    if (mode === "play") {
      if (!wasHeld) return false;
      call(value, "play");
      return true;
    }
    const loops = value.loop === true || typeof value.loop === "number";
    if (mode === "reduce" && !loops) {
      const frames = typeof value.totalFrames === "number" ? value.totalFrames : 0;
      call(value, "goToAndStop", Math.max(frames - 1, 0), true);
      return true;
    }
    if (!loops) return false;
    call(value, "pause");
    return true;
  },
};

/**
 * anime.js v3, whose instance is the thing a page keeps in a ref.
 *
 * `animatables` and `began` together are the shape: a pair of play/pause
 * methods is not.
 */
const animeDriver: Driver = {
  library: "anime",
  match: (value) =>
    fn(value, "pause") && fn(value, "play") && "animatables" in value && "began" in value,
  apply(value, mode, wasHeld) {
    const endless = value.loop === true;
    if (mode === "play") {
      if (!wasHeld) return false;
      call(value, "play");
      return true;
    }
    if (mode === "reduce") {
      call(value, "pause");
      if (!endless) call(value, "seek", value.duration);
      return true;
    }
    if (!endless) return false;
    call(value, "pause");
    return true;
  },
};

/**
 * Embla's carousel API — the one instance the crawl actually finds on the
 * standard target.
 *
 * The carousel itself does not move on its own; its autoplay plugin does, and
 * a plugin that is not installed means there is nothing here to stop. So this
 * reports false in that case rather than counting a carousel as held.
 */
const emblaDriver: Driver = {
  library: "embla-carousel",
  match: (value) => fn(value, "plugins") && fn(value, "scrollNext") && fn(value, "reInit"),
  apply(value, mode, wasHeld) {
    if (mode === "play" && !wasHeld) return false;
    const plugins = call<Record<string, unknown>>(value, "plugins") ?? {};
    let touched = false;
    for (const name of ["autoplay", "autoScroll"]) {
      const plugin = plugins[name] as Record<string, unknown> | undefined;
      if (!plugin || typeof plugin !== "object") continue;
      if (mode === "play") call(plugin, "play");
      else call(plugin, "stop");
      touched = true;
    }
    return touched;
  },
};

/**
 * React Three Fiber's store, which owns the render loop for a `<Canvas>`.
 *
 * This is the one place a WebGL canvas can be stilled honestly. The editor's
 * ⓘ says a canvas on its own render loop keeps running, and for a page driving
 * Three.js by hand that stays true — `WebGLRenderer.setAnimationLoop(null)`
 * stops a loop that cannot then be started again, because the callback it was
 * given is not kept anywhere this can read. R3F is different: `frameloop` is
 * its own public setting, `"demand"` is a state it is built to be in, and
 * going back to `"always"` restores exactly what was there.
 */
const r3fDriver: Driver = {
  library: "react-three-fiber",
  match(value) {
    if (!fn(value, "getState") || !fn(value, "setState") || !fn(value, "subscribe")) return false;
    const state = call<Record<string, unknown>>(value, "getState");
    return !!state && typeof state === "object" && "frameloop" in state && fn(state, "invalidate");
  },
  apply(value, mode, wasHeld) {
    if (mode === "play" && !wasHeld) return false;
    const state = call<Record<string, unknown>>(value, "getState");
    if (!state) return false;
    // `demand` rather than `never`: the page still paints when something asks
    // it to, which is what keeps the canvas showing a frame instead of going
    // blank behind the editor.
    const next = mode === "play" ? "always" : "demand";
    if (fn(state, "setFrameloop")) call(state, "setFrameloop", next);
    else call(value, "setState", { frameloop: next });
    if (mode !== "play") call(state, "invalidate");
    return true;
  },
};

const DRIVERS: Driver[] = [
  gsapDriver,
  lenisDriver,
  lottieDriver,
  animeDriver,
  emblaDriver,
  r3fDriver,
];

/**
 * What has been driven, and by whom.
 *
 * The set is what makes Playing mean "release what was held" rather than
 * "start everything". Weak, because a single-page app throws a whole screen
 * away and the instances on it go with it — the same reason the guest holds
 * its paused animations weakly.
 */
const held = new WeakMap<object, Driver>();

/** How many fibers one crawl may visit. Past this a page is not one this can
 *  usefully survey, and the bound is what keeps a malformed tree from spinning
 *  inside somebody's application. */
const MAX_FIBERS = 40000;

/** How far down a hook chain to read. A component with more hooks than this
 *  has them, and the instance is not going to be the fortieth. */
const MAX_HOOKS = 64;

/**
 * Things on `window` worth looking at first.
 *
 * For the CDN builds, which are the ones that do put something there — and
 * which are exactly the pages the measurement at the top of this file found
 * nothing on, because a bundled library plants no global. Cheap enough to be
 * worth keeping for the pages that are not bundled.
 */
function globals(): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  if (typeof window === "undefined") return out;
  const bag = window as unknown as Record<string, unknown>;
  for (const name of ["gsap", "lenis", "anime", "lottie", "bodymovin"]) {
    const value = bag[name];
    if (value && typeof value === "object") out.push(value as Record<string, unknown>);
    // GSAP's global is a function-shaped namespace; its timeline is the handle.
    if (name === "gsap" && typeof value === "function") {
      const timeline = (value as unknown as Record<string, unknown>).globalTimeline;
      if (timeline && typeof timeline === "object") out.push(timeline as Record<string, unknown>);
    }
  }
  return out;
}

/**
 * Libraries a page is obviously using, from the marks they leave on the DOM.
 *
 * Presence, not a handle. GSAP stamps `_gsap` on every element it has ever
 * touched and Lenis puts its class on `<html>`, so both are trivially visible
 * — and neither mark leads anywhere. `_gsap` is a property cache whose
 * `harness.core` is the CSS plugin's two helpers, not the library; the Lenis
 * class is a class.
 *
 * So this is for saying so. A `gsap.to()` fired inside an effect and forgotten
 * is genuinely unreachable — the tween is in a closure and the page holds
 * nothing that leads to it — and the honest answer to that is a sentence in
 * the editor's ⓘ, not a switch that appears to work.
 *
 * Only what was not already driven: a project that keeps its tween in a ref
 * has its GSAP stopped, and naming it in both lists would read as a
 * contradiction.
 */
function seenLibraries(doc: Document, driven: Set<string>): string[] {
  const seen: string[] = [];

  if (!driven.has("gsap") && doc.querySelector("*")) {
    // Bounded: one pass over a slice of the document is enough to answer
    // "is GSAP touching this page", and GSAP touches something early or not
    // at all.
    const elements = doc.querySelectorAll("body *");
    const limit = Math.min(elements.length, 2000);
    for (let i = 0; i < limit; i += 1) {
      if ("_gsap" in elements[i]) {
        seen.push("gsap");
        break;
      }
    }
  }

  if (!driven.has("lenis") && doc.documentElement?.classList.contains("lenis")) {
    seen.push("lenis");
  }

  return seen;
}

/** Whether a value is worth handing to the drivers at all: an object, not a
 *  DOM node, not a React element. Cheap, because it runs on every hook of
 *  every component. */
function candidate(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  if (value instanceof Node) return false;
  if (Array.isArray(value)) return false;
  if ((value as { $$typeof?: unknown }).$$typeof !== undefined) return false;
  return true;
}

/**
 * Every object in the tree that a driver recognises, driven.
 *
 * One pass, so a page with a thousand tweens is one crawl rather than one per
 * library, and the first driver that claims an object keeps it — the matches
 * are disjoint by construction, and a tie would mean two of them are wrong
 * about what they are looking at.
 */
export function applyMotion(mode: MotionMode, doc: Document = document): MotionReport {
  const counts = new Map<string, number>();
  const seen = new Set<object>();
  let visited = 0;
  let recognised = 0;

  const drive = (value: unknown): void => {
    if (!candidate(value) || seen.has(value)) return;
    seen.add(value);
    for (const driver of DRIVERS) {
      let matched: boolean;
      try {
        matched = driver.match(value);
      } catch {
        // A getter that throws on somebody's instance. Not this object's
        // library, as far as anyone here can tell.
        continue;
      }
      if (!matched) continue;
      recognised += 1;
      let acted: boolean;
      try {
        acted = driver.apply(value, mode, held.get(value) === driver);
      } catch {
        // An instance in a state its own library did not expect. One object,
        // not the switch.
        return;
      }
      if (acted) {
        if (mode === "play") held.delete(value);
        else held.set(value, driver);
        counts.set(driver.library, (counts.get(driver.library) ?? 0) + 1);
      }
      return;
    }
  };

  for (const value of globals()) drive(value);

  const walk = (fiber: Fiber | null | undefined): void => {
    while (fiber && visited < MAX_FIBERS) {
      visited += 1;

      // A hook's state is where a project keeps the instance it made: a
      // `useRef` holding a Lenis, a `useState` holding Embla's API.
      let hook = fiber.memoizedState as HookNode | null | undefined;
      for (let step = 0; step < MAX_HOOKS && hook && typeof hook === "object"; step += 1) {
        const state = hook.memoizedState;
        drive(state);
        // A ref is one object deep, and refs are where most of these live.
        if (state && typeof state === "object" && "current" in state) {
          drive((state as { current: unknown }).current);
        }
        hook = hook.next;
      }

      // A class component's instance. Host fibers keep their DOM node here,
      // which `candidate` drops.
      drive(fiber.stateNode);

      walk(fiber.child);
      fiber = fiber.sibling;
    }
  };

  for (const root of fiberRoots(doc)) walk(root);

  // Only under Reduced. Stop is about a page that will not hold still; Reduced
  // is the one that means "settle", and answering a media query is a much
  // broader thing to do to somebody's application than pausing a timeline.
  const media = setReducedMedia(mode === "reduce");

  const found = [...counts.entries()]
    .map(([library, count]) => ({ library, count }))
    .sort((a, b) => b.count - a.count || a.library.localeCompare(b.library));

  return {
    found,
    seen: seenLibraries(doc, new Set(counts.keys())),
    media,
    visited,
    recognised,
  };
}

/** Put everything back. What the agent calls when it stops listening, so a
 *  page whose editor closed is not left holding a paused timeline. */
export function releaseMotion(doc: Document = document): void {
  applyMotion("play", doc);
}
