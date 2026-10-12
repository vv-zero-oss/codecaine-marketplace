/**
 * The two kinds of motion an editor cannot stop from outside the page.
 *
 * Everything else in this project moves the way most pages move: CSS
 * transitions and CSS keyframes, which the editor's guest agent reaches with a
 * stylesheet and the Web Animations API. These two are the other kind — a
 * `requestAnimationFrame` loop owned by a bundled module — and they are here
 * because a project that only moved the first way could not tell whether the
 * SDK's motion channel works at all.
 *
 * GSAP and Lenis specifically because they are what is actually on the pages
 * this editor gets pointed at, and because neither plants anything on
 * `window` when bundled. Measured inside the standard target
 * (`scripts/real-template.sh`): `window.gsap`, `window.lenis`, `window.anime`
 * and `window.THREE` are all absent, `document.getAnimations()` is empty, and
 * the page still moves. That is the gap, and this is the smallest honest
 * reproduction of it.
 *
 * ## Both are kept in refs, and that is not an accident of the fixture
 *
 * The SDK finds these by walking React's fiber tree for the objects a project
 * is holding, so an instance the project does not hold is one nothing can
 * reach. That sounds like a loophole and it is a real limit: the first draft
 * of this file created the tween and the Lenis inside their effects and threw
 * both away, and the crawl found neither — correctly, because after the effect
 * returned there was nothing in the tree but a closure.
 *
 * A ref is where a real integration puts them anyway. `react-lenis` holds its
 * instance for `useLenis` to read; `@gsap/react`'s `useGSAP` holds a
 * `gsap.context` so it can revert it; Embla, Lottie and R3F all hand back an
 * API object a component keeps. Something has to survive a re-render and be
 * torn down on unmount, and in React that is a ref.
 *
 * What is *not* reachable is a `gsap.to()` fired inside an effect and
 * forgotten, and nothing in a page makes it so. The SDK says as much rather
 * than silently doing nothing — it reports GSAP as seen-and-not-driven from
 * the mark GSAP leaves on every element it touches, and the editor's Motion ⓘ
 * passes that on. See sdk/src/motion.ts.
 *
 * **This is a fixture, and it is one on purpose.** It was written to exhibit
 * the thing the SDK's motion channel changes, so a measurement against it says
 * nothing about a real application — see the repository's CLAUDE.md. What it
 * proves is that the channel drives a real GSAP tween and a real Lenis rather
 * than a shape a test made up; whether a given real page holds either is a
 * separate question, and `e2e/live-sdk-motion.mjs` asks it of the template.
 */

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Lenis from "lenis"

/**
 * A drift GSAP drives, rather than CSS.
 *
 * `repeat: -1` is the thing: an animation that never ends, so the board never
 * settles and every frame of it is a mutation the editor answers with a
 * snapshot. The CSS version of this is what a marquee usually is, and the
 * guest agent already stops those.
 *
 * Four per cent and back, on the row this project already had, rather than a
 * marquee that scrolls the width of itself. `scaffold/` and `scaffold-sdk/`
 * have to keep rendering the same document — that is what makes "everything
 * that changed is the SDK" a conclusion anybody can draw — so this moves the
 * page without adding an element to it.
 */
export function useMarquee<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T>(null)
  // Held, so it can be killed on unmount — and so there is something in the
  // tree to find. See the note at the top of this file.
  const tween = useRef<gsap.core.Tween | null>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    tween.current = gsap.to(element, {
      xPercent: -4,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
    return () => {
      tween.current?.kill()
      tween.current = null
    }
  }, [])
  return ref
}

/**
 * Lenis, held in a ref — which is also where the crawl finds it.
 *
 * Not an accident of this fixture: a scroll smoother has to survive re-renders
 * and be torn down on unmount, so a ref is where every project ends up putting
 * one, `react-lenis` included. The SDK reads hook state and refs for exactly
 * this reason.
 */
export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    lenis.current = new Lenis({ autoRaf: true })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
