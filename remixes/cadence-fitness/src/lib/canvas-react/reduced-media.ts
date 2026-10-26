/**
 * `prefers-reduced-motion`, answered yes — the one lever the editor's guest
 * agent says it cannot pull, pulled from inside the page.
 *
 * ## Why the guest cannot do this, and this can
 *
 * `live/guest/reduce-motion.ts` writes the reason down: patching
 * `window.matchMedia` was in an early draft of the guest and came out, because
 * a page reads the query once at init and holds the `MediaQueryList` it got
 * back. Replacing the factory afterwards hands out a new object nobody is
 * listening to — it changes nothing, while still leaving a page global
 * rewritten under somebody else's application. That is a correct reading of
 * the guest's position: it is injected into a document that has already
 * booted.
 *
 * What it misses is that the object is not where the answer lives. `matches`
 * is an accessor on `MediaQueryList.prototype`, so redefining it there reaches
 * every list the page is already holding, including ones handed out before
 * this ran. And `addEventListener` is on the prototype too, so wrapping it
 * collects the lists somebody is actually subscribed to — which is what a
 * `change` event has to be dispatched on for a `useReducedMotion()` to
 * re-render.
 *
 * That is the whole mechanism: one getter, one wrapper, and a dispatch. It is
 * not novel and it is not clever; it is available here and not in the guest
 * because this is a module in the project's own bundle rather than a script
 * appended to a document.
 *
 * ## What it reaches, and what it does not
 *
 * It reaches the JavaScript half of the query: `useReducedMotion()` in Framer
 * Motion, `gsap.matchMedia()`, Embla's and Radix's reduced-motion checks, and
 * every component someone wrote a `matchMedia` call in themselves.
 *
 * It does not reach a subscription that was already made when the editor
 * asked. `MediaQueryList` has no registry, so the lists a page is holding
 * cannot be enumerated and cannot be told — a `useReducedMotion()` that
 * subscribed at mount keeps the answer it had until it renders again or the
 * component remounts, which a route change or a hot update does. Everything
 * that reads the query at the moment it needs it, and everything mounted after
 * the switch, gets the new answer immediately.
 *
 * It does not reach the CSS half — `@media (prefers-reduced-motion)` and
 * Tailwind's `motion-reduce:` — because a stylesheet is evaluated by the
 * engine and there is no page-level API for lying to it. Only real media
 * emulation over CDP can do that, which the desktop shell could and the
 * browser build cannot. The guest's own stylesheet covers the part of that
 * which matters most (transitions), so the two halves land in different
 * places on purpose.
 *
 * ## It is off until an editor asks, and it goes away
 *
 * Nothing is patched at import. `setReducedMedia(true)` installs, and `false`
 * puts the original descriptor and the original `addEventListener` back — so a
 * page whose editor switched Motion back to Playing is a page with an
 * unmodified `MediaQueryList` again, not one carrying a wrapper for the rest
 * of its life.
 */

/** The one query this answers for. Matched loosely because a page may write it
 *  with any spacing, and with either polarity — `no-preference` is the same
 *  question asked backwards and has to be answered backwards. */
const REDUCE = /prefers-reduced-motion\s*:\s*reduce/i;
const NO_PREFERENCE = /prefers-reduced-motion\s*:\s*no-preference/i;
/** `(prefers-reduced-motion)` on its own is true whenever the preference is
 *  anything but `no-preference`, which under this is always. */
const BARE = /prefers-reduced-motion\s*\)/i;

/** Which way this list should be answered, or null to leave it alone. A list
 *  about viewport width is not this module's business and must read exactly
 *  what the browser says. */
function answerFor(media: string): boolean | null {
  if (REDUCE.test(media)) return true;
  if (NO_PREFERENCE.test(media)) return false;
  if (BARE.test(media)) return true;
  return null;
}

let installed = false;
let realMatches: PropertyDescriptor | undefined;
let realAdd: typeof MediaQueryList.prototype.addEventListener | undefined;
let realAddListener: MediaQueryList["addListener"] | undefined;
let realMatchMedia: typeof window.matchMedia | undefined;

/** Every list somebody is subscribed to, weakly: a `change` has to be
 *  dispatched on the object the listener was added to, and a page that threw a
 *  screen away must not be kept alive by this. */
const subscribed = new Set<WeakRef<MediaQueryList>>();

