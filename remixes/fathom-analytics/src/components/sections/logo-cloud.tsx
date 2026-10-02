import { Marquee } from "@/components/motion/marquee"
import { Container } from "@/components/ui/container"
import { CUSTOMERS } from "@/content"
import { cn } from "@/lib/utils"

export function LogoCloud({ duration = 38 }: { duration?: number }) {
  return (
    <section id="customers" className="bg-paper py-12 sm:py-16" data-canvas-ignore>
      <Container>
        <p className="mb-8 text-center text-[13px] text-ink-2">Trusted by teams at</p>
      </Container>
      <Marquee duration={duration}>
        {CUSTOMERS.map((c) => (
          <span key={c.name} className={cn("text-[22px] text-ink/70 transition-colors duration-(--duration-fast) hover:text-ink", c.style)}>{c.name}</span>
        ))}
      </Marquee>
    </section>
  )
}
