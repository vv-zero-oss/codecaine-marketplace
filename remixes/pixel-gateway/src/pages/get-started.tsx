import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { toast } from "sonner"

import { PageHero } from "@/components/page-hero"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { GET_STARTED } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const field = "h-12 w-full bg-bg px-3 text-lg text-fg shadow-px-sm [--px-edge:var(--color-line-strong)] outline-none placeholder:text-fg-subtle focus:[--px-edge:var(--color-accent)]"
const POLICIES = [
  { id: "relaxed", name: "Relaxed", body: "Log and coach. Nothing is blocked except known malware." },
  { id: "balanced", name: "Balanced", body: "Block threats, mask secrets, coach on risky AI tools." },
  { id: "strict", name: "Strict", body: "Block anything uncategorised and every unapproved AI tool." },
]

/** A three-step setup: workspace, policy, device. State is kept in the page, and each step is reachable from the Actions row. */
export function GetStartedPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [region, setRegion] = useState("us")
  const [policy, setPolicy] = useState("balanced")
  const [copied, setCopied] = useState(false)
  const done = step >= GET_STARTED.length
  useCanvasAction("Setup step 1", () => setStep(0), { on: step === 0, group: "Get started" })
  useCanvasAction("Setup step 2", () => setStep(1), { on: step === 1, group: "Get started" })
  useCanvasAction("Setup step 3", () => setStep(2), { on: step === 2, group: "Get started" })
  useCanvasAction("Setup complete", () => setStep(3), { on: done, group: "Get started" })
  const command = `curl -fsSL https://get.pixelkeep.example/${(name || "my-team").toLowerCase().replace(/\W+/g, "-")}.sh | sh`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      toast.error("Copy was blocked by the browser")
    }
  }

  return (
    <>
      <PageHero kicker="get started" title="Three steps to your first protected device." blurb="No card, no call. You can change everything you pick here later." />
      <section className="bg-bg py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <ol aria-label="Progress" className="flex gap-3 lg:grid lg:content-start">
            {GET_STARTED.map((s, i) => (
              <li key={s.id} className="flex-1 lg:flex-none">
                <button onClick={() => i <= step && setStep(i)} disabled={i > step && !done} className={cn("flex min-h-14 w-full items-center gap-3 px-3 text-left shadow-px-sm disabled:opacity-40", i === step && !done ? "bg-accent text-accent-fg [--px-edge:var(--color-accent)]" : "bg-surface [--px-edge:var(--color-line)]")}>
                  <span className="grid size-7 shrink-0 place-items-center bg-bg font-display text-[9px] text-fg">{i < step || done ? <Check className="size-3.5 text-good" strokeWidth={4} /> : i + 1}</span>
                  <span className="hidden font-display text-[9px] uppercase leading-tight sm:inline">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="bg-surface p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)] sm:p-10" aria-live="polite">
            {done ? (
              <div className="grid justify-items-start gap-5">
                <PixelSprite name="coin" scale={6} className="animate-float" />
                <h2 className="font-display text-xl uppercase leading-snug">Level up, {name || "player"}!</h2>
                <p className="max-w-lg text-xl text-fg-muted">Your <b className="text-fg">{policy}</b> policy is live in the <b className="text-fg">{region.toUpperCase()}</b> region. Your first device will show up the moment the agent checks in.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/how-it-works" className={buttonVariants({ variant: "primary", size: "lg" })}>See how it works</Link>
                  <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>Back home</Link>
                </div>
              </div>
            ) : (
              <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); setStep(step + 1) }}>
                <div>
                  <p className="font-mono text-xl text-accent-hi">{`> step ${step + 1} of ${GET_STARTED.length}`}</p>
                  <h2 className="mt-1 text-3xl font-bold">{GET_STARTED[step].title}</h2>
                  <p className="mt-2 text-xl text-fg-muted">{GET_STARTED[step].body}</p>
                </div>
                {step === 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-base text-fg-muted">Workspace name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Northwind Labs" className={field} /></label>
                    <label className="grid gap-2 text-base text-fg-muted">Region<select value={region} onChange={(e) => setRegion(e.target.value)} className={field}><option value="us">United States</option><option value="eu">Europe</option><option value="apac">Asia-Pacific</option></select></label>
                  </div>
                ) : step === 1 ? (
                  <div role="radiogroup" aria-label="Starting policy" className="grid gap-3 sm:grid-cols-3">
                    {POLICIES.map((p) => (
                      <button type="button" key={p.id} role="radio" aria-checked={policy === p.id} onClick={() => setPolicy(p.id)} className={cn("grid content-start gap-2 p-4 text-left shadow-px-sm", policy === p.id ? "bg-accent/20 [--px-edge:var(--color-accent)]" : "bg-bg [--px-edge:var(--color-line)] hover:[--px-edge:var(--color-line-strong)]")}>
                        <span className="font-display text-[10px] uppercase">{p.name}</span>
                        <span className="text-lg text-fg-muted">{p.body}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <pre className="overflow-x-auto bg-bg p-4 font-mono text-xl shadow-px-sm [--px-edge:var(--color-line)]"><code>{command}</code></pre>
                    <Button type="button" variant="outline" className="w-fit" onClick={copy}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy command"}</Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" variant="accent" size="lg">{GET_STARTED[step].cta}</Button>
                  {step > 0 ? <Button type="button" variant="ghost" size="lg" onClick={() => setStep(step - 1)}>Back</Button> : null}
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
