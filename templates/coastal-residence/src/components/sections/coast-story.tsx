import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { EASE_OUT } from "@/components/motion"
import { Bloom } from "@/components/ui/bloom"
import { CircleLink } from "@/components/ui/circle-link"
import { Emblem } from "@/components/ui/emblem"
import { ScriptReveal, StretchText } from "@/components/ui/stretch-text"
import { notes, story } from "@/content"
import { cn } from "@/lib/utils"

const COAST =
  "M0 190 C 120 175, 190 125, 250 105 C 225 96, 262 92, 300 94 C 380 96, 356 126, 400 121 C 480 112, 520 118, 548 114 C 520 132, 566 133, 622 128 C 702 121, 764 130, 822 118 C 880 106, 902 152, 944 152 C 986 152, 972 96, 1024 95 C 1084 94, 1150 100, 1200 102"
const STOP_X = [60, 250, 440, 620, 830, 1030]

/** The coastline as one drawn line, with the towns along it and the drive to each. */
function CoastMap() {
  const path = useRef<SVGPathElement>(null)
  const [ys, setYs] = useState<number[]>(STOP_X.map(() => 120))
  useLayoutEffect(() => {
    const p = path.current
    if (!p) return
    const total = p.getTotalLength()
    const points = Array.from({ length: 400 }, (_, i) => p.getPointAtLength((i / 399) * total))
    setYs(STOP_X.map((x) => points.reduce((a, b) => (Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a)).y))
  }, [])

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1200 200" className="w-full overflow-visible text-ink" aria-hidden="true">
        <motion.path
          ref={path}
          d={COAST}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.2, ease: EASE_OUT }}
        />
      </svg>
      <ul className="absolute inset-0">
        {story.coast.stops.map((stop, i) => (
          <li
            key={stop.name}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center pb-2 text-center"
            style={{ left: `${(STOP_X[i] / 1200) * 100}%`, top: `${((ys[i] - 26) / 200) * 100}%` }}
          >
            {stop.time ? (
              <>
                <span className="label whitespace-nowrap text-[0.8rem] tracking-[0.04em]">{stop.name}</span>
                <span className="label text-[0.8rem] font-normal tracking-[0.04em]">{stop.time}</span>
              </>
            ) : (
              <Emblem className="size-12" aria-label={stop.name} />
            )}
            <span className="mt-6 block size-1.5 rounded-full bg-ink" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The idea, the place and the coastline, told sideways: on a wide screen the
 * page pins and slides left as you scroll down; on a phone it simply stacks.
 */
export function CoastStory() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [span, setSpan] = useState(0)
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const measure = () => {
      const isWide = window.innerWidth >= 1024 && !reduce
      setWide(isWide)
      setSpan(isWide && track.current ? track.current.scrollWidth - window.innerWidth : 0)
    }
    measure()
    window.addEventListener("resize", measure)
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    return () => {
      window.removeEventListener("resize", measure)
      ro.disconnect()
    }
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -span])

  return (
    <section
      ref={section}
      id="location"
      data-tone="dark"
      className="relative bg-shell text-ink"
      style={wide ? { height: `calc(100vh + ${span}px)` } : undefined}
    >
      <div className={cn(wide && "sticky top-0 h-screen overflow-hidden")}>
        <motion.div
          ref={track}
          style={wide ? { x } : undefined}
          className={cn("flex flex-col bg-shell", wide && "h-full w-max flex-row")}
        >
          {/* The idea */}
          <div className="relative flex min-h-[100svh] w-screen shrink-0 flex-col items-center justify-center overflow-hidden px-5 py-28">
            <Bloom src={story.bloom} className="-left-10 -top-24 h-[62vh] w-[44vw] min-w-72" />
            <Bloom src={story.bloomAlt} flip corner="bottom-right" className="-bottom-24 -right-10 h-[40vh] w-[26vw] min-w-56" />
            <p className="label relative z-10">{story.concept.eyebrow}</p>
            <StretchText
              as="h2"
              text={story.concept.title}
              className="relative z-10 mt-10 max-w-[62rem] text-center font-condensed text-[clamp(2rem,3.9vw,4.4rem)] leading-[0.95]"
            />
            <p className="relative mt-16 max-w-[19rem] text-center text-body text-ink-soft">{story.concept.body}</p>
            <Emblem className="relative mt-10 size-10" />
          </div>

          {/* The place */}
          <div className="relative flex min-h-[100svh] shrink-0 flex-col items-center gap-10 px-5 py-20 lg:w-[112vw] lg:flex-row lg:gap-0 lg:px-0 lg:py-0">
            <div className="relative z-10 font-condensed text-[clamp(5rem,13.5vw,16rem)] leading-[0.82] lg:ml-[14vw] lg:-mr-[12vw]">
              {story.mile.lines.map((line, i) => (
                <StretchText key={line} text={line} delay={i * 0.12} className={cn("block", i === 1 && "lg:ml-[0.55em]", i === 2 && "lg:-ml-[0.2em]")} />
              ))}
              <span className="label absolute -left-[4.5em] top-[48%] hidden text-[0.8rem] tracking-[1.1em] lg:block">
                {story.mile.country}
              </span>
            </div>
            <motion.img
              src={story.mile.image}
              alt="A terrace under a flowering pergola, looking out to sea"
              loading="lazy"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
              className="h-[70vh] w-full object-cover lg:h-[92vh] lg:w-[37vw]"
            />
          </div>

          {/* Between */}
          <div className="relative flex shrink-0 flex-col justify-between gap-12 px-5 pb-16 lg:h-full lg:w-[44vw] lg:px-0 lg:pb-[3vh] lg:pl-[1vw]">
            <div className="flex justify-center pt-10 lg:justify-end lg:pr-[8vw] lg:pt-[38vh]">
              <CircleLink href="#residences">{notes.cta}</CircleLink>
            </div>
            <div className="max-w-[30rem]">
              <h3 className="font-condensed text-[clamp(2rem,2.4vw,2.8rem)]">{story.between.title}</h3>
              <p className="mt-5 text-body text-ink-soft">{story.between.body}</p>
            </div>
          </div>

          {/* The coast */}
          <div className="relative flex min-h-[100svh] shrink-0 flex-col justify-between overflow-hidden px-5 pb-16 pt-28 lg:w-[100vw] lg:px-0 lg:pb-[10vh] lg:pt-[20vh]">
            <Bloom src={story.bloom} flip corner="top-right" className="-right-16 -top-20 h-[55vh] w-[20vw] min-w-48" drift={40} />
            <h2 className="relative z-10 self-center text-center font-condensed text-[clamp(3rem,5.4vw,6.4rem)] leading-[0.9] lg:ml-[8vw]">
              <StretchText text={story.coast.lines[0]} className="block" />
              <span className="relative block -mt-[0.2em] font-script text-[0.95em] normal-case leading-[0.9] -rotate-[10deg] ml-[1.6em]">
                <ScriptReveal delay={0.4}>{story.coast.lines[1]}</ScriptReveal>
              </span>
              <StretchText text={story.coast.lines[2]} delay={0.3} className="block -mt-[0.25em]" />
            </h2>
            <div className="relative mt-24 overflow-x-auto lg:mt-0 lg:ml-[20vw] lg:overflow-visible">
              <div className="min-w-[720px] pt-24 lg:min-w-0">
                <CoastMap />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
