import { BinaryOrb, OrbitMark } from "@/components/motion/binary-orb"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { SurfaceCard } from "@/components/ui/surface-card"
import { DEVELOPERS } from "@/content"

/** The developer pitch, on night black under a lit planet of digits. */
export function Developers() {
  return (
    <section id="developers" className="scroll-mt-20 pt-28 sm:pt-40">
      <Container>
        <Reveal>
          <SurfaceCard tone="night" className="flex min-h-[640px] flex-col items-center px-5 pt-20 pb-6 text-center sm:min-h-[680px] sm:px-10 sm:pt-[130px] sm:pb-9">
            <BinaryOrb className="absolute -top-4 left-1/2 -translate-x-1/2 scale-[0.62] origin-top sm:scale-100" />
            <div className="relative max-w-[600px]">
              <h2 className="text-[clamp(2.25rem,1.6rem+2.4vw,3.6rem)] leading-[1.06] tracking-[-0.035em] text-balance">
                {DEVELOPERS.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[550px] text-base leading-[1.45] text-ink-inverse/85 sm:text-[17px]">
                {DEVELOPERS.body}
              </p>
              <ArrowLink href="#developers" className="mt-5">
                {DEVELOPERS.link}
              </ArrowLink>
            </div>
            <McpCard />
          </SurfaceCard>
        </Reveal>
      </Container>
    </section>
  )
}

export function McpCard() {
  return (
    <div className="relative mt-auto flex w-full max-w-[766px] items-center gap-6 rounded-xl border border-line-inverse bg-night/40 p-5 text-left backdrop-blur-xl sm:px-6">
      <div className="flex-1">
        <h3 className="text-base font-medium sm:text-[17px]">{DEVELOPERS.mcp.title}</h3>
        <p className="mt-1 text-[14px] leading-snug text-ink-inverse/60">{DEVELOPERS.mcp.body}</p>
      </div>
      <OrbitMark className="hidden shrink-0 sm:block" />
    </div>
  )
}
