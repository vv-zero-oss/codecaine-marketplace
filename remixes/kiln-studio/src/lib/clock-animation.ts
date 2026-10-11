/**
 * A clock the canvas editor can stop.
 *
 * The wall's drift and the intro are drawn by hand on `requestAnimationFrame`,
 * which nothing outside the bundle can pause. So their time is read off a Web
 * Animation instead: an invisible, do-nothing animation on a real element,
 * whose `currentTime` is the clock. The editor's Motion switch pauses endless
 * Web Animations and finishes finite ones — and when it does, this clock
 * stops (or jumps to the end) and the drawing follows.
 */
export function createClock(element: Element, duration = Infinity) {
  const animation = element.animate([{ opacity: 1 }, { opacity: 1 }], {
    duration: Number.isFinite(duration) ? duration : 1000,
    iterations: Number.isFinite(duration) ? 1 : Infinity,
    fill: "forwards",
  })
  return {
    animation,
    /** Milliseconds elapsed on the clock. */
    now() {
      const t = animation.currentTime
      return typeof t === "number" ? t : Number(t ?? 0)
    },
    get finished() {
      return animation.playState === "finished"
    },
    get paused() {
      return animation.playState === "paused"
    },
    cancel() {
      animation.cancel()
    },
  }
}
