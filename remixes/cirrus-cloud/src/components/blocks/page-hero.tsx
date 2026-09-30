import type * as React from "react"

import { PixelMark } from "@/components/marks/pixel-marks"
import { Container } from "@/components/ui/container"

/**
 * The top of every page: the page's name in heavy caps, a justified
 * strapline and a one-line promise in a narrow column to the right, and
 * whatever the page puts under both (the server room, on the home page).
 */
export function PageHero({
  id = "top",
  title,
  strap,
  blurb,
  children,
}: {
  id?: string
  title: readonly string[]
  strap: readonly (readonly string[])[]
  blurb: string
  children?: React.ReactNode
}) {
  return (
    <header id={id}>
      <Container className="grid lg:grid-cols-[minmax(0,1fr)_27.25rem]">
        <h1 className="pt-8 pb-7 text-display font-normal text-ink uppercase sm:pt-10 lg:pb-10">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="flex flex-col justify-between gap-8 border-t border-hairline pt-6 pb-7 lg:border-t-0 lg:border-l lg:pt-10 lg:pb-8 lg:pl-10">
          <Strapline lines={strap} />
          <div className="flex items-end justify-between gap-6">
            <PixelMark />
            <p className="max-w-[14rem] text-right text-[0.8125rem] leading-[1.55] text-ink-soft">{blurb}</p>
          </div>
        </div>
      </Container>
      {children}
    </header>
  )
}

/** Two lines of caps, each word pushed to fill the column. */
export function Strapline({ lines }: { lines: readonly (readonly string[])[] }) {
  return (
    <p className="text-[clamp(0.9375rem,0.8rem+0.4vw,1.25rem)] leading-[1.28] text-ink uppercase">
      {lines.map((line) => (
        <span key={line.join(" ")} className="flex justify-between gap-3">
          {line.map((word, i) => (
            <span key={`${word}-${i}`}>{word}</span>
          ))}
        </span>
      ))}
    </p>
  )
}
