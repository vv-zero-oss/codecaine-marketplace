import { ArrowRight, Check, Loader2, X } from "lucide-react"
import { useState } from "react"
import { VoiceBeam } from "voice-glow"
import { useCanvasAction } from "@canvas/react"

import { useVoiceColors } from "@/components/sections/voice-composer"
import { ScrambleText } from "@/components/motion/scramble-text"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { CTA } from "@/content"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent" | "error"

/** A seeded field of hex digits, faint and green: the page's last bit of weather. */
function DigitField() {
  const rows = Array.from({ length: 14 }, (_, r) =>
    Array.from({ length: 150 }, (_, c) => ((Math.sin(r * 91.3 + c * 12.9) * 43758.5) % 1 > 0.45 ? "0123456789abcdef"[(r * 7 + c * 13) % 16] : " ")).join(""),
  )
  return (
    <pre
      aria-hidden
      data-canvas-ignore
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden font-mono text-[10px] leading-[14px] text-good/20 select-none [mask-image:linear-gradient(to_top,#000,transparent_85%)]"
    >
      {rows.join("\n")}
    </pre>
  )
}

export function CallToAction() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const colors = useVoiceColors()
  useCanvasAction("CTA: success", (next) => setStatus(next === false ? "idle" : "sent"), { on: status === "sent", group: "Contact form" })
  useCanvasAction("CTA: error", (next) => setStatus(next === false ? "idle" : "error"), { on: status === "error", group: "Contact form" })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus("error")
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 900)
  }

  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      <DigitField />
      <Container className="relative flex flex-col items-center text-center">
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-faint uppercase">
          <span className="size-1.5 rounded-full bg-good" />{CTA.eyebrow}
        </p>
        <h2 className="scanline mt-5 text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-[-0.02em] text-balance">
          <ScrambleText text={CTA.title} duration={0.9} scanlines={false} />
        </h2>
        <p className="mt-5 max-w-[520px] text-[14px] leading-relaxed text-muted">{CTA.body}</p>

        <form onSubmit={submit} noValidate className="mt-9 w-full max-w-[500px]">
          <VoiceBeam type="pill" processing={status === "sending"} colors={colors} theme="dark" scale={1.6} active={status !== "idle" || email.length > 0}>
          <div
            className={cn(
              "flex h-14 items-center gap-2 rounded-full border bg-white/5 pr-2 pl-5 transition-[border-color,box-shadow] duration-200 focus-within:border-line-strong focus-within:shadow-[0_0_0_4px_rgb(255_255_255/0.04)]",
              status === "error" ? "border-iris" : "border-line",
            )}
          >
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-label="Work email"
              aria-invalid={status === "error"}
              value={email}
              disabled={status === "sent"}
              onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle") }}
              placeholder={CTA.placeholder}
              className="h-full border-0 bg-transparent px-0 text-[14px] text-text shadow-none placeholder:text-faint focus-visible:ring-0"
            />
            {email && status !== "sent" ? (
              <button type="button" aria-label="Clear" onClick={() => setEmail("")} className="flex size-9 items-center justify-center text-faint hover:text-text"><X className="size-3.5" /></button>
            ) : null}
            <Button type="submit" size="icon" aria-label="Request a demo" className="size-10" disabled={status === "sending" || status === "sent"}>
              {status === "sending" ? <Loader2 className="animate-spin" /> : status === "sent" ? <Check /> : <ArrowRight />}
            </Button>
          </div>
          </VoiceBeam>
          <p role="status" className={cn("mt-3 min-h-5 text-[12px]", status === "error" ? "text-iris" : "text-good")}>
            {status === "error" ? "That doesn't look like an email — try name@company.com." : status === "sent" ? "Thanks — we'll be in touch within one working day." : ""}
          </p>
        </form>
      </Container>
    </section>
  )
}
