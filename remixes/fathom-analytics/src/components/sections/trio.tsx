import { Mark } from "@/components/ui/wordmark"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { TRIO } from "@/content"
import { cn } from "@/lib/utils"

const TABLE = [["Revenue", "$1.84M", "+6.8%"], ["Active users", "58.2k", "+4.1%"], ["Churn", "2.3%", "−0.4%"]]

function Art({ kind }: { kind: "table" | "report" | "agents" }) {
  if (kind === "table") {
    return (
      <div className="w-[82%] space-y-2 rounded-xl bg-window p-3 text-[9px] shadow-card">
        <p className="font-medium">Key metrics</p>
        {TABLE.map(([m, v, d]) => <p key={m} className="tnum grid grid-cols-[1fr_auto_2.2rem] gap-2 border-t border-line pt-1.5"><span>{m}</span><b className="font-medium">{v}</b><span className="text-emerald-700">{d}</span></p>)}
      </div>
    )
  }
  if (kind === "report") {
    return (
      <div className="w-[82%] space-y-2 rounded-xl bg-window p-3 text-[9px] shadow-card">
        <p className="font-serif text-sm tracking-tight">January performance review</p>
        <p className="rounded-md bg-chart-soft p-2 text-chart">Revenue up 6.8% on enterprise renewals.</p>
        {[80, 94, 62].map((w) => <span key={w} className="block h-1.5 rounded-full bg-surface-2" style={{ width: `${w}%` }} />)}
      </div>
    )
  }
  return (
    <div className="relative grid size-40 place-items-center">
      <span aria-hidden className="absolute inset-3 rounded-full border border-dashed border-line-strong" />
      <span className="grid size-12 place-items-center rounded-full bg-window shadow-card"><Mark className="size-6" /></span>
      {["-top-1 left-1/2 -translate-x-1/2", "top-[58%] -left-1", "top-[58%] -right-1"].map((pos, i) => <span key={i} className={cn("absolute size-8 rounded-full bg-window shadow-card", pos, i === 0 && "bg-lilac", i === 1 && "bg-peach", i === 2 && "bg-sky")} />)}
    </div>
  )
}

export function Trio() {
  return (
    <section data-canvas-ignore className="bg-surface pb-24 sm:pb-32">
      <Container className="grid gap-4 md:grid-cols-3">
        {TRIO.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08}>
            <article className="group h-full">
              <div className="mb-5 grid aspect-[4/3.3] place-items-center overflow-hidden rounded-card bg-surface-2 transition-transform duration-(--duration-base) ease-out-soft group-hover:-translate-y-0.5"><Art kind={t.art} /></div>
              <h3 className="text-[15px] font-medium">{t.title}</h3>
              <p className="mt-1 max-w-[17rem] text-[15px] leading-snug text-ink-2">{t.body}</p>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
