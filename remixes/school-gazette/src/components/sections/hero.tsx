import { Masthead } from "@/components/masthead"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { Photo } from "@/components/ui/photo"
import { Starburst } from "@/components/ui/retro"
import { Cube3D } from "@/components/motion/cube-3d"
import { ParallaxRail } from "@/components/motion/parallax-rail"
import { Ticker } from "@/components/motion/ticker"
import { PHOTOS } from "@/data/photos"

function StoryBrief({ photo, alt, title, text }: { photo: string; alt: string; title: string; text: string }) {
  return (
    <article className="flex flex-col gap-2">
      <Photo src={photo} alt={alt} className="aspect-[16/9] w-full" />
      <h3 className="flex items-center gap-2 font-condensed text-xl uppercase leading-none">
        {title} <Badge>New</Badge>
      </h3>
      <p className="max-w-[34ch] text-[0.82rem] leading-snug text-ink-soft">{text}</p>
    </article>
  )
}

/**
 * Front page. A strip of tape across the top, three short stories above the
 * fold, then the nameplate printed in a black block. The rail on the right is
 * the first of the 3D pieces: two paper dice that turn on their own.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="gazette-title">
      <div className="bg-ink text-paper-light">
        <Container className="flex items-center gap-4 py-2">
          <span className="shrink-0 rounded-[2px] bg-rust px-2 py-1 font-type text-[0.62rem] tracking-[0.16em] uppercase">Live</span>
          <Ticker text="Mock timetables are up outside the hall · First XI win 3–1 · Founders’ Day is coming · Radio Club is on air at 08:10 · Cookie coupon on the back page" />
        </Container>
      </div>
      <Container className="pt-6 pb-4 sm:pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_9.5rem] lg:gap-10">
          <div>
            <div className="grid gap-6 md:grid-cols-[1fr_1fr_1fr] md:gap-0 md:divide-x md:divide-ink [&>*]:md:px-6 [&>*:first-child]:md:pl-0 [&>*:last-child]:md:pr-0">
              <StoryBrief photo={PHOTOS.lab} alt="Students pouring a liquid into a flask in the science lab" title="Lab Notes" text="Year 9’s volcano went off a full minute early. The judges have been told it was a feature." />
              <div className="flex flex-col items-center justify-center gap-3 border-y border-ink py-6 text-center md:border-y-0 md:py-0">
                <h2 className="display text-[clamp(2.4rem,5vw,3.6rem)]">All news!</h2>
                <p className="max-w-[26ch] text-[1.05rem] leading-snug">A fresh selection of the term’s stories — written, shot and set by students.</p>
                <p className="text-[0.78rem]"><b className="font-type tracking-wider">TIP!</b> Flip the switches. Everything here turns, tunes or presses.</p>
              </div>
              <StoryBrief photo={PHOTOS.art} alt="Children painting at easels in the art room" title="Art Room" text="Forty easels, one skylight and a brave new rule: the paint stays on the paper." />
            </div>
            <div className="mt-8" id="gazette-title">
              <Masthead text="GAZETTE" />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-ink py-2 kicker">
              <span>Vol. XLII · No. 3</span>
              <span>Autumn term · October 2026</span>
              <span>Price: one smile</span>
            </div>
          </div>
          <ParallaxRail className="hidden lg:flex" distance={50}>
            <Cube3D size={92} speed={16} labels="A,B,C,1,2,3" />
            <Starburst label="New!" sub="issue 3" size={108} />
            <Cube3D size={72} speed={11} tone="ink" labels="★,✎,♪,☀,✿,♟" />
          </ParallaxRail>
        </div>
        <div className="mt-6 flex justify-center lg:hidden">
          <Starburst label="New!" sub="issue 3" size={92} />
        </div>
      </Container>
    </section>
  )
}
