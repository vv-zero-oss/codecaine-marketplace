import { Container } from "@/components/ui/container"
import { ButtonLink } from "@/components/ui/button"
import { CodeWindow } from "@/components/ui/code-window"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SNIPPETS = {
  python: `from vantage import Client

client = Client()
response = client.chat.create(
  model="vantage-4",
  prompt="Explain quantum computing",
)
print(response.text)`,
  typescript: `import { vantage } from "@vantage/sdk";
import { generateText } from "ai";

const { text } = await generateText({
  model: vantage.responses("vantage-4"),
  prompt: "Explain quantum computing",
});
console.log(text);`,
  curl: `curl https://api.vantage.dev/v1/responses \\
  -H "Authorization: Bearer $VANTAGE_KEY" \\
  -d '{
    "model": "vantage-4",
    "input": "Explain quantum computing"
  }'`,
}

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 -.2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

/** The gradient, grainy frame the code window sits on; the four white squares mark its corners. */
function GrainFrame({ children }: { children: React.ReactNode }) {
  const corner = "absolute size-2.5 bg-paper"
  return (
    <div className="relative p-6 sm:p-10">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(150deg, var(--frame-from) 0%, var(--frame-from) 38%, var(--frame-to) 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, maskImage: "linear-gradient(200deg, #000 0%, transparent 60%)" }}
      />
      <span aria-hidden className={`${corner} top-0 left-0`} />
      <span aria-hidden className={`${corner} top-0 right-0`} />
      <span aria-hidden className={`${corner} right-0 bottom-0`} />
      <span aria-hidden className={`${corner} bottom-0 left-0`} />
      <div className="relative">{children}</div>
    </div>
  )
}

export function Developers() {
  return (
    <section id="developers" className="pb-24 sm:pb-40">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="text-[12px] text-ink-3">For developers</p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,2.9rem)] leading-[0.98] font-normal tracking-[-0.045em]">
            One API.
            <br />
            <span className="text-ink-3">Every modality.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink-2">
            Text, code, voice, images, and video — all through a single unified API. Start building in seconds.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ButtonLink href="#start">Get API Key</ButtonLink>
            <ButtonLink href="#start" variant="outline">
              Read Docs
            </ButtonLink>
          </div>
          <dl className="mt-10 flex gap-8 text-[13px]">
            {[
              ["1M+", "API calls per day"],
              ["<200ms", "Median latency"],
              ["5+", "Model families"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-medium tabular-nums">{n}</dt>
                <dd className="mt-1 text-[11px] text-ink-3">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Tabs defaultValue="typescript" className="min-w-0">
          <GrainFrame>
            {Object.entries(SNIPPETS).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <CodeWindow code={code} className="min-h-[220px]" />
              </TabsContent>
            ))}
          </GrainFrame>
          <TabsList className="mt-4 pl-2">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
        </Tabs>
      </Container>
    </section>
  )
}
