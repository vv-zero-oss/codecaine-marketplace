import { useRef, useState } from "react"
import { Flame } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { Container } from "@/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { menu, type MenuItem } from "@/content"
import { useMedia } from "@/hooks/use-media"
import { DURATION, EASE_OUT, SPRING_FOLLOW, STAGGER } from "@/lib/motion"
import { BLOBS } from "@/lib/shapes"

function Heat({ level }: { level: number }) {
  if (!level) return null
  return (
    <span className="inline-flex items-center text-orange" aria-label={`Heat ${level} of 3`}>
      {Array.from({ length: level }, (_, i) => (
        <Flame key={i} className="size-4 fill-current" aria-hidden />
      ))}
    </span>
  )
}

function Row({ item, index, onEnter }: { item: MenuItem; index: number; onEnter: () => void }) {
  return (
    <motion.li
      onPointerEnter={onEnter}
      onFocus={onEnter}
      className="group flex items-center gap-4 border-t-2 border-forest py-5 outline-none focus-visible:bg-forest/5 sm:gap-6 sm:py-6"
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: DURATION.item, ease: EASE_OUT, delay: index * STAGGER }}
      tabIndex={0}
    >
      {/* Touch screens have no hover, so the dish is shown in the row. */}
      <ClipShape shape="scallop" className="size-16 shrink-0 sm:size-20 [@media(hover:hover)_and_(pointer:fine)]:lg:hidden">
        <Photo photo={item.photo} width={240} className="absolute inset-0" />
      </ClipShape>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-heavy text-item transition-transform duration-(--duration-hover) ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-2">
            {item.name}
          </h3>
          {item.tag && (
            <span className="-rotate-3 rounded-pill bg-orange px-3 py-1 font-condensed text-caption uppercase">{item.tag}</span>
          )}
          <Heat level={item.heat} />
        </div>
        <p className="mt-2 max-w-prose text-body text-ink-soft">{item.note}</p>
      </div>
      <p className="self-start font-heavy text-item tabular-nums">
        <span className="align-top text-[0.5em]">$</span>
        {item.price}
      </p>
    </motion.li>
  )
}

/**
 * The menu, in shadcn Tabs. Switching tab slides the underline across (a
 * shared layout animation) and deals the dishes in with a short stagger.
 *
 * With a mouse, the dish you point at follows the pointer in a blob of a
 * frame that re-forms for each dish — a spring, since it chases a hand and
 * is interrupted all the time. Without one (touch), each row carries its own
 * picture instead, so nothing depends on hovering.
 */
export function MenuSection() {
  const [tab, setTab] = useState(menu.tabs[0].id)
  const [hovered, setHovered] = useState<MenuItem | null>(null)
  const [blob, setBlob] = useState(0)
  const reduced = useReducedMotion()
  const canFollow = useMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)")
  const list = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING_FOLLOW)
  const sy = useSpring(y, SPRING_FOLLOW)

  const onMove = (e: React.PointerEvent) => {
    const box = list.current?.getBoundingClientRect()
    if (!box) return
    x.set(e.clientX - box.left)
    y.set(e.clientY - box.top)
  }

  return (
    <section id="menu" className="bg-lime py-section">
      <Container className="grid gap-row lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>{menu.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heavy text-[clamp(56px,7vw,112px)] leading-[0.86]">
            {menu.title.map((line, i) => (
              <span key={line} className="block">
                <RiseText text={line} delay={i * 0.1} />
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[34ch] text-body text-ink-soft">{menu.intro}</p>
          <p className="mt-6 max-w-[34ch] font-condensed text-label uppercase">{menu.footnote}</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList aria-label="Menu sections">
            {menu.tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
                {tab === t.id && (
                  <motion.span
                    layoutId="menu-underline"
                    className="absolute inset-x-0 bottom-0 h-1 rounded-pill bg-orange"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div ref={list} className="relative" onPointerMove={canFollow ? onMove : undefined} onPointerLeave={() => setHovered(null)}>
            {menu.tabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <ul className="border-b-2 border-forest">
                  {t.items.map((item, i) => (
                    <Row
                      key={item.name}
                      item={item}
                      index={i}
                      onEnter={() => {
                        setHovered(item)
                        setBlob((b) => (b + 1) % BLOBS.length)
                      }}
                    />
                  ))}
                </ul>
              </TabsContent>
            ))}

            {canFollow && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 z-10 size-[min(22vw,300px)]"
                style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
                initial={false}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
                transition={{ duration: DURATION.hover, ease: EASE_OUT }}
              >
                <motion.div
                  className="size-full"
                  animate={{ rotate: reduced ? 0 : blob * 22 - 30 }}
                  transition={SPRING_FOLLOW}
                >
                  <ClipShape shape="blob" d={BLOBS[blob]} className="size-full bg-orange">
                    <AnimatePresence initial={false}>
                      {hovered && (
                        <motion.div
                          key={hovered.name}
                          className="absolute inset-0"
                          initial={{ opacity: 0, transform: "scale(1.15)" }}
                          animate={{ opacity: 1, transform: "scale(1)" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: DURATION.item, ease: EASE_OUT }}
                        >
                          <Photo photo={hovered.photo} width={640} className="absolute inset-0" imgClassName="scale-125" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ClipShape>
                </motion.div>
              </motion.div>
            )}
          </div>
        </Tabs>
      </Container>
    </section>
  )
}
