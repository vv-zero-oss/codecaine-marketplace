import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PERSON } from "@/content"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * The address, as a pill you can click to write, with a button beside it that
 * copies it and says so. The icon swaps with a quick scale-and-blur — the
 * copied state is the one moment on this page that needs to feel answered.
 */
export function EmailCopy({ email = PERSON.email, className }: { email?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useCanvasAction("Email copied", (next) => setCopied(next ?? !copied), { on: copied, group: "Contact" })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Clipboard refused (an insecure origin, a denied permission): the
      // address is still right there to select.
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={cn("inline-flex items-stretch gap-0.5", className)}>
      <a
        href={`mailto:${email}`}
        className="flex h-11 items-center rounded-l-[var(--radius-button)] bg-lime px-4 text-[15px] font-medium text-night shadow-[var(--shadow-button)] transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--color-lime),white_22%)]"
      >
        {email}
      </a>
      <Tooltip open={copied || undefined}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy email address"}
            className="relative flex h-11 w-11 items-center justify-center rounded-r-[var(--radius-button)] bg-lime text-night shadow-[var(--shadow-button)] transition-[background-color,transform] duration-200 hover:bg-[color-mix(in_oklab,var(--color-lime),white_22%)] active:scale-95"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={{ duration: 0.18, ease: ease("out") }}
              >
                {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">{copied ? "Copied" : "Copy"}</TooltipContent>
      </Tooltip>
    </div>
  )
}
