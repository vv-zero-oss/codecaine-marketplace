import { useState } from "react"
import { motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WORKSPACE, type WorkspaceTab } from "@/content"
import { curve } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { WorkspaceMock } from "./workspace-mock"

/**
 * What it is like to use: the product on the left, three ways of working
 * stacked on the right. Choosing one swaps the product's main panel; the
 * chosen row lifts and a hairline marks its edge.
 */
export function Workspace() {
  const [tab, setTab] = useState<WorkspaceTab>("chat")
  for (const t of WORKSPACE.tabs) {
    // One switch per tab, grouped, so the editor can show each panel.
    useCanvasAction(t.eyebrow, () => setTab(t.id), { on: tab === t.id, group: "Workspace" })
  }

  return (
    <section id="workspace" className="pb-[var(--spacing-section)]">
      <Container>
        <Reveal className="max-w-[640px]">
          <SectionHeading lines={WORKSPACE.title} size="md" className="text-[clamp(32px,2.6vw,46px)]" />
          <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.55] text-muted md:text-[18px]">{WORKSPACE.body}</p>
        </Reveal>

        <Tabs orientation="vertical" value={tab} onValueChange={(v) => setTab(v as WorkspaceTab)} className="mt-12 block md:mt-16">
          <div className="grid items-end lg:grid-cols-[1fr_32.4%]">
            <Reveal className="order-2 pt-6 lg:order-1 lg:pt-[110px]">
              <WorkspaceMock tab={tab} />
            </Reveal>

            <TabsList className="order-1 grid !h-auto w-full grid-cols-1 gap-0 rounded-none border border-line-strong bg-transparent p-0 lg:order-2">
              {WORKSPACE.tabs.map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className={cn(
                    "relative flex !h-auto w-full flex-col items-start justify-start gap-0 rounded-none border-0 border-b border-line-strong px-6 py-7 text-left whitespace-normal transition-colors duration-300 last:border-b-0 md:px-[50px] md:py-[50px]",
                    "data-[state=active]:bg-raised data-[state=active]:shadow-none dark:data-[state=active]:border-line-strong dark:data-[state=active]:bg-raised",
                    "data-[state=inactive]:bg-panel/40 hover:bg-raised/60",
                  )}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="workspace-edge"
                      className="absolute top-0 right-0 bottom-0 w-px bg-fg"
                      transition={curve("out", 0.45)}
                    />
                  )}
                  <span className="type-eyebrow text-subtle">{t.eyebrow}</span>
                  <span className="type-heading mt-4 text-[22px] text-fg md:text-[32px]">{t.title}</span>
                  <span
                    className={cn(
                      "mt-4 text-[15px] leading-[1.55] font-normal text-muted transition-opacity duration-300 md:text-[17px]",
                      tab === t.id ? "opacity-100" : "hidden opacity-0 lg:block",
                    )}
                  >
                    {t.body}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </Container>
    </section>
  )
}
