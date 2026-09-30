import { useCanvasAction } from "@canvas/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

import { ComponentSpecimen, GroupLabel, SectionFrame, StateLabel } from "@/components/brand/specimen"
import { CallToBook } from "@/components/call-to-book"
import { GalleryCard } from "@/components/gallery-card"
import { Photo } from "@/components/photo"
import { SiteFooter } from "@/components/site-footer"
import { NavLink, SiteHeader, Wordmark } from "@/components/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading"
import { faqs, galleries, photo, services, testimonials, type Category } from "@/content"
import { Fact } from "@/pages/about"
import { EnquiryForm, Field } from "@/pages/contact"
import { FeaturedWork, HomeHero, PressStrip, Testimonial, Testimonials } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { CategoryFilter } from "@/pages/portfolio"
import { PackageCard } from "@/pages/services"

const VARIANTS = ["solid", "outline", "light", "link"] as const
const SIZES = ["sm", "default", "lg"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER = {
  solid: "bg-ink/85",
  outline: "border-ink",
  light: "bg-paper-200",
  link: "decoration-ink",
} as const
const FOCUS = "ring-2 ring-accent ring-offset-2"

/* ─── components/ui ───────────────────────────────────────────────────── */

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button · ButtonLink"
      source="components/ui/button.tsx"
      description="Four variants and three sizes on a cva recipe. Square, spaced capitals at 12px, a colour change on hover and an accent focus ring. The light variant is for ink grounds. ButtonLink is the same recipe on the router’s Link."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="/portfolio">View portfolio</ButtonLink>
<ButtonLink href="/contact" variant="outline">Check a date</ButtonLink>
<Button type="submit" size="lg">Send enquiry</Button>`}
      previewClassName="p-0 md:p-0"
    >
      <div className="divide-y divide-ink/10">
        {VARIANTS.map((variant) => (
          <div
            key={variant}
            className={variant === "light" ? "bg-ink p-6 text-paper md:px-10" : "p-6 md:px-10"}
          >
            <p className={variant === "light" ? "mb-4 font-mono text-[11px] text-paper/60" : "mb-4 font-mono text-[11px] text-ink-400"}>
              variant “{variant}”
            </p>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
              <StateLabel label="default">
                <Button variant={variant}>Check a date</Button>
              </StateLabel>
              <StateLabel label="hover">
                <Button variant={variant} className={HOVER[variant]}>
                  Check a date
                </Button>
              </StateLabel>
              <StateLabel label="focus">
                <Button variant={variant} className={`${FOCUS} ${variant === "light" ? "ring-offset-ink" : "ring-offset-paper"}`}>
                  Check a date
                </Button>
              </StateLabel>
              <StateLabel label="disabled">
                <Button variant={variant} disabled>
                  Check a date
                </Button>
              </StateLabel>
              <StateLabel label="with icon">
                <Button variant={variant}>
                  Check a date <ArrowRight />
                </Button>
              </StateLabel>
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-x-6 gap-y-5 p-6 md:px-10">
          <p className="w-full font-mono text-[11px] text-ink-400">sizes</p>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size}>Send enquiry</Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink, link, sm">
            <ButtonLink href="/portfolio" variant="link" size="sm" className="px-0">
              <ArrowLeft /> Portfolio
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function AccordionSpecimen() {
  const first = faqs[0].question
  const [open, setOpen] = useState<string>(first)
  const isOpen = open === first
  useCanvasAction("First answer open", (next) => setOpen((next ?? !isOpen) ? first : ""), {
    on: isOpen,
    group: "Brand guidelines",
  })
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="shadcn’s accordion on Radix. The answer unfolds over 200ms to Radix’s measured height; the chevron turns. On the services page the trigger is set in the display face. Open the first answer below; the second stays closed."
      code={`<Accordion type="single" collapsible>
  <AccordionItem value="booking">
    <AccordionTrigger className="font-display text-2xl font-normal">How far ahead should we book?</AccordionTrigger>
    <AccordionContent>Weddings usually nine to twelve months ahead…</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="max-w-3xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="font-display text-2xl font-normal">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentSpecimen>
  )
}

