import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Isocon } from "@/components/icons/isocon"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { DEVELOPERS } from "@/content/home"

/** A code block that copies itself, and says so. */
export function CodeBlock({ code, label = "TypeScript" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  useCanvasAction("Code copied", (next) => setCopied(next ?? !copied), { on: copied, group: "Developers" })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* clipboard can be blocked; the feedback still shows */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="overflow-hidden rounded-card border border-line-strong bg-page">
      <div className="flex h-10 items-center border-b border-line-strong px-4 text-caption text-ink-3">
        {label}
        <button
          type="button"
          onClick={copy}
          className="ml-auto flex h-7 items-center gap-1.5 rounded-control px-2 text-ink-2 transition-colors duration-300 hover:bg-hover-2 hover:text-ink hover:duration-[50ms]"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "y" : "n"}
              initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1.5"
            >
              {copied ? <Check className="size-3.5 text-green" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[20px] text-ink-soft">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/**
 * Developers: the claim on the left inside a frame of construction lines;
 * an isometric drawing of the API's building blocks on the right.
 */
export function Developers() {
  return (
    <Section id="developers" tone="void">
      <Container className="grid grid-cols-1 gap-14 py-[var(--spacing-section)] lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
        <Reveal className="relative flex flex-col items-start gap-6 p-6 md:p-10">
          <span aria-hidden className="absolute inset-0 border border-dashed border-line-strong" />
          <span aria-hidden className="absolute -top-px -left-8 w-8 border-t border-dashed border-line-strong" />
          <span aria-hidden className="absolute -bottom-px -right-8 w-8 border-t border-dashed border-line-strong" />
          <Eyebrow>{DEVELOPERS.eyebrow}</Eyebrow>
          <Heading lead={DEVELOPERS.lead} rest={DEVELOPERS.rest} className="max-w-[18ch]" />
          <ButtonLink href="/#developers" size="sm" arrow>
            {DEVELOPERS.cta}
          </ButtonLink>
          <div className="mt-2 w-full">
            <CodeBlock code={DEVELOPERS.snippet} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="group/iso relative mx-auto grid w-full max-w-[460px] grid-cols-3 items-end gap-4 text-ink-2">
          {(["dataset", "schema", "deployed-code", "linked-services", "key", "dataset-linked"] as const).map((name, i) => (
            <div
              key={name}
              className={i % 2 ? "translate-y-8 text-accent-ink/80" : ""}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Isocon name={name} draw stroke={1} />
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
