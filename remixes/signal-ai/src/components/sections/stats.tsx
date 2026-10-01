import { CountUp } from "@/components/motion/count-up"
import { Container } from "@/components/ui/container"

const STATS = [
  { to: 400, suffix: "M+", label: "requests served every day" },
  { to: 200, suffix: "K", label: "GPUs in one training cluster" },
  { to: 1, suffix: "", label: "mission: make intelligence useful" },
]

/** Three numbers over a faint grid: scale, said plainly. */
export function Stats() {
  return (
    <section className="relative overflow-hidden pb-24 sm:pb-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
        }}
      />
      <Container className="relative grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
        {STATS.map((s, i) => (
          <div key={s.label}>
            <CountUp to={s.to} suffix={s.suffix} delay={i * 0.12} className="block text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-normal tracking-[-0.045em]" />
            <p className="mt-3 text-[11px] text-ink-3">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}
