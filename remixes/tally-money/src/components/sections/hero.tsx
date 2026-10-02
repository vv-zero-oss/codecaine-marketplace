import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { FallingObjects } from "@/components/falling-objects"
import { QrCode } from "@/components/qr-code"
import { Container } from "@/components/ui/container"

/** The opening: a pile of everyday spending lands, and a line says what to do about it. */
export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
  return (
    <section id="top" className="relative bg-ink-100 pt-4 pb-20 sm:pt-8 sm:pb-28">
      <Container className="flex flex-col items-center text-center">
        <FallingObjects className="max-w-[18rem] sm:max-w-[26rem]" />
        <motion.h1
          {...rise(0.9)}
          className="mt-8 max-w-3xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance text-ink-900"
        >
          Spend with your eyes open.
        </motion.h1>
        <motion.p
          {...rise(1.05)}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-900/80 text-pretty sm:text-lg"
        >
          Tally securely connects to your bank accounts and gives you a clear picture of your
          finances, so you can make better decisions and lead a calmer financial life.
        </motion.p>
        <motion.a
          {...rise(1.2)}
          id="download"
          href="#bank"
          className="group mt-9 flex items-center gap-4 rounded-2xl bg-ink-200/70 py-3 pr-3 pl-5 text-left transition-[background-color,transform] duration-150 hover:bg-ink-200 active:scale-[0.98]"
        >
          <span>
            <span className="block text-base font-bold text-ink-600">Get the Tally app</span>
            <span className="block text-sm text-ink-400">Now in public beta</span>
          </span>
          <QrCode className="size-16 sm:size-20" />
          <ArrowRight className="size-4 text-ink-400 transition-transform duration-150 group-hover:translate-x-0.5 sm:hidden" />
        </motion.a>
      </Container>
    </section>
  )
}
