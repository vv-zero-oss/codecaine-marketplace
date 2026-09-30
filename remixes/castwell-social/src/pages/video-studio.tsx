import { Captions, Clapperboard, Languages, Mic, Ratio, Scissors } from "lucide-react"

import { PixelSteps } from "@/components/motion/pixel-steps"
import { Reveal } from "@/components/motion/reveal"
import { StudioPreview } from "@/components/mockups/studio-preview"
import { CtaBand } from "@/components/site/cta-band"
import { Container } from "@/components/ui/container"
import { PixelIcon } from "@/components/ui/pixel-icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"
import { PillarGrid } from "@/components/sections/shared/pillar-grid"
import { Section } from "@/components/sections/shared/section"
import { StatBand } from "@/components/sections/shared/stat-band"
import { TemplateGallery } from "@/components/sections/studio/template-gallery"
import { WorkflowSteps } from "@/components/sections/studio/workflow-steps"

const CHIPS: ChipSpec[] = [
  { label: "Script to video", tone: "coral", icon: <Clapperboard />, depth: 0.3, size: "lg", className: "left-[5%] top-[20%]" },
  { label: "Auto captions", tone: "butter", icon: <Captions />, depth: 0.2, className: "right-[8%] top-[14%]" },
  { label: "Clip long videos", tone: "mint", icon: <Scissors />, depth: 0.35, size: "lg", className: "right-[4%] top-[55%]" },
  { label: "AI voiceover", tone: "periwinkle", icon: <Mic />, depth: 0.2, size: "sm", className: "left-[14%] top-[74%]" },
  { label: "38 languages", tone: "sage", icon: <Languages />, depth: 0.15, size: "sm", className: "left-[36%] top-[10%]" },
  { label: "Every aspect ratio", tone: "mint-soft", icon: <Ratio />, depth: 0.25, size: "sm", className: "right-[22%] top-[84%]" },
  { tone: "mint", depth: 0.8, size: "lg", className: "left-[14%] top-[44%]" },
  { tone: "coral", depth: 0.85, className: "right-[12%] top-[38%]" },
  { tone: "butter", depth: 0.75, className: "left-[60%] top-[90%]" },
]

export function VideoStudioPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Video Studio"
        title="Turn one idea into a week of video."
        description="Write a line, paste a link or drop in a long recording. The studio scripts it, storyboards it, renders it with captions and voice, and resizes it for every channel."
        cta="Generate your first video"
        secondary="Browse templates"
        secondaryHref="/video-studio#templates"
        chips={CHIPS}
      >
        <Container className="relative -mt-4 md:-mt-10">
          <Reveal className="mx-auto max-w-[1190px]">
            <StudioPreview />
          </Reveal>
        </Container>
      </PageHero>
      <PixelSteps rise="up" columns={15} rows={5} className="mt-16 md:mt-24" />
      <StatBand
        eyebrow="Short-form, at volume"
        title="More video than your team could cut, without the late nights."
        stats={[
          { value: 14, label: "Clips from one 40-minute interview", tone: "bg-coral" },
          { value: 38, label: "Languages for captions and voiceover", tone: "bg-mint" },
          { value: 90, suffix: "s", label: "Average time from brief to render", tone: "bg-butter" },
        ]}
      />
      <PixelSteps rise="down" columns={15} rows={5} lead="right" />
      <WorkflowSteps
        id="workflow"
        eyebrow="How the studio works"
        title="Brief in, finished video out"
        description="Every step is editable. Accept the draft, tweak a scene, or rewrite the script and render again."
        steps={[
          { title: "Brief", body: "A sentence, a product link, a blog post or a long video to mine for clips.", tone: "bg-mint-tile" },
          { title: "Script", body: "Hook, beats and call to action, written in your brand voice and timed to the format.", tone: "bg-periwinkle" },
          { title: "Storyboard", body: "Scenes matched to your footage, stock or product shots, with captions laid in.", tone: "bg-coral-soft" },
          { title: "Render", body: "Voiceover, music, burned-in captions and your brand kit, rendered in about 90 seconds.", tone: "bg-butter" },
          { title: "Resize", body: "One edit becomes 9:16, 1:1, 4:5 and 16:9, each reframed around the subject.", tone: "bg-sage-deep" },
        ]}
      />
      <TemplateGallery />
      <Section className="pb-0 md:pb-0">
        <Container>
          <SectionHeading eyebrow="In the studio" title="Everything a video editor reaches for" />
        </Container>
        <PillarGrid
          className="mt-12 md:mt-16"
          pillars={[
            { icon: <PixelIcon name="chat" />, title: "Voice & captions", lede: "Sound on or off, it lands.", items: ["AI voiceover, 40 voices", "Word-by-word captions", "38 languages"] },
            { icon: <PixelIcon name="film" />, title: "Clip finder", lede: "Mines long video for moments.", items: ["Scores hooks by retention", "Reframes around faces", "Removes filler words"] },
            { icon: <PixelIcon name="spark" />, title: "Brand kit", lede: "Every frame looks like you.", items: ["Fonts, colours, logo", "Intro and outro cards", "Music you own"] },
            { icon: <PixelIcon name="send" />, title: "Straight to the calendar", lede: "Rendered means scheduled.", items: ["Sends to the scheduler", "Per-channel captions", "Cover frame picked for you"] },
          ]}
        />
      </Section>
      <div className="h-(--spacing-section)" />
      <CtaBand title="Stop cutting clips. Start directing them." cta="Generate your first video" />
    </>
  )
}
