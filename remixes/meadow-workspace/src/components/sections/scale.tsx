import { Command, Lock, Play, ShieldCheck, KeyRound, Search } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

function Card({ title, body, children, className, flip }: { title: string; body: string; children?: React.ReactNode; className?: string; flip?: boolean }) {
  return (
    <article className={cn("flex flex-col gap-3 overflow-hidden rounded-[var(--radius-card)] bg-surface p-6 shadow-card sm:p-7", flip && "flex-col-reverse", className)}>
      <div>
        <h3 className="text-[14px] font-semibold">{title}</h3>
        <p className="mt-2 max-w-[360px] text-[14px] leading-relaxed text-ink-500">{body}</p>
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </article>
  )
}

function Cursor({ name, className, tone }: { name: string; className?: string; tone: string }) {
  return <span className={cn("absolute rounded px-1.5 py-0.5 text-[10px] font-medium text-white", tone, className)}>{name}</span>
}

/** A bento of what holds up as a team grows. Cards are different sizes on
 *  purpose: the live document and the theme split earn the width. */
export function Scale() {
  return (
    <section id="scale" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal><SectionHeading title="Built to grow with you" description="Serious infrastructure with the simplicity of a tool made for a small team." /></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <Card className="h-full" title="Collaboration" body="Work on documents, tasks and shared views with your team, together, in real time.">
              <div className="relative w-full pt-2 pb-8 text-[14px] leading-relaxed text-ink-700">
                <p className="font-display text-[18px] font-semibold text-ink-900">Spring launch plan</p>
                <p className="mt-2">Finalise the <mark className="rounded-sm bg-highlight px-0.5 text-sky-600">launch timeline</mark> and assign owners to each milestone.</p>
                <p className="mt-2 pl-16">Draft the messaging, line up deadlines, and keep the team aligned on launch-day tasks.</p>
                <Cursor name="Brett G." tone="bg-sky-600" className="top-0 left-[42%]" />
                <Cursor name="Sarah C." tone="bg-leaf" className="top-[78px] left-0" />
                <div className="mt-5 flex items-center gap-3 rounded-lg bg-ink-50 px-3 py-2.5 text-[12px]">
                  <span className="flex -space-x-2">{["/images/avatar-1.jpg", "/images/avatar-3.jpg", "/images/avatar-4.jpg"].map((a) => <img key={a} src={a} alt="" className="size-6 rounded-full object-cover ring-2 ring-ink-50" />)}</span>
                  <span className="text-ink-500"><strong className="font-semibold text-ink-900">3 people</strong> editing · last saved just now</span>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-2">
            <Card className="h-full" title="Style" body="Go beyond dark mode: themes, fonts and palettes that match how you work.">
              <div className="relative h-[110px] w-full overflow-hidden rounded-lg bg-surface-muted shadow-card">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-terminal" />
                <div className="absolute inset-0 flex flex-col justify-center gap-2 p-3">
                  {[70, 45, 60].map((w, i) => (<span key={i} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-ink-400" /><span className="h-1.5 rounded-full bg-ink-200 mix-blend-difference" style={{ width: `${w}%` }} /></span>))}
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.04} className="md:col-span-2">
            <Card className="h-full" title="Speed" body="Blazing keyboard shortcuts, search and navigation.">
              <div className="flex w-full flex-col items-center gap-4 pt-2">
                <div className="flex gap-3">
                  {[<Command key="c" className="size-4" />, "K"].map((k, i) => (
                    <kbd key={i} className="grid size-14 place-items-center rounded-xl bg-surface text-[16px] font-medium text-ink-700 shadow-key transition-transform duration-150 ease-out active:translate-y-0.5">{k}</kbd>
                  ))}
                </div>
                <div className="w-full max-w-[210px] rounded-xl bg-ink-50 p-1.5 text-[11px] shadow-card">
                  <p className="flex items-center gap-2 px-2 py-1.5 text-ink-400"><Search className="size-3" />Jump to…</p>
                  <p className="rounded-md bg-surface px-2 py-1.5 font-medium shadow-card">Fernhill deal</p>
                  <p className="px-2 py-1.5 text-ink-500">Q2 pitch deck</p>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2">
            <Card className="h-full" title="Security" body="Independently tested. Encrypted in transit and at rest." flip>
              <div className="flex flex-col items-center gap-1 pt-2 text-center">
                <ShieldCheck className="size-14 text-ink-400" strokeWidth={1.25} />
                <p className="text-[10px] tracking-[0.18em] text-ink-400 uppercase">Audited</p>
                <p className="font-display text-[18px] font-semibold">Tier 3 certified</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[10px] font-medium text-ink-700">
                  {[[Lock, "Encrypted"], [KeyRound, "SSO"], [ShieldCheck, "Audit log"]].map(([I, l]) => { const Icon = I as typeof Lock; return <span key={l as string} className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1"><Icon className="size-3" />{l as string}</span> })}
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-2">
            <Card className="h-full" title="Mobile & browser" body="Wherever you need it — iOS, a browser extension, and chat apps soon." flip>
              <div className="w-[190px] rounded-t-[22px] border border-ink-200 border-b-0 bg-surface p-3 pb-0 text-[11px] shadow-card [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
                <p className="text-[15px] font-semibold">Home</p>
                <div className="mt-3 rounded-lg bg-surface-muted p-2.5 leading-snug text-ink-500"><p className="font-medium text-ink-900">Daily summary</p><p className="mt-1">You have 3 meetings today. Noor sent a follow-up on the Series A term sheet.</p></div>
                <div className="h-6" />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-4">
            <Card className="h-full" title="Customisation" body="Themes, fonts, palettes, corner radius and density. Make it yours.">
              <dl className="w-full max-w-[300px] -rotate-1 rounded-xl bg-surface p-4 text-[12px] shadow-lift">
                <dt className="mb-2 text-[11px] font-semibold text-ink-400">Properties</dt>
                {[["Status", "Qualified"], ["Value", "$2.5M"], ["Close date", "Mar 15, 2026"], ["Contact", "Noor Haddad"]].map(([k, v]) => (<div key={k} className="flex gap-4 border-t border-ink-100 py-1.5 first:border-0"><dd className="w-20 text-ink-400">{k}</dd><dd className="font-medium">{v}</dd></div>))}
              </dl>
              <div className="hidden w-[150px] shrink-0 flex-col gap-3 pl-6 sm:flex">
                <p className="text-[11px] font-semibold text-ink-400">Accent</p>
                <div className="flex gap-2">{["bg-sky-500", "bg-teal", "bg-apricot", "bg-coral", "bg-lilac"].map((c, i) => <span key={c} className={cn("size-6 rounded-full", c, i === 0 && "ring-2 ring-ink-900 ring-offset-2")} />)}</div>
                <p className="mt-1 text-[11px] font-semibold text-ink-400">Corner radius</p>
                <span className="relative h-1.5 rounded-full bg-ink-100"><span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-ink-900" /><span className="absolute top-1/2 left-2/3 size-3.5 -translate-y-1/2 rounded-full bg-surface shadow-key" /></span>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-2">
            <Card className="h-full" title="How it works" body="Watch a two-minute walkthrough of Meadow in action.">
              <a href="#start" aria-label="Play the walkthrough" className="group relative block w-full overflow-hidden rounded-lg">
                <img src="/images/picnic.jpg" alt="Friends gathered in a grassy field" className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                <span className="absolute inset-0 grid place-items-center"><span className="grid size-11 place-items-center rounded-full bg-white/90 text-ink-900 shadow-lift transition-transform duration-150 group-active:scale-95"><Play className="size-4 fill-current" /></span></span>
              </a>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
