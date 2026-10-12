import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

import { useMediaQuery, usePinned } from "./use-pinned"

/** Every partner name here is invented; the chips are set as plain wordmarks. */
const CATEGORIES: { id: string; label: string; photo: PhotoName; text: string; partners: { name: string; style: string }[] }[] = [
  {
    id: "ground",
    label: "Ground transport",
    photo: "traffic",
    text: "We work with the people who already get you to the door, so the car that meets you is waiting when the rotors stop.",
    partners: [
      { name: "Northline", style: "font-semibold tracking-[-0.04em]" },
      { name: "KERBSIDE", style: "font-bold tracking-[0.08em] text-[15px]" },
    ],
  },
  {
    id: "airports",
    label: "Airports",
    photo: "pad-aerial",
    text: "A pad on the terminal roof and a lane through security, so the hop from the city ends a short walk from your gate.",
    partners: [{ name: "Meridian Terminals", style: "font-medium tracking-[-0.02em]" }],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    photo: "pad-rooftop",
    text: "Structural engineers and builders who turn a flat roof into a deck that can take a landing, a lounge and a lift.",
    partners: [
      { name: "Lattice", style: "font-light tracking-[0.02em] text-[19px]" },
      { name: "Parapet & Co", style: "font-semibold italic tracking-[-0.03em]" },
    ],
  },
  {
    id: "energy",
    label: "Energy",
    photo: "engineer",
    text: "Every pad charges from the grid at night and from storage by day. Our energy partners make sure the power is clean and always there.",
    partners: [
      { name: "VOLTWELL", style: "font-extrabold tracking-[0.04em] text-[15px]" },
      { name: "gridhaven", style: "font-medium tracking-[-0.05em] lowercase" },
    ],
  },
  {
    id: "research",
    label: "Research",
    photo: "hangar",
    text: "Universities and labs who measure what we would rather guess: noise over a street, a battery after a thousand cycles, wind between towers.",
    partners: [
      { name: "Institute of Quiet Flight", style: "font-medium tracking-[-0.01em] text-[14px]" },
      { name: "AEOLAB", style: "font-bold tracking-[0.12em] text-[14px]" },
    ],
  },
  {
    id: "cities",
    label: "Cities",
    photo: "city-haze",
    text: "The city, the harbour board and the neighbourhoods under every route, who decide with us where the network goes and when.",
    partners: [
      { name: "Harbour Board", style: "font-semibold tracking-[-0.02em]" },
      { name: "Civic Air Office", style: "font-medium tracking-[0em] text-[15px]" },
    ],
  },
]

/**
 * Partners: a list of categories on the left with a dot on the one in view,
 * a tall portrait in the middle that cross-fades with it, and on the right a
 * sentence and the partners as bordered wordmark chips. From `md` up the
 * stage pins and scrolling moves the dot; below that it is tabs.
 */
export function Partners({
  title = "With company like this, the only way left is up.",
}: {
  title?: string
}) {
  const canPin = usePinned()
  const large = useMediaQuery("(min-width: 1024px)")
  const pinned = canPin && large
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  for (const [i, c] of CATEGORIES.entries()) {
    // A fixed list, so the hook order never changes.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Partners: ${c.label}`, () => select(i), { on: active === i, group: "Partners" })
  }

  function select(i: number) {
    setActive(i)
    const el = ref.current
    if (!pinned || !el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((i + 0.5) / CATEGORIES.length), behavior: "smooth" })
  }

  return (
    <section data-header-tone="dark" className="relative bg-page text-ink">
      <Container className="pt-(--spacing-section)">
        <Reveal className="mx-auto flex flex-col items-center text-center">
          <p className="mb-5 text-micro text-ink-3">Partners — 05</p>
          <h2 className="type-head max-w-[20ch] text-display text-balance">{title}</h2>
        </Reveal>
      </Container>

      {pinned ? (
        <PinnedPartners stageRef={ref} active={active} onActive={setActive} onSelect={select} />
      ) : (
        <Container className="pt-12 pb-(--spacing-section)">
          <Tabs value={CATEGORIES[active].id} onValueChange={(v) => setActive(CATEGORIES.findIndex((c) => c.id === v))}>
            <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none]">
              <TabsList variant="line" className="h-auto gap-1">
                {CATEGORIES.map((c) => (
                  <TabsTrigger key={c.id} value={c.id} className="h-11 flex-none px-3 text-[15px]">
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {CATEGORIES.map((c) => (
              <TabsContent key={c.id} value={c.id} className="mt-6 flex flex-col gap-6">
                <Photo name={c.photo} className="aspect-[4/5] shadow-(--shadow-photo)" />
                <CategoryCopy category={c} />
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      )}
    </section>
  )
}

function CategoryCopy({ category }: { category: (typeof CATEGORIES)[number] }) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[34ch] text-body text-ink-2">{category.text}</p>
      <ul className="flex flex-wrap gap-3">
        {category.partners.map((p) => (
          <li
            key={p.name}
            className={cn(
              "flex h-[72px] min-w-[150px] items-center justify-center rounded-(--radius-chip) border border-line-strong px-6 text-[17px] text-ink-2 transition-[border-color,color] duration-(--duration-hover) hover:border-ink hover:text-ink",
              p.style,
            )}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PinnedPartners({
  stageRef,
  active,
  onActive,
  onSelect,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>
  active: number
  onActive: (i: number) => void
  onSelect: (i: number) => void
}) {
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(CATEGORIES.length - 1, Math.max(0, Math.floor(p * CATEGORIES.length)))
    if (i !== active) onActive(i)
  })
  const category = CATEGORIES[active]

  return (
    <div ref={stageRef} className="relative" style={{ height: `${CATEGORIES.length * 60 + 40}svh` }}>
      <div className="sticky top-0 flex h-svh items-center">
        <Container className="grid grid-cols-12 items-center gap-6">
          <ul className="col-span-4 flex flex-col gap-1 pl-[6%]">
            {CATEGORIES.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={i === active}
                  className={cn(
                    "group relative flex min-h-11 items-center pl-8 text-left text-h4 font-medium tracking-[-0.03em] transition-colors duration-(--duration-hover)",
                    i === active ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  <motion.span
                    aria-hidden
                    className="absolute left-2 size-2.5 rounded-full bg-ink"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.5 }}
                    transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                  />
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="relative col-span-4 col-start-5 aspect-[2/3] max-h-[84svh] overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <Photo name={c.photo} rounded={false} className="size-full" />
              </motion.div>
            ))}
          </div>
          <div className="col-span-3 col-start-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <CategoryCopy category={category} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  )
}
