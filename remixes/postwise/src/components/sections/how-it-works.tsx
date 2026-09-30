import type * as React from "react"

import { Mic2, Plus, Sparkles } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { LogoMark } from "@/components/ui/wordmark"
import { STEPS } from "@/content"
import { cn } from "@/lib/utils"

const logo = (name: string) => `${import.meta.env.BASE_URL}logos/${name}.svg`

/** A round white button with one mark in it, as the connect card shows them. */
function RoundKey({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span aria-label={label} className="grid size-14 place-items-center rounded-full bg-card shadow-(--shadow-field)">
      {children}
    </span>
  )
}

/** Step one: the inbox as tiles, with the providers to connect underneath. */
function ConnectArt() {
  return (
    <div className="relative size-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 grid grid-cols-[0.8fr_1.8fr_0.9fr] gap-3 opacity-90">
        <span className="h-[88px] rounded-b-[14px] bg-paper-deep" />
        <span className="h-[88px] rounded-b-[14px] bg-paper-deep" />
        <span className="row-span-2 h-[210px] rounded-bl-[14px] bg-paper-deep" />
        <span className="col-span-1 h-[112px] -translate-x-6 rounded-r-[14px] bg-paper-deep" />
        <span className="h-[112px] w-[60%] rounded-[14px] bg-paper-deep" />
      </div>
      <div className="absolute inset-x-0 bottom-7 flex justify-center gap-2.5">
        <RoundKey label="Gmail"><img src={logo("gmail")} alt="" className="h-5 w-auto" /></RoundKey>
        <RoundKey label="Outlook"><img src={logo("outlook")} alt="" className="h-5 w-auto" /></RoundKey>
        <RoundKey label="Any IMAP inbox"><LogoMark className="size-5 text-ink" /></RoundKey>
        <RoundKey label="More"><Plus className="size-5 text-ink" strokeWidth={1.6} /></RoundKey>
      </div>
    </div>
  )
}

/** Step two: the app's tile on a sea-glass swirl, with the voices it can take. */
function VoiceArt() {
  return (
    <div className="grid size-full place-items-center">
      <div className="relative flex h-[160px] w-[280px] items-center justify-center overflow-hidden rounded-[18px] bg-[conic-gradient(from_210deg_at_30%_60%,var(--color-teal),var(--color-lagoon-soft),var(--color-apricot),var(--color-mint),var(--color-teal))] shadow-(--shadow-float)">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(160deg,rgb(255_255_255/0.08)_0_10px,transparent_10px_22px)]" />
        <span className="relative grid size-[88px] place-items-center rounded-[22px] bg-card shadow-(--shadow-float)">
          <span className="grid size-[60px] place-items-center rounded-[16px] bg-lagoon text-night-fg">
            <LogoMark className="size-8" />
          </span>
        </span>
        <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {["Warm", "Brief", "Formal"].map((tone, i) => (
            <span
              key={tone}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium backdrop-blur",
                i === 0 ? "bg-card text-ink" : "bg-white/25 text-white",
              )}
            >
              {i === 0 && <Mic2 className="size-2.5" />}
              {tone}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

/** Step three: Scribe in the menu bar, with "Draft reply" picked. */
function MenuBarArt() {
  const rows: [string, string, boolean?][] = [
    ["Draft reply…", "⌘ R", true],
    ["Summarise thread", "⌘ S"],
    ["Snooze until tomorrow", "⌘ Z"],
    ["", ""],
    ["Settings…", "⌘ ,"],
    ["Quit Postwise", "⌘ Q"],
  ]
  return (
    <div className="flex size-full flex-col items-center pt-8">
      <div className="flex w-[330px] items-center justify-end gap-3 rounded-[6px] bg-card-soft px-3 py-1.5 text-[12.5px] font-medium text-ink">
        <span className="mr-auto size-3 rounded-full bg-ink" />
        <span className="grid size-5 place-items-center rounded-[5px] bg-line">
          <LogoMark className="size-3.5" />
        </span>
        <span className="text-ink-subtle">⌁</span>
        <span>Mon Sep 29&nbsp;&nbsp;9:41 AM</span>
      </div>
      <div className="ml-[70px] w-[250px] rounded-[8px] bg-card/95 p-1.5 text-[12.5px] shadow-(--shadow-float)">
        <p className="px-2 py-1 text-ink-subtle">Synced 21 seconds ago</p>
        <span className="mx-2 my-1 block h-px bg-line" />
        {rows.map(([label, key, on], i) =>
          label ? (
            <p
              key={label}
              className={cn(
                "flex items-center justify-between rounded-[5px] px-2 py-[3px]",
                on ? "bg-app-accent text-white" : "text-ink",
              )}
            >
              <span className="flex items-center gap-1.5">
                {on && <Sparkles className="size-3" />}
                {label}
              </span>
              <span className={on ? "text-white/80" : "text-ink-subtle"}>{key}</span>
            </p>
          ) : (
            <span key={i} className="mx-2 my-1 block h-px bg-line" />
          ),
        )}
      </div>
    </div>
  )
}

const ART = [ConnectArt, VoiceArt, MenuBarArt]

/** One step: its picture on a soft tile, then the title and a line under it. */
export function StepCard({ index = 0, title = "", body = "" }: { index?: number; title?: string; body?: string }) {
  const Art = ART[index] ?? ConnectArt
  return (
    <article className="group flex flex-col items-center text-center">
      <div className="h-[300px] w-full overflow-hidden rounded-[28px] bg-paper transition-transform duration-500 ease-(--ease-out-quint) group-hover:-translate-y-1 md:h-[340px]">
        <Art />
      </div>
      <h3 className="mt-7 text-[22px] font-medium tracking-[-0.01em] text-ink md:text-[24px]">{title}</h3>
      <p className="mt-3 max-w-[360px] text-[16px] leading-[1.6] text-ink-muted md:text-[17px]">{body}</p>
    </article>
  )
}

/** How it works, in three steps, with the two ways in sitting on a dashed rule. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card py-section">
      <Container className="max-w-[1320px]">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.items.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <StepCard index={i} {...step} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex items-center gap-3 md:mt-16">
          <span aria-hidden className="h-px flex-1 border-t border-dashed border-line-strong" />
          <div className="flex flex-wrap justify-center gap-2.5">
            <ButtonLink href="#cta" className="h-11 rounded-full px-5 shadow-(--shadow-float)">
              {STEPS.primary}
            </ButtonLink>
            <ButtonLink href="#copilot" variant="outline" className="h-11 rounded-full px-5">
              {STEPS.secondary}
            </ButtonLink>
          </div>
          <span aria-hidden className="h-px flex-1 border-t border-dashed border-line-strong" />
        </div>
      </Container>
    </section>
  )
}
