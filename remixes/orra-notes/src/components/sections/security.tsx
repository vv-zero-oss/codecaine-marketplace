import { BinaryOrb, OrbitMark } from "@/components/motion/binary-orb"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SECURITY } from "@/content"

/** The privacy pitch, on night black under a lit planet of digits. */
export function Security() {
  return (
    <section id="security" className="scroll-mt-24 pt-20 sm:pt-28">
      <Container>
        <Reveal>
          <SurfaceCard tone="void" size="large" className="flex min-h-[640px] flex-col items-center px-5 pt-20 pb-6 text-center sm:min-h-[680px] sm:px-10 sm:pt-[130px] sm:pb-9">
            <BinaryOrb className="absolute -top-4 left-1/2 -translate-x-1/2 scale-[0.62] origin-top sm:scale-100" />
            <div className="relative max-w-[600px]">
              <h2 className="font-heading text-heading-lg font-medium text-balance text-snow">
                {SECURITY.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[550px] text-subheading leading-[1.5] text-bone/85">
                {SECURITY.body}
              </p>
              <ArrowLink href="#security" className="mt-5">
                {SECURITY.link}
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
    <div className="relative mt-auto flex w-full max-w-[766px] items-center gap-6 rounded-card bg-glass p-5 shadow-subtle text-left backdrop-blur-xl sm:px-6">
      <div className="flex-1">
        <h3 className="font-heading text-subheading font-medium text-bone">{SECURITY.mcp.title}</h3>
        <p className="mt-1 text-[14px] leading-snug text-ash">{SECURITY.mcp.body}</p>
      </div>
      <OrbitMark className="hidden shrink-0 sm:block" />
    </div>
  )
}
