import { Check } from "lucide-react"
import { useState } from "react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { PhoneFrame } from "@/components/device/phone-frame"
import { CountUp } from "@/components/motion/count-up"
import { Floating } from "@/components/motion/floating"
import { Marquee } from "@/components/motion/marquee"
import { Ring } from "@/components/motion/ring"
import { Segmented } from "@/components/screens/kit"
import { ChatScreen } from "@/components/screens/chat"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AppleIcon } from "@/components/ui/apple-icon"
import { Button } from "@/components/ui/button"

export function ComponentLibrary() {
  const [seg, setSeg] = useState<"7D" | "14D" | "30D">("7D")
  return (
    <div className="space-y-8">
      <ComponentSpecimen name="Button" source="components/ui/button.tsx" description="Pill buttons. Press scales to 0.97; focus draws a 2px accent outline." code={`<Button variant="default" size="lg">\n  <AppleIcon /> Download app\n</Button>`}>
        <div className="flex flex-wrap gap-6">
          <StateLabel label="default"><Button><AppleIcon /> Download app</Button></StateLabel>
          <StateLabel label="light"><Button variant="light">Learn more</Button></StateLabel>
          <StateLabel label="soft"><Button variant="soft">Soft</Button></StateLabel>
          <StateLabel label="outline"><Button variant="outline">Outline</Button></StateLabel>
          <StateLabel label="ghost"><Button variant="ghost">Ghost</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Disabled</Button></StateLabel>
          <StateLabel label="sm / lg"><span className="flex items-center gap-2"><Button size="sm">Small</Button><Button size="lg">Large</Button></span></StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Accordion" source="components/ui/accordion.tsx" description="Soft stacked cards on Radix. The open one lifts onto paper." code={`<Accordion type="single" value={id} onValueChange={setId}>\n  <AccordionItem value="age">\n    <AccordionTrigger>Biological Age</AccordionTrigger>\n    <AccordionContent>…</AccordionContent>\n  </AccordionItem>\n</Accordion>`}>
        <Accordion type="single" defaultValue="a" collapsible className="max-w-md space-y-2.5">
          {["a", "b"].map((v) => <AccordionItem key={v} value={v}><AccordionTrigger>{v === "a" ? "Biological Age" : "Journal"}</AccordionTrigger><AccordionContent>One score that shows how you’re ageing.</AccordionContent></AccordionItem>)}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen name="Segmented" source="components/screens/kit.tsx" description="A sliding-thumb control used inside the phone screens." code={`<Segmented options={["7D","14D","30D"]} value={v} onChange={setV} />`}>
        <div className="flex flex-wrap gap-6"><StateLabel label="light"><Segmented options={["7D", "14D", "30D"] as const} value={seg} onChange={setSeg} className="w-52" /></StateLabel><StateLabel label="dark"><span className="block rounded-2xl bg-night p-3"><Segmented dark options={["7D", "14D", "30D"] as const} value={seg} onChange={setSeg} className="w-52 text-white" /></span></StateLabel></div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Ring · CountUp · Floating" source="components/motion/" description="Progress ring, scroll-triggered counter and the bobbing chip. All props are scalars, so the editor can drive them." code={`<Ring value={70} size={96} color="var(--color-mint)">70%</Ring>\n<CountUp value={2.5} decimals={1} suffix=" million" />\n<Floating distance={10} duration={6}>…</Floating>`}>
        <div className="flex flex-wrap items-center gap-8">
          <Ring value={70} size={96} stroke={9}><b className="text-lg tabular-nums">70%</b></Ring>
          <span className="text-4xl font-semibold tracking-tight"><CountUp value={2.5} decimals={1} suffix=" million" /></span>
          <Floating distance={8}><span className="inline-flex items-center gap-2 rounded-chip bg-paper px-4 py-3 text-sm font-semibold shadow-chip"><Check className="size-4 text-mint" />Recovered</span></Floating>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Marquee" source="components/motion/marquee.tsx" description="Seamless drifting strip; pauses on hover and under reduced motion." code={`<Marquee duration={50} direction="left" paused={false}>…</Marquee>`}>
        <Marquee duration={20}>{["Sleep", "Strain", "Recovery", "HRV", "VO₂ Max", "Labs"].map((t) => <span key={t} className="rounded-pill bg-paper px-5 py-2.5 text-sm font-medium shadow-chip">{t}</span>)}</Marquee>
      </ComponentSpecimen>

      <ComponentSpecimen name="PhoneFrame" source="components/device/phone-frame.tsx" description="A pure-CSS phone whose screen is a live React tree, scaled from 390 × 844. Three finishes. Try the chat." code={`<PhoneFrame tone="titanium" statusTone="dark">\n  <ChatScreen persona="Friend" />\n</PhoneFrame>`} previewClassName="flex justify-center">
        <div className="w-[240px]"><PhoneFrame><ChatScreen /></PhoneFrame></div>
      </ComponentSpecimen>
    </div>
  )
}