function remember(list: MediaQueryList): void {
  if (answerFor(list.media) === null) return;
  for (const ref of subscribed) {
    const held = ref.deref();
    if (!held) subscribed.delete(ref);
    else if (held === list) return;
  }
  subscribed.add(new WeakRef(list));
}

/**
 * Tell everyone who is listening that the answer changed.
 *
 * Only the lists this collected, which are the ones somebody subscribed to
 * after this was installed. A component that read `matches` once during a
 * render and never subscribed gets the new answer the next time it renders for
 * any other reason — there is nothing to notify, and pretending otherwise
 * would mean holding a reference to every list the page ever made.
 */
function announce(): void {
  for (const ref of subscribed) {
    const list = ref.deref();
    if (!list) {
      subscribed.delete(ref);
      continue;
    }
    try {
      const event =
        typeof MediaQueryListEvent === "function"
          ? new MediaQueryListEvent("change", { media: list.media, matches: list.matches })
          : new Event("change");
      list.dispatchEvent(event);
    } catch {
      // A list whose document is gone, or an engine that will not let one be
      // constructed. Nothing to tell.
    }
  }
}

export function reducedMediaInstalled(): boolean {
  return installed;
}

/**
 * Answer the reduced-motion query yes, or stop.
 *
 * Idempotent, so the editor can send it on every handshake and every settle
 * the way it does the rest of design mode.
 */
export function setReducedMedia(on: boolean): boolean {
  if (typeof window === "undefined" || typeof MediaQueryList === "undefined") return false;
  if (on === installed) return installed;

  if (!on) {
    if (realMatches) Object.defineProperty(MediaQueryList.prototype, "matches", realMatches);
    if (realAdd) MediaQueryList.prototype.addEventListener = realAdd;
    if (realAddListener) MediaQueryList.prototype.addListener = realAddListener;
    if (realMatchMedia) window.matchMedia = realMatchMedia;
    installed = false;
    // After the restore, so what a listener reads is the browser's answer
    // again rather than the one this was giving.
    announce();
    subscribed.clear();
    return false;
  }

  const descriptor = Object.getOwnPropertyDescriptor(MediaQueryList.prototype, "matches");
  // No accessor to stand in front of — an engine that keeps `matches` on the
  // instance, or a jsdom that does not implement it. Nothing here is worth
  // guessing at, and the page is no worse off than before.
  if (!descriptor?.get) return false;

  realMatches = descriptor;
  realAdd = MediaQueryList.prototype.addEventListener;
  realAddListener = MediaQueryList.prototype.addListener;
  const read = descriptor.get;

  Object.defineProperty(MediaQueryList.prototype, "matches", {
    configurable: true,
    enumerable: descriptor.enumerable ?? false,
    get(this: MediaQueryList): boolean {
      const answer = answerFor(this.media);
      if (answer !== null) return answer;
      return read.call(this) as boolean;
    },
  });

  // Collected on subscription rather than on creation, because that is the set
  // that can be told. Wrapping `matchMedia` instead would collect every list a
  // page ever made and still miss the ones it made before this ran.
  MediaQueryList.prototype.addEventListener = function (
    this: MediaQueryList,
    ...args: Parameters<typeof MediaQueryList.prototype.addEventListener>
  ) {
    if (args[0] === "change") remember(this);
    return realAdd!.apply(this, args);
  } as typeof MediaQueryList.prototype.addEventListener;

  // Safari's older form, still what a few libraries call.
  if (typeof realAddListener === "function") {
    MediaQueryList.prototype.addListener = function (
      this: MediaQueryList,
      ...args: Parameters<MediaQueryList["addListener"]>
    ) {
      remember(this);
      return realAddListener!.apply(this, args);
    } as MediaQueryList["addListener"];
  }

  // And collect the lists made from here on, which is what a route change or
  // a remount produces while somebody is designing. Transparent: the real list
  // is what the caller gets back.
  realMatchMedia = window.matchMedia;
  if (typeof realMatchMedia === "function") {
    const make = realMatchMedia.bind(window);
    window.matchMedia = (query: string): MediaQueryList => {
      const list = make(query);
      remember(list);
      return list;
    };
  }

  installed = true;
  // Nothing is listening through the wrapper yet — every subscription that
  // exists at this moment was made through the real `addEventListener`, and
  // there is no way to enumerate those. They read the new answer the next time
  // they render or re-subscribe; see the note at the top about what this does
  // not reach.
  announce();
  return true;
}
