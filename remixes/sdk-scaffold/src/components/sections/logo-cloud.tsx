import { Container } from "@/components/ui/container"
import { useMarquee } from "@/components/motion"
import { LOGOS } from "@/content"

export function LogoName({ children }: { children: string }) {
  return (
    <div className="text-center text-sm font-semibold tracking-tight text-quartz-400">
      {children}
    </div>
  )
}

export function LogoCloud() {
  // Driven by GSAP rather than by a CSS keyframe, which is the difference the
  // SDK's motion channel exists for: nothing outside the page can see a tween
  // inside the bundle. On the row this project already had, and moving it by a
  // few per cent rather than the width of itself, because `scaffold/` and this
  // have to keep rendering the same document — see this project's README, and
  // `components/motion.ts` for what the tween is here to prove.
  const track = useMarquee<HTMLDivElement>()

  return (
    <section id="logos" className="border-y border-quartz-200/70 bg-quartz-50/60 py-12">
      <Container>
        <p className="text-center text-xs font-medium tracking-widest text-quartz-400 uppercase">
          Shipping on Quartz
        </p>
        <div
          ref={track}
          data-marquee
          className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6"
        >
          {LOGOS.map((name) => (
            <LogoName key={name}>{name}</LogoName>
          ))}
        </div>
      </Container>
    </section>
  )
}