export function HeadingSpecimens() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ComponentSpecimen
        name="SectionHeading"
        source="components/ui/section-heading.tsx"
        description="An eyebrow, a display title and an optional paragraph. Every section opens with one."
        code={`<SectionHeading eyebrow="Portfolio" title="Every story, start to finish">
  Galleries are delivered as whole days rather than highlights.
</SectionHeading>`}
      >
        <div className="space-y-10">
          <StateLabel label="with paragraph">
            <SectionHeading eyebrow="Portfolio" title="Every story, start to finish">
              Galleries are delivered as whole days rather than highlights — here are a few, shared with permission.
            </SectionHeading>
          </StateLabel>
          <StateLabel label="title only">
            <SectionHeading eyebrow="Kind words" title="From people I’ve photographed" />
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <div className="min-w-0 space-y-8">
        <ComponentSpecimen
          name="Eyebrow"
          source="components/ui/section-heading.tsx"
          description="11px medium capitals, spaced wide, in ink 400. The label above a heading."
          code={`<Eyebrow>Weddings · Portraits · Editorial</Eyebrow>`}
        >
          <Eyebrow>Weddings · Portraits · Editorial</Eyebrow>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="The centring wrapper: max 80rem, 24px sides on phones and 40px from md. Marked data-canvas-ignore, so the editor looks through it."
          code={`<Container className="pt-20">…</Container>`}
          previewClassName="p-0 md:p-0"
        >
          <div className="bg-paper-200 py-6">
            <Container>
              <div className="flex h-12 items-center justify-center bg-paper text-[10px] tracking-[0.2em] text-ink-400 uppercase">
                Content
              </div>
            </Container>
          </div>
        </ComponentSpecimen>
      </div>
    </div>
  )
}

/* ─── Composed ────────────────────────────────────────────────────────── */

export function ChromeSpecimens() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="Wordmark"
          source="components/site-header.tsx"
          description="The name in the display face over the tagline in spaced capitals. A link home."
          code={`<Wordmark />`}
        >
          <Wordmark />
        </ComponentSpecimen>
        <ComponentSpecimen
          name="NavLink"
          source="components/site-header.tsx"
          description="Spaced capitals in ink 400, going to ink on hover and when it is the current page."
          code={`<NavLink href="/portfolio" label="Portfolio" active={pathname.startsWith("/portfolio")} />`}
        >
          <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
            <StateLabel label="idle">
              <NavLink href="/services" label="Services" active={false} />
            </StateLabel>
            <StateLabel label="active · hover">
              <NavLink href="/portfolio" label="Portfolio" active />
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="SiteHeader"
        source="components/site-header.tsx"
        description="Sticky, 80px, paper at 90% over a blur, with a hairline under it. The four links fold into a menu button below md, which opens a list under the bar. It is also live at the top of this page."
        code={`<SiteHeader />`}
        previewClassName="p-0 md:p-0"
      >
        <SiteHeader />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="SiteFooter"
        source="components/site-footer.tsx"
        description="The name and where the studio is, the pages, then how to get in touch — and the way to these guidelines. Three columns from md, stacked on phones."
        code={`<SiteFooter />`}
        previewClassName="p-0 md:p-0 [&>footer]:mt-0"
      >
        <SiteFooter />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CallToBook"
        source="components/call-to-book.tsx"
        description="The ink band that closes most pages: one line and a light button to the contact page. The title is a prop."
        code={`<CallToBook />
<CallToBook title="Let's make something honest." />`}
        previewClassName="p-0 md:p-0 [&>section]:mt-0"
      >
        <CallToBook title="Let’s make something honest." />
      </ComponentSpecimen>
    </div>
  )
}

