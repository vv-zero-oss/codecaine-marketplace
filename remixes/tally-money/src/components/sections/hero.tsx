import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Briefcase, Coffee, House } from "lucide-react"

import { FallingObjects } from "@/components/falling-objects"
import { FloatChip } from "@/components/motion/float-chip"
import { Magnetic } from "@/components/motion/magnetic"
import { SplitText } from "@/components/motion/split-text"
import { QrCode } from "@/components/qr-code"
import { Container } from "@/components/ui/container"

/** The opening: a pile of everyday spending lands, payments announce themselves, and a line says what to do about it. */
export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, transform: "translateY(16px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as const },
        }
  return (
    <section id="top" className="relative overflow-hidden bg-ink-100 pt-2 pb-20 sm:pt-6 sm:pb-28">
      <Container className="flex flex-col items-center text-center">
        <div className="relative w-full max-w-[42rem]">
          <FallingObjects className="max-w-[20rem] sm:max-w-[42rem]" />
          <FloatChip className="top-[8%] -left-2 hidden md:block lg:-left-24" label="Blue Bottle · Coffee" amount="−$5.00" tone="out" icon={Coffee} delay={2.1} duration={5.5} />
          <FloatChip className="top-[34%] -right-2 hidden md:block lg:-right-28" label="Northwind · Salary" amount="+$6,000" tone="in" icon={Briefcase} delay={2.5} duration={6.5} rise={10} />
          <FloatChip className="bottom-[4%] -left-2 hidden md:block lg:-left-16" label="Rent · due in 3 days" amount="$1,360" tone="due" icon={House} delay={2.9} duration={7} />
        </div>
        <SplitText
          text="Spend with your eyes open."
          as="h1"
          className="-mt-2 max-w-4xl text-[clamp(3rem,9.5vw,7.25rem)] leading-[0.92] font-extrabold tracking-[-0.045em] text-balance text-ink-900 sm:mt-2"
        />
        <motion.p
          {...rise(1.3)}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-900/80 text-pretty sm:text-xl"
        >
          Tally securely connects to your bank accounts and turns every payment into a clear
          picture, so you can make better decisions and lead a calmer financial life.
        </motion.p>
        <Magnetic strength={0.2} className="mt-10">
          <motion.a
            {...rise(1.5)}
            id="download"
            href="#bank"
            className="group flex items-center gap-5 rounded-3xl bg-white py-3 pr-3 pl-6 text-left shadow-lift ring-1 ring-ink-900/5 transition-[box-shadow,transform] duration-150 active:scale-[0.98]"
          >
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-ink-900">Get the Tally app</span>
              <span className="block text-sm text-ink-600">Scan, or tap to see how it connects</span>
            </span>
            <QrCode className="size-20 sm:size-24" />
            <ArrowRight className="size-4 text-ink-400 transition-transform duration-150 group-hover:translate-x-0.5 sm:hidden" />
          </motion.a>
        </Magnetic>
      </Container>
    </section>
  )
}
