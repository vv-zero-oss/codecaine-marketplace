
import { useEffect } from "react";

const DRIFT = "lp-gallery-drift";

/**
 * Keeps the gallery's drift on one clock. The duration, curve and distance all
 * stay in CSS; this only pins each drift animation's start to the document
 * timeline's origin, so whenever the browser re-creates the animation (a style
 * re-application, a hot reload, an editor re-sync) it picks up at the phase it
 * was already at instead of snapping back to the first shot.
 */
export function GalleryClock() {
  useEffect(() => {
    const pin = (animation: Animation) => {
      if (animation instanceof CSSAnimation && animation.animationName === DRIFT && animation.startTime !== 0) {
        animation.startTime = 0;
      }
    };
    document.getAnimations().forEach(pin);

    const onStart = (event: AnimationEvent) => {
      if (event.animationName !== DRIFT || !(event.target instanceof Element)) return;
      event.target.getAnimations().forEach(pin);
    };
    document.addEventListener("animationstart", onStart);
    return () => document.removeEventListener("animationstart", onStart);
  }, []);

  return null;
}
