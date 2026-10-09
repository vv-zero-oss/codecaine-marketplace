import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SECURITY } from "@/content/platform"

/**
 * Trust, on the night panel: the one dark block on the page, because it is
 * the one thing that should feel heavier than the rest.
 */
export function SecurityBand() {
  return (
    <section className="py-8">
      <Container>
        <Reveal className="overflow-hidden rounded-(--radius-panel) bg-night p-6 text-night-fg sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="type-eyebrow text-night-muted">Security</p>
              <h2 className="type-head text-h2 mt-4 max-w-[14ch] text-balance">
                Built like a bank. <span className="text-night-muted">Checked like one too.</span>
              </h2>
              <p className="mt-5 max-w-[40ch] text-night-muted">
                Money moves through Kestrel every second, so security isn't a page on the website — it's a line item in every release.
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-(--radius-card) bg-night-line sm:grid-cols-2">
              {SECURITY.map((item) => (
                <li key={item.title} className="group bg-night-2 p-5 transition-colors duration-(--duration-hover) hover:bg-night">
                  <item.icon className="size-5 text-lime transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-translate-y-0.5" strokeWidth={1.6} />
                  <p className="mt-4 text-[16px] font-medium">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-night-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