export function PhotoSpecimens() {
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Photo"
        source="components/photo.tsx"
        description="Every photograph on the site. The frame holds the ratio — portrait 4:5, tall 2:3, square, landscape 3:2 — on a paper 200 ground, and the image drifts to 103% when a card around it is hovered."
        code={`<Photo src={photo("hero-a")} alt="Bride laughing in a garden" ratio="tall" />`}
      >
        <div className="grid grid-cols-2 items-end gap-4 sm:grid-cols-[1fr_1fr_1fr_1.5fr]">
          {(["portrait", "tall", "square", "landscape"] as const).map((ratio) => (
            <StateLabel key={ratio} label={ratio}>
              <div className="group w-full">
                <Photo src={photo(`guide-photo-${ratio}`, 600, 600)} alt="" ratio={ratio} />
              </div>
            </StateLabel>
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="GalleryCard"
        source="components/gallery-card.tsx"
        description="A story in the portfolio: the cover, the title in the display face with the year, and the category and place in capitals. The whole card is the link; hover it and the cover drifts."
        code={`<GalleryCard gallery={gallery} />
<GalleryCard gallery={gallery} ratio="tall" />`}
      >
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <StateLabel label="portrait">
            <div className="w-full">
              <GalleryCard gallery={galleries[0]} />
            </div>
          </StateLabel>
          <StateLabel label="tall">
            <div className="w-full">
              <GalleryCard gallery={galleries[1]} ratio="tall" />
            </div>
          </StateLabel>
          <StateLabel label="hover — cover at 103%">
            <div className="w-full [&_img]:scale-[1.03]">
              <GalleryCard gallery={galleries[2]} />
            </div>
          </StateLabel>
        </div>
      </ComponentSpecimen>
    </div>
  )
}

export function BlockSpecimens() {
  const [category, setCategory] = useState<Category | "All">("Weddings")
  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="Testimonial"
          source="pages/home.tsx"
          description="A quote in the display italic under a hairline, with who said it in capitals."
          code={`<Testimonial quote="…" name="Ana & Tomás" context="Wedding, Sintra" />`}
        >
          <Testimonial {...testimonials[0]} />
        </ComponentSpecimen>
        <ComponentSpecimen
          name="Fact"
          source="pages/about.tsx"
          description="A number in the display face and what it counts, under a hairline. Three in a row on the about page."
          code={`<Fact value="240+" label="weddings photographed" />`}
        >
          <div className="grid grid-cols-3 gap-6">
            <Fact value="12" label="years behind a camera" />
            <Fact value="240+" label="weddings photographed" />
            <Fact value="31" label="countries worked in" />
          </div>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="CategoryFilter"
        source="pages/portfolio.tsx"
        description="Tabs that narrow the portfolio: square chips in spaced capitals, filled ink when chosen, the border going to ink on hover. Try it."
        code={`<CategoryFilter value={category} onChange={setCategory} />`}
      >
        <div className="space-y-4">
          <CategoryFilter value={category} onChange={setCategory} />
          <p className="text-sm text-ink-600">
            {galleries.filter((gallery) => category === "All" || gallery.category === category).length} of{" "}
            {galleries.length} stories shown
          </p>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PackageCard"
        source="pages/services.tsx"
        description="A package: name, price, what it is and what it includes, and a way to enquire. featured turns it to ink, with a light button — the one to look at first."
        code={`<PackageCard name="Wedding day" price="€3,200" detail="…" includes={[…]} featured />`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <StateLabel label="default">
            <div className="w-full">
              <PackageCard {...services[0]} />
            </div>
          </StateLabel>
          <StateLabel label="featured">
            <div className="w-full">
              <PackageCard {...services[1]} />
            </div>
          </StateLabel>
        </div>
      </ComponentSpecimen>
    </div>
  )
}

export function FormSpecimens() {
  const [run, setRun] = useState(0)
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Field"
        source="pages/contact.tsx"
        description="A label in capitals over a bare underline — no box. The line goes to ink on focus. Text, email, date and a textarea."
        code={`<Field label="Your name" name="name" />
<Field label="Date" name="date" type="date" />
<Field label="Tell me about it" name="message" textarea />`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <StateLabel label="default">
            <div className="w-full">
              <Field label="Your name" name="guide-name" />
            </div>
          </StateLabel>
          <StateLabel label="focus">
            <div className="w-full [&_input]:border-ink">
              <Field label="Email" name="guide-email" type="email" />
            </div>
          </StateLabel>
          <StateLabel label="date">
            <div className="w-full">
              <Field label="Date" name="guide-date" type="date" />
            </div>
          </StateLabel>
          <StateLabel label="textarea">
            <div className="w-full">
              <Field label="Tell me about it" name="guide-message" textarea />
            </div>
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="EnquiryForm"
        source="pages/contact.tsx"
        description="The enquiry form, and the thank-you it turns into. It sends nothing yet — a remix cannot know where your mail goes. Press Send enquiry to see the sent state; Reset brings the form back."
        code={`<EnquiryForm />`}
      >
        <div className="mb-6 flex justify-end">
          <Button variant="link" size="sm" onClick={() => setRun((value) => value + 1)}>
            Reset
          </Button>
        </div>
        <EnquiryForm key={run} />
      </ComponentSpecimen>
    </div>
  )
}

export function SectionSpecimens() {
  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-sm leading-relaxed text-ink-600">
        The home page’s sections, whole, each in a frame. They are built for the full page width, so on a phone and
        in this column they lay out as they would on a narrower screen.
      </p>
      <SectionFrame label="HomeHero — pages/home.tsx">
        <HomeHero />
      </SectionFrame>
      <SectionFrame label="PressStrip — pages/home.tsx">
        <PressStrip />
      </SectionFrame>
      <SectionFrame label="FeaturedWork — pages/home.tsx" className="pb-16 [&>section]:mt-16">
        <FeaturedWork />
      </SectionFrame>
      <SectionFrame label="Testimonials — pages/home.tsx" className="pb-16 [&>section]:mt-16">
        <Testimonials />
      </SectionFrame>
      <SectionFrame label="NotFoundPage — pages/not-found.tsx" className="[&>div]:py-20">
        <NotFoundPage />
      </SectionFrame>
    </div>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-20">
      <div className="space-y-8">
        <GroupLabel>components/ui</GroupLabel>
        <ButtonSpecimen />
        <AccordionSpecimen />
        <HeadingSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>The frame of every page</GroupLabel>
        <ChromeSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Photographs and stories</GroupLabel>
        <PhotoSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Blocks</GroupLabel>
        <BlockSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Forms</GroupLabel>
        <FormSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Sections</GroupLabel>
        <SectionSpecimens />
      </div>
    </div>
  )
}
