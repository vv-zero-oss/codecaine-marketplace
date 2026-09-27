import { useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Terminal } from "lucide-react"

import { VariantButton, type Variant } from "@/components/art/variant-button"
import { FrameTitle, Selection } from "@/components/canvas/frame-chrome"
import { PropsPanel } from "@/components/canvas/props-panel"
import { NameTag } from "@/components/ui/name-tag"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { Typed } from "@/components/ui/typed"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Components from anywhere: one shadcn command, and the button is in the
 * running page — found by its name, its props in the editor's panel. Then the
 * variant dropdown, and the button on the page changes with each pick: the
 * default, a purple pill, a chunky 3D game button.
 */

const LINES = [
  { line: "Components from anywhere" },
  { line: "Found by name the moment they land" },
  { line: "Switch a variant from a dropdown" },
  { line: "Watch the page change as you pick" },
]

const VARIANTS: Variant[] = ["default", "purple", "game"]

export function ComponentsScene() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const view = useViewport()
  const at = Math.min(step, 3)
  const wide = view.width >= 1024
  const variant: Variant = at >= 3 ? "game" : at === 2 ? "purple" : "default"

  return (
    <Scene ref={ref} beats={5} id="components-install" aria-label="Components">
      <SceneHeadline id={at} className="top-[11svh]">
        {LINES[at].line}
      </SceneHeadline>

      <div className={cn("absolute inset-x-0 flex justify-center gap-10 px-4", wide ? "top-[31svh] items-start" : "top-[26svh] flex-col items-center gap-5")}>
        <div style={{ width: wide ? Math.min(560, view.width * 0.4) : view.width - 32 }}>
          {/* The command */}
          <div className="mb-6 rounded-card bg-ed-bar p-5 font-mono text-[14px] leading-7 text-ed-bar-ink shadow-card">
            <p className="mb-1 flex items-center gap-2 text-ed-bar-ink/60">
              <Terminal className="size-4" strokeWidth={1.75} /> my-site
            </p>
            <Typed as="p" text="$ npx shadcn@latest add button" delay={0.2} speed={0.03} />
            <motion.p
              className="text-ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.2 }}
            >
              ✓ Created src/components/ui/button.tsx
            </motion.p>
          </div>

          {/* The page it lands in */}
          <FrameTitle name="my-site · localhost:3000" kind="live" />
          <div className="relative grid h-[220px] place-items-center rounded-[10px] bg-site-bg shadow-window">
            <AnimatePresence>
              {at >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE_SWAP }}
                  className="relative"
                >
                  <Selection label="Button" size={variant === "game" ? "212 × 56" : variant === "purple" ? "190 × 48" : "164 × 44"} tone="accent">
                    <VariantButton variant={variant}>Start free trial</VariantButton>
                  </Selection>
                  <NameTag label="Button" tone="bg-ed-accent text-ed-on-accent" arrow="text-ed-accent" className="absolute -top-16 -left-16" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The editor's props panel */}
        <AnimatePresence>
          {at >= 1 && (
            <motion.div
              className={cn(!wide && "hidden")}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_SWAP }}
            >
              <PropsPanel
                component="Button"
                source="src/components/ui/button.tsx"
                fields={[
                  { name: "variant", value: variant, options: VARIANTS },
                  { name: "size", value: "lg", options: ["sm", "default", "lg"] },
                  { name: "children", value: "Start free trial" },
                ]}
                openField={at >= 2 ? "variant" : undefined}
                highlighted={at >= 2 ? variant : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}
