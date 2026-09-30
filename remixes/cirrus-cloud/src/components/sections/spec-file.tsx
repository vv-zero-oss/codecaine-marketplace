import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { PixelIcon } from "@/components/icons/pixel-icon"
import { Prose, SplitSection } from "@/components/blocks/split-section"
import { productPage } from "@/content"

/** The spec itself, shown as the file it is, beside why it matters. */
export function SpecFile() {
  const { file } = productPage
  return (
    <SplitSection id="file" heading={file.heading} label={file.label}>
      <Prose>
        {file.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Prose>
      <CodePanel filename={file.label} code={file.code} className="mt-9" />
    </SplitSection>
  )
}

/** Tints a line of TOML in the palette: tables lime, keys cyan, strings gold. */
function tint(line: string) {
  if (/^\s*\[.*\]/.test(line)) return <span className="text-lime">{line}</span>
  const comment = line.indexOf("#")
  const [code, note] = comment >= 0 ? [line.slice(0, comment), line.slice(comment)] : [line, ""]
  const m = code.match(/^(\s*[\w.]+)(\s*=\s*)(.*)$/)
  return (
    <>
      {m ? (
        <>
          <span className="text-cyan">{m[1]}</span>
          <span className="text-rack-label">{m[2]}</span>
          <span className={/^["[]/.test(m[3]) ? "text-gold" : "text-paper"}>{m[3]}</span>
        </>
      ) : (
        code
      )}
      {note && <span className="text-rack-label">{note}</span>}
    </>
  )
}

/** A file on the night panel, with a copy button that says it copied. */
export function CodePanel({ filename, code, className }: { filename: string; code: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* the clipboard can be unavailable in a frame; the state still shows */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  useCanvasAction("Code copied", (on) => setCopied(on ?? !copied), { on: copied, group: "Code panel" })

  return (
    <figure className={`notch overflow-hidden bg-night ${className ?? ""}`}>
      <figcaption className="flex items-center justify-between border-b border-night-line px-4 py-2.5">
        <span className="label text-rack-label">{filename}</span>
        <button
          type="button"
          onClick={copy}
          className="label inline-flex min-h-9 items-center gap-2 px-2 text-rack-label transition-colors duration-(--duration-hover) outline-none hover:text-paper focus-visible:text-paper"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "done" : "copy"}
              initial={{ opacity: 0, transform: "translateY(3px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-3px)" }}
              transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2"
            >
              <PixelIcon name={copied ? "check" : "copy"} className={copied ? "text-lime" : undefined} />
              {copied ? "Copied" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.75] text-paper">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block min-h-[1.75em]">
              <span aria-hidden className="mr-5 inline-block w-5 text-right text-night-line select-none">
                {i + 1}
              </span>
              {tint(line)}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
