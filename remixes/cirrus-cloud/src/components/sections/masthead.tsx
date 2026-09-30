import { PixelMark } from "@/components/marks/pixel-marks"
import { PixelField } from "@/components/motion/pixel-field"
import { Container } from "@/components/ui/container"
import { masthead } from "@/content"

/**
 * The top of the page: the name of the thing in heavy caps, a justified
 * strapline and a one-line promise in a narrow column to the right, and under
 * both the pixel weather running edge to edge.
 */
export function Masthead() {
  return (
    <header id="top">
      <Container className="grid lg:grid-cols-[minmax(0,1fr)_27.25rem]">
        <h1 className="pt-8 pb-7 text-display font-normal text-ink uppercase sm:pt-10 lg:pb-10">
          {masthead.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="flex flex-col justify-between gap-8 border-t border-hairline pt-6 pb-7 lg:border-t-0 lg:border-l lg:pt-10 lg:pb-8 lg:pl-10">
          <Strapline />
          <div className="flex items-end justify-between gap-6">
            <PixelMark />
            <p className="max-w-[14rem] text-right text-[0.8125rem] leading-[1.55] text-ink-soft">{masthead.blurb}</p>
          </div>
        </div>
      </Container>
      <PixelField />
    </header>
  )
}

/** Two lines of caps, each word pushed to fill the column. */
function Strapline() {
  return (
    <p className="text-[clamp(0.9375rem,0.8rem+0.4vw,1.25rem)] leading-[1.28] text-ink uppercase">
      {masthead.strap.map((line) => (
        <span key={line.join(" ")} className="flex justify-between gap-3">
          {line.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </span>
      ))}
    </p>
  )
}
