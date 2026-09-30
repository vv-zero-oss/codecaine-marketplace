import { Changed } from "@/components/sections/changed"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Flow } from "@/components/sections/flow"
import { Intro } from "@/components/sections/intro"
import { Levels } from "@/components/sections/levels"
import { Masthead } from "@/components/sections/masthead"
import { Origin } from "@/components/sections/origin"
import { Pricing } from "@/components/sections/pricing"
import { Spec } from "@/components/sections/spec"
import { Stack } from "@/components/sections/stack"
import { Workloads } from "@/components/sections/workloads"

/**
 * Home, as a conversation: what it is (masthead and the server room), what
 * teams run on it, why it exists, how it works, the product, how teams adopt
 * it, what it runs, what it costs, what people ask, and the ask.
 */
export function HomePage() {
  return (
    <>
      <Masthead />
      <Intro />
      <Workloads />
      <Origin />
      <Changed />
      <Flow />
      <Spec />
      <Levels />
      <Stack />
      <Pricing />
      <Faq />
      <Closing />
    </>
  )
}
