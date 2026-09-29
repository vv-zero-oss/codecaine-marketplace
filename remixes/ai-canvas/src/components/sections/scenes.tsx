import { BlurText } from "@/components/motion/blur-text"
import { CyclingImage } from "@/components/motion/cycling-image"
import { ScatterTiles } from "@/components/motion/scatter-tiles"
import { ScrollScene } from "@/components/motion/scroll-scene"
import { SteppedWords } from "@/components/motion/stepped-words"
import { scenes } from "@/content"

/**
 * The white scenes between the product sections. Each is one screen with one
 * thing to say, and each answers the one before it:
 *
 *   shaped, not prompted → frame by frame → but tools stop at the mockup →
 *   Boundless is where ideas go live → (the product) → ideas run free →
 *   a place to begin → come build with us.
 */

/** Photos arriving one by one round the words, like a board filling up. */
export function Scatter() {
  return (
    <ScrollScene id="scatter" backdrop={<ScatterTiles />}>
      <p className="text-scene font-medium tracking-scene text-balance">
        <BlurText text={scenes.scatter.first} by="line" />
        <br />
        <BlurText text={scenes.scatter.second} by="line" delay={0.12} />
      </p>
    </ScrollScene>
  )
}

/** The turn: the first line arrives whole, the second word by word. */
export function Problem() {
  return (
    <ScrollScene id="problem">
      <p className="flex flex-col gap-[0.5em] text-scene font-medium tracking-scene text-balance">
        <BlurText text={scenes.problem.first} by="line" />
        <BlurText text={scenes.problem.second} delay={0.35} />
      </p>
    </ScrollScene>
  )
}

/** The answer, set down the mauve panel a word at a time. */
export function Manifesto() {
  return <SteppedWords words={scenes.manifesto} />
}

/** A photograph inside the sentence that keeps changing while you read it. */
export function RunFree() {
  return (
    <ScrollScene id="free">
      <p className="flex flex-col gap-[0.5em] text-scene font-medium tracking-scene">
        <BlurText text={scenes.free.first} by="line" />
        <span>
          <BlurText text={scenes.free.before} by="line" delay={0.2} />
          <CyclingImage />
          <BlurText text={scenes.free.after} by="line" delay={0.3} />
        </span>
      </p>
    </ScrollScene>
  )
}

/** Two short paragraphs that sharpen from the muted ink, as the reference's
 *  closing lines do. */
export function Place() {
  return (
    <ScrollScene id="place">
      <div className="flex flex-col gap-[0.75em] text-scene font-medium tracking-scene">
        <p>
          <BlurText text={scenes.place.first} by="line" from="muted" />
          <br />
          <BlurText text={scenes.place.second} by="line" from="muted" delay={0.08} />
        </p>
        <p>
          <BlurText text={scenes.place.third} by="line" from="muted" delay={0.2} />
          <br />
          <BlurText text={scenes.place.fourth} by="line" from="muted" delay={0.28} />
        </p>
      </div>
    </ScrollScene>
  )
}
