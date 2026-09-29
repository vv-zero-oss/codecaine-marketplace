import { Fragment } from "react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Marquee } from "@/components/blocks/marquee"
import { Photo } from "@/components/blocks/photo"
import { ticker } from "@/content"

function Star({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <path d="M20 0 L24 14 L38 10 L27 20 L38 30 L24 26 L20 40 L16 26 L2 30 L13 20 L2 10 L16 14 Z" fill="currentColor" />
    </svg>
  )
}

/**
 * Two bands crossing like tape over a box: orange words one way, and a forest
 * band of pictures in little shapes the other. Both lean, both answer the
 * scroll. The words say what the page is about before it says it in full.
 */
export function Ticker() {
  const shapes = ["scallop", "circle", "burst"] as const
  return (
    <section aria-label="What goes into it" className="relative z-10 -my-6 overflow-x-clip bg-transparent py-10 sm:py-14">
      <Marquee speed={60} className="relative z-10 -rotate-2 bg-orange py-3 text-forest sm:py-4">
        {ticker.words.map((word) => (
          <Fragment key={word}>
            <span className="px-5 font-heavy text-[clamp(30px,4.4vw,68px)] leading-none">{word}</span>
            <Star className="size-[clamp(22px,2.8vw,40px)] text-forest" />
          </Fragment>
        ))}
      </Marquee>
      <Marquee speed={40} direction={-1} className="-mt-3 rotate-[1.5deg] bg-forest py-3 text-lime sm:py-4">
        {ticker.words.map((word, i) => (
          <Fragment key={word}>
            <span className="px-4 font-condensed text-[clamp(22px,2.4vw,36px)] leading-none uppercase">{word}</span>
            <ClipShape shape={shapes[i % 3]} className="h-[clamp(40px,4vw,60px)] w-[clamp(40px,4vw,60px)] shrink-0">
              <Photo photo={ticker.photos[i % ticker.photos.length]} width={160} className="absolute inset-0" />
            </ClipShape>
          </Fragment>
        ))}
      </Marquee>
    </section>
  )
}
